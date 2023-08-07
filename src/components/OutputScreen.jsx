import { useSelector } from "react-redux";

const OutputScreen = () => {
  const value = useSelector((state) => state.value);
  const result = useSelector((state) => state.result);

  return (
    <div id="display" className="output-screen">
      {result ? result : value ? value : 0}
    </div>
  );
};

export default OutputScreen;
