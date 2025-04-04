import Matrix4 from "./Matrix4";
import Matrix3 from "./Matrix3";

function radToDeg(r: number) {
  return (r * 180) / Math.PI;
}

function degToRad(d: number) {
  return (d * Math.PI) / 180;
}

export { radToDeg, degToRad, Matrix4, Matrix3 };
