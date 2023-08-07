/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { buttons } from "./buttons";
import { setResult, setFormula, setValue } from "../store";
import { resolverFormula } from "./resolverFormula";

const PanelButtons = () => {
  const dispatch = useDispatch();
  const formula = useSelector((state) => state.formula);
  const value = useSelector((state) => state.value);
  const result = useSelector((state) => state.result);

  const handleChange = (elem) => {
    let lastItem = formula[formula.length - 1];

    switch (elem) {
      case "AC":
        dispatch(setValue(""));
        dispatch(setFormula(""));
        dispatch(setResult(""));
        break;

      case "-":
        if (result) {
          dispatch(setFormula(result + elem));
          return dispatch(setResult(""));
        }
        dispatch(setValue(elem));
        if (["/", "*", "+"].includes(lastItem)) {
          dispatch(setFormula(formula + elem));
        } else if (lastItem === "-") return;

        dispatch(setFormula(formula + elem));
        break;

      case "*":
      case "+":
      case "/":
        dispatch(setValue(elem));

        if (result) {
          dispatch(setFormula(result + elem));
          return dispatch(setResult(""));
        }

        if (
          formula.match(/[1-9.]/g) &&
          !["/", "*", "-", "+"].includes(lastItem)
        ) {
          return dispatch(setFormula(formula + elem));
        } else if (formula.match(/[/*+]-$/)) {
          let arr = formula.split("");
          let lastIndex = arr.length - 1;
          arr.splice(lastIndex - 1, 2);
          arr.push(elem);

          let joinedString = arr.join("");
          return dispatch(setFormula(joinedString));
        }
        dispatch(setFormula(formula.replace(/[/*+]$/, elem)));
        break;

      case "=":
        if (!value) return dispatch(setValue("=" + NaN));
        const newResult = resolverFormula(formula);
        dispatch(setResult(newResult));
        dispatch(setValue(""));
        break;

      case ".":
        if (!value || ["/", "*", "-", "+"].includes(lastItem)) {
          dispatch(setValue(0 + elem));
          return dispatch(setFormula(formula + 0 + elem));
        }
        if (value.includes(".") && elem === ".") return;
        dispatch(setValue(value + elem));
        dispatch(setFormula(formula + elem));
        break;

      default:
        if (result) {
          dispatch(setValue(elem));
          dispatch(setFormula(elem));
          return dispatch(setResult(""));
        }
        if (["/", "*", "-", "+"].includes(lastItem)) {
          dispatch(setValue(elem));
          return dispatch(setFormula(formula + elem));
        }
        if (value.match(/^0/) && value === "0" && elem === "0") return;
        dispatch(setValue(value + elem));
        dispatch(setFormula(formula + elem));
        break;
    }
  };

  return (
    <div className="d-block">
      {buttons.map((elem, i) => {
        let { id, value, className } = elem;
        return (
          <button
            id={id}
            key={i}
            className={className}
            onClick={() => handleChange(value)}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
};

export default PanelButtons;
