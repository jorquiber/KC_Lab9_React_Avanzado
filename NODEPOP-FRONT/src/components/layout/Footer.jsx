import PropTypes from "prop-types";

export default function Footer({ className }) {
  return <footer className={className}>@2024 Coding for fun!!</footer>;
}

Footer.propTypes = {
  className: PropTypes.string,
};
