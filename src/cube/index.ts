enum Face {
  None,
  Up,
  Left,
  Front,
  Right,
  Down,
  Back,
}
enum FaceColor {
  None,
  White, // up
  Orange, // left
  Green, // front
  Red, // right
  Yellow, // down
  Blue, // back
}

type CellPosition = {
  x: number;
  y: number;
  z: number;
};

type FaceData = [
  [FaceColor, FaceColor, FaceColor],
  [FaceColor, FaceColor, FaceColor],
  [FaceColor, FaceColor, FaceColor]
];
// each face is presented as facing it.
// indices as followed:
//   1
// 2 3 4
//   5
//   6
type CubeData = [FaceData, FaceData, FaceData, FaceData, FaceData, FaceData];

type FaceMap = [
  [Face, Face, Face],
  [Face, Face, Face],
  [Face, Face, Face],
  [Face, Face, Face]
];

type Rotation = {
  x: number; // left - right
  y: number; // up - down
  z: number; // clockwise - anti-clockwise
};
type Position = [number, number, number];

type RotationMoveValue = -1 | 0 | 1;
type RotationMove = {
  x: RotationMoveValue;
  y: RotationMoveValue;
  z: RotationMoveValue;
};

class Cube {
  private _rotationCount: Rotation = {
    x: 0,
    y: 0,
    z: 0,
  };
  position: Position = [0, 0, 0];

  faceCount: number = 6;
  faceSize: [number, number] = [3, 3];
  faceMap: FaceMap = [
    [Face.None, Face.Up, Face.None],
    [Face.Left, Face.Front, Face.Right],
    [Face.None, Face.Down, Face.None],
    [Face.None, Face.Back, Face.None],
  ];
  movableFacesPositions: { [key: string]: [number, number][] } = {
    x: [
      // columns
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ],
    y: [
      // rows
      [0, 1],
      [1, 1],
      [2, 1],
      [1, 3],
    ],
    z: [
      [0, 1],
      [1, 0],
      [2, 1],
      [1, 2],
    ],
  };

  cubeData: CubeData;

  constructor() {
    this.cubeData = Array(this.faceCount)
      .fill(null)
      .map((_, faceIndex) =>
        Array(this.faceSize[1])
          .fill(0)
          .map(() =>
            Array(this.faceSize[0]).fill(Object.keys(FaceColor)[faceIndex + 1])
          )
      ) as CubeData;
  }

  get rotation(): Rotation {
    const { x, y, z } = this._rotationCount;

    return {
      x: x * 90,
      y: y * 90,
      z: z * 90,
    };
  }

  scramble(moveCount: number): void {
    const random2Axis = () =>
      ["x", "y"][Math.floor(Math.random() * 2)] as keyof RotationMove;
    const random3 = () => Math.floor(Math.random() * 3);
    const randomPositiveNegative = () =>
      Math.floor(Math.random() * 1) ? -1 : 1;

    Array(moveCount)
      .fill(0)
      .map((_, index) => {
        if (!(index % 3)) {
          this.rotateFaces({
            ...{ x: 0, y: 0, z: 0 },
            ...{ [random2Axis()]: randomPositiveNegative() },
          });
        }

        this.rotateCube(
          {
            x: random3(),
            y: random3(),
            z: 0,
          },
          {
            ...{
              x: 0,
              y: 0,
              z: 0,
            },
            ...{
              [random2Axis()]: randomPositiveNegative,
            },
          }
        );
      });

    if (0 !== this._rotationCount.x) {
      Array(this._rotationCount.x)
        .fill(0)
        .map(() => {
          this.rotateFaces({
            x: -1,
            y: 0,
            z: 0,
          });
        });
    }

    if (0 !== this._rotationCount.y) {
      Array(this._rotationCount.y)
        .fill(0)
        .map(() => {
          this.rotateFaces({
            x: 0,
            y: -1,
            z: 0,
          });
        });
    }

    if (0 !== this._rotationCount.z) {
      Array(this._rotationCount.z)
        .fill(0)
        .map(() => {
          this.rotateFaces({
            x: 0,
            y: 0,
            z: -1,
          });
        });
    }
  }

  // x: rotate up[1, 0] + down[1, 2]
  // y: rotate left[0, 1] + right[2, 1]
  // z: rotate front[1, 1] + back[1, 3]
  rotateFaces(rotationMove: RotationMove): void {
    this.updateFaceMap(rotationMove);
    this.updateRotation(rotationMove);
  }

