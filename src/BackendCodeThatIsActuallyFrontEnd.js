    //IMPORT : NYANDARUA COUNTY shp as AOI

//Tip: When uploading a shapefile asset, ignore the .sbx file format
var S1C = ee.ImageCollection("COPERNICUS/S1_GRD");//SAR data
var S2_BOA = ee.ImageCollection("COPERNICUS/S2_SR");//Sentinel 2 MSI L2A
var SRTM = ee.Image("USGS/SRTMGL1_003");// USGS/NASA 30m DEM
var L8 = ee.ImageCollection("LANDSAT/LC08/C01/T1"); //Landsat 8 scaled radiance image collection.
var GPM = ee.ImageCollection("NASA/GPM_L3/IMERG_MONTHLY_V06");//Global Precipitation Measurement

/*................................SENTINEL 2 Functions................................*/
function cloudmask(S2_BOA) {//Cloud masking function for Sentinel 2
  var QA = S2_BOA.select('QA60');
  var cloudBitMask = 1 << 10; //Clouds
  var cirrusBitMask = 1 << 11; //Cirrus
  var Mask = QA.bitwiseAnd(cloudBitMask).eq(0).and(QA.bitwiseAnd(cirrusBitMask).eq(0)); //For clear conditions indication
  return S2_BOA.updateMask(Mask)//.divide(10000);
    .select("B.*")
    .copyProperties(S2_BOA, ["system:time_start"]);
}
var filteredS2 = S2_BOA.filterDate('2022-01-10', '2022-02-20')
                  //.filterDate('2021-01-01', '2022-01-20')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',10))//Pre-filtering for less cloudy granules
                  .filter(ee.Filter.bounds(AOI))//.geometry()))
                  .map(cloudmask);
print(filteredS2.size());//Shows how many images are selected using our above filter                  
var rgbVis = {min: 0,max: 3000,bands: ['B4', 'B3', 'B2'],};
var mosaic = filteredS2.mosaic();
var filtered_AOI = filteredS2.median();//gives the best pixels
Map.addLayer(filtered_AOI.clip(AOI), rgbVis, 'AOI Image'); //layer from which the indices will be calculated
Map.addLayer(mosaic.clip(AOI), rgbVis, 'Mosaic');
Map.addLayer(filtered_AOI.clip(AOI), rgbVis, 'Median Composite');
//var NDVI = filtered_AOI.normalizedDifference(['B8', 'B4']).rename(['NDVI']);
var viVis = {min: 0.0,max: 1,palette: ['white', 'green']}; //more green = more vegetation (Visualizes vegetation)
var wiVis = {min: 0,max: 1,palette: ['white', 'blue']}; //Parameters visualize water properties
//Map.addLayer(NDVI.clip(AOI), viVis, 'NDVI');
print('Components of AOI', AOI);
//NDVI Index - SENTINEL 2
function addNDVI(filtered_AOI) {
  var NDVI = filtered_AOI.normalizedDifference(['B8', 'B4']).rename(['NDVI']);
  return filtered_AOI.addBands(NDVI);}
var includesNDVI = filteredS2.map(addNDVI);//Mapping the function over the collection
// Moving-Window Smoothing
var Days = 31;// Specifies the time-window
//The 'join' finds all images within the time-window and adds all matching images into a new property called 'join_images'
var join = ee.Join.saveAll({matchesKey: 'join_images'});
//The filter will match all images captured within the specified day of the source image
var diffFilter = ee.Filter.maxDifference({
  difference: 1000 * 60 * 60 * 24 * Days,
  leftField: 'system:time_start', 
  rightField: 'system:time_start'});
//Select the 'ndvi' band
var ndviCol = includesNDVI.select('NDVI');
var joinedCollection = join.apply({primary: ndviCol, secondary: ndviCol, condition: diffFilter});
//Each image in the joined collection will contain matching images in the 'join_images' property
// Extract and return the mean of matched images
var smoothedCollection = ee.ImageCollection(joinedCollection.map(function(S2_BOA) {
  var collection = ee.ImageCollection.fromImages(S2_BOA.get('join_images'));
  return ee.Image(S2_BOA).addBands(collection.mean().rename('moving_average'));
}));
var chart = ui.Chart.image.series({// Display a time-series chart
  imageCollection: smoothedCollection.select(['NDVI', 'moving_average']),
  region: AOI,
  reducer: ee.Reducer.mean(),
  scale: 80
}).setOptions({
      lineWidth: 1,
      title: 'Time Series:NDVI',
      interpolateNulls: true,
      vAxis: {title: 'NDVI'},
      hAxis: {title: 'Day in Month', format: 'dd/MM', gridlines: {count: 7}},
      series: {
        1: {color: 'gray', lineDashStyle: [1, 1]}, // Original NDVI
        0: {color: 'red', lineWidth: 2 }, // Smoothed NDVI
      },
    });
