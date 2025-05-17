import React from 'react'
import { fetchApi } from '../fatchApi/fetchApi'
import { useEffect } from 'react'
import ProductCard from '../Product/ProductCard'
import Cardloader from '../Product/Cardloader'
import Accordion from '../Acoordion/Accordion'
import Footer from '../Footer'
import Toast from '../Toast'
import { useSelector } from 'react-redux'
import Testimonial from './Testimonial'
import Timer from '../Timer/Timer'
import Heading from '../utils/Heading';
import BrandLogos from './BrandLogos'
import TopBlogs from './TopBlogs'
import PromoMarquee from './PromoMarquee'




const MainBody = () => {
  const {loading,response,error,apidata}=  fetchApi();
  const color=useSelector((state)=>state.color.color);
  const LightColor=useSelector((state)=>state.LightColor.LightColor);
  const Tostes=useSelector((state)=>state.addToste);
  console.log(Tostes);
    useEffect(() => {
        apidata("products/category/mobile-accessories/?limit=6");
    }, []);


    if (loading) {
      return <div className='flex gap-4 flex-wrap'>
      
      
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
    
   <div className='relative bg-white'>
  {/* <span className='absolute   bg-white left-[-20px] right-[-20px] top-[-102px] rounded-[50%] h-[200px] bottom-0 h-8'></span> */}

 <BrandLogos></BrandLogos>

  {/* <div   style={{"backgroundColor":LightColor}}><div className="container py-14 mx-auto relative z-[5]">

<div >
  <Heading title={"We Provide best coustumer Experience"}></Heading>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 pb-5 " >
            
  <div className="p-6 feature  bg-white shadow-xl hover:shadow-none transition-all  rounded-lg"  style={{"borderBottom":`5px solid ${color}`}}>
              
    <div className="mb-5">
                
      <svg className="hi-outline hi-template inline-block w-12 h-12 "  stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
      </svg>
              
    </div>

    

    <h3 className="text-2xl font-bold mb-2">
                Product
              </h3>
              
    <p className="text-sm leading-6 text-gray-600">
Metus potenti velit sollicitudin porttitor magnis elit lacinia tempor varius, ut cras orci vitae parturient id nisi vulputate consectetur, primis venenatis cursus tristique malesuada viverra congue risus.
              </p>
            
  </div>
            
  <div className="p-6 feature  bg-white rounded-lg shadow-xl hover:shadow-none transition-all"  style={{"borderBottom":`5px solid ${color}`}}>
              
    <div className="mb-5">
                
      <svg className="hi-outline hi-cube inline-block w-12 h-12 "  stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
      </svg>
              
    </div>
              
    <h3 className="text-2xl font-bold mb-2">
                 Features
              </h3>
              
    <p className="text-sm leading-6 text-gray-600">
Metus potenti velit sollicitudin porttitor magnis elit lacinia tempor varius, ut cras orci vitae parturient id nisi vulputate consectetur, primis venenatis cursus tristique malesuada viverra congue risus.
              </p>
            
  </div>
            
  <div className="p-6 feature  bg-white  rounded-lg shadow-xl hover:shadow-none transition-all" style={{"borderBottom":`5px solid ${color}`}}>
              
    <div className="mb-5" >
                
      <svg className="hi-outline hi-cog inline-block w-12 h-12"  stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
              
    </div>
              
    <h3 className="font-bold mb-2 text-2xl">
                 Card
              </h3>
              
    <p className="text-sm leading-6 text-gray-600">
Metus potenti velit sollicitudin porttitor magnis elit lacinia tempor varius, ut cras orci vitae parturient id nisi vulputate consectetur, primis venenatis cursus tristique malesuada viverra congue risus.
              </p>
            
  </div>
            
  <div className="p-6 bg-white feature  rounded-lg shadow-xl hover:shadow-none transition-all"  style={{"borderBottom":`5px solid ${color}`}}>
              
    <div className="mb-5">
                
      <svg className="hi-outline hi-sparkles inline-block w-12 h-12 " stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
      </svg>
              
    </div>
              
    <h3 className=" font-bold mb-2 text-2xl">
                Design
              </h3>
              
    <p className="text-sm leading-6 text-gray-600">
Metus potenti velit sollicitudin porttitor magnis elit lacinia tempor varius, ut cras orci vitae parturient id nisi vulputate consectetur, primis venenatis cursus tristique malesuada viverra congue risus.
              </p>
            
  </div>
          
</div>
</div>
</div></div> */}



<div className="relative z-[5] pt-12">
<Heading title={"Feature Products"}></Heading>


<div className='container  mb-4'>
  <Timer></Timer>
</div>

<div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3  container'>   
{
   response?.products?.map((item,ind)=>{
return  <ProductCard  item={item} id={item.id}></ProductCard>
   })
  } 


{Tostes?.map((item,ind)=>{
 return <Toast message={item.message} top={ind} color="bg-green-500 mb-4" id={item.id}></Toast>
})}




</div>
</div>

<div>
  <PromoMarquee></PromoMarquee>
</div>


<div class="container">
  <div className='flex my-5'>
    <div className='w-5/12'>   
    <Heading textAlign={"text-left"} title={"Frequently Asked Questions"}></Heading>
    <p>Got questions? We’ve got answers.
    Find answers to the most common questions about our services, features, and support. If you don’t see your question here, feel free to reach out!</p>
    </div>   
   <Accordion></Accordion>
  </div>
</div>

 <Testimonial></Testimonial>

 <TopBlogs></TopBlogs>
 

   </div>
  )
}

export default MainBody