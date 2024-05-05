import PropTypes from "prop-types";
import "./Advert.css";

function Advert({ name, sale, price, tags }) {
  return (
    <div className="advert">
      <h2 className="name">{name}</h2>
      <div className="price-wrapper">
        <span className="sale">{sale ? "On sale:" : "On purchase:"}</span>
        <span className="price">{`${price} €`}</span>
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

Advert.propTypes = {
  name: PropTypes.string.isRequired,
  sale: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Advert;
