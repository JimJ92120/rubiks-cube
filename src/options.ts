import { degToRad } from "./maths";
import { ColorRGBA } from "./engine/type";

const SCENE_OPTIONS = {
  width: 800,
  height: 600,
  pixelSize: 100,
  backgroundColor: [0.5, 0.5, 0.5, 1],
};
const CAMERA_OPTIONS = {
  radius: 400,
  aspect: SCENE_OPTIONS.width / SCENE_OPTIONS.height,
  zNear: 1,
  zFar: 2000,
  fieldOfView: degToRad(90),
  angle: degToRad(-22.5),
};
const COLORS: { [key: string]: ColorRGBA } = {
  WHITE: [1, 1, 1, 1],
  GREEN: [0, 1, 0, 1],
  RED: [1, 0, 0, 1],
  ORANGE: [1, 0.5, 0, 1],
  YELLOW: [1, 1, 0, 1],
  BLUE: [0, 0.5, 1, 1],
};

export { SCENE_OPTIONS, CAMERA_OPTIONS, COLORS };
