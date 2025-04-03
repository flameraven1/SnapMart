import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Tabs from "./tabs/Tabs";
import Tabs2 from "./tabs/Tabs2";
import Tabs3 from "./tabs/Tabs3";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addProduct } from "../../redux/features/products/productSlice";
import { Outlet } from "react-router-dom";

export type ProductType = {
  thumbnail: string;
  id: number;
  images: [];
  description: string;
  title: string;
  stock: number;
  price: number;
  rating: number;
  discountPercentage: number;
  brand: string;
  reviews: [];
  weight: number;
  category: string;
  dimensions: {};
  returnPolicy: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
};

type ItemType = {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
};

export default function Specific() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductType>({
    thumbnail: "",
    id: 0,
    images: [],
    description: "",
    title: "",
    stock: 0,
    price: 0,
    rating: 0,
    discountPercentage: 0,
    brand: "",
    reviews: [],
    weight: 0,
    category: "",
    dimensions: {},
    returnPolicy: "",
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
  });
  const [errors, setErrors] = useState("");
  const [imageSliderHelper, setImageSliderHelper] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const [tabs, setTabs] = useState(0);
  const [detailsTab, setDetailsTab] = useState(true);

  const [imageSlider, setImageSlider] = useState([""]);
  const { id } = useParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setImageSlider(
          data.images.includes(data.thumbnail)
            ? [...data.images]
            : [...data.images, data.thumbnail]
        );
      }
    } catch (error) {
      setErrors(`Something went wrong....${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 100);
  }, []);

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleStars = (numStars: number) => {
    let stars = [];
    for (let i = 1; i <= Math.floor(numStars); i++) {
      stars.push(<span className="text-yellow-500">★</span>);
    }
    return stars;
  };

  if (loading)
    return (
      <div className="min-w-dvw min-h-[50vh] flex justify-center items-center">
        <p className="font-sans text-purple-500 font-bold text-3xl">
          Loading......
        </p>
      </div>
    );

  if (errors)
    return (
      <div className="min-w-dvw min-h-[50vh] flex justify-center items-center">
        <p className="font-sans text-red-500 font-bold text-2xl text-center">
          Oops. Something went wrong. Please reload...
        </p>
      </div>
    );
  return (
    <div className="w-full min-h-screen bg-white py-10 px-4">
      {data && (
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-10 shadow-xl rounded-2xl p-6 border border-gray-100 bg-white">
          <div className="md:w-1/2 overflow-hidden">
            <div
              style={{ transform: `translateX(-${imageSliderHelper}00%)` }}
              className="flex transition duration-300 ease-in-out"
            >
              {imageSlider.map((item) => (
                <img
                  src={item}
                  alt=""
                  className="rounded-xl object-cover min-w-full h-96"
                />
              ))}
            </div>
            <div className="w-full mt-6 flex flex-wrap gap-4">
              {data.images.map((item, index) => (
                <img
                  src={item}
                  key={index}
                  onClick={() => setImageSliderHelper(index)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    imageSliderHelper === index
                      ? "border-purple-500"
                      : "border-gray-200"
                  }`}
                  alt=""
                />
              ))}
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col justify-start gap-5">
            <h2 className="text-4xl font-extrabold text-gray-800">
              {data.title}
            </h2>
            <p className="text-gray-600 text-md leading-relaxed">
              {data.description}
            </p>

            <div className="flex items-center gap-4 text-xl mt-4">
              <span className="text-green-600 font-bold">${data.price}</span>
              <span className="text-sm text-red-500 font-semibold">
                -{data.discountPercentage}%
              </span>
            </div>

            <div className="text-sm text-gray-500 mt-3 space-y-1">
              <p>
                <span className="font-semibold text-gray-700">Brand:</span>{" "}
                {data.brand}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Stock:</span>{" "}
                {data.stock}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Rating:</span>{" "}
                <span className="text-yellow-500">★</span> {data.rating}
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={()=>dispatch(addProduct(data))} className="cursor-pointer px-6 py-2 bg-purple-600 text-white font-semibold rounded-xl shadow hover:bg-purple-800 transition duration-300">
                Add to Cart
              </button>
              <button className="cursor-pointer px-6 py-2 bg-green-500 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center gap-4 p-4 mt-10 text-center bg-white md:justify-start md:gap-12">
        <NavLink
          to="ProductDetails"
          className={({ isActive }) =>
            `cursor-pointer text-md font-semibold ${
              detailsTab || isActive
                ? "text-purple-600"
                : "text-gray-500 hover:text-purple-500"
            }`
          }
          onClick={() => setTabs(0)}
        >
          Product Details
        </NavLink>
        <NavLink
          to="Shipping&Availability"
          className={({ isActive }) =>
            `cursor-pointer text-md font-semibold ${
              isActive
                ? "text-purple-600"
                : "text-gray-500 hover:text-purple-500"
            }`
          }
          onClick={() => {
            setDetailsTab(false);
            setTabs(1);
          }}
        >
          Shipping & Availability
        </NavLink>
        <NavLink
          to="ShippingInformation"
          className={({ isActive }) =>
            `cursor-pointer text-md font-semibold ${
              isActive
                ? "text-purple-600"
                : "text-gray-500 hover:text-purple-500"
            }`
          }
          onClick={() => {
            setDetailsTab(false);
            setTabs(2);
          }}
        >
          Shipping Information
        </NavLink>
      </div>

      <hr className="text-gray-300 mt-6" />

      {tabs === 0 ? (
        <Tabs />
      ) : tabs === 1 ? (
        <Tabs2 />
      ) : (
        <Tabs3 />
      )}

      <hr className="text-gray-300 mt-12" />

      <div className="w-full max-w-6xl mx-auto mt-10 p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Customer Reviews
        </h3>
        <div className="flex flex-col gap-5">
          {data?.reviews.map((item: ItemType, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 flex flex-col gap-2 shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src={"/images/icons/user.png"}
                  alt="user"
                />
                <div>
                  <p className="font-bold text-purple-700">
                    {item.reviewerName}
                  </p>
                  <p className="text-sm text-gray-400">{item.reviewerEmail}</p>
                </div>
              </div>
              <p className="flex items-center gap-2 text-yellow-500">
                {handleStars(item.rating)}{" "}
                <span className="text-sm text-gray-400">({item.rating}/5)</span>
              </p>
              <p className="text-gray-700">{item.comment}</p>
              <p className="text-gray-400 text-sm">
                {new Date(item.date).toLocaleDateString()}{" "}
                {new Date(item.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Outlet context={{data}}/>
    </div>
  );
}
