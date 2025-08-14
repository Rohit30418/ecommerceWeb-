import React from 'react'

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-4 text-center">
      <h1 className="text-[8rem] font-extrabold">404</h1>
      <h2 className="text-4xl font-semibold mt-4">Page Not Found</h2>
      <p className="max-w-md mt-4 text-lg text-gray-300">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-8 inline-block px-8 py-3 bg-pink-600 hover:bg-pink-700 rounded-full font-semibold transition"
      >
        Go to Home
      </a>
    </div>
  )
}

export default ErrorPage
