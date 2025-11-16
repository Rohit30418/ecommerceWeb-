import React, { useState, useEffect, useMemo, useRef } from "react";
import { Menu } from "../../../utils/MenuData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { toast } from "react-toastify";
import { logoutUser } from "../../../Redux/UserSlice";

const Header = () => {
  const user = useSelector((state) => state?.user?.userData);
  const isLoggedin = useSelector((state) => state?.user?.isLoggedIn);
  const cartCount = useSelector((state) => state?.user?.myCart || []);
  const darkColor = useSelector((state) => state?.DarkColor?.DarkColor);

  const [userDetails, setUserDetails] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [isSticky, setSticky] = useState(false);
  const [isDropOpen, setDropOpen] = useState(null); // used only for mobile
  const [isProfileDropActive, SetIsProfileDropActive] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isSearchDrop, setIsSearchDrop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true" || false
  );
  const [keyboardIndex, setKeyboardIndex] = useState(0);

  const headerRef = useRef(null);
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const localstorageCart = JSON.parse(localStorage.getItem("cartItem")) || [];

  console.log(user);
  
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
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    getUserData();
  }, [user?.uid]);

  // Handle outside click (search close)
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

  // 🔍 Search & Keyboard Navigation
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
        <span className="text-brandOrange">
          {text.substring(startIndex, endIndex)}
        </span>
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

  useEffect(() => {
    if (!isSearchDrop) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredMenuItems, isSearchDrop, keyboardIndex]);

  // 🔑 Logout
  function handleLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logoutUser());
        toast.success("Logout successfully");
        navigation("/login");
        SetIsProfileDropActive(false);
      })
      .catch((error) => console.error("Logout failed", error));
  }

  return (
    <>
      <div
        ref={headerRef}
        className={`${isSticky ? "fixed top-0 left-0 right-0 z-30" : "static"}`}
      >
        {/* ✅ Top Bar */}
        <div className="px-5 py-3 bg-brandOrange flex items-center justify-end md:justify-between">
          <div className="text-white hidden md:block">
            <span>
              <i className="fas fa-phone-alt"></i> +48 146982059
            </span>{" "}
            <span>
              <i className="fas fa-envelope"></i> rohitpant@gmail.com
            </span>
          </div>

          <div className="hidden gap-5 items-center">
            {/* Dark Toggle */}
            <button
              aria-label="modeToggle"
              className="text-white text-xl"
              onClick={toggleDark}
            >
              {darkMode ? (
                <i aria-hidden="true" className="fa fa-sun"></i>
              ) : (
                <i aria-hidden="true" className="fa fa-moon"></i>
              )}
            </button>

            {/* Profile / Login */}
            {!isLoggedin ? (
              <Link className="text-white font-black" to="/Login">
                <i className="fas fa-user"></i> Login
              </Link>
            ) : (
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
            )}

            {/* Cart */}
            <Link
              className="text-white relative font-black"
              to={"/cart"}
              aria-label="Cart"
            >
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              {(isLoggedin ? cartCount : localstorageCart).length > 0 && (
                <small className="flex absolute top-[-5px] right-[-10px] justify-center items-center w-4 h-4 bg-red-600 rounded-full text-white">
                  {(isLoggedin ? cartCount : localstorageCart).length}
                </small>
              )}
            </Link>
          </div>
        </div>

        {/* ✅ Main Nav */}
        <header
          className={`lg:relative ${
            location.pathname !== "/" && "dark:border-b-gray-400 border-b"
          } rounded-b-3xl header glass-card dark:bg-darkBg lg:rounded-none w-full z-[1000]`}
        >
          <nav className="flex gap-x-5 justify-between items-center px-5 py-5 text-black">
            {/* Logo */}
            <div>
              <h1 className="font-bold text-4xl dark:text-white">
                <Link to="/">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                  Kharee
                  <span className="text-brandOrange dark:text-brandOrange">
                    do
                  </span>
                </Link>
              </h1>
            </div>

            {/* Desktop Search */}
            <div className="w-full hidden xl:max-w-xl max-w-xs md:flex gap-2 relative">
              <input
                onChange={search}
                value={searchText}
                placeholder="Search Items Here"
                className="text-black outline-none bg-gray-200/80  p-2 rounded-md w-full"
                type="search"
              />
              <i className="fa fa-search absolute right-[10px] top-[50%] translate-y-[-50%] text-black"></i>

              {isSearchDrop && (
                <div className="absolute w-full top-[100%]">
                  <div className="h-40 overflow-auto shadow-md rounded-lg p-2 bg-white">
                    {filteredMenuItems.length > 0 ? (
                      filteredMenuItems.map((submenu, ind) => (
                        <button
                          key={submenu}
                          ref={(el) => (itemRefs.current[ind] = el)}
                          type="button"
                          onClick={() => {
                            navigation(`/productCategory/${submenu}`);
                            setIsMenuOpened(false);
                            setSearchText("");
                            setIsSearchDrop(false);
                          }}
                          className={`text-black ${
                            ind === keyboardIndex && "bg-brandOrange/20"
                          } px-2 rounded-md py-1 text-left w-full block`}
                        >
                          {highlightText(submenu, searchText)}
                        </button>
                      ))
                    ) : (
                      <div className="text-black">No results found</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ✅ Hamburger */}
            <div className="block lg:hidden">
              <button
                aria-label="menu toggle"
                className="text-black"
                onClick={() => setIsMenuOpened(true)}
              >
                <i className="fa text-2xl fa-bars"></i>
              </button>
            </div>

            {/* ✅ Desktop Menu (hover only) */}
            <ul className="hidden lg:flex gap-5">
              {Menu.map((menuitem,index) => (

              
           <li
  key={menuitem.main}
  className="relative transition dropmenu font-semibold"
>
  <button
    tabIndex="0"
    className="dark:text-lightBg p-2 rounded-md flex items-center hover:bg-brandOrange hover:text-white"
  >
    {menuitem.main}
    <i className="fa fa-angle-down ml-1"></i>
  </button>

  {/* Hover dropdown */}
  <div className={`dropdown absolute w-[200px]  ${index === Menu.length - 1?"left-[-120px]":"left-0"} top-full mt-2 bg-white shadow-md p-2 rounded-md z-50`}>
    {menuitem.sub.map((submenu) => (
      <Link
        key={submenu}
        to={`/productCategory/${submenu}`}
        className="block  px-2 py-1 hover:text-brandOrange"
      >
        {submenu.charAt(0).toUpperCase()+ submenu.slice(1)}
      </Link>
    ))}
  </div>
</li>


              ))}
            </ul>
          </nav>
        </header>
      </div>

      {/* ✅ Mobile Menu Drawer */}
      <div
        className={`fixed top-0 category left-0 h-full w-[75%] max-w-sm shadow-lg z-[2000] transform transition-transform duration-300 ${
          isMenuOpened ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
       <h1 className="font-bold text-4xl dark:text-white">
                <Link to="/">
                  Kharee
                  <span className="lg:text-brandOrange text-white dark:text-brandOrange">
                    do
                  </span>
                </Link>
              </h1>
          <button
            onClick={() => setIsMenuOpened(false)}
            className="text-xl text-red-600"
          >
            <i className="fa fa-times"></i>
          </button>
        </div>

        <div className="p-4">
          {Menu.map((menuitem) => (
            <div key={menuitem.main} className="mb-2">
              <button
                className="flex justify-between w-full py-2 font-semibold"
                onClick={() =>
                  setDropOpen((prev) =>
                    prev === menuitem.main ? null : menuitem.main
                  )
                }
              >
                {menuitem.main}
                <i
                  className={`fa ${
                    isDropOpen === menuitem.main
                      ? "fa-angle-up"
                      : "fa-angle-down"
                  }`}
                ></i>
              </button>
              {isDropOpen === menuitem.main && (
                <ul className="ml-4">
                  {menuitem.sub.map((submenu) => (
                    <li key={submenu} className="py-1">
                      <Link
                        to={`/productCategory/${submenu}`}
                        onClick={() => setIsMenuOpened(false)}
                      >
                        {submenu}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Overlay */}
      {isMenuOpened && (
        <div
          onClick={() => setIsMenuOpened(false)}
          className="fixed inset-0 bg-black/60 z-[1500]"
        />
      )}
    </>
  );
};

export default Header;
