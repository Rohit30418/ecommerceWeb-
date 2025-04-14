import React, { useState, useEffect,useMemo, useRef } from "react";
import { Menu } from "./utils/MenuData"; // Assuming you have a file with menu data
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const color = useSelector((state) => state.color.color);
    const uid = useSelector((state) => state?.user?.userid);
    const cartCount = useSelector((state) => state?.user?.myCart);
    const darkColor=useSelector((state)=>state?.DarkColor?.DarkColor)
    const [searchText, setSearchText] = useState("");
    const [isDropOpen, setDropOpen] = useState(null);
    const [activeNav, setActiveNav] = useState(null);
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isSeachDrop,setIsSearchDrop]=useState(false)
    const [isMobile,setIsMobile]=useState(false);
    const headerRef = useRef(null);
    const navigation = useNavigate();

  

    useEffect(()=>{
          function checkWidth() {
            const device=window.innerWidth<=992;
            setIsMobile(device);
          }
          checkWidth();

          window.addEventListener("resize",checkWidth);

          return ()=>{
            
            window.removeEventListener("resize",checkWidth);
          }
    },[])



    const handleClickOutside = (event) => {
        // if (headerRef.current && !headerRef.current.contains(event.target)) {
            setIsSearchDrop(null);
          //  setIsMenuOpened(false);
        // }

        //setDropOpen(null);
        
    };


    useEffect(() => {
          document.addEventListener("mousedown", handleClickOutside);
         return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

    const filteredMenuItems = useMemo(() => 
        Menu.flatMap(menuitem =>
            menuitem.sub.filter(submenu =>
                submenu.toLowerCase().includes(searchText.toLowerCase())
            )
        ), [searchText]
    );
    

    console.log(isDropOpen);
    

    return (
        <>

        <div style={{"backgroundColor":darkColor}}>
            <div className="px-5 py-2 bg-black flex items-center justify-between">

                <div class="text-white"><span> <i class="fas fa-phone-alt"></i> +48 146982059</span> <span><i class="fas fa-envelope"></i> rohitpant@gmail.com</span></div>
                <div className="flex gap-x-5 justify-end items-center ">
                    <Link className="text-white font-black" to="/Login"><i className="fas fa-user"></i> Login</Link>
                    <Link className="text-white relative font-black" to={uid ? "/cart" : "/Login"}>Cart <small className="flex absolute top-[-5px] right-[-10px] justify-center items-center w-4 h-4 bg-red-600 rounded-full  text-white">{cartCount.length}</small> <i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
                </div>
            </div>
            <header ref={headerRef} className="lg:relative shadow-xl bg-opacity-80 w-full z-50" >
                <nav className="flex gap-x-5  justify-between items-center p-5 text-white">
                    <div>
                        <img src="https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png" alt="" className="w-20" />
                    </div>
                    <div className="w-full xl:max-w-xl max-w-xs flex gap-2 relative">
                        <input 
                        // onBlur={()=>{
                        //     setIsMenuOpened(false)
                        // }} 
                        onChange={search} value={searchText} placeholder="Search Items Here" className="text-black outline-none p-2 rounded-full w-full " type="search" />
                        <i className="fa fa-search absolute right-[10px] top-[50%] translate-y-[-50%] text-black"></i>


{
    isSeachDrop && <div className="meunulist absolute w-full  top-[100%]">
    <div name="" className="h-40 overflow-auto shadow-md rounded-lg p-2 bg-white" id="">
        {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((submenu) => (
                <div key={submenu}>
                    <button onClick={(e)=>{
                       navigation(`/productCategory/${submenu}`);
                       setIsMenuOpened(false);
                       setSearchText("")
                    }} className="text-black block" value="submenu">
                        {highlightText(submenu, searchText)}
                    </button>
                </div>
            ))
        ) : (
            <div className="text-black block">No results found</div>
        )}
    </div>
</div>
}
                        
                    </div>
                    <div className={`menus lg:static fixed bottom-0 transition-all duration-150 top-0 w-[50vw] ${isMenuOpened ? "right-0" : "right-[-100%]"} bg-black lg:bg-transparent z-50`}>
                        <button className="lg:hidden" onClick={() => setIsMenuOpened(false)}>close</button>
                   
                        <ul className="flex flex-col lg:flex-row justify-between lg:justify-end items-start gap-5 lg:items-center">
    {Menu.map((menuitem) => (
        <li 
            className="lg:relative dropmenu font-semibold"
            key={menuitem.main}
            

            onClick={(e) => {               
                e.stopPropagation();
                  if (isMobile) {
                    setDropOpen((prev)=>prev===menuitem.main?null:menuitem.main);
                  }
               }}
          
        >
            <button className="hover:bg-black rounded-full px-2 py-1">
                {menuitem.main} <i className="fa fa-angle-down"></i>
            </button>

            <div className={`dropdown  rounded-lg shadow-md ${isDropOpen === menuitem.main ? "active" : ""} shadow lg:absolute transition-all duration-700 bg-white top-full p-4`}>
                <ul>
                    {menuitem.sub.map((submenu) => (
                        <li key={submenu}>
                            <Link className="capitalize text-black block mb-2 whitespace-nowrap" to={`/productCategory/${submenu}`}>
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
                    <div className="block lg:hidden">
                        <button onClick={() => setIsMenuOpened(true)}>menu</button>
                    </div>
                </nav>
            </header>
            </div>
        </>
    );
};

export default Header;
