import React, { useState } from 'react'
import AcoordionItem from './AcoordionItem';
import Heading from '../utils/Heading';


const Accordion = () => {

    const [isOpen,setIsOpen]=useState(null);

    const faqs = [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit/debit cards, UPI, net banking, PayPal, and Cash on Delivery (COD)."
      },
      {
        question: "How can I track my order?",
        answer: "Once your order is shipped, you'll receive a tracking number via email or SMS. You can use it to track your order on our website under 'My Orders'."
      },
      {
        question: "What is your return policy?",
        answer: "We offer a 7-day return policy for unused and unopened items. Please refer to our Returns & Refunds page for detailed information."
      },
      {
        question: "Do you offer international shipping?",
        answer: "Currently, we ship only within [your country name]. International shipping will be available soon."
      },
      {
        question: "Can I change or cancel my order after placing it?",
        answer: "Yes, you can cancel or change your order within 1 hour of placing it by going to 'My Orders' or contacting our support team."
      },
      {
        question: "Are there any shipping charges?",
        answer: "Shipping is free for orders above ₹999. For orders below ₹999, a standard shipping fee of ₹49 applies."
      },
      {
        question: "How do I apply a discount or promo code?",
        answer: "You can enter your discount or promo code during the checkout process in the 'Apply Coupon' section."
      },
      {
        question: "What if I receive a damaged or wrong product?",
        answer: "If you receive a damaged or incorrect item, please contact our customer support within 48 hours with pictures, and we’ll arrange a replacement or refund."
      }
    ];
    

    function handleClick(id) {
        setIsOpen(prev=>prev==id?"null":id)
    }
      


  return (
   <div className="container md:px-5 md:w-7/12 mx-auto ">

     <div>
        {faqs?.map((item,ind)=>{
           
            return <AcoordionItem handleClick={handleClick} isActive={isOpen==ind?true:false}  id={ind} faq={item} key={ind} ></AcoordionItem>
        })}
    </div>
   </div>
  )
}

export default Accordion