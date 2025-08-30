import React from 'react'
import { fetchApi } from '../fatchApi/fetchApi'
import { useEffect } from 'react'
import ProductCard from '../Product/ProductCard'
import Cardloader from '../Product/Cardloader'


const LeftBody = () => {
    const {loading,response,error,apidata}=  fetchApi();

  

    useEffect(() => {
        apidata("products/search?q=phone");
    }, []);


    if (loading) {
      return <div className='flex flex-wrap'>
      
      
      <Cardloader></Cardloader>
      <Cardloader></Cardloader>
      <Cardloader></Cardloader>
      <Cardloader></Cardloader>
      <Cardloader></Cardloader>
      <Cardloader></Cardloader>
      <Cardloader></Cardloader>
      
      </div>
    }
    
  return (
    <div className='flex flex-wrap'>   
    {
        response?.products?.map((item,ind)=>{
    return  <ProductCard  item={item} id={item.id}></ProductCard>
        })
       } 
    </div>
  )
}

export default LeftBody