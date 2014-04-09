var SudokuCell = require('./sudoku-cell');

function Sudoku(board) {
  var cells = [],
    rows, columns, sections, r, c;

  for (r = 0; r < 9; r++) {
    for (c = 0; c < 9; c++) {
      cells.push(new SudokuCell(r, c));
    }
  }

  rows = getCollection(cells, getRow);
  columns = getCollection(cells, getColumn);
  sections = getCollection(cells, getSection);

  Object.defineProperties(this, {
    cells: {
      value: cells
    },
    rows: {
      value: rows
    },
    columns: {
      value: columns
    },
    sections: {
      value: sections
    }
  });

  Object.freeze(this.cells);
  Object.freeze(this.rows);
  this.rows.forEach(function (row) { Object.freeze(row); });
  Object.freeze(this.columns);
  this.columns.forEach(function (column) { Object.freeze(column); });
  Object.freeze(this.sections);
  this.sections.forEach(function (section) { Object.freeze(section); });

  (board || []).forEach(function (row, r) {
    row.split('').forEach(function (val, c) {
      this.setValue(r, c, +val);
    }, this);
  }, this);
}
Sudoku.prototype.valueOf = function () {
  return this.rows.map(function (row) {
    return row.join('');
  });
};
Sudoku.prototype.toString = function () {
  var value = this.valueOf(),
    rx = /(...)(...)(...)/,
    bar = '+---+---+---+',
    ret = value.map(function (row) {
      return row.replace(rx, '|$1|$2|$3|');
    });
  ret.splice(9, 0, bar);
  ret.splice(6, 0, bar);
  ret.splice(3, 0, bar);
  ret.splice(0, 0, bar);
  return '\n' + ret.join('\n') + '\n';
};
Sudoku.prototype.setValue = function (row, column, value) {
  this.cells[row * 9 + column].value = value;
};
Sudoku.isValidMove = function (board, cell, value) {
  function checkValue(c) {
    return c.value == value;
  }

  return !board.rows[cell.row].find(checkValue) &&
    !board.columns[cell.column].find(checkValue) &&
    !board.sections[cell.section].find(checkValue);
};

function getRow(c) {
  return c.row;
}
function getColumn(c) {
  return c.column;
}
function getSection(c) {
  return c.section;
}

function getCollection(cells, pred) {
  var ret = [[],[],[],[],[],[],[],[],[]];
  cells.forEach(function (c) {
    ret[pred(c)].push(c);
  });
  return ret;
}

module.exports = Sudoku;
