import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl";

import type { ControlPosition, MapInstance } from "react-map-gl";
import type { Feature } from "~/views/home-view/home-view";

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position: ControlPosition;

  onCreate: (evt: { features: Feature[] }) => void;
  onUpdate: (evt: { features: Feature[] }) => void;
  onDelete: (evt: { features: Feature[] }) => void;
};

export const DrawControl = (props: DrawControlProps) => {
  const { position, onCreate, onUpdate, onDelete } = props;

  // @ts-expect-error type
  useControl<MapboxDraw>(
    () => new MapboxDraw(props),
    ({ map }: { map: MapInstance }) => {
      map.on("draw.create", onCreate);
      map.on("draw.update", onUpdate);
      map.on("draw.delete", onDelete);
    },
    ({ map }: { map: MapInstance }) => {
      map.off("draw.create", onCreate);
      map.off("draw.update", onUpdate);
      map.off("draw.delete", onDelete);
    },
    {
      position: position,
    }
  );

  return null;
};
