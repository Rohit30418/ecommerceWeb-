import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const color = useSelector((state) => state.color.color);
  const darkColor = useSelector((state) => state?.DarkColor?.DarkColor);

  return (
    <div>
      <footer className="footer bg-brandOrange">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-start lg:gap-8">
            <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
              {/* Brand and Newsletter */}
              <div className="col-span-2">
                <div>
                  <h1 className="text-4xl font-bold mb-5">
                    Kharee<span className="text-white">do</span>
                  </h1>
                  <h2 className="text-2xl font-bold text-gray-900 mb-">
                    Get the latest updates!
                  </h2>
                  <p className="mt-4 text-white">
                    Stay updated on new arrivals, discounts, and more.
                  </p>
                </div>
              </div>

              <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
                <form className="w-full">
                  <label htmlFor="UserEmail" className="sr-only">
                    Email
                  </label>
                  <div className="border border-gray-100 p-2 focus-within:ring sm:flex sm:items-center sm:gap-4">
                    <input
                      type="email"
                      id="UserEmail"
                      placeholder="john@doe.com"
                      className="w-full py-3 px-1 border-none focus:border-transparent focus:ring-transparent sm:text-sm"
                    />
                    <button className="mt-1 w-full bg-black px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none sm:mt-0 sm:w-auto sm:shrink-0">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>

              {/* Product Categories */}
              <div className="col-span-2 sm:col-span-1">
                <p className="font-medium text-gray-900">Categories</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li><a href="#" className="text-white hover:opacity-75">Smartphones</a></li>
                  <li><a href="#" className="text-white hover:opacity-75">Laptops</a></li>
                  <li><a href="#" className="text-white hover:opacity-75">Skincare</a></li>
                  <li><a href="#" className="text-white hover:opacity-75">Groceries</a></li>
                  <li><a href="#" className="text-white hover:opacity-75">Home Decoration</a></li>
                </ul>
              </div>

              {/* Customer Support */}
              <div className="col-span-2 sm:col-span-1">
                <p className="font-medium text-gray-900">Customer Support</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li><a href="#" className="text-white hover:opacity-75">Track Order</a></li>
                  <li><a href="#" className="text-white hover:opacity-75">Returns</a></li>
                  <li><a href="#" className="text-white hover:opacity-75">Shipping Info</a></li>
                  <li><a href="#" className="text-white hover:opacity-75">FAQs</a></li>
                </ul>
              </div>

              {/* About Us */}
              <div className="col-span-2 sm:col-span-1">
                <p className="font-medium text-gray-900">About</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li><a href="#" className="text-white hover:opacity-75">Our Story</a></li>
                  <li><a href="#" className="text-white hover:opacity-75">Careers</a></li>
                  <li><a href="#" className="text-white hover:opacity-75">Press</a></li>
                </ul>
              </div>

              {/* Policies */}
              <div className="col-span-2 sm:col-span-1">
                <p className="font-medium text-gray-900">Policy</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li><a href="#" className="text-white hover:opacity-75">Return Policy</a></li>
                  <li><a href="#" className="text-white hover:opacity-75">Privacy Policy</a></li>
                  <li><a href="#" className="text-white hover:opacity-75">Terms & Conditions</a></li>
                </ul>
              </div>

              {/* Social Media */}
              <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end">
                {/* Social links stay the same */}
                {/* ... (social icons code you already have) */}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <div className="sm:flex sm:justify-between">
              <p className="text-xs text-white">
                &copy; Designed & Developed by <span>Rohit</span>
              </p>
              <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
                <li><a href="#" className="text-white hover:opacity-75">Terms & Conditions</a></li>
                <li><a href="#" className="text-white hover:opacity-75">Privacy Policy</a></li>
                <li><a href="#" className="text-white hover:opacity-75">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
