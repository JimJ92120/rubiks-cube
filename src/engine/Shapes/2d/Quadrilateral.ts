import { Position } from "../../type";
import { ObjectData } from "../../index";

import Triangle, { TriangleData } from "./Triangle";

type QuadrilateralData = {
  position: TriangleData["position"];
  verticesPositions?: [Position, Position, Position, Position];
  rotation: TriangleData["rotation"];
  color: TriangleData["color"];
};

export default function (
  data: QuadrilateralData[],
  vertexSize: number
): ObjectData {
  // square
  const verticesPositions = [
    [0, 0, 0],
    [0, 100, 0],
    [100, 100, 0],
    [100, 0, 0],
  ];

  const triangles = data.reduce(
    (_result, squareData) => [
      ..._result,
      ...([
        {
          // top left
          ...squareData,
          verticesPositions: (
            squareData.verticesPositions || verticesPositions
          ).slice(0, 3) as TriangleData["verticesPositions"],
        },
        {
          // bottom right
          ...squareData,
          verticesPositions: [
            (squareData.verticesPositions || verticesPositions)[0],
            ...(squareData.verticesPositions || verticesPositions).slice(2, 4),
          ] as TriangleData["verticesPositions"],
        },
      ] as TriangleData[]),
    ],
    [] as TriangleData[]
  );

  return Triangle(triangles, vertexSize);
}

export { QuadrilateralData };
