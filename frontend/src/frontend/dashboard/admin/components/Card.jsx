import React from "react";

const Card = ({name , image , kycStatus}) => {
  return (
    <div className="dashboard-box first-box d-flex align-items-center">
      <div className="img-left">
        <img src={image} />
      </div>
      <div className="text-left">
        <h2>{kycStatus}</h2>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default Card;
