import { Matrix4 } from "./maths";
import { ColorRGBA } from "./engine/type";

import Engine from "./engine";
import Shaders from "./engine/Shaders";
import Shapes from "./engine/Shapes";

import { App } from "./App";

import Rubik, { RubikColors } from "./Rubik";
import Cube from "./cube";

import { SCENE_OPTIONS, CAMERA_OPTIONS, COLORS } from "./options";
import Controls from "./Controls";

window.addEventListener("DOMContentLoaded", () => {
  const app = new App("app-container");
  app.render();

  const $scene: HTMLCanvasElement = app.$container.querySelector("#scene")!;
  const $controls: HTMLElement = app.$container.querySelector(".controls")!;

  const engine = new Engine($scene, {
    width: SCENE_OPTIONS.width,
    height: SCENE_OPTIONS.height,
    backgroundColor: SCENE_OPTIONS.backgroundColor as ColorRGBA,
  });
  const controls = new Controls($controls, {
    up: $controls.querySelector(".controls__button--up")!,
    left: $controls.querySelector(".controls__button--left")!,
    right: $controls.querySelector(".controls__button--right")!,
    down: $controls.querySelector(".controls__button--down")!,
  });
  let cube = new Cube();

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

  //
  const interval = 100;
  const startTime = Date.now();
  let loop = 0;
  let timestamp = startTime;

  controls.$container.addEventListener("rotate", (event: any) => {
    switch (event.detail || "") {
      case "up":
        cube.rotateFaces({ x: 0, y: 1, z: 0 });
        break;

      case "left":
        cube.rotateFaces({ x: -1, y: 0, z: 0 });
        break;

      case "right":
        cube.rotateFaces({ x: 1, y: 0, z: 0 });
        break;

      case "down":
        cube.rotateFaces({ x: 0, y: -1, z: 0 });
        break;

      default:
        //
        break;
    }
  });

  const animate: FrameRequestCallback = () => {
    const currentTime = Date.now();

    if (
      loop > 0 &&
      currentTime > timestamp + interval &&
      currentTime < timestamp + interval * 2
    ) {
      timestamp = currentTime;

      engine.clearCanvas();

      // avoid to re-compute at each iteration
      const rubik = Rubik(
        SCENE_OPTIONS.pixelSize,
        cube.position,
        cube.rotation,
        cube.cubeData.map((face) => {
          return face.reduce((_result, row) => {
            return [
              ..._result,
              ...row.map(
                (cellValue) => Object.values(COLORS)[Number(cellValue) - 1]
              ),
            ];
          }, [] as ColorRGBA[]);
        }) as RubikColors
      );

      Shapes.render(
        engine,
        rubik,
        Shaders.vertexShader,
        Shaders.fragmentShader,
        matrix
      );
    }

    loop = requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
});
