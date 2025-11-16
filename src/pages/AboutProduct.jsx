import React, { useEffect } from 'react';
import { fetchApi } from '../services/fetchApi';
import { useParams } from 'react-router-dom';
import { Starrate } from '../ui/Starrate';
import Relateditem from '../components/Product/Relateditem';
import Heading from '../common/Heading';
import InnerBanner from '../common/InnerBanner';

const AboutProduct = () => {
  const { ProductId } = useParams();
  const { loading, response, error, apidata } = fetchApi();

  

  useEffect(() => {
    apidata(`products/${ProductId}`);
  }, [ProductId]);

  useEffect(() => {
    if (response !== null) {
     window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [response]);

   

  return (
    <>
    <InnerBanner title={response?.title}></InnerBanner>
  
      
    <div className="bg-gray-50 dark:bg-darkBg min-h-screen">
      <div className="container mx-auto px-4 py-16">

       {
        loading?<div className="flex flex-col md:flex-row gap-10 bg-white p-8 rounded-3xl">
        {/* Product Image */}
        <div className="md:w-5/12">
          <div className="w-full h-64 bg-gray-300 rounded-xl animate-pulse"></div>
        </div>
      
        {/* Product Details */}
        <div className="md:w-7/12 space-y-4">
          <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
          <div className="h-8 bg-green-50 rounded-lg animate-pulse inline-block px-4 py-1"></div>
      
          {/* Star Rating */}
          <div className="h-6 bg-gray-300 rounded animate-pulse"></div>
      
          {/* Product Table */}
          <div className="pt-6">
            <table className="w-full text-sm border-t border-gray-200">
              <tbody>
                {[...Array(4)].map((_, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 pr-4 font-medium text-gray-700">
                      <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>
                    </td>
                    <td className="py-2 text-gray-600">
                      <div className="h-4 bg-gray-300 rounded animate-pulse w-1/4"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      :<div className="flex flex-col md:flex-row gap-10 bg-gray-400/20 p-2 lg:p-8 rounded-3xl ">
          
      {/* Product Image */}
      <div className="md:w-5/12">
        <img
          src={response?.thumbnail}
          alt={response?.title}
          className="w-full h-auto rounded-xl object-cover  border border-gray-200"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="md:w-7/12 space-y-4">
       <Heading title={response?.title}></Heading>
        <p className="text-gray-600 dark:text-white text-base">{response?.description}</p>

        <p className="text-2xl font-bold text-green-600 bg-green-50 inline-block px-4 py-1 rounded-lg shadow-sm">
          ₹{Math.floor(response?.price * 85)}
        </p>

        {/* Star Rating */}
        <div>
          <Starrate rating={Math.floor(response?.rating?.rate)} />
        </div>

        {/* Product Table */}
        <div className="pt-6">
          <table className="w-full text-sm border-t border-gray-200">
 <tbody>
{[
[<i className="fas fa-tags mr-2 text-gray-500 dark:text-white"></i>, 'Brand', response?.brand],
[<i className="fas fa-boxes mr-2 text-gray-500 dark:text-white"></i>, 'Category', response?.category],
[<i className="fas fa-layer-group mr-2 text-gray-500 dark:text-white"></i>, 'Minimum Order Quantity', response?.minimumOrderQuantity],
[<i className="fas fa-shield-alt mr-2 text-gray-500 dark:text-white"></i>, 'Warranty', response?.warrantyInformation],
].map(([icon, label, value], idx) => (
<tr key={idx} className="border-b">
<td className="py-2 pr-4 font-medium text-gray-700 dark:text-white">
  {icon}
  {label}
</td>
<td className="py-2 text-gray-600 dark:text-white">{value || '—'}</td>
</tr>
))
}
</tbody>
</table>
</div>

        {/* Reviews */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
          {response?.reviews?.length > 0 ? (
            <div className="space-y-4">
              {response.reviews.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 flex gap-2 rounded-xl border border-gray-200 bg-gray-100 shadow-sm hover:shadow-md transition"
                ><img src={`https://ui-avatars.com/api/?name=${item?.reviewerName}&background=0D8ABC&color=fff&size=128`} className='w-8 rounded-lg' />

                 <div>
                   <p className="font-semibold text-gray-700">{item?.reviewerName}</p>
                  <p className="text-gray-600 text-sm">{item?.comment}</p>
                 </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
       }
        {/* Related Items */}
        <div className="mt-20">     
          <Heading title={"Related Items"}></Heading>
          <Relateditem category={response?.category} />
        </div>
      </div>
    </div>
    </>
    
  );
};

export default AboutProduct;
