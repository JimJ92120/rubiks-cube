import { ColorRGBA, Position, Rotation } from "../../type";
import { ObjectData } from "../../index";
import { Matrix4, degToRad } from "../../../maths";

type TriangleData = {
  position: Position;
  verticesPositions: [Position, Position, Position];
  rotation: Rotation;
  color: ColorRGBA;
};

function translate(data: number[]): number[] {
  const matrix = Matrix4.translate(Matrix4.xRotation(Math.PI), -50, -75, -15);

  for (var ii = 0; ii < data.length; ii += 3) {
    var vector = Matrix4.transformVector(matrix, [
      data[ii + 0],
      data[ii + 1],
      data[ii + 2],
      1,
    ]);
    data[ii + 0] = vector[0];
    data[ii + 1] = vector[1];
    data[ii + 2] = vector[2];
  }

  return data;
}

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

export default function (data: TriangleData[], vertexSize: number): ObjectData {
  const [triangles, colors]: [number[], number[]] = data.reduce(
    (_result, triangleData) =>
      [
        [
          ..._result[0],
          ...triangleData.verticesPositions[0],
          ...triangleData.verticesPositions[1],
          ...triangleData.verticesPositions[2],
        ],
        [
          ..._result[1],
          ...triangleData.color,
          ...triangleData.color,
          ...triangleData.color,
        ],
      ] as [number[], number[]],
    [[], []] as [number[], number[]]
  );

  // engine.renderTriangles(
  //   {
  //     a_color: {
  //       vertices: colors,
  //       vertexSize: 4,
  //     },
  //     a_position: {
  //       vertices: translate(triangles),
  //       vertexSize,
  //     },
  //   },
  //   triangles.length * vertexSize,
  //   vertexShaderSource,
  //   fragmentShaderSource,
  //   getTranslatedMatrix(
  //     viewProjectionMatrix,
  //     data[0].position,
  //     data[0].rotation
  //   )
  // );
  return {
    attributesData: {
      a_color: {
        vertices: colors,
        vertexSize: 4,
      },
      a_position: {
        vertices: translate(triangles),
        vertexSize,
      },
    },
    verticesCount: triangles.length * vertexSize,
    position: data[0].position,
    rotation: data[0].rotation,
  };
}

export { TriangleData };
