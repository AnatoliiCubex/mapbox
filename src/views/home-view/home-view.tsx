import React, { useRef, useState } from "react";

import { Typography } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import InteractiveMap, { Marker } from "react-map-gl";

import { DrawControl } from "~/views/home-view/components/draw-control";

import type { MapRef } from "react-map-gl";

export type Feature = {
  id: string;
  geometry: { coordinates: number[]; type: string };
};

export const HomeView = () => {
  const mapRef = useRef<MapRef | null>(null);

  const [features, setFeatures] = useState<Record<string, Feature>>({});
  const [markers, setMarkers] = useState<
    {
      id: string;
      longitude: number;
      latitude: number;
    }[]
  >([]);

  const handleCreate = (e: { features: Feature[] }) => {
    const newMarkers: typeof markers = [];
    const newFeatures: typeof features = {};

    for (const f of e.features) {
      newFeatures[f.id] = f;

      if (f.geometry.type === "Point")
        newMarkers.push({
          id: f.id,
          longitude: f.geometry.coordinates[0],
          latitude: f.geometry.coordinates[1],
        });
    }

    setFeatures(newFeatures);

    if (newMarkers.length > 0) {
      setMarkers((prev) => {
        const copy: typeof prev = structuredClone(prev);

        newMarkers.forEach((marker) => copy.push(marker));

        return copy;
      });
    }
  };

  const handleUpdate = (e: { features: Feature[] }) => {
    const newMarkers: typeof markers = [];
    const newFeatures: typeof features = {};

    for (const f of e.features) {
      newFeatures[f.id] = f;

      if (f.geometry.type === "Point")
        newMarkers.push({
          id: f.id,
          longitude: f.geometry.coordinates[0],
          latitude: f.geometry.coordinates[1],
        });
    }

    setFeatures((prev) => {
      const copy: typeof prev = structuredClone(prev);

      Object.keys(newFeatures).forEach((key) => (copy[key] = newFeatures[key]));
      return copy;
    });

    console.log(123);

    if (newMarkers.length > 0) {
      setMarkers((prev) => {
        const copy: typeof prev = structuredClone(prev);

        newMarkers.forEach((marker) => {
          const index = copy.findIndex((mark) => mark.id === marker.id);
          copy[index] = marker;
        });

        return copy;
      });
    }
  };

  const handleDelete = (e: { features: Feature[] }) => {
    const newMarkers: typeof markers = [];
    const newFeatures: typeof features = {};

    for (const f of e.features) {
      delete newFeatures[f.id];

      if (f.geometry.type === "Point")
        newMarkers.push({
          id: f.id,
          longitude: f.geometry.coordinates[0],
          latitude: f.geometry.coordinates[1],
        });
    }

    setFeatures(newFeatures);

    if (newMarkers.length > 0) {
      setMarkers((prev) => {
        let copy: typeof prev = structuredClone(prev);

        newMarkers.forEach(
          (marker) => (copy = copy.filter((m) => m.id !== marker.id))
        );

        return copy;
      });
    }
  };

  return (
    <InteractiveMap
      initialViewState={{
        longitude: -91.874,
        latitude: 42.76,
        zoom: 12,
      }}
      ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      // onClick={handleClick}
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* {markers.map((m, i) => (
        <Marker {...m} key={m.id}>
          <Typography variant='h4' fontSize={16} mb={6}>
            Pin №{i + 1}
          </Typography>
        </Marker>
      ))} */}

      <DrawControl
        position='top-right'
        displayControlsDefault={false}
        controls={{
          point: true,
          line_string: true,
          polygon: true,
          trash: true,
        }}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </InteractiveMap>
  );
};
