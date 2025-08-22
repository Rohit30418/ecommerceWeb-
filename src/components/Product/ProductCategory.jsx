import { useState, useEffect } from 'react';
import { fetchApi } from '../fatchApi/fetchApi';
import ProductCard from './ProductCard';
import RangeSlider from '../RangeSlider';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cardloader from './Cardloader';

const ProductCategory = () => {
  // Removed unused 'category' state
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStar, setSelectedStar] = useState([]);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isMobileSortActive, setIsmobileShortActive] = useState(false);
  const [isMobileFilterActive, setIsmobileFilterActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tempStar, setTempStar] = useState([]);
  const [tempRange, setTempRange] = useState([0, 0]);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const { loading, response, apidata } = fetchApi();
  // Removed unused 'color' selector
  const { Category } = useParams();
  // Removed unused 'darkColor' selector

  useEffect(() => {
    apidata(`products/category/${Category}`);
  }, [Category]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (response) {
      const products = response.products || [];
      setData(products);
      setFilteredData(products);

      const categories = [...new Set(products.map(item => item.category))];
   

      const prices = products.map(p => p.price * (1 - p.discountPercentage / 100) * 85);
      const maxPrice = Math.floor(Math.max(...prices));
      const minPrice = Math.floor(Math.min(...prices));

      setMaxVal(maxPrice);
      setMinVal(minPrice);
      setTempRange([minPrice, maxPrice]);
    }
  }, [response]);

