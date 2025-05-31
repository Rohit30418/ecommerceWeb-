import React, { useState, useEffect, useMemo, useRef } from "react";
import { Menu } from "./utils/MenuData";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const Header = () => {
  const user = useSelector((state) => state?.user?.userData);
  const lightColor = useSelector((state) => state?.LightColor?.LightColor);
  const cartCount = useSelector((state) => state?.user?.myCart || []);
  const darkColor = useSelector((state) => state?.DarkColor?.DarkColor);

  const [userDetails, setUserDetails] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isSticky, setSticky] = useState(false);
  const [isDropOpen, setDropOpen] = useState(null);
  const [isProfileDropActive, SetIsProfileDropActive] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isSeachDrop, setIsSearchDrop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef(null);
  const navigation = useNavigate();

  // Sticky Header
  useEffect(() => {
    function handleScroll() {
      setSticky(window.scrollY > 100);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  console.log(userDetails);
  
  

  // Mobile width check
  useEffect(() => {
    function checkWidth() {
      setIsMobile(window.innerWidth <= 992);
    }
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Fetch user details from Firebase
  useEffect(() => {
    if (!user?.uid) return;

    async function getUserData() {
      const userRef = doc(db, "users", user?.uid);
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    getUserData();
  }, [user?.uid]);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsSearchDrop(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpened ? "hidden" : "auto";
  }, [isMenuOpened]);

  const search = (e) => {
    setSearchText(e.target.value);
    setIsSearchDrop(true);
  };

  const highlightText = (text, searchText) => {
    if (!searchText) return text;

    const startIndex = text.toLowerCase().indexOf(searchText.toLowerCase());
    if (startIndex === -1) return text;

    const endIndex = startIndex + searchText.length;
    return (
      <>
        {text.substring(0, startIndex)}
        <span className="text-blue-500">{text.substring(startIndex, endIndex)}</span>
        {text.substring(endIndex)}
      </>
    );
  };

  const filteredMenuItems = useMemo(
    () =>
      Menu.flatMap((menuitem) =>
        menuitem.sub.filter((submenu) =>
          submenu.toLowerCase().includes(searchText.toLowerCase())
        )
      ),
    [searchText]
  );

  function handleLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Successfully signed out");
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  }

  return (
    <>
      {/* Sample popup */}
      {/* <div className="w-64 shadow-lg fixed top-[50%] h-[250px] bg-white -translate-y-[50%] z-30 left-[50%] -translate-x-[50%] rounded-md">
        popup
      </div> */}

      {/* Header */}
      <div
        style={{ backgroundColor: darkColor }}
        className={`${isSticky ? "fixed top-0 left-0 right-0 z-30" : "static"}`}
      >
        {/* Top bar */}
        <div className="px-5 py-2 bg-black flex items-center justify-end md:justify-between">
          <div className="text-white hidden md:block">
            <span>
              <i className="fas fa-phone-alt"></i> +48 146982059
            </span>{" "}
            <span>
              <i className="fas fa-envelope"></i> rohitpant@gmail.com
            </span>
          </div>

          <div className="flex gap-x-5 justify-end items-center">
            {!user?.auth?.currentUser ? (
              <Link className="text-white font-black" to="/Login">
                <i className="fas fa-user"></i> Login
              </Link>
            ) : (

        <>
        
         <div className="flex gap-1 text-white items-center">
           <p>Hi {userDetails?.firstName}</p>
                <i className="fa fa-user "></i>
         </div>

         <div class="text-white">My Order</div>
        </>

              // <div
              //   className="relative"
              //   onMouseEnter={() => SetIsProfileDropActive(true)}
              //   onMouseLeave={() => SetIsProfileDropActive(false)}
              // >
              //   <p>Hi {userDetails?.firstName}</p>
              //   <i className="fa fa-user text-white"></i>
              //   {isProfileDropActive && (
              //     <div className="absolute bg-white w-[158px] z-[10000] right-[10px] shadow-lg h-[84px] rounded-sm p-1">
              //       <button className="block">
              //         <i className="fa fa-user"></i> My Profile
              //       </button>
              //       <button className="block mt-2" onClick={handleLogout}>
              //         <i className="fa fa-sign-out"></i> Logout
              //       </button>
              //     </div>
              //   )}
              // </div>
            )}

            <Link className="text-white relative font-black" to={user ? "/cart" : "/Login"}>
              Cart
              {Array.isArray(cartCount) && cartCount.length > 0 && (
                <>
                  <small className="flex absolute top-[-5px] right-[-10px] justify-center items-center w-4 h-4 bg-red-600 rounded-full text-white">
                    {cartCount.length}
                  </small>
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </>
              )}
            </Link>
          </div>
        </div>

        {/* Main Nav */}
        <header ref={headerRef} className="lg:relative shadow-xl bg-white w-full z-[1000]">
          <nav className="flex gap-x-5 justify-between items-center p-5 text-black">
            {/* Logo */}
            <div>
              <img
                src="https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png"
                alt="Logo"
                className="w-20"
              />
            </div>

            {/* Search */}
            <div className="w-full xl:max-w-xl max-w-xs flex gap-2 relative">
              <input
                onChange={search}
                value={searchText}
                placeholder="Search Items Here"
                style={{ backgroundColor: lightColor, border: `1px solid ${darkColor}` }}
                className="text-black outline-none p-2 rounded-full w-full"
                type="search"
              />
              <i className="fa fa-search absolute right-[10px] top-[50%] translate-y-[-50%] text-black"></i>

              {isSeachDrop && (
                <div className="meunulist absolute w-full top-[100%]">
                  <div className="h-40 overflow-auto shadow-md rounded-lg p-2 bg-white">
                    {filteredMenuItems.length > 0 ? (
                      filteredMenuItems.map((submenu) => (
                        <div key={submenu}>
                          <button
                            onClick={() => {
                              navigation(`/productCategory/${submenu}`);
                              setIsMenuOpened(false);
                              setSearchText("");
                            }}
                            className="text-black block"
                          >
                            {highlightText(submenu, searchText)}
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-black block">No results found</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Menu */}
            <div
              className={`menus lg:static fixed bottom-0 transition-all duration-150 top-0 w-[50vw] ${
                isMenuOpened ? "right-0" : "right-[-100%]"
              } bg-white lg:bg-transparent z-50`}
            >
              <button
                className="lg:hidden bg-red-600 text-white rounded-full m-1 w-6 h-6"
                onClick={() => setIsMenuOpened(false)}
              >
                <i className="fa fa-times"></i>
              </button>

              <ul className="flex pt-4 flex-col lg:flex-row justify-between lg:justify-end items-start gap-5 lg:items-center">
                {Menu.map((menuitem) => (
                  <li
                    className="lg:relative dropmenu font-semibold"
                    key={menuitem.main}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isMobile) {
                        setDropOpen((prev) => (prev === menuitem.main ? null : menuitem.main));
                      }
                    }}
                  >
                    <button className={`bg-white hover:bg-[${darkColor}] rounded-full px-2 py-1`}>
                      {menuitem.main} <i className="fa fa-angle-down"></i>
                    </button>

                    <div
                      className={`dropdown rounded-lg shadow-md ${
                        isDropOpen === menuitem.main ? "active" : ""
                      } shadow lg:absolute transition-all duration-700 bg-white top-full p-4`}
                    >
                      <ul>
                        {menuitem.sub.map((submenu) => (
                          <li key={submenu}>
                            <Link
                              className="capitalize text-black block mb-2 whitespace-nowrap"
                              to={`/productCategory/${submenu}`}
                            >
                              {submenu}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hamburger Menu Button */}
            <div className="block lg:hidden">
              <button onClick={() => setIsMenuOpened(true)}>
                <i className="fa fa-bars"></i>
              </button>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Header;
