import Matrix3 from "../maths/Matrix3";

enum CubeFaceColor {
  None,
  White, // up
  Orange, // left
  Green, // front
  Red, // right
  Yellow, // down
  Blue, // back
}

type CubeRowData = [CubeFaceColor, CubeFaceColor, CubeFaceColor];
type CubeFaceData = [CubeRowData, CubeRowData, CubeRowData];
type CubeData = [
  CubeFaceData,
  CubeFaceData,
  CubeFaceData,
  //
  CubeFaceData,
  CubeFaceData,
  CubeFaceData
];

enum CubeFace {
  Up,
  Left,
  Front,
  Right,
  Down,
  Back,
}
type CubeMap = {
  up: CubeFace;
  down: CubeFace;
  front: CubeFace;
  back: CubeFace;
  left: CubeFace;
  right: CubeFace;
};

type MovableFacesValue = [CubeFace, CubeFace, CubeFace, CubeFace];
type MovableFaces = {
  x: MovableFacesValue;
  y: MovableFacesValue;
  z: MovableFacesValue;
};
type AdjacentFacesValue = [CubeFace, CubeFace];
type AdjacentFaces = {
  x: AdjacentFacesValue;
  y: AdjacentFacesValue;
  z: AdjacentFacesValue;
};

type Coordinate<CoordinateType> = {
  x?: CoordinateType;
  y?: CoordinateType;
  z?: CoordinateType;
};

// x: rotate columns up or down | down: 1, up: -1
// y: rotate rows left or right | left: 1, right: -1
// z: rotate cube left or right | -
class Cube {
  position: [number, number, number] = [0, 0, 0];
  rotation = { x: 0, y: 0, z: 0 };
  data: CubeData;
  faceMap: CubeMap = {
    up: CubeFace.Up,
    down: CubeFace.Down,
    front: CubeFace.Front,
    back: CubeFace.Back,
    left: CubeFace.Left,
    right: CubeFace.Right,
  };
  private movableFaces: MovableFaces = {
    x: [CubeFace.Left, CubeFace.Front, CubeFace.Right, CubeFace.Back],
    y: [CubeFace.Up, CubeFace.Front, CubeFace.Down, CubeFace.Back],
    z: [CubeFace.Up, CubeFace.Right, CubeFace.Down, CubeFace.Left],
  };
  private adjacentFaces: AdjacentFaces = {
    x: [CubeFace.Up, CubeFace.Down],
    y: [CubeFace.Right, CubeFace.Left],
    z: [CubeFace.Back, CubeFace.Front],
  };

  constructor() {
    //

    this.data = Array(6)
      .fill(null)
      .map((_, faceIndex) =>
        Array(3)
          .fill(0)
          .map(() => Array(3).fill(Object.keys(CubeFaceColor)[faceIndex + 1]))
      ) as CubeData;
  }

  get faceMap2D(): [CubeFace | null, CubeFace | null, CubeFace | null][] {
    return [
      [null, this.faceMap.up, null],
      [this.faceMap.left, this.faceMap.front, this.faceMap.right],
      [null, this.faceMap.down, null],
      [null, this.faceMap.back, null],
    ];
  }

  scramble(moveCount: number): void {
    const random2Axis = () =>
      ["x", "y"][Math.floor(Math.random() * 2)] as keyof Coordinate<any>;
    const random3 = () => Math.floor(Math.random() * 3) as 0 | 1 | 2;
    const randomPositiveNegative = () =>
      Math.floor(Math.random() * 1) ? -1 : 1;

    Array(moveCount)
      .fill(0)
      .map((_, index) => {
        this.move(
          {
            [random2Axis()]: randomPositiveNegative,
          },
          random3()
        );
      });
  }

  // rotate the whole cube along x, y, z
  // x: left - right
  // y: up - down
  // z: zLeft - zRight
  rotate(rotation: Coordinate<1 | -1>): void {
    const rotationKey: keyof Coordinate<any> | null = (() => {
      if (rotation.x) {
        return "x";
      } else if (rotation.y) {
        return "y";
      } else if (rotation.z) {
        return "z";
      }

      return null;
    })();

    if (!rotationKey || !rotation[rotationKey]) {
      return;
    }

    this.rotateMovableFaces(rotationKey, rotation[rotationKey]);
    this.rotateAdjacentFaces(rotationKey, rotation[rotationKey]);
  }

  // rotate a column, row or layer
  // x: left - right
  // y: up - down
  // z: zLeft - zRight
  move(move: Coordinate<1 | -1>, rotationIndex: 0 | 1 | 2): void {
    const moveKey: keyof Coordinate<any> | null = (() => {
      if (move.x) {
        return "x";
      } else if (move.y) {
        return "y";
      } else if (move.z) {
        return "z";
      }

      return null;
    })();

    if (!moveKey || !move[moveKey]) {
      return;
    }

    this.moveMovableFaces(moveKey, move[moveKey], rotationIndex);
    this.moveAdjacentFaces(moveKey, move[moveKey], rotationIndex);
  }

