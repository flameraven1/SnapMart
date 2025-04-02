import { Outlet } from "react-router-dom"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import { useState } from "react";
import { ProductType } from "./pages/specific-product/Specific";

export default function App() {
  const [allSearchResults , setAllSearchResults] = useState<ProductType[] | []>([]);
  const [itemQuantities, setItemQuantities] = useState<number[]>([]);
  return (
    <>
    <Nav allSearchResults={allSearchResults} setAllSearchResults={setAllSearchResults}/>
    <Outlet context={{allSearchResults , setAllSearchResults , itemQuantities , setItemQuantities}} />
    <Footer />
    </>
  )
}