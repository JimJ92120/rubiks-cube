import { ColorRGBA, Position, Rotation } from "./engine/type";

import { ObjectData } from "./engine";
import Shapes from "./engine/Shapes";

type FaceColors = [
  ColorRGBA,
  ColorRGBA,
  ColorRGBA,
  //
  ColorRGBA,
  ColorRGBA,
  ColorRGBA,
  //
  ColorRGBA,
  ColorRGBA,
  ColorRGBA
];
type RubikColors = [
  FaceColors,
  FaceColors,
  FaceColors,
  //
  FaceColors,
  FaceColors,
  FaceColors
];

export default function (
  pixelSize: number,
  spacing: number,
  position: Position,
  rotation: Rotation,
  colors: RubikColors
): ObjectData[] {
  const sideLength = 3 * pixelSize + 4 * spacing;
  const facesCallback: ((
    index: number,
    row: number,
    column: number
  ) => ObjectData)[] = [
    // up
    (index: number, row: number, column: number) => {
      const start = {
        z: sideLength - spacing - row * (pixelSize + spacing),
        y: -spacing,
        x: column * (pixelSize + spacing) + spacing,
      };

      return Shapes["2d"].Quadrilateral(
        [
          {
            position,
            verticesPositions: [
              // top left
              [start.x, start.y, start.z],
              // top right
              [start.x, start.y, start.z - pixelSize],
              // bottom right
              [start.x + pixelSize, start.y, start.z - pixelSize],
              // bottom left
              [start.x + pixelSize, start.y, start.z],
            ],
            rotation,
            color: colors[0][index],
          },
        ],
        3
      );
    },
    // left
    (index: number, row: number, column: number) => {
      const start = {
        x: 0,
        y: column * (pixelSize + spacing),
        z: sideLength - spacing - row * (pixelSize + spacing),
      };

      return Shapes["2d"].Quadrilateral(
        [
          {
            position,
            verticesPositions: [
              // top left
              [start.x, start.y, start.z],
              // top right
              [start.x, start.y, start.z - pixelSize],
              // bottom right
              [start.x, start.y + pixelSize, start.z - pixelSize],
              // bottom left
              [start.x, start.y + pixelSize, start.z],
            ],
            rotation,
            color: colors[1][index],
          },
        ],
        3
      );
    },
    // front
    (index: number, row: number, column: number) => {
      const start = {
        z: 0,
        y: column * (pixelSize + spacing),
        x: sideLength - spacing - row * (pixelSize + spacing) + spacing,
      };

      return Shapes["2d"].Quadrilateral(
        [
          {
            position,
            verticesPositions: [
              // top left
              [start.x, start.y, start.z],
              // top right
              [start.x - pixelSize, start.y, start.z],
              // bottom right
              [start.x - pixelSize, start.y + pixelSize, start.z],
              // bottom left
              [start.x, start.y + pixelSize, start.z],
            ],
            rotation,
            color: colors[2][index],
          },
        ],
        3
      );
    },
    // right
    (index: number, row: number, column: number) => {
      const start = {
        x: sideLength + spacing,
        y: column * (pixelSize + spacing),
        z: sideLength - spacing - row * (pixelSize + spacing),
      };

      return Shapes["2d"].Quadrilateral(
        [
          {
            position,
            verticesPositions: [
              // top left
              [start.x, start.y, start.z],
              // top right
              [start.x, start.y, start.z - pixelSize],
              // bottom right
              [start.x, start.y + pixelSize, start.z - pixelSize],
              // bottom left
              [start.x, start.y + pixelSize, start.z],
            ],
            rotation,
            color: colors[3][index],
          },
        ],
        3
      );
    },
    // down
    (index: number, row: number, column: number) => {
      const start = {
        x: column * (pixelSize + spacing) + spacing,
        y: sideLength - spacing,
        z: sideLength - spacing - row * (pixelSize + spacing),
      };

      return Shapes["2d"].Quadrilateral(
        [
          {
            position,
            verticesPositions: [
              // top left
              [start.x, start.y, start.z],
              // top right
              [start.x, start.y, start.z - pixelSize],
              // bottom right
              [start.x + pixelSize, start.y, start.z - pixelSize],
              // bottom left
              [start.x + pixelSize, start.y, start.z],
            ],
            rotation,
            color: colors[4][index],
          },
        ],
        3
      );
    },
    // back
    (index: number, row: number, column: number) => {
      const start = {
        z: sideLength,
        y: column * (pixelSize + spacing),
        x: sideLength - spacing - row * (pixelSize + spacing) + spacing,
      };

      return Shapes["2d"].Quadrilateral(
        [
          {
            position,
            verticesPositions: [
              // top left
              [start.x, start.y, start.z],
              // top right
              [start.x - pixelSize, start.y, start.z],
              // bottom right
              [start.x - pixelSize, start.y + pixelSize, start.z],
              // bottom left
              [start.x, start.y + pixelSize, start.z],
            ],
            rotation,
            color: colors[5][index],
          },
        ],
        3
      );
    },
  ];

  return facesCallback.reduce(
    (_result, callback) => [
      ..._result,
      ...Array(9)
        .fill(0)
        .map((_, index) => callback(index, index % 3, Math.floor(index / 3))),
    ],
    [] as ObjectData[]
  );
}

export { FaceColors, RubikColors };
