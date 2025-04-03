import { Outlet } from "react-router-dom"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import { useState } from "react";
import { ProductType } from "./pages/specific-product/Specific";
import Navigation from "./components/Navigation";

export default function App() {
  const [allSearchResults , setAllSearchResults] = useState<ProductType[] | []>([]);
  const [itemQuantities, setItemQuantities] = useState<number[]>([]);
  const [isOpen , setIsOpen] = useState(false);
  return (
    <>
    <Navigation isOpen={isOpen} setIsOpen = {setIsOpen}/>

    { isOpen && <div className="fixed inset-0 z-30 transition-opacity duration-300 opacity-100 blur-2xl backdrop-brightness-50"></div>}

    <Nav isOpen={isOpen} setIsOpen = {setIsOpen} allSearchResults={allSearchResults} setAllSearchResults={setAllSearchResults}/>
    <Outlet context={{allSearchResults , setAllSearchResults , itemQuantities , setItemQuantities}} />
    <Footer />
    </>
  )
}