  // ! missing rotate cube up > rotate row left | right
  // to translate rows to columns based on current cube.rotation
  // or rotate cube.cubeData values in cube.updateCubeData()
  rotateCube(origin: CellPosition, rotationMove: RotationMove): void {
    Object.keys(rotationMove).map((rotationKey) => {
      const rotationMoveValue = rotationMove[rotationKey as keyof RotationMove];

      if (!rotationMoveValue) {
        return;
      }

      const movableFaceValues: Face[] = this.movableFacesPositions[
        rotationKey
      ].map((position) => this.faceMap[position[1]][position[0]]);

      let positions: [number, number][][] = [];
      let allValues: FaceColor[] = [];
      let callback: (
        position: [number, number],
        faceIndex: number
      ) => FaceColor;

      if (rotationMove.x) {
        positions = movableFaceValues.map((faceValue) =>
          this.cubeData[faceValue - 1].map((_, index) => [index, origin.y])
        );
        allValues = this.getNewCubeValues(
          movableFaceValues,
          positions,
          0 > rotationMove.x
        );

        callback = (position: [number, number], faceIndex: number) =>
          allValues[position[0] + faceIndex * 3];
      } else if (rotationMove.y) {
        const backFaceValue = this.faceMap[3][1];

        positions = movableFaceValues.map((faceValue) => {
          if (backFaceValue === faceValue) {
            return this.cubeData[faceValue - 1].map((_, index) => [
              2 - origin.x,
              index,
            ]);
          }

          return this.cubeData[faceValue - 1].map((_, index) => [
            origin.x,
            index,
          ]);
        });
        allValues = this.getNewCubeValues(
          movableFaceValues,
          positions,
          0 < rotationMove.y
        );

        callback = (position: [number, number], faceIndex: number) =>
          allValues[position[1] + faceIndex * 3];
      } else if (rotationMove.z) {
        // if z => getLayers
      }

      movableFaceValues.map((faceValue, faceIndex) => {
        positions[faceIndex].map(
          (position) =>
            (this.cubeData[faceValue - 1][position[1]][position[0]] = callback(
              position,
              faceIndex
            ))
        );
      });
    });
  }

  private updateRotation(rotationMove: RotationMove): void {
    const { x, y, z } = this._rotationCount;

    this._rotationCount = {
      x: x + (rotationMove.x || 0),
      y: y + (rotationMove.y || 0),
      z: z + (rotationMove.z || 0),
    };

    Object.keys(this._rotationCount).map((rotationKey) => {
      const rotationValue = this._rotationCount[rotationKey as keyof Rotation];

      if (0 > rotationValue) {
        this._rotationCount[rotationKey as keyof Rotation] = 3;
      } else if (3 < rotationValue) {
        this._rotationCount[rotationKey as keyof Rotation] = 0;
      }
    });
  }

  private updateFaceMap(rotationMove: RotationMove): void {
    Object.keys(rotationMove).map((rotationKey) => {
      const translatedKey = ((): string => {
        switch (rotationKey) {
          case "x":
            return "y";

          case "y":
            return "x";

          default:
            return rotationKey;
        }
      })() as keyof RotationMove;
      const rotationMoveValue = rotationMove[rotationKey as keyof RotationMove];

      if (rotationMoveValue) {
        const newFaceValues: Face[] = this.getNewFaceMapValues(
          rotationMoveValue,
          this.movableFacesPositions[translatedKey].map(
            (position) => this.faceMap[position[1]][position[0]]
          )
        );

        this.movableFacesPositions[translatedKey].map(
          (position, positionIndex) => {
            this.faceMap[position[1]][position[0]] =
              newFaceValues[positionIndex];
          }
        );
      }
    });
  }

  private getNewFaceMapValues(
    rotationMoveValue: RotationMoveValue,
    currentFaceValues: Face[]
  ): Face[] {
    if (0 < rotationMoveValue) {
      currentFaceValues.unshift(
        currentFaceValues[currentFaceValues.length - 1]
      );
      currentFaceValues.pop();
    } else if (0 > rotationMoveValue) {
      currentFaceValues.push(currentFaceValues[0]);
      currentFaceValues.shift();
    }

    return currentFaceValues;
  }

  private getNewCubeValues(
    movableFaceValues: Face[],
    positions: [number, number][][],
    direction: boolean
  ): FaceColor[] {
    let allValues: FaceColor[] = movableFaceValues.reduce(
      (_result, faceValue, faceIndex) => {
        const columnValues: FaceColor[] = positions[faceIndex].map(
          (position) => this.cubeData[faceValue - 1][position[1]][position[0]]
        );

        return [..._result, ...columnValues];
      },
      [] as FaceColor[]
    );

    if (direction) {
      allValues = [
        ...allValues.slice(3, allValues.length),
        ...allValues.slice(0, 3),
      ];
    } else {
      allValues = [
        ...allValues.slice(allValues.length - 3, allValues.length),
        ...allValues.slice(0, allValues.length - 3),
      ];
    }

    return allValues;
  }
}

export default Cube;

export { RotationMove };
