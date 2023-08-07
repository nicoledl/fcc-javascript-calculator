import FormulaScreen from "./FormulaScreen";
import OutputScreen from "./OutputScreen";
import PanelButtons from "./PanelButtons";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Calculator = () => {
  const value = useSelector((state) => state.value);

  useEffect(() => {}, [value]);

  return (
    <>
      <div id="calculator">
        <FormulaScreen />
        <OutputScreen />
        <PanelButtons />
      </div>
      <p className="author">By Nicole D. Losana</p>
    </>
  );
};

export default Calculator;
