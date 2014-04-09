function SudokuCell(row, column, value) {
  var val;

  Object.defineProperties(this, {
    value: {
      get: function () {
        return val;
      },
      set: function (v) {
        val = +v || null;
      }
    },
    row: {
      value: row
    },
    column: {
      value: column
    },
    section: {
      value: Math.floor(row / 3) * 3 + Math.floor(column / 3)
    }
  });

  this.value = value;
}
SudokuCell.prototype.valueOf = function () {
  return this.value;
};
SudokuCell.prototype.toString = function () {
  return '' + (this.valueOf() || ' ');
};

module.exports = SudokuCell;
