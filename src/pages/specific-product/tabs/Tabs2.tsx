import { useOutletContext } from "react-router-dom";
import { DataType } from "./Tabs";

export default function Tabs2() {
  const {data} = useOutletContext<DataType>();
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 p-2 bg-white">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Shipping & Availability
        </h3>
        <p className="text-gray-600 text-base">{data?.availabilityStatus}</p>
        <p className="text-gray-500 text-sm mt-2"></p>
        <p className="text-gray-500 text-sm mt-2">
          Dimensions: {JSON.stringify(data?.dimensions)}
        </p>
        <p className="text-gray-500 text-sm mt-2">Weight: {data?.weight} kg</p>
        <p className="text-gray-500 text-sm mt-2">Category: {data?.category}</p>
      </div>
  )
}
