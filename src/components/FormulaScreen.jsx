import { useSelector } from "react-redux";

const FormulaScreen = () => {
  const formula = useSelector((state) => state.formula);
  const value = useSelector((state) => state.value);
  const result = useSelector((state) => state.result);

  return (
    <div className="formula-screen">
      {result ? formula + "=" + result : formula ? formula : value}
    </div>
  );
};

export default FormulaScreen;
