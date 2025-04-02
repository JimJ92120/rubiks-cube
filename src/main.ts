import { Matrix4, degToRad } from "./maths";
import { ColorRGBA, Position, Rotation } from "./engine/type";

import Engine from "./engine";

import { App } from "./App";

// import test from "./test";
import Rubik from "./rubik";

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
  fieldOfView: degToRad(120),
  angle: degToRad(0),
};

window.addEventListener("DOMContentLoaded", () => {
  const app = new App("app-container");
  app.render();

  const $scene: HTMLCanvasElement = app.$container.querySelector("#scene")!;
  const engine = new Engine($scene, {
    width: SCENE_OPTIONS.width,
    height: SCENE_OPTIONS.height,
    backgroundColor: SCENE_OPTIONS.backgroundColor as ColorRGBA,
  });

  const projectionMatrix: number[] = Matrix4.perspective(
    CAMERA_OPTIONS.fieldOfView,
    CAMERA_OPTIONS.aspect,
    CAMERA_OPTIONS.zNear,
    CAMERA_OPTIONS.zFar
  );
  const viewMatrix = Matrix4.inverse(
    Matrix4.translate(
      Matrix4.yRotation(CAMERA_OPTIONS.angle),
      SCENE_OPTIONS.pixelSize / 2,
      -SCENE_OPTIONS.pixelSize / 2,
      CAMERA_OPTIONS.radius * 1.5
    )
  );
  const matrix = Matrix4.multiply(projectionMatrix, viewMatrix);

  // test engine/shapes
  // test(engine, matrix, SCENE_OPTIONS.pixelSize);

  //
  const position: Position = [0, 0, 0];
  let rotation: Rotation = { x: 10, y: 0, z: 0 };

  //
  const interval = 100;
  const startTime = Date.now();
  let loop = 0;
  let timestamp = startTime;

  const animate: FrameRequestCallback = () => {
    const currentTime = Date.now();

    if (
      loop > 0 &&
      currentTime > timestamp + interval &&
      currentTime < timestamp + interval * 2
    ) {
      timestamp = currentTime;

      rotation.x++;
      rotation.y--;
      rotation.z++;

      Rubik(engine, matrix, SCENE_OPTIONS.pixelSize, position, rotation);
    }

    loop = requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
});
