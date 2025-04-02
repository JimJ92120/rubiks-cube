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
      [1, 1],
      [2, 1],
      [1, 3],
      [0, 1],
    ],
    y: [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ],
    z: [
      [1, 0],
      [2, 1],
      [1, 2],
      [0, 1],
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

  // scramble(): void;

  rotateFaces(rotationMove: RotationMove): void {
    this.updateFaceMap(rotationMove);
    this.updateRotation(rotationMove);
    this.updateCubeData(rotationMove);
  }

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
        positions = movableFaceValues.map((faceValue) =>
          this.cubeData[faceValue - 1].map((_, index) => [origin.x, index])
        );
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
      const rotationMoveValue = rotationMove[rotationKey as keyof RotationMove];

      if (rotationMoveValue) {
        const newFaceValues: Face[] = this.getNewFaceMapValues(
          rotationMoveValue,
          this.movableFacesPositions[rotationKey].map(
            (position) => this.faceMap[position[1]][position[0]]
          )
        );

        this.movableFacesPositions[rotationKey].map(
          (position, positionIndex) => {
            this.faceMap[position[1]][position[0]] =
              newFaceValues[positionIndex];
          }
        );
      }
    });
  }

  private updateCubeData(rotationMove: RotationMove): void {
    if (!rotationMove.z) {
      return;
    }

    let updateCallback = null;
    if (0 < rotationMove.z) {
      updateCallback = (
        _result: FaceData,
        position: [number, number],
        faceValue: FaceColor
      ) => {
        _result[position[0]][Math.abs(position[1] - 2)] = faceValue;
      };
    } else {
      updateCallback = (
        _result: FaceData,
        position: [number, number],
        faceValue: FaceColor
      ) => {
        _result[Math.abs(position[0] - 2)][position[1]] = faceValue;
      };
    }

    this.cubeData.map((faceData, faceIndex) => {
      this.cubeData[faceIndex] = faceData.reduce(
        (_result, row, rowIndex) => {
          row.map((faceValue, columnIndex) => {
            //
            updateCallback(_result, [columnIndex, rowIndex], faceValue);
          });

          return _result;
        },
        [
          [FaceColor.None, FaceColor.None, FaceColor.None],
          [FaceColor.None, FaceColor.None, FaceColor.None],
          [FaceColor.None, FaceColor.None, FaceColor.None],
        ] as FaceData
      );
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