print(chart);
//MNDWI helps find water bodies: 'GREEN'(B3) and 'SWIR1' (B11) - SENTINEL 2
function addMNDWI(filtered_AOI) {
  var MNDWI = filtered_AOI.normalizedDifference(['B3', 'B11']).rename(['MNDWI']);
  return filtered_AOI.addBands(MNDWI);}
var includesMNDWI = filteredS2.map(addMNDWI);//Mapping the function over the collection
var MNDWIChart = ui.Chart.image.series({//Displays a time-series chart
  imageCollection: includesMNDWI.select('MNDWI'),
  region: AOI,
  reducer: ee.Reducer.mean(),
  scale: 20
}).setOptions({
      lineWidth: 1,
      colors: ['blue'],
      title: 'MNDWI Time Series',
      interpolateNulls: true,
      vAxis: {title: 'MNDWI'},
      hAxis: {title: 'Day in Month', format: 'dd/MM', gridlines: {count: 7}}
    });
print(MNDWIChart);
//Map.addLayer(MNDWI.clip(AOI), wiVis, 'MNDWI'); - Client Side operation
//SAVI Index - SENTINEL 2
function addSAVI(filtered_AOI) {
  var SAVI = filtered_AOI.expression('1.5 * ((NIR - RED) / (NIR + RED + 0.5))',
  {'NIR': filtered_AOI.select('B8').multiply(0.0001),'RED': filtered_AOI.select('B4').multiply(0.0001)}).rename('SAVI');
  return filtered_AOI.addBands(SAVI);
}
var includesSAVI = filteredS2.map(addSAVI);//Mapping the function over the collection
var SAVIChart = ui.Chart.image.series({//Displays a time-series chart
  imageCollection: includesSAVI.select('SAVI'),
  region: AOI,
  reducer: ee.Reducer.mean(),
  scale: 20
}).setOptions({
      lineWidth: 1,
      colors: ['brown'],
      title: 'SAVI Time Series',
      interpolateNulls: true,
      vAxis: {title: 'SAVI'},
      hAxis: {title: 'Day in Month', format: 'dd/MM', gridlines: {count: 7}}
    });
print(SAVIChart);
//Map.addLayer(SAVI.clip(AOI), viVis, 'SAVI'); //same visualization as ndvi- Client Side operation
//NDRE Index - SENTINEL 2
function addNDRE(filtered_AOI) {
  var NDRE = filtered_AOI.normalizedDifference(['B8', 'B5']).rename(['NDRE']);
  return filtered_AOI.addBands(NDRE);}
var includesNDRE = filteredS2.map(addNDRE);//Mapping the function over the collection
var NDREChart = ui.Chart.image.series({//Displays a time-series chart
  imageCollection: includesNDRE.select('NDRE'),//Red edge band absent in L8
  region: AOI,
  reducer: ee.Reducer.mean(),
  scale: 20
}).setOptions({
      lineWidth: 1,
      colors: ['#31a354'],
      title: 'NDRE Time Series',
      interpolateNulls: true,
      vAxis: {title: 'NDRE'},
      hAxis: {title: 'Day in Month', format: 'dd/MM', gridlines: {count: 7}}
    });
print(NDREChart);
//Map.addLayer(NDRE.clip(AOI), viVis, 'NDRE');//same visualization as ndvi- Client Side operation
//NDMI Index - SENTINEL 2
function addNDMI(filtered_AOI) {
  var NDMI = filtered_AOI.normalizedDifference(['B8', 'B11']).rename(['NDMI']);
  return filtered_AOI.addBands(NDMI);}
var includesNDMI = filteredS2.map(addNDMI);//Mapping the function over the collection
var NDMIChart = ui.Chart.image.series({//Displays a time-series chart
  imageCollection: includesNDMI.select('NDMI'),
  region: AOI,
  reducer: ee.Reducer.mean(),
  scale: 20
}).setOptions({
      lineWidth: 1,
      colors: ['#41b6c4'],
      title: 'NDMI Time Series',
      interpolateNulls: true,
      vAxis: {title: 'NDMI'},
      hAxis: {title: 'Day in Month', format: 'dd/MM', gridlines: {count: 7}}
    });
