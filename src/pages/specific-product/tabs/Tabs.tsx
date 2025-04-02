import { ProductType } from "../Specific";

export type DataType = {
  data : ProductType | undefined
}

export default function Tabs({data} : DataType) {
  return (
        <div className="w-full max-w-6xl mx-auto mt-10 p-2 bg-white">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Product Details
        </h3>
        <p className="text-gray-600 text-base">{data?.description}</p>
        <p className="text-gray-500 text-sm mt-2">
          Warranty: {data?.warrantyInformation}
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Return Policy: {data?.returnPolicy}
        </p>
      </div>
  )
}
