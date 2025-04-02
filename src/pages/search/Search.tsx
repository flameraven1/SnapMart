import { useOutletContext } from "react-router-dom"
import { ProductType } from "../specific-product/Specific"
import { Link } from "react-router-dom"

type OutletType = {
  allSearchResults : ProductType[],
  setAllSearchResults : (allSearchResults : ProductType[])=>void
}

export default function Search() {

  const { allSearchResults, setAllSearchResults} = useOutletContext<OutletType>()

    console.log("all the results will be shown here >>>> " , allSearchResults)
  return (
    <div className="min-h-dvh bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-purple-700">
        Search Results
      </h1>
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        {
          allSearchResults.map((item)=>(
                <Link
                to={`/products/${item.id}`}
                key={item.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer"
              >
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-lg text-gray-800 truncate">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-3 flex justify-between items-center text-sm text-gray-600">
                    <span className="font-bold text-purple-700">${item.price}</span>
                    <span className="flex  justify-center items-center  gap-1 bg-yellow-100 text-yellow-800 px-1 py-1 rounded-full text-xs">
                      <span className="text-[1rem] mb-0.5">
                      ★
                      </span> {item.rating}
                    </span>
                  </div>
                </div>
              </Link>
          ))
        }
    </div>
    </div>
  )
}
