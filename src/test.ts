import Engine from "./engine";
import Shaders from "./engine/Shaders";

import Shapes, { HexahedronData, CubeData } from "./engine/Shapes";

const COLORS: { [key: string]: [number, number, number, number] } = {
  WHITE: [1, 1, 1, 1],
  GREEN: [0, 1, 0, 1],
  RED: [1, 0, 0, 1],
  ORANGE: [1, 0.5, 0, 1],
  YELLOW: [1, 1, 0, 1],
  BLUE: [0, 0.5, 1, 1],
};

export default function (engine: Engine, matrix: number[], pixelSize: number) {
  // test
  let rotation = { x: 0, y: 0, z: 0 };

  setInterval(() => {
    //
    const hexahedron = Shapes["3d"].Hexahedron(
      {
        position: [100, -200, 0],
        size: { x: 100, y: 50, z: 200 },
        rotation: { x: 0, y: 0, z: 0 },
        colors: Object.values(COLORS) as HexahedronData["colors"],
      },
      3
    );
    const cube = Shapes["3d"].Cube(
      {
        position: [0, 0, 0],
        size: pixelSize,
        rotation,
        colors: Object.values(COLORS) as CubeData["colors"],
      },
      3
    );
    const quadrilateral = Shapes["2d"].Quadrilateral(
      [
        {
          position: [100, 100, 0],
          rotation: { x: 0, y: 0, z: 0 },
          color: COLORS.BLUE,
        },
      ],
      3
    );
    const triangle = Shapes["2d"].Triangle(
      [
        {
          position: [100, 0, 0],
          verticesPositions: [
            [0, 0, 100],
            [100, 0, 100],
            [0, 0, 0],
          ],
          rotation: { x: 0, y: 0, z: 0 },
          color: COLORS.ORANGE,
        },
      ],
      3
    );

    [hexahedron, cube, quadrilateral, triangle].map((object) => {
      Shapes.render(
        engine,
        object,
        Shaders.vertexShader,
        Shaders.fragmentShader,
        matrix
      );
    });

    rotation.x++;
    rotation.y++;
    rotation.z++;
  }, 100);
}
