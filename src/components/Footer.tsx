export default function Footer() {
    return (
      <footer className="bg-yellow-600 min-w-dvw py-10 text-white">
        
        <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-center sm:text-left">
          <div>
            <h2 className="font-bold text-xl mb-3">About Us</h2>
            <ul className="space-y-2 text-sm">
              <li>Our Story</li>
              <li>Careers</li>
              <li>Press & Blog</li>
              <li>Sustainability</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-3">Customer Service</h2>
            <ul className="space-y-2 text-sm">
              <li>FAQs</li>
              <li>Returns & Refunds</li>
              <li>Shipping Info</li>
              <li>Order Tracking</li>
              <li>Contact Support</li>
            </ul>
          </div>
  
          <div>
            <h2 className="font-bold text-xl mb-3">Categories</h2>
            <ul className="space-y-2 text-sm">
              <li>Men's Fashion</li>
              <li>Women's Fashion</li>
              <li>Electronics</li>
              <li>Home & Living</li>
              <li>All Products</li>
            </ul>
          </div>
  
          <div>
            <h2 className="font-bold text-xl mb-3">Legal</h2>
            <ul className="space-y-2 text-sm">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
              <li>Accessibility</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-3">Newsletter</h2>
            <p className="text-sm mb-3">Subscribe for exclusive deals & updates.</p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 text-black outline-0 bg-white rounded-md text-sm w-full"
              />
              <button className="bg-white text-yellow-500 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
          </div>
            </div>


        <div className="border-t border-white/20 my-10"></div>
  
        <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm">

          <div className="flex flex-col items-center md:items-start w-full md:w-1/2 gap-3">
            <p className="text-md font-bold">Become Our Partners</p>
            <div className="flex gap-3 flex-wrap">
              {['visa', 'amazon-pay', 'mastercard', 'paypal', 'stripe'].map((logo, i) => (
                <img key={i} className="w-10 h-auto" src={`/images/icons/${logo}.png`} alt={`${logo} logo`} />
              ))}
            </div>
          </div>
  
          <div className="flex flex-col items-center md:items-end w-full md:w-1/2 gap-3">
            <p className="font-medium">Get deliveries with SnapMart</p>
            <img className="w-34" src="/images/icons/pngwing.png" alt="FreshCart App" />
          </div>
        </div>
  
        <div className="text-center text-xs mt-10 opacity-80">
          &copy; {new Date().getFullYear()} Snap Mart. All rights reserved.
        </div>
      </footer>
    );
  }
  