print(NDMIChart);
//Map.addLayer(NDMI.clip(AOI), wiVis, 'NDMI');//same visualization as MNDWI- Client Side operation
//ReCl Index - SENTINEL 2
function addReCl(filtered_AOI) {
  var ReCl = filtered_AOI.expression('((NIR/RedEdge)-1)', {'NIR': filtered_AOI.select('B8'),'RedEdge': filtered_AOI.select('B5')}).rename('ReCl');
  return filtered_AOI.addBands(ReCl);}
var includesReCl = filteredS2.map(addReCl);//Mapping the function over the collection
var ReClChart = ui.Chart.image.series({//Displays a time-series chart
  imageCollection: includesReCl.select('ReCl'),
  region: AOI,
  reducer: ee.Reducer.mean(),
  scale: 20
}).setOptions({
      lineWidth: 1,
      colors: ['#006837'],
      title: 'ReCl Time Series',
      interpolateNulls: true,
      vAxis: {title: 'ReCl'},
      hAxis: {title: 'Day in Month', format: 'dd/MM', gridlines: {count: 7}}
    });
print(ReClChart);
//MSAVI Index - SENTINEL 2
function addMSAVI(filtered_AOI) {
  var MSAVI = filtered_AOI.expression('(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - RED)) ) / 2', {'NIR': filtered_AOI.select('B8'),'RED': filtered_AOI.select('B4')}).rename('MSAVI');
  return filtered_AOI.addBands(MSAVI);}
var includesMSAVI = filteredS2.map(addMSAVI);//Mapping the function over the collection
var MSAVIChart = ui.Chart.image.series({//Displays a time-series chart
  imageCollection: includesMSAVI.select('MSAVI'),
  region: AOI,
  reducer: ee.Reducer.mean(),
  scale: 20
}).setOptions({
      lineWidth: 1,
      colors: ['#006837'],
      title: 'S2, MSAVI Time Series',
      interpolateNulls: true,
      vAxis: {title: 'MSAVI'},
      hAxis: {title: 'Day in Month', format: 'dd/MM', gridlines: {count: 7}}
    });
print(MSAVIChart);
//Map.addLayer(ReCl.clip(AOI), viVis, 'ReCl'); //same visualization as ndvi
function DaysInMonth(y,m) {//Returns number of days in a month
  var day = ee.Date.fromYMD(y,m,1);
  var count = day.advance(1,"month").difference(day,'day');
  return count; //depending on year & month, it will get days (count)
}
var monthly = function(Image) {//convert mm/hr to mm/month for the GPM data
  var day = ee.Date(Image.get("system:time_end"));
  var year = day.get('year');
  var month = day.get('month');
  var DaysCount = DaysInMonth(year,month);
  return Image.multiply(DaysCount).multiply(24).copyProperties(Image, ["system:time_start", "system:time_end"]); //hours*days
};
print(GPM);//Print GPM to see the metadata of image collection
var Prec = GPM.filterDate('2021-01-01', '2022-01-20').select('precipitation');
var Monthly_Prec = Prec.map(monthly);
var Panel = ui.Panel();// Click and plot a chart on console function.
print(Panel);
Map.onClick(function(coords) {
  // Add a red point to the map wherever the user clicks.
  //Add a chart to put monthly precipitation chart
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'red'});
  Map.layers().set(8, dot);
  var chart = ui.Chart.image.series({imageCollection: Monthly_Prec.select(['precipitation']),region: point, reducer: ee.Reducer.mean(), scale: 30});
  chart.setOptions({
    title: 'Monthly Precipitation 2021',
    vAxis: {title: 'Precipitation (mm)', gridlines: {count: 10}},
    hAxis: {title: 'Month', format: 'MMM,yy', gridlines: {count: 10}},
    label: 'Precipitation', width: 250, height: 250,
    //interpolateNulls: true,
	});
 chart.setChartType('ColumnChart');
 //print(chart);
 Panel.clear();
 Panel.add(chart);
});
print('includesNDRE', includesNDRE);
print('includesMNDWI', includesMNDWI);
print('includesReCl', includesReCl);

/*................................LANDSAT 8 Functions................................*/
var filtered_L8 = L8.filterDate('2021-02-01', '2022-02-01')
                  .filter(ee.Filter.bounds(AOI.geometry()))
                  .filter(ee.Filter.lt('CLOUD_COVER',30));
