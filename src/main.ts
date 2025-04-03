import { Matrix4 } from "./maths";
import { ColorRGBA } from "./engine/type";

import Engine from "./engine";
import Shaders from "./engine/Shaders";
import Shapes from "./engine/Shapes";

import { App } from "./App";

import Rubik, { RubikColors } from "./Rubik";
import Cube, { RotationMove } from "./cube";

import { SCENE_OPTIONS, CAMERA_OPTIONS, COLORS } from "./options";
import Controls, { MoveControls } from "./Controls";

window.addEventListener("DOMContentLoaded", () => {
  const app = new App("app-container");
  app.render();

  const $testContainer: HTMLPreElement = app.$container.querySelector("#test")!;
  const $scene: HTMLCanvasElement = app.$container.querySelector("#scene")!;
  const $controls: HTMLElement = app.$container.querySelector("#controls")!;

  const engine = new Engine($scene, {
    width: SCENE_OPTIONS.width,
    height: SCENE_OPTIONS.height,
    backgroundColor: SCENE_OPTIONS.backgroundColor as ColorRGBA,
  });
  const controls = new Controls(
    $controls,
    {
      up: $controls.querySelector(".rotation-controls__button--up")!,
      left: $controls.querySelector(".rotation-controls__button--left")!,
      right: $controls.querySelector(".rotation-controls__button--right")!,
      down: $controls.querySelector(".rotation-controls__button--down")!,
      upLeft: $controls.querySelector(".rotation-controls__button--up-left")!,
      upRight: $controls.querySelector(".rotation-controls__button--up-right")!,
    },
    {
      direction: $controls.querySelector(".move-controls__direction")!,
      positions: Array(3)
        .fill(0)
        .map(
          (_, index) =>
            $controls.querySelector(
              `.move-controls__position-button[position-index="${index}"]`
            )!
        ) as MoveControls["positions"],
    },
    $controls.querySelector(".scramble-controls")!
  );
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
  let loop = 0;

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

      case "upLeft":
        cube.rotateFaces({ x: 0, y: 0, z: 1 });
        break;

      case "upRight":
        cube.rotateFaces({ x: 0, y: 0, z: -1 });
        break;

      default:
        break;
    }
  });

  controls.$container.addEventListener("move", (event: any) => {
    if (!event.detail) {
      return;
    }

    const { direction, positionIndex } = event.detail;
    let move: RotationMove = {
      x: 0,
      y: 0,
      z: 0,
    };
    let position = {
      x: 0,
      y: 0,
      z: 0,
    };

    // ! move.x to move columns
    // ! move.y to move rows
    switch (direction) {
      case "up":
        move.x = -1;
        position.y = positionIndex;
        break;

      case "left":
        move.y = 1;
        position.x = positionIndex;
        break;

      case "right":
        move.y = -1;
        position.x = positionIndex;
        break;

      case "down":
        move.x = 1;
        position.y = positionIndex;
        break;

      default:
        break;
    }

    cube.rotateCube(position, move);
  });

  controls.$container.addEventListener("scramble", () => {
    cube.scramble(100);
  });

  const animate: FrameRequestCallback = () => {
    if (loop > 0) {
      engine.clearCanvas();

      // avoid to re-compute at each iteration
      const rubik = Rubik(
        SCENE_OPTIONS.pixelSize,
        SCENE_OPTIONS.spacing,
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

      $testContainer.innerText = cube.faceMap.reduce(
        (_result, row) =>
          _result + row.map((value) => Number(value) || " ").join(" ") + "\n",
        ""
      );

      Shapes.render(
        engine,
        [
          //
          ...rubik,
        ],
        Shaders.vertexShader,
        Shaders.fragmentShader,
        matrix
      );
    }

    loop = requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
});
