import { Link } from "react-router-dom";

type NavigationPropTypes = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function Navigation({ isOpen, setIsOpen }: NavigationPropTypes) {
  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-700 ease-in-out bg-gradient-to-br from-purple-600 to-indigo-700 backdrop-blur-lg shadow-xl 
      ${isOpen ? "opacity-100 translate-x-[0%]" : "translate-x-[100%]"}`}
    >
      <span
        className="text-white font-bold text-4xl cursor-pointer absolute right-6 top-6 hover:scale-110 transition-transform duration-200"
        onClick={() => setIsOpen(false)}
      >
        &times;
      </span>

      <ul className="flex flex-col items-center justify-center h-full space-y-6 text-white text-3xl font-semibold tracking-wide">
        <Link to={"/"} onClick={() => setIsOpen(false)} className="md:text-xl text-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
          Home
        </Link>
        <Link to={"/products"} onClick={() => setIsOpen(false)} className="md:text-xl text-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
        Our Products
        </Link>
        <Link to={"/about"} onClick={() => setIsOpen(false)} className="md:text-xl text-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
        About Us
        </Link>
        <Link to={"/cart"} onClick={() => setIsOpen(false)} className="flex justify-center items-center gap-2 md:text-xl text-2xl hover:scale-110 transition-transform duration-300 cursor-pointer bg-gradient-to-r from-pink-700 to bg-purple-300 text-purple-600 px-6 py-2 rounded-lg shadow-md hover:bg-purple-100 animate-pulse">
        <i className="fa-solid fa-cart-shopping text-white"></i> <p className="text-white">View Cart</p>
        </Link>
      </ul>
    </div>
  );
}