  private rotateMovableFaces(
    rotationKey: keyof Coordinate<any>,
    rotationValue: number
  ) {
    const movableFaces = [...this.movableFaces[rotationKey]];
    const movedFaces: MovableFacesValue = (() =>
      (0 < rotationValue
        ? [...movableFaces.slice(1, 4), movableFaces[0]]
        : [
            movableFaces[movableFaces.length - 1],
            ...movableFaces.slice(0, 3),
          ]) as MovableFacesValue)();
    const movableFaceMapIndex: (keyof CubeMap)[] = movableFaces.map(
      (face) => this.getFaceMapLocation(face)!
    );

    const dataClone = [...this.data];
    movableFaceMapIndex.map((faceMapIndex, index) => {
      this.data[this.faceMap[faceMapIndex]] = dataClone[movedFaces[index]];
      this.faceMap[faceMapIndex] = movedFaces[index];
    });
  }
  private rotateAdjacentFaces(
    rotationKey: keyof Coordinate<any>,
    rotationValue: number
  ) {
    const moveRight = 0 < rotationValue;
    const adjacentFaces = [...this.adjacentFaces[rotationKey]];

    adjacentFaces.map((face, index) => {
      const faceMapIndex = this.getFaceMapLocation(face)!;
      this.data[this.faceMap[faceMapIndex]] = Matrix3.rotateZ(
        index ? moveRight : !moveRight,
        this.data[this.faceMap[faceMapIndex]]
      );
    });
  }

  private moveMovableFaces(
    moveKey: keyof MovableFaces,
    moveValue: 1 | -1,
    rotationIndex: number
  ): void {
    const movableFaceMapIndex: (keyof CubeMap)[] = this.movableFaces[
      moveKey
    ].map((face) => this.getFaceMapLocation(face)!);
    const movablePositions: ([number, number][] | null)[] =
      movableFaceMapIndex.map((faceMapIndex) => {
        switch (moveKey) {
          case "x":
            return Array(3)
              .fill(0)
              .map((_, index) =>
                "back" !== faceMapIndex
                  ? [rotationIndex, index]
                  : [2 - rotationIndex, 2 - index]
              );

          case "y":
            return Array(3)
              .fill(0)
              .map((_, index) => [index, rotationIndex]);

          // not implemented
          case "z":
            switch (faceMapIndex) {
              case "up":
                return Array(3)
                  .fill(0)
                  .map((_, index) => [index, 2 - rotationIndex]);

              case "left":
                return Array(3)
                  .fill(0)
                  .map((_, index) => [2 - rotationIndex, 2 - index]);

              case "down":
                return Array(3)
                  .fill(0)
                  .map((_, index) => [2 - index, rotationIndex]);

              case "right":
                return Array(3)
                  .fill(0)
                  .map((_, index) => [rotationIndex, index]);
            }

          default:
            return null;
        }
      });
    const currentValues: CubeRowData[] = movablePositions.map(
      (positions, index) => {
        const faceIndex = this.faceMap[movableFaceMapIndex[index]];

        return positions!.map(
          (position) => this.data[faceIndex][position[1]][position[0]]
        ) as CubeRowData;
      }
    );
    const movedValues = (() =>
      0 < moveValue
        ? [...currentValues.slice(1, 4), currentValues[0]]
        : [
            currentValues[currentValues.length - 1],
            ...currentValues.slice(0, 3),
          ])();

    movableFaceMapIndex.map((faceMapIndex, index) => {
      const positions = movablePositions[index]!;
      const faceIndex = this.faceMap[faceMapIndex];

      positions.map((position, positionIndex) => {
        this.data[faceIndex][position[1]][position[0]] =
          movedValues[index][positionIndex];
      });
    });
  }
  private moveAdjacentFaces(
    moveKey: keyof MovableFaces,
    moveValue: 1 | -1,
    rotationIndex: number
  ): void {
    let adjacentFace = null;
    if (0 === rotationIndex) {
      adjacentFace = this.adjacentFaces[moveKey]["x" === moveKey ? 0 : 1];
    } else if (2 === rotationIndex) {
      adjacentFace = this.adjacentFaces[moveKey]["x" === moveKey ? 1 : 0];
    }

    if (null === adjacentFace) {
      return;
    }

    const adjacentFaceMapIndex = this.getFaceMapLocation(adjacentFace)!;
    const adjacentFaceIndex = this.faceMap[adjacentFaceMapIndex];

    this.data[adjacentFaceIndex] = Matrix3.rotateZ(
      0 === rotationIndex ? 0 < moveValue : !(0 < moveValue),
      this.data[adjacentFaceIndex]
    );
  }

  private getFaceMapLocation(face: CubeFace): keyof CubeMap | null {
    const index = Object.values(this.faceMap).findIndex(
      (faceValue) => face === faceValue
    );

    if (-1 === index) {
      return null;
    }

    return Object.keys(this.faceMap)[index] as keyof CubeMap;
  }
}

export default Cube;

export { CubeFace, Coordinate };
