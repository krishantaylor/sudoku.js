var Sudoku = require('./sudoku');

exports.solve = function (board) {
  var q1, q2, cell, val, tmp;

  q1 = board.cells
    .filter(function (c) {
      return c.value == null;
    })
    .map(function (c) {
      return [c, 0];
    });
  q2 = [];

  while (q1.length) {
    tmp = q1.shift();
    cell = tmp[0];
    val = tmp[1];

    val++;

    if (val > 9) {
      q1.unshift([cell, 0]);

      if (q2.length) {
        tmp = q2.pop();
        tmp[0].value = null;
        q1.unshift(tmp);
      } else {
        return false;
      }
    } else {
      if (Sudoku.isValidMove(board, cell, val)) {
        cell.value = val;
        q2.push([cell, val]);
      } else {
        q1.unshift([cell, val]);
      }
    }
  }

  return true;
};
