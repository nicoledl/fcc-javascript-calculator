function obtenerPrioridad(operador) {
  switch (operador) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    default:
      return 0;
  }
}

function calcularResultado(operando1, operando2, operador) {
  switch (operador) {
    case "+":
      return operando1 + operando2;
    case "-":
      return operando1 - operando2;
    case "*":
      return operando1 * operando2;
    case "/":
      return operando1 / operando2;
    default:
      return 0;
  }
}

export function resolveFormula(formula) {
  if (formula.match(/[/*-+]$/)) {
    formula = formula.slice(0, -1);
  }

  const operadores = [];
  const operandos = [];

  let numeroActual = "";
  let ultimoCaracter = null;

  for (const caracter of formula) {
    if (
      !isNaN(caracter) ||
      caracter === "." ||
      (caracter === "-" && (ultimoCaracter === null || isNaN(ultimoCaracter)))
    ) {
      numeroActual += caracter;
    } else {
      if (numeroActual !== "") {
        operandos.push(parseFloat(numeroActual));
        numeroActual = "";
      }

      while (
        operadores.length > 0 &&
        obtenerPrioridad(operadores[operadores.length - 1]) >=
          obtenerPrioridad(caracter)
      ) {
        const operando2 = operandos.pop();
        const operando1 = operandos.pop();
        const operador = operadores.pop();
        const resultado = calcularResultado(operando1, operando2, operador);
        operandos.push(resultado);
      }
      operadores.push(caracter);
    }
    ultimoCaracter = caracter;
  }

  if (numeroActual !== "") {
    operandos.push(parseFloat(numeroActual));
  }

  while (operadores.length > 0) {
    const operando2 = operandos.pop();
    const operando1 = operandos.pop();
    const operador = operadores.pop();
    const resultado = calcularResultado(operando1, operando2, operador);
    operandos.push(resultado);
  }

  return operandos[0];
}