print(filtered_L8.size());
Map.addLayer(filtered_L8);
var filteredL8 = filtered_L8.mosaic();//gives the best pixels
//NDVI Index
function addNdvi(filteredL8) {
  var NDVI = filteredL8.normalizedDifference(['B5', 'B4']).rename(['NDVI']);
  return filteredL8.addBands(NDVI);}
var includesNdvi = filtered_L8.map(addNdvi);//Mapping the function over the collection
//Select the 'ndvi' band
var NdviCol = includesNdvi.select('NDVI');
var joinedCollection = join.apply({primary: NdviCol, secondary: NdviCol, condition: diffFilter});
//Each image in the joined collection will contain matching images in the 'join_images' property
// Extract and return the mean of matched images
var SmoothedCollection = ee.ImageCollection(joinedCollection.map(function(L8) {
  var Collection = ee.ImageCollection.fromImages(L8.get('join_images'));
  return ee.Image(L8).addBands(Collection.mean().rename('moving_average'));
}));
var L8_chart = ui.Chart.image.series({// Display a time-series chart
  imageCollection: SmoothedCollection.select(['NDVI', 'moving_average']),
  region: AOI,
  reducer: ee.Reducer.mean(),
  scale: 80
}).setOptions({
      lineWidth: 1,
      title: 'L8, NDVI time series',
      interpolateNulls: true,
      vAxis: {title: 'NDVI'},
      hAxis: {title: 'Day in Month', format: 'dd/MM', gridlines: {count: 7}},
      series: {
        1: {color: 'gray', lineDashStyle: [1, 1]}, // Original NDVI
        0: {color: 'red', lineWidth: 2 }, // Smoothed NDVI
      },
    });
print(L8_chart);
//MNDWI helps find water bodies: 'GREEN'(B3) and 'SWIR1' (B6)
function addMndwi(filteredL8) {
  var Mndwi = filteredL8.normalizedDifference(['B3', 'B6']).rename(['MNDWI']);
  return filteredL8.addBands(Mndwi);}
var includesMndwi = filtered_L8.map(addMndwi);//Mapping the function over the collection
var MndwiChart = ui.Chart.image.series({//Displays a time-series chart
  imageCollection: includesMndwi.select('MNDWI'),
  region: AOI,
  reducer: ee.Reducer.mean(),
  scale: 20
}).setOptions({
      lineWidth: 1,
      colors: ['blue'],
      title: 'L8, MNDWI Time Series',
      interpolateNulls: true,
      vAxis: {title: 'MNDWI'},
      hAxis: {title: 'Day in Month', format: 'dd/MM', gridlines: {count: 7}}
    });
print(MndwiChart); 
//SAVI Index
function addSavi(filteredL8) {
  var Savi = filteredL8.expression('1.5 * ((NIR - RED) / (NIR + RED + 0.5))',
  {'NIR': filteredL8.select('B5').multiply(0.0001),'RED': filteredL8.select('B4').multiply(0.0001)}).rename('SAVI');
  return filteredL8.addBands(Savi);
}
var includesSavi = filtered_L8.map(addSavi);//Mapping the function over the collection
var SaviChart = ui.Chart.image.series({//Displays a time-series chart
  imageCollection: includesSavi.select('SAVI'),
  region: AOI,
  reducer: ee.Reducer.mean(),
  scale: 20
}).setOptions({
      lineWidth: 1,
      colors: ['brown'],
      title: 'L8, SAVI Time Series',
      interpolateNulls: true,
      vAxis: {title: 'SAVI'},
      hAxis: {title: 'Day in Month', format: 'dd/MM', gridlines: {count: 7}}
    });
print(SaviChart);
//NDMI Index
function addNdmi(filteredL8) {
  var Ndmi = filteredL8.normalizedDifference(['B5', 'B6']).rename(['NDMI']);//NIR(5) and SWIR1 (6)
  return filteredL8.addBands(Ndmi);}
var includesNdmi = filtered_L8.map(addNdmi);//Mapping the function over the collection
var NdmiChart = ui.Chart.image.series({//Displays a time-series chart
  imageCollection: includesNdmi.select('NDMI'),
  region: AOI,
  reducer: ee.Reducer.mean(),
  scale: 20
}).setOptions({
      lineWidth: 1,
      colors: ['#41b6c4'],
      title: 'L8, NDMI Time Series',
      interpolateNulls: true,
      vAxis: {title: 'NDMI'},
      hAxis: {title: 'Day in Month', format: 'dd/MM', gridlines: {count: 7}}
    });
