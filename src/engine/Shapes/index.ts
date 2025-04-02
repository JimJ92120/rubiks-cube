import { Matrix4, degToRad } from "../../maths";
import { Position, Rotation } from "../type";
import Engine, { ObjectData } from "../index";

import Triangle, { TriangleData } from "./2d/Triangle";
import Quadrilateral, { QuadrilateralData } from "./2d/Quadrilateral";

import Cube, { CubeData } from "./3d/Cube";
import Hexahedron, { HexahedronData } from "./3d/Hexahedron";

function getTranslatedMatrix(
  matrix: number[],
  position: Position,
  rotation: Rotation
) {
  matrix = Matrix4.translate(matrix, position[0], position[1], position[2]);
  matrix = Matrix4.xRotate(matrix, degToRad(rotation.y));
  matrix = Matrix4.yRotate(matrix, degToRad(rotation.x));
  matrix = Matrix4.zRotate(matrix, degToRad(rotation.z));

  return matrix;
}

export default {
  "2d": {
    Triangle,
    Quadrilateral,
  },
  "3d": {
    Hexahedron,
    Cube,
  },
  render(
    engine: Engine,
    objectData: ObjectData | ObjectData[],
    vertexShaderSource: string,
    fragmentShaderSource: string,
    viewProjectionMatrix: number[]
  ): void {
    const renderCallback = (objectData: ObjectData) => {
      engine.renderTriangles(
        objectData,
        vertexShaderSource,
        fragmentShaderSource,
        getTranslatedMatrix(
          viewProjectionMatrix,
          objectData.position,
          objectData.rotation
        )
      );
    };

    if (Array.isArray(objectData)) {
      objectData.map(renderCallback);
    } else {
      renderCallback(objectData);
    }
  },
};

export { TriangleData, QuadrilateralData, HexahedronData, CubeData };
