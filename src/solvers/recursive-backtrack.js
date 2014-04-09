var Sudoku = require('./sudoku');

exports.solve = function solve(board) {
  var cell, i;

  if (!(cell = firstEmptyCell(board))) {
    return true;
  }

  for (i = 1; i <= 9; i++) {
    if (Sudoku.isValidMove(board, cell, i)) {
      cell.value = i;

      if (solve(board)) {
        return true;
      }

      cell.value = null;
    }
  }

  return false;
};

function firstEmptyCell(board) {
  return board.cells.find(function (c) {
    return c.value == null;
  });
}
