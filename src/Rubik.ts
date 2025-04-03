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
      const offset = {
        x: -pixelSize + spacing,
        y: -spacing,
        z: 0,
      };
      const start = {
        x: offset.x + column * (pixelSize + spacing) - spacing,
        y: offset.y,
        z: offset.z + sideLength - (row * (pixelSize + spacing) + spacing),
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
            color: 0 === row && 0 === column ? [0, 0, 0, 1] : colors[0][index],
          },
        ],
        3
      );
    },
    // left
    (index: number, row: number, column: number) => {
      const offset = {
        x: -pixelSize - spacing,
        y: spacing,
        z: 0,
      };
      const start = {
        x: offset.x,
        y: offset.y + row * (pixelSize + spacing) - spacing,
        z: offset.z + sideLength - (column * (pixelSize + spacing) + spacing),
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
            color: 0 === row && 0 === column ? [0, 0, 0, 1] : colors[1][index],
          },
        ],
        3
      );
    },
    // front
    (index: number, row: number, column: number) => {
      const start = {
        x: column * (pixelSize + spacing),
        y: row * (pixelSize + spacing),
        z: 0,
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
            color: 0 === row && 0 === column ? [0, 0, 0, 1] : colors[2][index],
          },
        ],
        3
      );
    },
    // right
    (index: number, row: number, column: number) => {
      const offset = {
        x: -pixelSize - spacing,
        y: spacing,
        z: pixelSize + spacing,
      };
      const start = {
        x: offset.x + sideLength,
        y: offset.y + row * (pixelSize + spacing) - spacing,
        z:
          offset.z +
          sideLength -
          ((3 - column) * (pixelSize + spacing) + spacing),
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
            color: 0 === row && 0 === column ? [0, 0, 0, 1] : colors[3][index],
          },
        ],
        3
      );
    },
    // down
    (index: number, row: number, column: number) => {
      const offset = {
        x: -pixelSize + spacing,
        y: 0,
        z: pixelSize + spacing,
      };
      const start = {
        x: offset.x + column * (pixelSize + spacing) - spacing,
        y: offset.y + sideLength - spacing,
        z:
          offset.z + sideLength - ((3 - row) * (pixelSize + spacing) + spacing),
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
            color: 0 === row && 0 === column ? [0, 0, 0, 1] : colors[4][index],
          },
        ],
        3
      );
    },
    // back
    (index: number, row: number, column: number) => {
      const offset = {
        x: 0,
        y: -pixelSize,
        z: 0,
      };
      const start = {
        x: offset.x + column * (pixelSize + spacing) - spacing,
        y: offset.y + (3 - row) * (pixelSize + spacing) - spacing,
        z: offset.z + sideLength,
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
            color: 0 === row && 0 === column ? [0, 0, 0, 1] : colors[5][index],
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
