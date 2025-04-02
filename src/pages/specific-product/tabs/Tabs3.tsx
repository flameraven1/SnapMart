import { useOutletContext } from "react-router-dom";
import { DataType } from "./Tabs";

export default function Tabs3() {
  const {data} = useOutletContext<DataType>();
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 p-2 bg-white">
        <h3 className="mt-3 text-2xl font-bold text-gray-800 mb-4">
          Shipping Information
        </h3>
        <p className="text-gray-600 text-base">{data?.shippingInformation}</p>
        </div>
  )
}
