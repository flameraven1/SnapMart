import { useState } from "react";
import { ProductType } from "../specific-product/Specific";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const cartProducts: ProductType[] = JSON.parse(
    localStorage.getItem("cartProducts") || "[]"
  );
  const getQuantities = JSON.parse(localStorage.getItem("quantities") || "[]");
  const getTotal = JSON.parse(localStorage.getItem("total") || "0");
  const navigate = useNavigate();

  const [user , setUser] = useState({
    name : "",
    email : "",
    shipping : ""
  })

  const handleSubmit = (e : React.FormEvent) =>{
    e.preventDefault();
    if(user.email.trim() === "" || user.name.trim() === "" || user.shipping.trim() === ""){
      alert("Error. Please fill all the fields")
    }else{
      navigate("payment")
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-12 px-6">
      
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900">Make a Payment</h2>
        <p className="text-gray-600 text-lg mt-3">
          Complete your transaction swiftly and securely with our easy-to-use payment process.
        </p>
      </div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">Checkout</h2>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600">Full Name</label>
              <input onChange={(e)=>setUser({...user , name : e.target.value})} required
                type="text"
                placeholder="Enter Name"
                className="w-full mt-1 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">Email Address</label>
              <input onChange={(e)=>setUser({...user , email : e.target.value})} required
                type="email"
                placeholder="entername@example.com"
                className="w-full mt-1 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600">Shipping Address</label>
              <input onChange={(e)=>setUser({...user , shipping : e.target.value})} required
                type="text"
                placeholder="123 Main Street, City, Country"
                className="w-full mt-1 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <button onClick={handleSubmit}
              className="block text-center w-full py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105 cursor-pointer"
            >
              Proceed to Payment
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Order Summary</h2>

          <ul className="text-gray-700 font-medium mt-6 space-y-4">
            {cartProducts &&
              cartProducts.map((item, index) => (
                <li key={index} className="flex flex-wrap gap-4 text-sm">
                  {item.title}
                  <span className="ml-auto font-bold">
                    ${(item.price * (getQuantities.length === 0 ? 1 : getQuantities[index])).toFixed(2)}
                  </span>
                </li>
              ))}
            <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">
              Total <span className="ml-auto">${getTotal === 0 ? 0 : getTotal.toFixed(2)}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
