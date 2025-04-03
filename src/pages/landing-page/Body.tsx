import { useEffect, useState } from "react";
import "./body.css";
import { Link } from "react-router-dom";

type ProductType = {
    thumbnail : string,
    id : number,
    images : [],
    description : string,
    title : string,
    stock : number,
    price : number,
    rating : number,
    discountPercentage : number,
    brand : string
}

export default function Body() {
  const pics = [
    {
      id: 1,
      pic: "sports",
      title: "Unleash Your Inner Athlete",
      desc: "Explore the latest in sports gear and equipment to elevate your performance and style",
    },
    {
      id: 2,
      pic: "perfumes",
      title: "Fragrance for Every Occasion",
      desc: "Discover our premium collection of perfumes designed to captivate and inspire",
    },
    {
      id: 3,
      pic: "shoe",
      title: "Step into Comfort and Style",
      desc: "Browse through our exclusive range of shoes for every walk of life",
    },
    {
      id: 4,
      pic: "pendant",
      title: "Timeless Elegance",
      desc: "Adorn yourself with our exquisite pendant collection, crafted to perfection",
    },
    {
      id: 5,
      pic: "cardigans",
      title: "Cozy Up in Style",
      desc: "Stay warm and fashionable with our versatile cardigan selection for all seasons",
    },
    {
      id: 6,
      pic: "food",
      title: "Savor the Flavors",
      desc: "Indulge in our curated food items that bring taste and quality to your table",
    },
  ];

  const continousSlider = [
    {
      id: 1,
      title: "deliver",
      desc: "Fast and reliable delivery service to your doorstep",
    },
    {
      id: 2,
      title: "juice",
      desc: "Refreshing and organic juices for a healthy lifestyle",
    },
    {
      id: 3,
      title: "open",
      desc: "We're open 24/7 to serve you better anytime, anywhere",
    },
    {
      id: 4,
      title: "random",
      desc: "Explore our fun and quirky random picks",
    },
    {
      id: 5,
      title: "sale",
      desc: "Massive discounts and deals you can't resist",
    },
    {
      id: 6,
      title: "shop",
      desc: "Your one-stop shop for everything trendy",
    },
    {
      id: 7,
      title: "supreme",
      desc: "Top-tier products with unmatched quality",
    },
    {
      id: 8,
      title: "tshirt",
      desc: "Comfy and stylish t-shirts for every vibe",
    },
  ];

  const [storeProducts , setStoreProducts] = useState([]);
  const [imageSetter, setImageSetter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setImageSetter((num) => (num + 1) % pics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () =>{
    try {
        const response = await fetch("https://dummyjson.com/products?limit=21&skip=10" , {
            method : "GET"
        })
        if(response.ok){
            const productData = await response.json();
            setStoreProducts(productData.products)
            console.log(productData.products)
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    fetchData();
  } , [])

  return (
    <div className="min-w-dvw min-h-dvh">
      <section className="w-full">
        <div className="w-[60%] mx-auto mt-10 mb-10">
          <h1 className="font-sans font-extralight text-3xl text-center md:text-4xl">
            Everything You Need, Just a Snap Away!
          </h1>
        </div>

        <div className="w-full flex justify-center items-center my-8">
          <Link to={""} className="w-[90%] md:w-[70%] lg:w-[70%] relative shadow-lg rounded-xl overflow-hidden hover:scale-[1.01] transition-all duration-300 ease-in-out">
            <img
            loading="lazy"
              src="/images/sales/Gray and Black Minimalist Fashion Style Banner.png"
              alt="Sale Banner"
              className="w-full h-auto object-cover"
            />
          </Link>
        </div>

        <div className="container flex overflow-hidden min-w-dvw md:h-[600px] mt-10">
          {pics.map((item) => (
            <div
              key={item.id}
              className="imgContainer min-w-full"
              style={{
                transition: `transform 1s ease-in-out`,
                transform: `translateX(-${imageSetter * 100}%)`,
              }}
            >
              <img
              loading="lazy"
                src={`/images/Curousel/${item.pic}.jpg`}
                className="object-cover min-w-full min-h-full relative"
                alt=""
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50">
                <div className="w-[80%] flex flex-col justify-center items-center gap-6">
                  <p className="text-center text-sans font-light text-3xl md:text-5xl text-white">
                    {item.title}
                  </p>
                  <p className="text-center text-sans font-light text-xl md:text-3xl text-white">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="min-w-dvw min-h-dvh">
        <div className="h-[20vh] flex justify-center items-center">
          <h3 className="font-light font-sans text-4xl">Featured Products</h3>
        </div>

        <div className="w-ful h-fulll overflow-hidden">
          <div className="flex track p-3">
            {[...continousSlider, ...continousSlider].map((item) => (
              <div
                className="relative cursor-pointer hover:outline-yellow-400 hover:outline-4 min-w-[180px] md:h-[240px] mx-3 bg-white rounded-xl overflow-hidden"
                key={item.id * Math.random()}
              >
                <img
                loading="lazy"
                  src={`/images/infinite/${item.title}.jpg`}
                  className="object-cover min-w-full min-h-full"
                  alt=""
                />
                <div className="absolute p-4 flex-col opacity-0 hover:opacity-100 hover:bg-black/50 inset-0 flex justify-center items-center">
                  <p className="text-white font-sans font-semibold text-center">
                    {item.title}
                  </p>
                  <p className="text-white font-sans font-semibold text-center">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[20vh] flex justify-center items-center">
          <h3 className="font-light font-sans text-4xl">Sales</h3>
        </div>

        <div className="w-[90%] flex justify-center items-center gap-10 mx-auto">

          <Link to={""} className="w-[90%] md:w-[90%] lg:w-[70%] relative shadow-lg rounded-xl overflow-hidden hover:scale-[1.01] transition-all duration-300 ease-in-out">
            <img
              src="/images/sales/bag.png"
              alt="Sale Banner"
              className="w-full h-auto object-cover"
            />
          </Link>

          <Link to={""} className="w-[90%] md:w-[90%] lg:w-[70%] relative shadow-lg rounded-xl overflow-hidden hover:scale-[1.01] transition-all duration-300 ease-in-out">
            <img
              src="/images/sales/Fashion.png"
              alt="Sale Banner"
              className="w-full h-auto object-cover"
            />
          </Link>
        </div>
      </section>


      <section className="min-w-dvw min-h-dvh bg-white py-20">
  <div className="flex w-[90%] mx-auto gap-10 flex-wrap">
    
    <Link to={""} className="w-full flex items-start flex-col gap-10 relative bottom-20 md:bottom-0 md:w-[30%]">
      <img
        src="/images/sales/camel.png"
        alt="Banner"
        className="rounded-xl shadow-lg w-[60%] mx-auto md:w-full object-cover"
      />
    <img src="/images/sales/insta.png" alt="" className="rounded-xl md:w-full shadow-lg w-[60%] mx-auto object-cover"/>

    </Link>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-[65%]">
      {storeProducts.map((item: ProductType) => (
        <Link to={`/products/${item.id}`}
          key={item.id}
          className="relative bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        >
          <div className="aspect-[4/3] w-full mb-3 overflow-hidden rounded-md">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-115 transition-transform duration-300"
            />
          </div>

          <p className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {item.discountPercentage}%
          </p>

          <p className="text-sm text-gray-500">{item.brand}</p>
          <p className="text-base font-semibold">{item.title}</p>
          <p className="text-lg font-bold text-green-600">${item.price}</p>
        </Link>
      ))}
    </div>
  </div>

  <div className="h-[20vh] flex justify-center items-center">
        <h3 className="font-light font-sans text-4xl">Summers are here!</h3>
    </div>
  

  <div>
  <Link to={""}>
    <img src="/images/sales/summer.png" alt="" />
  </Link>
  </div>

</section>
    </div>
  );
}
