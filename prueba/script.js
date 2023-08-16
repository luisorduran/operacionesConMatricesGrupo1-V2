// Función para convertir una matriz de texto en una matriz de valores mixtos (números y letras) para resolver ecuaciones
function parseequation(matrixStr) {
  return matrixStr
    .trim()
    .split("\n")
    .map((row) => row.trim().split(/\s+/));
}

// Función para convertir una matriz en una cadena formateada
function formatMatrix(matrix) {
  return matrix.map((row) => row.join("\t")).join("\n");
}

//Funcion para crear la ecuación y mostrar las ecuaciones armadas
function concatenateMatrix() {
  // Obtener las cadenas de las matrices de entrada desde los elementos de la página HTML
  const matrixFStr = document.getElementById("matrixF").value;
  const matrixGStr = document.getElementById("matrixG").value;

  // Convertir las cadenas en matrices numéricas utilizando la función parseequation
  const matrixF = parseequation(matrixFStr);
  const matrixG = parseequation(matrixGStr);

  // Verificar si las matrices tienen las mismas dimensiones
  if (
    matrixF.length !== matrixG.length ||
    matrixF[0].length !== matrixG[0].length
  ) {
    alert("Las matrices deben tener las mismas dimensiones.");
    return;
  }

  // Concatenar las matrices elemento por elemento utilizando map()
  const resultMatrix = matrixF.map((rowA, i) =>
    rowA.map((_, j) => `${matrixF[i][j]}=${matrixG[i][j]}`)
  );

  // Actualizar el valor del elemento de la página HTML con la matriz resultante formateada
  document.getElementById("concatEquation").value = formatMatrix(resultMatrix);

  //Llamada a la función de resolver ecuaciones
  solveequation();
}

function solveequation() {
  // Obtener las cadenas de las matrices de entrada desde los elementos de la página HTML
  const concatEquationStr = document.getElementById("concatEquation").value;

  // Convertir las cadenas en matrices numéricas utilizando la función parseequation
  const concatEquation = parseequation(concatEquationStr);

  const resultMatrix = concatEquation.map((rowA, i) =>
    rowA.map((_, j) => {
      // const equation = concatEquation[i][j].trim();

      if (!concatEquation[i][j]) {
        resultDiv.textContent = "";
        return;
      }

      try {
        const sides = concatEquation[i][j].split("=");

        const parseSide = (side) =>
          side.match(/(-?\d*)[a-z]/i)
            ? parseInt(side.match(/(-?\d*)[a-z]/i)[1]) || 1
            : 0;

        const leftSide = sides[0].trim();
        const rightSide = sides[1].trim();

        const leftCoeff = parseSide(leftSide);
        const rightCoeff = parseSide(rightSide);

        const parseConstant = (side) =>
          side.includes("+")
            ? parseInt(side.split("+")[1])
            : side.includes("-")
            ? -parseInt(side.split("-")[1])
            : 0;

        const leftConstant = parseConstant(leftSide);
        const rightConstant = parseConstant(rightSide);

        const coeffDifference = leftCoeff - rightCoeff;
        const constantDifference = rightConstant - leftConstant;

        const solution = -constantDifference / coeffDifference;

        console.log(solution)

        return solution;
      } catch (error) {
        console.log(error);
      }
    })
  );

  // Actualizar el valor del elemento de la página HTML con la matriz resultante formateada
  document.getElementById("resultEquations").value = formatMatrix(resultMatrix);
}