print(NdmiChart);
//MSAVI Index
function addMsavi(filteredL8) {
  var Msavi = filteredL8.expression('(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - RED)) ) / 2', {'NIR': filteredL8.select('B5'),'RED': filteredL8.select('B4')}).rename('MSAVI');
  return filteredL8.addBands(Msavi);}
var includesMsavi = filtered_L8.map(addMsavi);//Mapping the function over the collection
var MsaviChart = ui.Chart.image.series({//Displays a time-series chart
  imageCollection: includesMsavi.select('MSAVI'),
  region: AOI,
  reducer: ee.Reducer.mean(),
  scale: 20
}).setOptions({
      lineWidth: 1,
      colors: ['brown'],
      title: 'L8, MSAVI Time Series',
      interpolateNulls: true,
      vAxis: {title: 'MSAVI'},
      hAxis: {title: 'Day in Month', format: 'dd/MM', gridlines: {count: 7}}
    });
print(MsaviChart);

/*................................Elevation data.....................................*/
print(SRTM); //Visualizes what is inside SRTM DE 4 dataset
var elevPalette = ['yellow', 'green', 'Brown']; //palette set for elevation visualization
var elevParams = {min: 400, max: 3000, palette: elevPalette};
Map.centerObject(AOI,8); //centering map around boundary (Study Area) at a zoom scale of 8
var SRTM_AOI = SRTM.clip(AOI);//Selecting the first band 'AVE_DSM' and clipping the DSM to AOI boundary
print(SRTM_AOI);
Map.addLayer(SRTM_AOI, elevParams, 'Clipped Elevation');

//...........TIP......................When centering to Nairobi...............................//
//Map.setCenter(36.82104686627987, -1.2926010579601648, 9);

/*........................................CALCULATING AREA BY AOI............................................
Calling .geometry() on a feature collection gives the dissolved geometry of all features in the collection
.area() function calculates the area in square meters*/
var countyArea = AOI.geometry().area();
var countyAreaSqKm = ee.Number(countyArea).divide(1e6).round();//Casting the result to a ee.Number() and calculating area in square kilometers
print('Area of county in square kilometres:',countyAreaSqKm);

/*........................................CALCULATING AREA BY CROP CLASSES...................................................................*/
/*
Requires: Classified AS IMPORT
Rquires: Boundary
Map.addLayer(Boundary, {color: 'black'}, 'Nyandarua Area')
Map.addLayer(classified, {min: 0, max: 3, palette: ['green', 'brown', 'blue', 'white']}, 'Classified Image 2022');
*/


/*CHALLENGES: 
-SUPERVISED CLASSIFICATION;
Which is delaying;
1. Classification of area by classes (LULC)
We'll need a classified image and an AOI boundary
Visualize the classification and the boundary image
2. Classification of area by crop type
3. Change detection
4. Training the classifier
-FIELDWORK
1. Seasonal composites for crop classification
2. Classifying change
*/

/*Exporting to drive; undone - to avoid multiple exports at this time
//...................... The commented lines of code below have an issue...................//
/*Existed after "var filtered_AOI = filteredS2.median();//gives the best pixels"
Map.addLayer(filtered.clip(AOI), rgbVis, 'Filtered Collection');
Map.addLayer(filtered.mean(), rgbVis, 'True color image'); */

//.............Datasets we hope to use, with their respective variable names...............//
/*var S1C = ee.ImageCollection("COPERNICUS/S1_GRD");//SAR data
var S2_TOA = ee.ImageCollection("COPERNICUS/S2");//Sentinel 2 MSI L1C
var CGLS = ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global"); //Copernicus Global Land Cover Layers
var LAI_FPAR = ee.ImageCollection("MODIS/006/MCD15A3H"); //MODIS - gives LAI and Fraction of Photosynthetically Active Radiation
var L8_OLI = ee.ImageCollection("LANDSAT/LO08/C01/T1_RT"); //Tier 1 Collection 1 Real Time
var L8_2_TOA = ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA");
var L8_1_TOA = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");*/

//............Attempting to use CGLS data......
//var LandCover = CGLS.filterDate('2021-01-10', '2022-01-15').filter(ee.Filter.bounds(AOI.geometry()));
//var LandVis = {min: 0.0,max: 100,palette: ['black', 'brown'],bands: ['discrete_classification'],};
//Map.addLayer(LandCover, LandVis, 'Land Cover Classification');