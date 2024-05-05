import React from "react";
import "./Advert.css";
import Photo from "../../../components/shared/Photo";

function AdvertDetail({ name, sale, price, tags, photo }) {
  return (
    <div className="advert">
      <h2 className="name">{name}</h2>
      <div className="price-wrapper">
        <span className="sale">{sale ? "On sale:" : "On purchase:"}</span>
        <span className="price">{`${price} €`}</span>
      </div>
      <div>
        {photo ? (
          <Photo className="photo" src={photo} alt={name} />
        ) : (
          <Photo className="photo" alt={name} />
        )}
      </div>
      <div className="tags">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdvertDetail;
