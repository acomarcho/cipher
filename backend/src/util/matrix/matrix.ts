export function adjoint(matrix: number[][]) {
  function determinantSubmatrix(matrix: number[][], excludedRow: number, excludedCol: number) {
    const submatrix = [];
    for (let i = 0; i < matrix.length; i++) {
      if (i === excludedRow) continue;
      const row = [];
      for (let j = 0; j < matrix.length; j++) {
        if (j === excludedCol) continue;
        row.push(matrix[i][j]);
      }
      submatrix.push(row);
    }
    return determinant(submatrix);
  }

  function determinant(matrix: number[][]) {
    if (matrix.length === 1) {
      return matrix[0][0];
    } else if (matrix.length === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    } else {
      let det = 0;
      for (let i = 0; i < matrix.length; i++) {
        const sign = i % 2 === 0 ? 1 : -1;
        det += sign * matrix[0][i] * determinantSubmatrix(matrix, 0, i);
      }
      return det;
    }
  }

  const size = matrix.length;
  const adjMatrix = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const sign = (i + j) % 2 === 0 ? 1 : -1;
      adjMatrix[j][i] = sign * determinantSubmatrix(matrix, i, j);
    }
  }

  return adjMatrix;
}
