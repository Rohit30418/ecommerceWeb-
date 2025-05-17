import React from 'react';
import { useSelector } from 'react-redux';

const Heading = ({ title,textAlign }) => {
  const color = useSelector((state) => state.color.color);

  return (
    <h2
      className={`${textAlign=="text-left"?"text-left":"text-center"} mb-16 font-bold text-4xl tinos-regular`}
      style={{ color }}
    >
      {title}
    </h2>
  );
};

export default Heading;
