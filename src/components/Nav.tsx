import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../pages/specific-product/Specific";
import useOutsideClick from "./useOutsideClick";

type NavType = {
  setAllSearchResults : (allSearchResults : ProductType[])=>void,
  allSearchResults : ProductType[],
  isOpen : boolean,
  setIsOpen : (isOpen : boolean)=>void
}

export default function Nav({setAllSearchResults , isOpen , setIsOpen} : NavType) {
  const [allProducts , setAllProducts] = useState([]);
  const [filteredProducts , setFilteredProducts] = useState([]);
  const [input , setInput] = useState("");
  const inputRef = useRef(null);
  const [outsideClick , setOutsideClick] = useState(false);
  const fetchData = async () =>{
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=0`,
        {
          method: "GET",
        }
      );
      if(response.ok){
        const data = await response.json();
        setAllProducts(data.products)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(!allProducts.length){
      fetchData();
    }
  } , [])

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    setInput(e.target.value)

    setFilteredProducts(allProducts.filter((products : ProductType)=>products.title.toLowerCase().includes(input.toLowerCase())))
  }

  useOutsideClick(inputRef , ()=>setOutsideClick(false))

  return (
    <div className="min-w-dvw h-[15vh] bg-gradient-to-r from-red-500 via-orange-400 to-pink-500 flex justify-between items-center px-8 md:px-8 shadow-xl">
      <Link to={"/"} className="flex items-center gap-3 w-[30%]">
        <img
          className="rounded-full md:w-[50px] w-[50px] shadow-xl"
          src={"/images/logo/android.png"}
          alt="SnapMart logo"
        />
        <p className="font-lobster text-white text-3xl md:text-4xl drop-shadow-xl">
          SnapMart
        </p>
      </Link>

      <div ref={inputRef} onClick={()=>setOutsideClick(true)} className="md:flex hidden relative w-[50%] h-[60%] rounded-lg">
      <input value={input} onChange={handleChange}
        type="text"
        placeholder="Search products..."
        className="hidden md:block w-full rounded-lg px-4 bg-white text-gray-800 focus:outline-none focus:ring-3 focus:ring-yellow-400 placeholder:text-gray-500 shadow-inner rounded-r-none"
      />
      {
        input && outsideClick ? <div className="md:block hidden w-full h-[60vh] bg-white p-3 top-14 absolute border-1 rounded-lg rounded-t-none border-gray-300 overflow-y-scroll z-10">
          {
            filteredProducts.map((item : ProductType)=>(
                <Link key={item.id} to={`/products/${item.id}`} 
                onClick={()=>{
                  setTimeout(() => {
                    setInput("")
                    setOutsideClick(false)
                  }, 100);
                }
                } className="w-full block p-2 hover:bg-gray-300 cursor-pointer">
                  <p>{item.title}</p>
                  </Link>
              ))
          }
        </div>
          : null
      }
      </div>
      <Link to={`/search`} onClick={()=>{
        setInput("")
        setAllSearchResults(filteredProducts)}} className={`w-15 h-14.5 md:flex items-center justify-center hidden rounded-md bg-yellow-400 transition relative right-9 cursor-pointer hover:bg-yellow-600 rounded-l-none`}>
        <img src="/images/icons/search.png" alt="Search" className="w-5 h-5" />
      </Link>


      <span className="flex justify-center items-center gap-2 text-white text-4xl font-bold cursor-pointer">
        <Link to={"/cart"}>
      <i className="hover:scale-110 transition-transform duration-200 fa-solid fa-cart-shopping text-white text-lg cursor-pointer mb-1"></i>
        </Link>
        <span onClick={()=>setIsOpen(true)} className="hover:scale-110 transition-transform duration-200">
        ≡
        </span>
      </span>
    </div>
  );
}
