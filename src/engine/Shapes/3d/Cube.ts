import { ObjectData } from "../../index";

import Hexahedron, { HexahedronData } from "./Hexahedron";

type CubeData = {
  position: HexahedronData["position"];
  size: number;
  rotation: HexahedronData["rotation"];
  colors: HexahedronData["colors"];
};

export default function (data: CubeData, vertexSize: number): ObjectData[] {
  const { size } = data;

  return Hexahedron(
    {
      ...data,
      size: {
        x: size,
        y: size,
        z: size,
      },
    },
    vertexSize
  );
}

export { CubeData };
