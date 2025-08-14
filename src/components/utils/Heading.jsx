import React from 'react';
import { useSelector } from 'react-redux';

const Heading = ({ title,textAlign }) => {


  return (
    <h2
      className={`${textAlign=="text-left"?"text-left":"text-center"} text-lightText dark:text-darkText mb-8 lg:mb-16 font-bold text-4xl tinos-regular`}
     
    >
      {title}
    </h2>
  );
};

export default Heading;
