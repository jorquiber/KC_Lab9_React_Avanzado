import PropTypes from "prop-types";
import Layout from "../../components/layout/Layout";
import FormField from "../../components/shared/FormField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button";
import "./NewAdvertPage.css";
import FormData from "form-data";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getTags } from "../../store/selectors";
import { loadTags, createAdvert } from "../../store/actions";

function NewAdvertPageForm({ tags }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    productName: "",
    isSale: false,
    price: "",
    photo: null,
    productTags: Object.fromEntries(tags.map((tag) => [tag, false])),
  });

  const handleInputChange = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleTagCheckboxChange = (event, tag) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      productTags: {
        ...currentFormValues.productTags,
        [tag]: event.target.checked,
      },
    }));
  };

  const handlePhotoInputChange = (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFormValues((currentFormValues) => ({
        ...currentFormValues,
        photo: file,
      }));
    } else {
      setFormValues((currentFormValues) => ({
        ...currentFormValues,
        photo: null,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", formValues.productName);
    formData.append("sale", formValues.isSale);
    formData.append("price", formValues.price);
    formData.append(
      "tags",
      Object.keys(formValues.productTags)
        .filter((tag) => formValues.productTags[tag])
        .join(",")
    );
    if (formValues.photo) {
      formData.append("photo", formValues.photo);
    }

    dispatch(createAdvert(formData));
  };

  const { productName, isSale, price, productTags } = formValues;
  const buttonDisabled =
    !productName ||
    !price ||
    Object.values(productTags).filter((tag) => tag === true).length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        type="text"
        name="productName"
        label="product name"
        value={productName}
        onChange={handleInputChange}
      />
      <FormField
        type="checkbox"
        name="isSale"
        label="Is it a sale?"
        checked={isSale}
        onChange={handleCheckboxChange}
      />
      <FormField
        type="number"
        name="price"
        label="price"
        value={price}
        onChange={handleInputChange}
      />
      <div>
        <h2>Tags</h2>
        <div className="tags-wrapper">
          {Object.keys(productTags).map((tag) => (
            <FormField
              key={tag}
              type="checkbox"
              name={tag}
              label={tag}
              className="tagFormField"
              checked={productTags[tag]}
              onChange={(e) => handleTagCheckboxChange(e, tag)}
            />
          ))}
        </div>
      </div>
      <FormField
        type="file"
        name="photo"
        label="photo"
        onChange={handlePhotoInputChange}
      />
      <div className="newAdvertPage-footer">
        <Button
          type="submit"
          className="newAdvertPage-submit"
          variant="primary"
          disabled={buttonDisabled}
        >
          Let&apos;s go!
        </Button>
      </div>
    </form>
  );
}

function NewAdvertPage() {
  const dispatch = useDispatch();
  const tags = useSelector(getTags);

  useEffect(() => {
    dispatch(loadTags());
  }, [dispatch]);
  return (
    <Layout title="Create a new advert">
      {tags.length > 0 ? <NewAdvertPageForm tags={tags} /> : null}
    </Layout>
  );
}

NewAdvertPageForm.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NewAdvertPage;
