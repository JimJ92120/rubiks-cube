import { ColorRGBA } from "../../type";
import { ObjectData } from "../../index";

import Quadrilateral, { QuadrilateralData } from "../2d/Quadrilateral";

type HexahedronColors = [
  ColorRGBA,
  ColorRGBA,
  ColorRGBA,
  ColorRGBA,
  ColorRGBA,
  ColorRGBA
];
type HexahedronData = {
  position: QuadrilateralData["position"];
  size: { x: number; y: number; z: number };
  rotation: QuadrilateralData["rotation"];
  colors: HexahedronColors;
};

export default function (
  data: HexahedronData,
  vertexSize: number
): ObjectData[] {
  const { position, colors, rotation, size } = data;
  const verticesPositions = [
    [0, 0, 0],
    [0, size.y, 0],
    [size.x, size.y, 0],
    [size.x, 0, 0],
    //
    [0, 0, size.z],
    [0, size.y, size.z],
    [size.x, size.y, size.z],
    [size.x, 0, size.z],
  ];
  const squares: QuadrilateralData[] = [
    {
      // up - white
      position: [position[0], position[1], position[2]],
      verticesPositions: [
        verticesPositions[0],
        verticesPositions[3],
        verticesPositions[7],
        verticesPositions[4],
      ] as QuadrilateralData["verticesPositions"],
      rotation,
      color: colors[0],
    },
    {
      // left - green
      position: [position[0], position[1], position[2]],
      verticesPositions: [
        verticesPositions[0],
        verticesPositions[1],
        verticesPositions[5],
        verticesPositions[4],
      ] as QuadrilateralData["verticesPositions"],
      rotation,
      color: colors[1],
    },
    {
      // front - red
      position: [position[0], position[1], position[2]],
      verticesPositions: verticesPositions.slice(
        0,
        4
      ) as QuadrilateralData["verticesPositions"],
      rotation,
      color: colors[2],
    },
    {
      // right - orange
      position: [position[0], position[1], position[2]],
      verticesPositions: [
        verticesPositions[3],
        verticesPositions[2],
        verticesPositions[6],
        verticesPositions[7],
      ] as QuadrilateralData["verticesPositions"],
      rotation: {
        x: rotation.x,
        y: rotation.y,
        z: rotation.z,
      },
      color: colors[3],
    },
    {
      // down - yellow
      position: [position[0], position[1], position[2]],
      verticesPositions: [
        verticesPositions[1],
        verticesPositions[2],
        verticesPositions[6],
        verticesPositions[5],
      ] as QuadrilateralData["verticesPositions"],
      rotation,
      color: colors[4],
    },
    {
      // back - blue
      position: [position[0], position[1], position[2]],
      verticesPositions: verticesPositions.slice(
        4,
        8
      ) as QuadrilateralData["verticesPositions"],
      rotation,
      color: colors[5],
    },
  ];

  return squares.map((quadrilateralData) =>
    Quadrilateral([quadrilateralData], vertexSize)
  );
}

export { HexahedronData };
