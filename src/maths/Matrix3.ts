type Matrix3DataRow<CellType> = [CellType, CellType, CellType];
type Matrix3Data<CellType> = [
  Matrix3DataRow<CellType>,
  Matrix3DataRow<CellType>,
  Matrix3DataRow<CellType>
];

class Matrix3 {
  static rotateZ<CellType>(
    direction: boolean,
    data: Matrix3Data<CellType>
  ): Matrix3Data<CellType> {
    let updateCallback = null;
    if (direction) {
      updateCallback = (
        _result: Matrix3Data<CellType>,
        position: [number, number],
        cellValue: CellType
      ) => {
        _result[position[0]][Math.abs(position[1] - 2)] = cellValue;
      };
    } else {
      updateCallback = (
        _result: Matrix3Data<CellType>,
        position: [number, number],
        cellValue: CellType
      ) => {
        _result[Math.abs(position[0] - 2)][position[1]] = cellValue;
      };
    }

    return [...data.map((row) => [...row])].reduce(
      (_result, row, rowIndex) => {
        row.map((faceValue, columnIndex) => {
          //
          updateCallback(_result, [columnIndex, rowIndex], faceValue);
        });

        return _result;
      },
      [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
      ] as Matrix3Data<CellType>
    );
  }
}

export default Matrix3;

export { Matrix3Data };
