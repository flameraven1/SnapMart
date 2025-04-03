import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
          404
        </h1>
  
        <p className="text-2xl font-medium mt-4 text-gray-300">
          Oops! The page you're looking for doesn't exist.
        </p>
  
        <Link to={"/"}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg rounded-lg shadow-lg
          transition-all duration-300 transform hover:scale-110 hover:shadow-2xl"
        >
          Go Home
        </Link>
  
        <div className="absolute inset-0 z-[-1] flex justify-center items-center">
          <div className="w-80 h-80 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>
        </div>
      </div>
    );
  }
  