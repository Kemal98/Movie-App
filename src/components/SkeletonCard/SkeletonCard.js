import React from "react";
import "./skeleton.css";
import "../components_css/components.css";

const SkeletonCard = () => {
  return (
    <div className="cards skeleton">
      <img className="cards__img skeleton_img" src="https://i.pinimg.com/originals/ea/8d/11/ea8d11f1ffc6355b8a440106ce61d0f3.jpg" />
    </div>
  );
};

export default SkeletonCard;
