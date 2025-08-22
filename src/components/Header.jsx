import React, { useState, useEffect, useMemo, useRef } from "react";
import { Menu } from "./utils/MenuData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { logoutUser } from "./Redux/UserSlice";
import { log } from "three/examples/jsm/nodes/Nodes.js";

const Header = () => {
  const user = useSelector((state) => state?.user?.userData);
  const isLoggedin = useSelector((state) => state?.user?.isLoggedIn);
  const cartCount = useSelector((state) => state?.user?.myCart || []);
  const darkColor = useSelector((state) => state?.DarkColor?.DarkColor);
  const [userDetails, setUserDetails] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isSticky, setSticky] = useState(false);
  const [isDropOpen, setDropOpen] = useState(null);
  const [isProfileDropActive, SetIsProfileDropActive] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isSearchDrop, setIsSearchDrop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(()=>localStorage.getItem("darkMode") === "true" || false);
  const [keyboardIndex, setKeyboardIndex] = useState(0);
  const headerRef = useRef(null);
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

const localstorageCart = JSON.parse(localStorage.getItem("cartItem")) || [];

  


  // Sticky Header
  useEffect(() => {
    function handleScroll() {
      setSticky(window.scrollY > 100);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const toggleDark = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  useEffect(() => {
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.toggle(!darkMode ? "dark" : "light");
  }, [darkMode]);
  


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

const itemRefs = useRef([]);

// Keyboard navigation
const handleKeyDown = (e) => {
  if (!isSearchDrop) return;
  if (e.key === "ArrowUp") {
    setKeyboardIndex((prev) => Math.max(prev - 1, 0));
  } else if (e.key === "ArrowDown") {
    setKeyboardIndex((prev) =>
      Math.min(prev + 1, filteredMenuItems.length - 1)
    );
  } else if (e.key === "Enter") {
    const selectedItem = filteredMenuItems[keyboardIndex];
    if (selectedItem) {
      navigation(`/productCategory/${selectedItem}`);
      setSearchText("");
      setIsSearchDrop(false);
      setKeyboardIndex(0);
    }
  }
};

// Scroll highlighted item into view whenever keyboardIndex changes
useEffect(() => {
  if (!isSearchDrop) return;
  const currentItem = itemRefs.current[keyboardIndex];
  if (currentItem) {
    currentItem.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }
}, [keyboardIndex, isSearchDrop]);

// Attach listener only when dropdown is open
useEffect(() => {
  if (!isSearchDrop) return;
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [filteredMenuItems,isSearchDrop, keyboardIndex]);

  function handleLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logoutUser());
        toast.success("Logout successfully");
        navigation("/login");
        SetIsProfileDropActive(false);
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  }

console.log(localstorageCart.length);

  return (
    <>
      <div
        ref={headerRef}
        className={`${isSticky ? "fixed top-0 left-0 right-0 z-30" : "static"}`}
      >
        {/* Top bar */}
        <div className="px-5 py-3 bg-brandOrange flex items-center justify-end md:justify-between">
          <div className="text-white hidden md:block">
            <span>
              <i className="fas fa-phone-alt"></i> +48 146982059
            </span>{" "}
            <span>
              <i className="fas fa-envelope"></i> rohitpant@gmail.com
            </span>
          </div>

           <div className="flex gap-5">
            <button
                  className="text-white text-xl"
                  onClick={() => {
                    toggleDark();
                  }}
                >
                  {darkMode ? <i className="fa fa-sun"></i> : <i className="fa fa-moon"></i>}
                </button>

          <div className="flex gap-x-5 justify-end items-center">
            {!isLoggedin ? (
              <Link className="text-white font-black" to="/Login">
                <i className="fas fa-user"></i> Login
              </Link>
            ) : (
              <>
               

                <div
                  className="relative"
                  onMouseEnter={() => SetIsProfileDropActive(true)}
                  onMouseLeave={() => SetIsProfileDropActive(false)}
                >
                  <div className="flex text-white gap-1 items-center">
                    <p>Hi {userDetails?.firstName}</p>
                    <i className="fa fa-user text-white"></i>
                  </div>
                  {isProfileDropActive && (
                    <div className="absolute bg-white w-[158px] z-[10000] right-[10px] shadow-lg h-[74px] rounded-md p-1">
                      <button className="block">
                        <i className="fa fa-user"></i>{" "}
                        <Link to="/order">My Orders</Link>
                      </button>
                      <button className="block mt-3" onClick={handleLogout}>
                        <i className="fa fa-sign-out"></i> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            <Link
              className="text-white relative font-black"
              aria-label={isLoggedin ? "login" : "Cartnpm "}
              to={"/cart"}
            >
              Cart

{
  isLoggedin ? (
    <>
      {Array.isArray(cartCount) && cartCount.length > 0 && (
        <small className="flex absolute top-[-5px] right-[-10px] justify-center items-center w-4 h-4 bg-red-600 rounded-full text-white">
          {cartCount.length}
        </small>
      )}
      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
    </>
  ) : (
    <>
      {Array.isArray(localstorageCart) && localstorageCart.length > 0 && (
        <small className="flex absolute top-[-5px] right-[-10px] justify-center items-center w-4 h-4 bg-red-600 rounded-full text-white">
          {localstorageCart.length}
        </small>
      )}
      <i className="fa fa-shopping-cart" aria-hidden="true"></i>
    </>
  )
}


              
            </Link>
          </div>
           </div>
        </div>

        {/* Main Nav */}
        <header
          className={`lg:relative  ${
            location.pathname !== "/" && "dark:border-b-gray-400 border-b"
          } bg-brandOrange lg:bg-white rounded-b-3xl dark:bg-darkBg lg:rounded-none w-full z-[1000]`}
        >
          <nav className="flex gap-x-5 justify-between items-center px-5 py-5 text-black">
            {/* Logo */}
            <div>
              <h1 className="font-bold text-4xl dark:text-white"><Link to="/">Kharee<span className="lg:text-brandOrange text-white dark:text-brandOrange">do</span></Link></h1>
            </div>

            {/* Search */}
            <div className="w-full hidden xl:max-w-xl max-w-xs md:flex gap-2 relative">
              <input
                onChange={search}
                value={searchText}
                placeholder="Search Items Here"
                className="text-black outline-none bg-white lg:bg-gray-200/30 p-2 rounded-md w-full"
                type="search"
              />
              <i className="fa fa-search absolute right-[10px] top-[50%] translate-y-[-50%] text-black"></i>

              {isSearchDrop && (
                <div ref={headerRef} className="meunulist absolute w-full top-[100%]">
                  <div className="h-40 overflow-auto shadow-md rounded-lg p-2 bg-white">
                    {filteredMenuItems.length > 0 ? (
                      filteredMenuItems.map((submenu,ind) => (
                        <div key={submenu}>
                          <button
                            ref={(el)=>(itemRefs.current[ind]=el)}
                            type="button"
                            onClick={() => {
                              navigation(`/productCategory/${submenu}`);
                              setIsMenuOpened(false);
                              setSearchText("");
                              setIsSearchDrop(false);
                            }}
                            className={`text-black ${ind==keyboardIndex && "bg-brandOrange text-white "} px-2 rounded-md py-1 text-left w-full block`}
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
              style={{ backgroundColor: `${isMobile ? darkColor : ""}` }}
              className={`pt-3 lg:pt-0 overflow-auto lg:overflow-visible text-white lg:text-inherit menus lg:static px-5 lg:px-0 z-[1000] fixed bottom-0 transition-all duration-150 md:w-[40vw] top-0 w-[70vw] ${
                isMenuOpened ? "left-0" : "left-[-100%]"
              } bg-white lg:bg-transparent`}
            >
              <button
                className="lg:hidden bg-red-600 text-white rounded-full absolute right-2 w-6 h-6"
                onClick={() => setIsMenuOpened(false)}
              >
                <i className="fa fa-times"></i>
              </button>

              <div className="lg:hidden">
                <img
                  src="https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png"
                  alt="Logo"
                  className="w-20"
                />
              </div>

              <ul className="flex pt-4 lg:pt-0 flex-col lg:flex-row justify-between lg:justify-end items-start gap-5 lg:items-center">
                {Menu.map((menuitem) => (
                  <li
                    className="lg:relative text-md w-full dropmenu font-semibold"
                    key={menuitem.main}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isMobile) {
                        setDropOpen(
                          (prev) => (prev === menuitem.main ? null : menuitem.main)
                        );
                      }
                    }}
                  >
                    <button
                      className={`dark:text-lightBg transition-all duration-300 hover:bg-brandOrange py-2 flex items-center gap-1 justify-between lg:justify-center lg:text-center text-left rounded-sm px-1 w-full`}
                    >
                      {menuitem.main}
                      <i
                        className={`${
                          isDropOpen == menuitem.main ? "fa fa-angle-up" : "fa fa-angle-down"
                        }`}
                      ></i>
                    </button>

                    <div
                      className={`dropdown rounded-lg shadow-md ${
                        isDropOpen === menuitem.main ? "active" : ""
                      } shadow lg:absolute transition-all duration-700 bg-transparent lg:bg-white text-white lg:text-black top-full p-4 py-2`}
                    >
                      <ul>
                        {menuitem.sub.map((submenu) => (
                          <li key={submenu}>
                            <Link
                              onClick={() => {
                                setIsMenuOpened(false);
                                setDropOpen(null);
                              }}
                              className="capitalize block text-left  mb-2 hover:text-brandOrange transition-all duration-300 whitespace-nowrap"
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
              <button aria-label="menu toggle  " className="text-white lg:text-black" onClick={() => setIsMenuOpened(true)}>
                <i className="fa text-2xl fa-bars"></i>
              </button>
            </div>
          </nav>
        </header>
      </div>

      {isMenuOpened && (
        <div
          onClick={() => {
            setIsMenuOpened(false);
          }}
          className="bg-black/60 z-[20] fixed top-0 left-0 right-0 bottom-0 h-screen"
        ></div>
      )}
    </>
  );
};

export default Header;
