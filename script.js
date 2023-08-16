//Funcion para mostrar la pestaña que se seleccione
function openTab(tabName) {
  var i, tabContent, tabButton;

  // Obtener todos los elementos con la clase "tab-content"
  tabContent = document.getElementsByClassName("tab-content");

  // Ocultar los contenidos de todas las pestañas
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // Obtener todos los elementos con la clase "tab-button"
  tabButton = document.getElementsByClassName("tab-button");

  // Eliminar la clase "active" de todos los botones de pestaña
  for (i = 0; i < tabButton.length; i++) {
    tabButton[i].className = tabButton[i].className.replace(" active", "");
  }

  // Mostrar el contenido de la pestaña seleccionada
  document.getElementById(tabName).style.display = "block";

  // Agregar la clase "active" al botón de pestaña actual
  event.currentTarget.className += " active";
}

//Limpiar campos de texto
function limpiarCampo() {
  var camposTexto = document.getElementsByTagName("textarea");
  var camposTexto2 = document.getElementsByTagName("input");
  for (var i = 0; i < camposTexto.length; i++) {
    camposTexto[i].value = ""; // Limpiar el contenido del campo de texto
  }
  for (var i = 0; i < camposTexto2.length; i++) {
    camposTexto2[i].value = ""; // Limpiar el contenido del campo de texto
  }

  document.getElementById("resultado").innerHTML = "";
}

// Logica de operaciones

// Funcion para validar que solo haya numeros
function ValidaSoloNumeros(event) {
  const keyCode = event.keyCode || event.which;

  // Permitir números (0-9), tecla espacio (32), tecla enter (13) y teclas direccionales (37-40)
  if (
    (keyCode >= 48 && keyCode <= 57) || // Números del 0 al 9
    keyCode === 32 || // Tecla espacio
    keyCode === 13 || // Tecla enter
    (keyCode >= 37 && keyCode <= 40) // Teclas direccionales (izquierda, arriba, derecha, abajo)
  ) {
    return true; // Permitir la tecla
  } else {
    return false; // Prevenir la tecla
  }
}

// Función para convertir una cadena de texto en una matriz numérica
function parseMatrix(matrixStr) {
  return matrixStr
    .trim()
    .split("\n")
    .map((row) => row.trim().split(/\s+/).map(Number));
}

// Función para convertir una matriz en una cadena formateada
function formatMatrix(matrix) {
  return matrix.map((row) => row.join("\t")).join("\n");
}

// Función para sumar dos matrices
function sumMatrix() {
  // Obtener las cadenas de las matrices de entrada desde los elementos de la página HTML
  const matrixAStr = document.getElementById("matrixA").value;
  const matrixBStr = document.getElementById("matrixB").value;

  // Convertir las cadenas en matrices numéricas utilizando la función parseMatrix
  const matrixA = parseMatrix(matrixAStr);
  const matrixB = parseMatrix(matrixBStr);

  // Verificar si las matrices tienen las mismas dimensiones
  if (
    matrixA.length !== matrixB.length ||
    matrixA[0].length !== matrixB[0].length
  ) {
    alert("Las matrices deben tener las mismas dimensiones.");
    return;
  }

  // Sumar las matrices elemento por elemento utilizando map()
  const resultMatrix = matrixA.map((rowA, i) =>
    rowA.map((_, j) => matrixA[i][j] + matrixB[i][j])
  );

  // Actualizar el valor del elemento de la página HTML con la matriz resultante formateada
  document.getElementById("resultSumSub").value = formatMatrix(resultMatrix);
}

// Función para restar dos matrices (similar a sumMatrix)
function subtractMatrix() {
  // Obtener las cadenas de las matrices de entrada desde los elementos de la página HTML
  const matrixAStr = document.getElementById("matrixA").value;
  const matrixBStr = document.getElementById("matrixB").value;

  // Convertir las cadenas en matrices numéricas utilizando la función parseMatrix
  const matrixA = parseMatrix(matrixAStr);
  const matrixB = parseMatrix(matrixBStr);

  // Verificar si las matrices tienen las mismas dimensiones
  if (
    matrixA.length !== matrixB.length ||
    matrixA[0].length !== matrixB[0].length
  ) {
    alert("Las matrices deben tener las mismas dimensiones.");
    return;
  }

  // Restar las matrices elemento por elemento utilizando map()
  const resultMatrix = matrixA.map((rowA, i) =>
    rowA.map((_, j) => matrixA[i][j] - matrixB[i][j])
  );

  // Actualizar el valor del elemento de la página HTML con la matriz resultante formateada
  document.getElementById("resultSumSub").value = formatMatrix(resultMatrix);
}

