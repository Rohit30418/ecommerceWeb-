import {React,useEffect, useState} from "react"
import { fetchApi } from "../../services/fetchApi"
import ProductCard from "./ProductCard";


const Relateditem=({category})=>{
const {loading,response,error,apidata}=  fetchApi();
const [page,setPage]=useState(1);

   
  useEffect(() => {
    apidata(`products/category/${category}`);
  }, [category]);

  const totalPages = response?.products
  ? Math.ceil(response.products.length / 6)
  : 0;

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    return <>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
          {response?.products?.slice(page*6-6,page*6)?.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        {totalPages > 1 && <div className="flex mt-5 justify-center items-center gap-2">
          {
           [...Array(totalPages)].map((_,ind)=>(
        
              <button key={ind} className={`${page-1==ind?"bg-brandOrange":"bg-gray-800"} px-4 py-2 rounded-md text-white`} onClick={()=>{
                setPage(ind+1)
              }}>{ind+1}</button>
             
           ))
          }
        </div>}
    </>
}



export default Relateditem