import React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import HEX_DATA from "./countries_hex_data.json";
import Globe from "react-globe.gl";

const HomeGlobe = () => {
  const globeEl = useRef();
  const [hex, setHex] = useState({ features: [] });
  const [rotation, setRotation] = useState(true);

  useEffect(() => {
    setHex(HEX_DATA);
  }, []);

  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 2;

    // globeEl.current.pointOfView({ altitude: 1 }, 5000);

    // globeEl.current.controls().update();
  }, [rotation]);

  const N = 20;
  const arcsData = [...Array(N).keys()].map(() => ({
    startLat: (Math.random() - 0.5) * 180,
    startLng: (Math.random() - 0.5) * 360,
    endLat: (Math.random() - 0.5) * 180,
    endLng: (Math.random() - 0.5) * 360,
    color: [
      ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
      ["red", "white", "blue", "green"][Math.round(Math.random() * 3)],
    ],
  }));

  return (
    <div>
      <Globe
        ref={globeEl}
        backgroundColor="rgba(255, 255, 255, 0)"
        hexPolygonsData={hex.features}
        hexPolygonResolution={3} //values higher than 3 makes it buggy
        hexPolygonMargin={0.62}
        hexPolygonColor={useCallback(() => "#1b66b1", [])}
        arcsData={arcsData}
        arcColor={"color"}
        arcDashLength={() => Math.random()}
        arcDashGap={() => Math.random()}
        arcDashAnimateTime={() => Math.random() * 4000 + 500}
      />
    </div>
  );
};

export default HomeGlobe;