const handleRangeChange = (value) => {
  if (!data) return;
  const min = Math.floor(value[0]);
  const max = Math.ceil(value[1]);
  const filtered = data.filter(item => {
    const price = Math.floor(item.price * (1 - item.discountPercentage / 100) * 85);
    return price >= min && price <= max;
  });
  setFilteredData(filtered);
};
  const lowToHighPrice = () => {
    const sorted = [...filteredData].sort((a, b) =>
      a.price * (1 - a.discountPercentage / 100) - b.price * (1 - b.discountPercentage / 100)
    );
    setFilteredData(sorted);
    closeOverlay();
  };

  const highToLowPrice = () => {
    const sorted = [...filteredData].sort((a, b) =>
      b.price * (1 - b.discountPercentage / 100) - a.price * (1 - a.discountPercentage / 100)
    );
    setFilteredData(sorted);
    closeOverlay();
  };

  const toggleStarFilter = (val) => {
    const list = isMobile ? tempStar : selectedStar;
    const updated = list.includes(val)
      ? list.filter(s => s !== val)
      : [...list, val];

    isMobile ? setTempStar(updated) : setSelectedStar(updated);
  };

  const handleRangeSlider = (val) => {
    isMobile ? setTempRange(val) : handleRangeChange(val);
  };

  // Removed unused 'handleCategory' function

  useEffect(() => {
    let result = data;
    if (selectedStar.length > 0) {
      result = result.filter(item =>
        selectedStar.includes(Math.floor(item.rating))
      );
    }
    setFilteredData(result);
  }, [selectedStar, data]);

  const totalPages = Math.ceil(filteredData.length / 6);

  const handleApplyFilter = () => {
    setSelectedStar(tempStar);
    handleRangeChange(tempRange);
    closeOverlay();
  };

  const handleClearFilter = () => {
    if (isMobile) {
      setTempStar([]);
      setTempRange([minVal, maxVal]);
    } else {
      setSelectedStar([]);
      handleRangeChange([minVal, maxVal]);
    }
  };

  const openSortMobile = () => {
    setIsOverlayActive(true);
    setIsmobileShortActive(true);
  };

  const openFilterMobile = () => {
    setIsOverlayActive(true);
    setIsmobileFilterActive(true);
  };

  const closeOverlay = () => {
    setIsOverlayActive(false);
    setIsmobileShortActive(false);
    setIsmobileFilterActive(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pageNo, Category]);

  return (
    <>
      {isOverlayActive && (
        <span
          onClick={closeOverlay}
          className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-65 z-30"
        />
      )}

 

      <div className="flex dark:text-white lg:hidden justify-center py-3 gap-4">
        <button className="border p-2" onClick={openSortMobile}>
          Sort <i className="fa-solid fa-arrow-up"></i> <i className="fa-solid fa-arrow-down"></i>
        </button>
        <button className="border p-2" onClick={openFilterMobile}>
          Filter <i className="fas fa-filter"></i>
        </button>
      </div>

      <div className="flex md:flex-row flex-col pt-2 lg:py-10">
        {/* Filter Panel */}
        <div className="md:w-3/12 dark:text-white rounded-lg px-4">
          <div className={`
  fixed lg:static 
  top-0 bottom-0 right-0 
 bg-white lg:bg-gray-400/20 rounded-md p-4 w-7/12 md:w-full z-40 
  transition ease-in-out duration-300 
  ${isMobile ? (isMobileFilterActive ? 'translate-x-0' : 'translate-x-full') : 'translate-x-0'} 
  lg:translate-x-0
`}>
            <h4 className="font-bold text-lg" >Price</h4>
            <RangeSlider max={maxVal} min={minVal} handalerangeVal={handleRangeSlider} />

            <h4 className="font-bold text-lg mt-3" >Customer Rating</h4>
            {[4, 3, 2].map((star) => (
              <div className='flex  gap-2' key={star}>
                <input
                  checked={(isMobile ? tempStar : selectedStar).includes(star)}
                  onChange={() => toggleStarFilter(star)}
                  type="checkbox"
                  id={`${star}star`}
                />

                <label htmlFor={`${star}star`}>
                  {Array(star).fill().map((_, i) => (
                    <i key={i} className="fa-solid fa-star text-brandOrange"></i>
                  ))}
                </label>
              </div>
            ))}

            <div className="mt-4 lg:hidden">
              <button className="bg-red-500 p-2 mr-2" onClick={handleApplyFilter}>Apply</button>
              <button className="bg-green-500 p-2" onClick={handleClearFilter}>Clear</button>
            </div>
          </div>

           {/* Sort Panel */}
        <div className={`fixed lg:static ${isMobile?isMobileSortActive ? "translate-y-0" : "translate-y-full":"translate-y-0"}  bottom-0 bg-white dark:text-black dark:lg:text-white lg:bg-gray-400/20  shadow-sm z-40 w-[98%]  h-28 lg:h-auto left-[50%] translate-x-[-50%] lg:translate-x-[0%] rounded-md lg:w-full lg:mt-4 transition ease-in-out duration-300 p-3`}>
          <button className="block mb-4" onClick={lowToHighPrice}>
            Price Low to High <i className="fa-solid fa-arrow-up"></i>
          </button>
          <button className="block" onClick={highToLowPrice}>
            Price High to Low <i className="fa-solid fa-arrow-down"></i>
          </button>
        </div>
        </div>

       

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:w-9/12">
          {loading ? (
            Array(6).fill().map((_, i) => <Cardloader key={i} />)
          ) : (
            filteredData.slice((pageNo - 1) * 6, pageNo * 6).map((item) => (
              <ProductCard key={item.id} item={item} />
            ))

            
          )}

          
        </div>
      </div>

      {/* Pagination */}
      {filteredData.length > 6 && (
        <div className="flex gap-5 justify-center mt-4 mb-5">
          {pageNo > 1 && <button onClick={() => setPageNo(pageNo - 1)}>Prev</button>}
          {[...Array(totalPages)].map((_, ind) => (
            <button
              key={ind}
              onClick={() => setPageNo(ind + 1)}
              className={`p-2 rounded-md px-4  ${pageNo === ind + 1 ? 'bg-brandOrange text-white' : ''}`}
            >
              {ind + 1}
            </button>
          ))}
          {pageNo < totalPages && <button className='p-2 rounded-md px-4' onClick={() => setPageNo(pageNo + 1)}>Next</button>}
        </div>
      )}
    </>
  );
};

export default ProductCategory;

