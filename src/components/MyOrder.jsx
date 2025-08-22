import React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const statusSteps = ['Placed', 'Processing', 'Shipped', 'Delivered'];

const MyOrder = () => {
  const cartItems = useSelector((state) => state?.user?.myOrder || []);

  const getStatusIndex = (status) => statusSteps.indexOf(status);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">My Orders</h2> */}

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-brandOrange text-lg">
          You have no orders yet.
        </div>
      ) : (
        <div className="items-end grid grid-cols-1 md:grid-cols-2  gap-6">
          {cartItems.map((item, index) => {
            const currentStatusIndex = getStatusIndex(item.status);

            return (
              <div
                key={index}
                className="border rounded-xl min-h-[250px]  mt-0  shadow-md hover:shadow-lg transition duration-200 bg-white dark:bg-gray-400/20  p-4"
              >
                <div className="flex items-center gap-4">

                     {/* Timeline */}
                <div className="mt-6 ml-4 border-l-4 border-indigo-300 pl-4">
                  {statusSteps.map((step, i) => (
                    <div key={i} className="relative mb-4">
                      {/* Ripple effect for active steps */}
                      {i <= currentStatusIndex && (
                        <span className="ripple"></span>
                      )}
                      <div
                        className={`absolute -left-[26px] w-4 h-4 rounded-full ${
                          i <= currentStatusIndex ? 'bg-brandOrange' : 'bg-gray-300'
                        }`}
                        style={{ zIndex: 1 }}
                      />
                      <p
                        className={`text-sm ${
                          i <= currentStatusIndex ? 'text-brandOrange font-semibold' : 'text-gray-500'
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  ))}
                  
                </div>
                 
                  <div className="flex items-center gap-4 flex-col md:flex-row">
                     <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                   <div> <h3 className="md:text-xl font-semibold text-gray-900  dark:text-white">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-white">
                      Quantity: <span className="font-medium">{item.quantity}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white">
                      Payment: <span className="font-medium">{item.paymentMethod}</span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-white">
                      Ordered on:{' '}
                      <span className="font-medium">
                        {format(new Date(item.date), 'dd MMM yyyy')}
                      </span>
                    </p>
                    <p className="md:text-lg font-bold text-brandOrange mt-1">
                      ₹{item.price?.toFixed(2)}
                    </p></div>
                  </div>
                </div>

             
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
