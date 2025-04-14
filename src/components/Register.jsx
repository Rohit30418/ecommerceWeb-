import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import fatchApiCountryStateCity from './fatchApi/fatchApiCountryStateCity';
import { auth,db } from '../firebase';
import {doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const Register = ({toggleToste}) => {
const getCountryInfo=fatchApiCountryStateCity();
console.log(getCountryInfo());

  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          country: "",
          state: "",
          city: "",
          address: ""
        }}
        validate={values => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = "Please enter firstname";
          }
          if (!values.lastName) {
            errors.lastName = "Please enter your lastname";
          }
          if (!values.email) {
            errors.email = "Please enter your email";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Please enter valid email";
          }

          if(!values.password){
            errors.password="Please enter the password"
          }

          if(!values.confirmPassword){
            errors.confirmPassword="Confirm Password can not be blank"
          }else if(values.password!==values.confirmPassword){
            errors.confirmPassword="Password doesnt match"
          }
          // Add other field validations as necessary
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
          //  console.log(JSON.stringify(values, null, 2));
          console.log(values);
       const userCredential=await createUserWithEmailAndPassword(auth,values.email,values.password)
          const user =  userCredential?.user;
          console.log(user);
          setSubmitting(false);
          await setDoc(doc(db, "users", user.uid), {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          country: values.country,
          state: values.state,
          city: values.city,
          address: values.address,
            });
          toggleToste(true)

          }, 400);


        }}
      >
        {({ isSubmitting }) => (
         <Form className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
         {[
           { label: "First Name", name: "firstName", type: "text" },
           { label: "Last Name", name: "lastName", type: "text" },
           { label: "Email", name: "email", type: "email" },
           { label: "Phone", name: "phone", type: "text" },
           { label: "Password", name: "password", type: "password" },
           { label: "Confirm Password", name: "confirmPassword", type: "password" },
           { label: "Country", name: "country", type: "text" },
           { label: "State", name: "state", type: "text" },
           { label: "City", name: "city", type: "text" },
           { label: "Address", name: "address", type: "text" }
         ].map(({ label, name, type }) => (
           <div key={name}>
             <label htmlFor={name} className="block mb-1 font-semibold text-gray-700">{label}</label>
             <Field
               type={type}
               name={name}
               id={name}
               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
             />
             <ErrorMessage name={name} component="div" className="text-sm text-red-500 mt-1" />
           </div>
         ))}
       
         <div className="col-span-1 md:col-span-2 text-center mt-4">
           <button
             type="submit"
             disabled={isSubmitting}
             className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
           >
             {isSubmitting ? "Registering..." : "Register"}
           </button>
         </div>
       </Form>
       
        )}
      </Formik>
    </div>
  );
};

export default Register;
