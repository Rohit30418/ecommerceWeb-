import React, { useRef,useEffect} from 'react';
import { gsap } from 'gsap';
import 'react-medium-image-zoom/dist/styles.css'
import { Starrate } from '../../ui/Starrate';
import { Link } from 'react-router-dom';
import { db } from '../../services/firebase';
import { collection, addDoc, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import LazyImg from '../../common/LazyImg';
import {toast } from 'react-toastify';


const ProductCard = ({ item }) => {
  const imgRef = useRef(null);
  const iconsRef = useRef(null);
  const userId = useSelector((state) => state?.user?.userData?.uid)
  
  // let noOfClick=1;
  const handleMouseEnter = () => {
    gsap.to(imgRef.current.querySelector("img"), { scale: 1.1, x: -20, duration: 2 });
    gsap.to(iconsRef.current.querySelectorAll("i"), { x: 0, duration: 0.5, stagger: 0.2 });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current.querySelector("img"), { scale: 1, x: 0, duration: 2 });
    gsap.to(iconsRef.current.querySelectorAll(".icons i"), { x: 60, duration: 0.5, stagger: 0.2 });
  };


  async function AddToCart() {
    const id = Date.now(); // Generate a unique ID for the toast

    if (!userId) {
     const exisitingCartItem = JSON.parse(localStorage.getItem("cartItem"));
        const newCartItem = {
        tempid:Date.now(),
        itemId: item.id,
        title: item.title,
        price: item.price,
        discountPercentage: item.discountPercentage,
        thumbnail: item?.thumbnail,
        quantity: 1,
        status: "Placed",
        date: new Date().toISOString(),
      }      
      const updatedCartItem = exisitingCartItem? [...exisitingCartItem, newCartItem]:[newCartItem];
      localStorage.setItem("cartItem", JSON.stringify(updatedCartItem));
    }else{

    try {
      const userDocRef = doc(db, 'users', userId);
      const cartCollectionRef = collection(userDocRef, 'cart');
      await addDoc(cartCollectionRef, {
        itemId: item.id,
        title: item.title,
        price: item.price,
        discountPercentage: item.discountPercentage,
        thumbnail: item?.thumbnail,
        quantity: 1,
        status: "Placed",
        date: new Date().toISOString(),
      });

      // dispatch();

      toast.success("Item is added to the cart")

      // Set a timeout for removing the toast
      // setTimeout(() => {
      //   dispatch(removeToste(id));
      // }, 3000*noOfClick); // 3 seconds
      //  noOfClick++
    } catch (error) {
      alert(error.message);
    }
    }
  }

  return (
   <>
    <div 
      className='w-full  h-100 card' 
      ref={imgRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={iconsRef}
        className='product_card rounded-md relative bg-gray-200 dark:bg-gray-400/10 p-2 sm:p-5 overflow-hidden block h-100 min-h-40 text-left'
      >
        <div className='flex p-1 flex-col icons gap-3 top-2 absolute z-10 right-2'>
          <i className='fa fa-heart sm:text-lg text-white rounded-sm w-10 h-10 grid place-content-center translate-x-[60px]  bg-brandOrange'  ></i>
          <i aria-label='add to cart' className='fa fa-cart-shopping sm:text-lg text-white w-10 rounded-sm h-10 grid place-content-center translate-x-[60px] cursor-pointer bg-brandOrange' onClick={AddToCart}></i>
          <Link to={`/ProductDetail/${item.id}`} al><i className='fa fa-eye rounded-sm sm:text-lg text-white w-10 h-10 grid place-content-center translate-x-[60px]  bg-brandOrange' ></i></Link>
        </div>
        <div className='  h-[150px] md:h-60 overflow-hidden bg-white rounded-md'>
  
         <LazyImg  src={item?.thumbnail}
            className='w-full h-full mb-3 object-contain mx-auto ease-in-out duration-75'></LazyImg>
             
        </div>
        <div className='py-4'>
          <p className='mb-3 text-sm sm:text-lg dark:text-darkText whitespace-nowrap  font-medium'>{item.title}</p>
          <div className='flex justify-between flex-wrap gap-2 items-center'>
            <p className='text-sm'><i className="fas fa-rupee-sign text-brandOrange"></i> <span className='text-green-600 font-bold'>{Math.floor(Math.floor(item.price * 85)*(1-item.discountPercentage/100))}</span> <s className='text-red-600'>{Math.floor(item.price * 85)} </s>  </p>
            {/* <p className='absolute top-2 text-white left-2 bg-brandOrange rounded-full p-1'> {item.discountPercentage}% off</p> */}
            <Starrate rating={Math.floor(item?.rating) }  />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default ProductCard;
