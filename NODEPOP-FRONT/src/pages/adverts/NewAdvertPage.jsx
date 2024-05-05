import Layout from "../../components/layout/Layout";
import FormField from "../../components/shared/FormField";
import { getAdvertTags, createAdvert } from "./service";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/shared/Button";
import "./NewAdvertPage.css";
import FormData from "form-data";

function NewAdvertPageForm({ tags }) {
  const navigate = useNavigate();

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
    try {
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

      const createdAdvert = await createAdvert(formData);
      navigate(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const { productName, isSale, price, photo, productTags } = formValues;
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
          Let's go!
        </Button>
      </div>
    </form>
  );
}

function NewAdvertPage() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const advertsTags = await getAdvertTags();
        setTags(advertsTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <Layout title="Create a new advert">
      {tags.length > 0 ? <NewAdvertPageForm tags={tags} /> : null}
    </Layout>
  );
}

export default NewAdvertPage;
