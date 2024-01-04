import { Dispatch, SetStateAction } from "react";

const PointOption = ({ value, setAmount } : { value:string, setAmount: Dispatch<SetStateAction<string>> }) => {
    return (
      <button
        className="border rounded p-4 text-gray-700 font-semibold flex items-center justify-between my-2 mx-1 cursor-pointer focus:outline-none focus:border-blue-500"
        onClick={() => setAmount(value)}
      >
        <span>{value}</span>
        <span className="text-xs ml-2">points</span>
      </button>
    );
  };

  export default PointOption;