"use client";

import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapWithNoSSR"), {
  ssr: false,
});

export default MapComponent;
