import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ toggleToste }) => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen dark:bg-darkBg flex items-center justify-center px-4 my-5">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-400/20 rounded-2xl shadow-lg p-4 p-md-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-10">Create Your Account</h2>

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
          validate={(values) => {
            const errors = {};
            if (!values.firstName) errors.firstName = "First name is required";
            if (!values.lastName) errors.lastName = "Last name is required";
            if (!values.email) errors.email = "Email is required";
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = "Invalid email";
            if (!values.password) errors.password = "Password is required";
            if (!values.confirmPassword) errors.confirmPassword = "Please confirm your password";
            else if (values.password !== values.confirmPassword) errors.confirmPassword = "Passwords don't match";
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
              const user = userCredential.user;
              await setDoc(doc(db, "users", user.uid), {
                ...values,
              });
              toggleToste(true);
            } catch (error) {
              console.error(error);
            } finally {
              toast.success("Registration Successfull");
              navigate("/login");
              setSubmitting(false);
              Formik.resetForm();
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
  { label: "First Name", name: "firstName", type: "text", icon: "fa-user" },
  { label: "Last Name", name: "lastName", type: "text", icon: "fa-user" },
  { label: "Email", name: "email", type: "email", icon: "fa-envelope" },
  { label: "Phone", name: "phone", type: "text", icon: "fa-phone" },
  { label: "Password", name: "password", type: "password", icon: "fa-lock" },
  { label: "Confirm Password", name: "confirmPassword", type: "password", icon: "fa-lock" },
  { label: "Country", name: "country", type: "text", icon: "fa-flag" },
  { label: "State", name: "state", type: "text", icon: "fa-map" },
  { label: "City", name: "city", type: "text", icon: "fa-city" },
  { label: "Address", name: "address", type: "text", icon: "fa-location-dot" }
].map(({ label, name, type, icon }) => (
  <div key={name}>
    <div className="flex gap-1 items-baseline mb-1">
       <i className={`fa ${icon} text-gray-700 dark:text-white`} />
    <label htmlFor={name} className="block mb-1 font-medium text-gray-700 dark:text-white">
      {label}
    </label>
    </div>
    <div className="relative">
     
      <Field
        type={type}
        name={name}
        id={name}
        className="w-full border border-gray-300 rounded-lg  px-2  py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
    <ErrorMessage name={name} component="div" className="text-sm text-red-500 mt-1" />
  </div>
))}


              <div className="md:col-span-2 text-center mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full max-w-56 bg-brandOrange hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition duration-200"
                >
                  {isSubmitting ? "Creating Account..." : "Register"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
