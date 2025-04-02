import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addProduct } from "../../redux/features/products/productSlice";
import { AppDispatch } from "../../redux/store";

type ProductType = {
  thumbnail: string;
  id: number;
  description: string;
  title: string;
  price: number;
  rating: number;
};

export default function Products() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 100);
  }, [location]);

  const [loadItems, setLoadItems] = useState(20);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${loadItems}`
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [loadItems]);

  return (
    <div className="min-h-dvh bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-purple-700">
        Our Products
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <Link to={`/products/${item.id}`} className="block">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            <div className="p-4">
              <h2 className="font-semibold text-lg text-gray-800 truncate">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {item.description}
              </p>

              <div className="mt-3 flex justify-between items-center">
                <span className="font-bold text-purple-700">${item.price}</span>
                <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  <span className="text-lg mb-0.5">★</span> {item.rating}
                </span>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button onClick={()=>dispatch(addProduct(item))} className="bg-blue-600 text-white w-full py-2 rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition">
                  Add to Cart
                </button>
                <div className="bg-red-600 w-full flex rounded-lg justify-center items-center">
                <Link to={"/cart/checkout"} className="bg-green-600 text-white min-w-full py-2 rounded-lg font-medium hover:bg-green-700 text-center transition">
                  Buy Now
                </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        {loading ? (
          <h1 className="font-sans font-bold text-2xl text-purple-500">
            Loading......
          </h1>
        ) : (
          <button
            disabled={loadItems === 200}
            onClick={() => setLoadItems(loadItems + 20)}
            className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition disabled:bg-purple-300 cursor-pointer"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
