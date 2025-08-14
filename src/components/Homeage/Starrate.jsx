export const Starrate = ({ rating }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i + 0.5 <= rating) {
      stars.push(<i key={i} className="fas fa-star text-brandOrange"></i>);
    } else if (i < rating) {
      stars.push(<i key={i} className="fas fa-star-half-alt text-brandOrange"></i>);
    } else {
      stars.push(<i key={i} className="far fa-star text-gray-300"></i>);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};
