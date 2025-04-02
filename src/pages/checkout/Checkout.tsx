import { ProductType } from "../specific-product/Specific";
import { Link } from "react-router-dom";

export default function Checkout() {
    const cartProducts: ProductType[] = JSON.parse(
        localStorage.getItem("cartProducts") || "[]"
      );
      const getQuantities = JSON.parse(localStorage.getItem("quantities") || "[]")

      const getTotal = JSON.parse(localStorage.getItem("total") || "[]")

  return (
    <div className="bg-white p-4">

        <div className="mt-8 flex flex-col justify-center items-center mb-15">
        <h2 className="text-3xl font-bold text-slate-900">Make a payment</h2>
        <p className="text-slate-900 text-sm mt-4 text-center">Complete your transaction swiftly and securely with our easy-to-use payment process.</p>
        </div>

      <div className="w-[90%] mx-auto">
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">

            <form className="w-full">
            <div className="py-10  flex items-start justify-center bg-gray-100 px-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-8">
          Checkout
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full mt-1 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              placeholder="entername@example.com"
              className="w-full mt-1 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Shipping Address
            </label>
            <input
              type="text"
              placeholder="123 Main Street, City, Country"
              className="w-full mt-1 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        <Link to={"payment"} className="block text-center w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/50 transition">
          Proceed to Payment
        </Link>
      </div>
    </div>
            </form>

          <div className="bg-gray-100 p-6 rounded-md">

            <h2 className="text-3xl font-bold text-slate-900 text-center">Order Summary</h2>

            <ul className="text-slate-900 font-medium mt-12 space-y-4">
                {
                    cartProducts && cartProducts.map((item , index)=>(
                        <li className="flex flex-wrap gap-4 text-sm">{item.title} <span className="ml-auto font-bold">${(item.price * getQuantities[index]).toFixed(2)}</span></li>
                    ))
                }
              <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">Total <span className="ml-auto">{getTotal.toFixed(2)}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>    
  )
}
