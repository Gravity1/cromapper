import React, { useEffect } from "react";
import DrawControl from "react-mapbox-gl-draw";
import { useParams } from "react-router-dom";
import BottomComponent from "../components/BottomComponent";
import MapComponent from "../components/MapComponent";
import Navbar from "../components/NavBar";
import RightSideBar from "../components/RightSideBar";
import { useDispatch, useSelector } from "react-redux";
import { getField } from "../actions/fieldActions";
import { Feature, GeoJSONLayer, Layer } from "react-mapbox-gl";

const FieldDateScreen = () => {
  const params = useParams();
  const onDrawCreate = ({ features }) => {};

  const onDrawUpdate = ({ features }) => {
    console.log("features");
  };

  console.log(params);

  const fieldGet = useSelector((state) => state.fieldGet);
  const { field } = fieldGet;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getField(params.id));
  }, [dispatch, params]);

  return (
    <>
      <Navbar />
      <MapComponent>
        <RightSideBar
          style={{
            top: 1,
          }}
        />
        <DrawControl
          position="top-right"
          onDrawCreate={onDrawCreate}
          onDrawUpdate={onDrawUpdate}
          controls={{
            point: false,
            line_string: true,
            polygon: false,
            trash: true,
            combine_features: false,
            uncombine_features: false,
          }}
        />

        <Layer type="image">
          {field && <Feature coordinates={[field.area[0].geometry.coordinates]} />}
        </Layer>
        <BottomComponent />
      </MapComponent>
      ;
    </>
  );
};

export default FieldDateScreen;