// Función para multiplicar dos matrices
function multiplyMatrix() {
  // Obtener las cadenas de las matrices de entrada desde los elementos de la página HTML
  const matrixCStr = document.getElementById("matrixC").value;
  const matrixDStr = document.getElementById("matrixD").value;

  // Convertir las cadenas en matrices numéricas utilizando la función parseMatrix
  const matrixC = parseMatrix(matrixCStr);
  const matrixD = parseMatrix(matrixDStr);

  // Verificar si las dimensiones de las matrices permiten la multiplicación
  if (matrixC[0].length !== matrixD.length) {
    alert(
      "El número de columnas de la matriz A debe ser igual al número de filas de la matriz B."
    );
    return;
  }

  // Inicializar la matriz resultante
  const resultMatrix = [];

  // Multiplicar las matrices utilizando bucles for
  for (let i = 0; i < matrixC.length; i++) {
    resultMatrix[i] = [];
    for (let j = 0; j < matrixD[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrixD.length; k++) {
        sum += matrixC[i][k] * matrixD[k][j];
      }
      resultMatrix[i][j] = sum;
    }
  }

  // Actualizar el valor del elemento de la página HTML con la matriz resultante formateada
  document.getElementById("resultMultiply").value = formatMatrix(resultMatrix);
}

// Función para calcular la matriz transpuesta de una matriz dada
function transposeMatrix() {
  // Obtener la cadena de la matriz de entrada desde el elemento de la página HTML
  const matrixEStr = document.getElementById("matrixE").value;

  // Convertir la cadena en una matriz numérica utilizando la función parseMatrix
  const matrixE = parseMatrix(matrixEStr);

  // Calcular la matriz transpuesta utilizando map() y la transposición de filas y columnas
  const resultMatrix = matrixE[0].map((_, i) => matrixE.map((row) => row[i]));

  // Actualizar el valor del elemento de la página HTML con la matriz resultante formateada
  document.getElementById("resultTranspose").value = formatMatrix(resultMatrix);
}

/** Espacio para pruebas de código de ecuaciones con matrices**/

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
  solveEquation();
}

function solveEquation() {
  // Obtener el contenido de la entrada de las ecuaciones concatenadas desde el elemento HTML
  const concatEquationStr = document.getElementById("concatEquation").value;

  // Convertir el contenido en una matriz de ecuaciones utilizando la función 'parseequation'
  const equations = parseequation(concatEquationStr);

  // Matriz para almacenar las soluciones de las ecuaciones
  const solutions = [];

  // Matriz para almacenar las variables utilizadas en las ecuaciones
  const variables = [];

  // Crear una nueva matriz para el resultado final
  const resultMatrix = equations.map((rowA, i) => {
    return rowA.map((_, j) => {
      const equation = equations[i][j]; // Obtener la ecuación de la fila y columna actual

      if (!equation) {
        solutions.push(null); // Si no hay ecuación, añadir un valor nulo a las soluciones
        return;
      }

      try {
        const sides = equation.split("=");

        const variableMatch = equation.match(/[a-z]/i);
        const variable = variableMatch ? variableMatch[0] : ""; // Obtener la variable de la ecuación

        variables.push(variable); // Agregar la variable a la matriz de variables
        console.log(variables);

        // Función para extraer coeficiente y constante de un lado de la ecuación
        const parseSide = (side) => {
          const coefficientMatch = side.match(/(-?\d*)[a-z]/i);
          const constantMatch = side.match(/[+-]?\s*(\d+)$/);

          const coefficient = coefficientMatch
            ? parseInt(coefficientMatch[1]) || 1
            : 0;
          const constant = constantMatch ? parseInt(constantMatch[1]) : 0;

          return { coefficient, constant };
        };

        const leftSide = sides[0].trim();
        const rightSide = sides[1].trim();

        const left = parseSide(leftSide);
        const right = parseSide(rightSide);

        const coeffDifference = left.coefficient - right.coefficient;
        const constantDifference = right.constant - left.constant;

        let solution = constantDifference / coeffDifference;
        solutions.push(solution); // Agregar la solución a la matriz de soluciones
      } catch (error) {
        solutions.push(null); // Si hay un error, añadir un valor nulo a las soluciones
        console.log("Error:", error);
      }
    });
  });

  // Actualizar el contenido del elemento HTML con las soluciones formateadas
  document.getElementById("resultEquations").value = solutions
    .map((solution, index) => {
      const variable = variables[index] || ""; // Usar 'x' si no se encontró ninguna variable
      return solution !== null
        ? `${variable} = ${solution}`
        : "Error en la ecuación";
    })
    .join("\n");
}
