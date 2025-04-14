import React, { useState, useEffect } from 'react';
import { fetchApi } from '../fatchApi/fetchApi';
import ProductCard from './ProductCard';
import RangeSlider from '../RangeSlider';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { useSelector } from 'react-redux';
import Cardloader from './Cardloader';

const ProductCategory = () => {
  const [category, setCategory] = useState([]);
  const [pageNo,setPageNo]=useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStar, setSelectedStar] = useState([]);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const { loading, response, error, apidata } = fetchApi();
  const color = useSelector((state) => state.color.color);
  const { Category } = useParams();
  const darkColor=useSelector((state)=>state?.DarkColor?.DarkColor)

  useEffect(() => {
    apidata(`products/category/${Category}`);
  }, [Category]);

  useEffect(() => {
    if (response) {
      setData(response.products || []);
      setFilteredData(response.products || []);

      // Extract categories from products and remove duplicates
      const categories = [...new Set(response?.products?.map(item => item.category))];
      setCategory(categories);

      // Setting max and min price values
      const maxPrice = Math.floor(Math.max(...response?.products?.map(product =>( product?.price*(1-product.discountPercentage / 100)))) * 85);
      setMaxVal(maxPrice);

      const minPrice = Math.floor(Math.min(...response?.products?.map(product => product?.price*(1-product.discountPercentage / 100))) * 85);
      setMinVal(minPrice);
    }
  }, [response]);

  const handalerangeVal = (value) => {
    if (!data) return;
    console.log(value);

    const filtered = data.filter((item) => ((item.price *(1-item.discountPercentage / 100)* 85)) >= value[0] && item.price *(1-item.discountPercentage / 100)* 85 <= value[1]);
    setFilteredData(filtered);
  };



  const lowTohighPrice = () => {
    if (!data) return;
    const sorted = [...filteredData].sort((a, b) => (a.price * (1 - a.discountPercentage / 100)) - (b.price * (1 - b.discountPercentage / 100)));
    setFilteredData(sorted);
  };

  const highTolowPrice = () => {
    if (!data) return;
    const sorted = [...filteredData].sort((a, b) => (b.price * (1 - b.discountPercentage / 100)) - (a.price * (1 - a.discountPercentage / 100)));
    setFilteredData(sorted);
  };

  const StarFilter = (val) => {
    let newSelectedStar;
    if (selectedStar?.includes(val)) {
      newSelectedStar = selectedStar.filter(star => star !== val);
    } else {
      newSelectedStar = [...selectedStar, val];
    }
    setSelectedStar(newSelectedStar);
  };

  const handleCategory = (categoryName) => {
    const categoryFilter = data?.filter((item) => item.category === categoryName);
    setFilteredData(categoryFilter);
  };

  useEffect(() => {
    let updatedFilteredData = data;
    if (selectedStar.length > 0) {
      updatedFilteredData = updatedFilteredData.filter(item => selectedStar.includes(Math.floor(item.rating)));
    }
    setFilteredData(updatedFilteredData);
  }, [selectedStar, data]);


  const totalPages = Math.ceil(filteredData.length / 6);

 


  return (
    <>
      <Header />
      <div className='flex md:flex-row flex-col pt-20'>
        <div className='md:w-3/12 shadow-lg rounded-lg px-4'>
          <h2 className='text-2xl mb-5 font-bold' style={{ 'color': `${darkColor}` }}>Filter <i class="fas fa-filter"></i></h2>
          <h4 className='font-bold text-lg' style={{ 'color': `${darkColor}` }}>Price</h4>
          <RangeSlider max={maxVal} min={minVal} handalerangeVal={handalerangeVal} />
          <h4 className='font-bold text-lg' style={{ 'color': `${darkColor}` }}>Sort By</h4>
          <button className='block' onClick={lowTohighPrice}>Price Low to High  <i class="fa-solid fa-arrow-up"></i></button>
          <button className='block' onClick={highTolowPrice}>Price High to Low <i class="fa-solid fa-arrow-down"></i></button>
          <h4 className='font-bold text-lg mt-3' style={{ 'color': `${darkColor}` }}>Customer Rating</h4>
          <div>
            <input onChange={() => { StarFilter(4) }} type="checkbox" id="4star" /> <label htmlFor="4star"><i class="fa-solid fa-star text-orange-600"></i> <i class="fa-solid fa-star text-orange-600"></i> <i class="fa-solid fa-star text-orange-600"></i> <i class="fa-solid fa-star text-orange-600"></i></label>
          </div>
          <div>
            <input onChange={() => { StarFilter(3) }} type="checkbox" id="3star" /> <label htmlFor="3star">
            <i class="fa-solid fa-star text-orange-600"></i> <i class="fa-solid fa-star text-orange-600"></i> <i class="fa-solid fa-star text-orange-600"></i>
            </label>
          </div>
          <div>
            <input onChange={() => { StarFilter(2) }} type="checkbox" id="2star" /> <label htmlFor="2star"><i class="fa-solid fa-star text-orange-600"></i> <i class="fa-solid fa-star text-orange-600"></i></label>
          </div>
        </div>


           {
            loading? <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4  md:w-9/12'>
      
      
            <Cardloader></Cardloader>
            <Cardloader></Cardloader>
            <Cardloader></Cardloader>
            <Cardloader></Cardloader>
            <Cardloader></Cardloader>
            <Cardloader></Cardloader>
            <Cardloader></Cardloader>
            
            </div>: <div className='flex flex-wrap md:w-9/12'>
          {filteredData.slice(pageNo*6-6,pageNo*6).map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
           }

     
    
       

      </div>
      
      {filteredData.length>6 && <div className="flex gap-5 justify-center mt-4">
           {pageNo>1 && <button onClick={()=>{
            setPageNo(pageNo-1)
           }}>Prev</button>} 
            {[...Array(totalPages)].map((_,ind)=>{
              return <button onClick={()=>{
                setPageNo(ind+1)
              }} className={`p-2 rounded-sm ${ind+1==pageNo?"bg-green-500":"bg-red-600"}`}>{ind+1}</button>
            })}
           {pageNo<totalPages && <button onClick={()=>{
              setPageNo(pageNo+1)
            }}>next</button> }
            </div>}
            
      <Footer />
    </>
  );
};

export default ProductCategory;
