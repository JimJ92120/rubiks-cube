import { ColorRGBA, Position, Rotation } from "./engine/type";

import Engine from "./engine";
import Shaders from "./engine/Shaders";

import Shapes from "./engine/Shapes";

const COLORS: { [key: string]: ColorRGBA } = {
  WHITE: [1, 1, 1, 1],
  GREEN: [0, 1, 0, 1],
  RED: [1, 0, 0, 1],
  ORANGE: [1, 0.5, 0, 1],
  YELLOW: [1, 1, 0, 1],
  BLUE: [0, 0.5, 1, 1],
};

export default function (
  engine: Engine,
  matrix: number[],
  pixelSize: number,
  position: Position,
  rotation: Rotation
) {
  engine.clearCanvas();

  const spacing = 10;
  const sideLength = 3 * pixelSize + 4 * spacing;

  const front = Array(9)
    .fill(0)
    .map((_, index) => {
      const mod = index % 3;
      const div = Math.floor(index / 3);

      const start = {
        z: 0,
        y: div * (pixelSize + spacing),
        x: sideLength - spacing - mod * (pixelSize + spacing) + spacing,
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
            color: COLORS.RED,
          },
        ],
        3
      );
    });
  const left = Array(9)
    .fill(0)
    .map((_, index) => {
      const mod = index % 3;
      const div = Math.floor(index / 3);

      const start = {
        x: 0,
        y: div * (pixelSize + spacing),
        z: sideLength - spacing - mod * (pixelSize + spacing),
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
            color: COLORS.ORANGE,
          },
        ],
        3
      );
    });
  const right = Array(9)
    .fill(0)
    .map((_, index) => {
      const mod = index % 3;
      const div = Math.floor(index / 3);

      const start = {
        x: sideLength + spacing,
        y: div * (pixelSize + spacing),
        z: sideLength - spacing - mod * (pixelSize + spacing),
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
            color: COLORS.GREEN,
          },
        ],
        3
      );
    });

  const up = Array(9)
    .fill(0)
    .map((_, index) => {
      const mod = index % 3;
      const div = Math.floor(index / 3);

      const start = {
        z: sideLength - spacing - mod * (pixelSize + spacing),
        y: -spacing,
        x: div * (pixelSize + spacing) + spacing,
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
            color: COLORS.WHITE,
          },
        ],
        3
      );
    });
  const down = Array(9)
    .fill(0)
    .map((_, index) => {
      const mod = index % 3;
      const div = Math.floor(index / 3);

      const start = {
        x: div * (pixelSize + spacing) + spacing,
        y: sideLength - spacing,
        z: sideLength - spacing - mod * (pixelSize + spacing),
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
            color: COLORS.YELLOW,
          },
        ],
        3
      );
    });

  const back = Array(9)
    .fill(0)
    .map((_, index) => {
      const mod = index % 3;
      const div = Math.floor(index / 3);

      const start = {
        z: sideLength,
        y: div * (pixelSize + spacing),
        x: sideLength - spacing - mod * (pixelSize + spacing) + spacing,
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
            color: COLORS.BLUE,
          },
        ],
        3
      );
    });

  [
    //
    up,
    left,
    front,
    right,
    down,
    back,
  ].map((object) => {
    Shapes.render(
      engine,
      object,
      Shaders.vertexShader,
      Shaders.fragmentShader,
      matrix
    );
  });
}
