import PropTypes from "prop-types";
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

AdvertDetail.propTypes = {
  name: PropTypes.string.isRequired,
  sale: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  photo: PropTypes.string,
};

export default AdvertDetail;
