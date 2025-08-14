import React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const statusSteps = ['Placed', 'Processing', 'Shipped', 'Delivered'];

const MyOrder = () => {
  const cartItems = useSelector((state) => state?.user?.myOrder || []);

  const getStatusIndex = (status) => statusSteps.indexOf(status);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          You have no orders yet.
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => {
            const currentStatusIndex = getStatusIndex(item.status);

            return (
              <div
                key={index}
                className="border rounded-xl shadow-md hover:shadow-lg transition duration-200 bg-white p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: <span className="font-medium">{item.quantity}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Payment: <span className="font-medium">{item.paymentMethod}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Ordered on:{' '}
                      <span className="font-medium">
                        {format(new Date(item.orderDate), 'dd MMM yyyy')}
                      </span>
                    </p>
                    <p className="text-lg font-bold text-indigo-600 mt-1">
                      ₹{item.price?.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mt-6 ml-4 border-l-4 border-indigo-300 pl-4">
                  {statusSteps.map((step, i) => (
                    <div key={i} className="relative mb-4">
                      <div
                        className={`absolute -left-5 w-4 h-4 rounded-full ${
                          i <= currentStatusIndex ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      />
                      <p
                        className={`text-sm ${
                          i <= currentStatusIndex ? 'text-indigo-800 font-semibold' : 'text-gray-500'
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  ))}
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
