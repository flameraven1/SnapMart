import { useEffect, useState } from "react";
import { deleteProducts, fetchProducts } from "../../redux/features/products/productSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { ProductType } from "../specific-product/Specific.tsx";
import { Link, useOutletContext } from "react-router-dom";
import { Outlet } from "react-router-dom";

type ContextType = {
  itemQuantities : number[],
  setItemQuantities : (itemQuantities : number[])=>void
}

export default function Cart() {
  const {itemQuantities , setItemQuantities} = useOutletContext<ContextType>();
  const [total , setTotal] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const cartProducts: ProductType[] = JSON.parse(
    localStorage.getItem("cartProducts") || "[]"
  );

  const {products} = useSelector((state : RootState)=> state.products)

  useEffect(()=>{
    setItemQuantities(cartProducts.map(()=>(
      1
    )))} , [])

  const handleChange = (index : number , value : number) =>{
    const newQuantity = [...itemQuantities]
    newQuantity[index] = value
    localStorage.setItem("quantities" , JSON.stringify(newQuantity))
    setItemQuantities(newQuantity)
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  function handleCalculations() {
    let pricesArray = cartProducts.map((item) => item.price);
    let totalPrice = 0; 
  
    for (let i = 0; i < pricesArray.length; i++) {
      totalPrice += (pricesArray[i] * itemQuantities[i] || 1);
    }

    localStorage.setItem("total" , JSON.stringify(totalPrice));
    setTotal(totalPrice)
  }

  useEffect(()=>{
    handleCalculations()
  } , [cartProducts , itemQuantities])

  const getQuantities = JSON.parse(localStorage.getItem("quantities") || "[]")

  const handleDeleteStorage = () =>{
    localStorage.clear()
  }


  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <div className="w-[90%] h-full mx-auto md:flex bg-white shadow-lg rounded-lg my-10">
        <div className="flex flex-col w-full md:w-[70%] px-4 py-6">
          <div className="border-b-2 border-gray-300 mb-4">
            <div className="flex justify-between text-gray-500 text-sm">
              <h1 className="w-[65%] ml-5 ">Product</h1>
              <h1 className="md:block hidden w-[25%] text-center">Price</h1>
              <h1 className="w-[15%] text-center">Quantity</h1>
              <h1 className="w-[25%] md:w-[20%] text-center">Total</h1>
            </div>
          </div>

          <div className="space-y-6">
            {products.length > 0 ? (
              products.map((item: ProductType , index) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex items-center w-[60%]">
                    <img
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                      src={item.thumbnail}
                      alt={item.title}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-700 font-semibold">
                        {item.title}
                      </p>
                      <p className="text-gray-500 text-sm">{item.category}</p>
                      <div onClick={()=>{
                        handleDeleteStorage
                        dispatch(deleteProducts(item.id))
                        }} className="flex justify-start items-center gap-2">
                      <i className="fa-solid fa-trash text-sm cursor-pointer hover:text-red-700 " style={{
                        color : "#f20713"
                      }}></i>
                      <p className="cursor-pointer hover:text-red-700 text-red-500 text-sm">Remove</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-[25%] text-center hidden md:block">
                    <p className="text-gray-700 font-medium">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="w-[15%] text-center">
                    <input onChange={(e)=>handleChange(index , Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                      type="number"
                      defaultValue={getQuantities ? getQuantities[index] : 1}
                      min={1}
                    />
                  </div>

                  <div className="w-[20%] md:w-[15%] text-center">
                    <p className=" text-gray-700 font-semibold">
                      ${(item.price * getQuantities[index]).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 w-full">
                Your cart is empty!
              </p>
            )}
          </div>
        </div>

        <div className="w-full md:w-[30%] p-6 bg-gray-50 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4">Summary</h1>
          <div className="space-y-4">
            <div className="flex justify-between text-lg font-medium text-gray-700">
              <p>Total Products:</p>
              <p>{cartProducts.length}</p>
            </div>
            <div className="flex justify-between text-lg font-medium text-gray-700">
              <p>Total Price:</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <div className="flex justify-center items-center rounded-lg">
            <Link to={"checkout"} className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer font-semibold px-4 text-center">
              Checkout
            </Link>
            </div>
          </div>
        </div>
      </div>
      <Outlet context={{itemQuantities}} />
    </div>
  );
}
