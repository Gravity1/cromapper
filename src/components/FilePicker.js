import { useFilePicker } from "use-file-picker";
import React from "react";

export default function App() {
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    //accept kml csv tiff
    accept: ".kml, .csv, .tiff",
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <button onClick={() => openFileSelector()}>Select files </button>
      <br />
      {filesContent.map((file, index) => (
        <div key={index}>
          <h2>{file.name}</h2>
          <div key={index}>{file.content}</div>
          <br />
        </div>
      ))}
    </div>
  );
}
