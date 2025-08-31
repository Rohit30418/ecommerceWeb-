import React, { useRef } from 'react'
import { useEffect,useState } from 'react'


const LazyImg = ({src,className}) => {
const [isLoading,setIsloading]=useState(true);
const imgRef=useRef(null);
useEffect(()=>{
const observer=new IntersectionObserver(([entry])=>{
    if (entry.isIntersecting && imgRef.current) {
        imgRef.current.src=src;
        observer.unobserve(imgRef.current);
    }
})

if (imgRef.current) {
    observer.observe(imgRef.current);
}

return()=>{
    if (imgRef.current) {
        observer.unobserve(imgRef.current);
    }
}

},[src])

  return (
    <img ref={imgRef} src={src} className={className}  alt="img"/>
  )
}

export default LazyImg