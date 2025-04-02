import { ColorRGBA, Position, Rotation } from "./engine/type";

import { ObjectData } from "./engine";
import Shapes from "./engine/Shapes";

type RubikColors = [
  ColorRGBA,
  ColorRGBA,
  ColorRGBA,
  ColorRGBA,
  ColorRGBA,
  ColorRGBA
];

export default function (
  pixelSize: number,
  position: Position,
  rotation: Rotation,
  colors: RubikColors
): ObjectData[] {
  const spacing = 10;
  const sideLength = 3 * pixelSize + 4 * spacing;
  const facesCallback: ((row: number, column: number) => ObjectData)[] = [
    // up
    (row: number, column: number) => {
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
            color: colors[0],
          },
        ],
        3
      );
    },
    // left
    (row: number, column: number) => {
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
            color: colors[1],
          },
        ],
        3
      );
    },
    // front
    (row: number, column: number) => {
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
            color: colors[2],
          },
        ],
        3
      );
    },
    // right
    (row: number, column: number) => {
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
            color: colors[3],
          },
        ],
        3
      );
    },
    // down
    (row: number, column: number) => {
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
            color: colors[4],
          },
        ],
        3
      );
    },
    // back
    (row: number, column: number) => {
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
            color: colors[5],
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
        .map((_, index) => callback(index % 3, Math.floor(index / 3))),
    ],
    [] as ObjectData[]
  );
}

export { RubikColors };
