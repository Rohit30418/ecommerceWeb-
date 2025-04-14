import {React,useEffect, useState} from "react"
import { fetchApi } from "../fatchApi/fetchApi"
import ProductCard from "./ProductCard";


const Relateditem=({category})=>{
const {loading,response,error,apidata}=  fetchApi();
const [page,setPage]=useState(1);

   
  useEffect(() => {
    apidata(`products/category/${category}`);
  }, [category]);

  const totalPages = response?.products
  ? Math.ceil(response.products.length / 3)
  : 0;


    return <>
      <div className='flex flex-wrap'>
          {response?.products?.slice(page*3-3,page*3)?.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        <div className="flex justify-center items-center gap-2">
          {
           [...Array(totalPages)].map((_,ind)=>(
        
              <button className={`${page-1==ind?"bg-green-800":"bg-gray-800"} px-4 py-2 rounded-md text-white`} onClick={()=>{
                setPage(ind+1)
              }}>{ind+1}</button>
             
           ))
          }
        </div>
    </>
}



export default Relateditem