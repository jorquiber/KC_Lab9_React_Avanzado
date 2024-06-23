import { useEffect, useState } from "react";
import Advert from "./components/Advert";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import Button from "../../components/shared/Button";
import FormField from "../../components/shared/FormField";
import { useDispatch, useSelector } from "react-redux";
import { loadAdverts, loadTags } from "../../store/actions";
import { getAdverts, getTags } from "../../store/selectors";

const EmptyList = () => (
  <div>
    <p>No adverts on the web</p>
    <Button variant="secondary" to="/adverts/new">
      Create advert
    </Button>
  </div>
);

function AdvertsPage() {
  const dispatch = useDispatch();
  const adverts = useSelector(getAdverts);
  const tags = useSelector(getTags);
  const [nameFilter, setNameFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState([]);

  useEffect(() => {
    dispatch(loadAdverts());
    dispatch(loadTags());
  }, [dispatch]);

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleTagFilterChange = (event, tag) => {
    if (event.target.checked) {
      setTagsFilter([...tagsFilter, tag]);
    } else {
      setTagsFilter(tagsFilter.filter((t) => t !== tag));
    }
  };

  const filteredAdverts = adverts.filter(
    ({ name, tags }) =>
      name.toLowerCase().startsWith(nameFilter.toLowerCase()) &&
      (tagsFilter.length === 0 || tagsFilter.every((tag) => tags.includes(tag)))
  );

  return (
    <Layout title="Adverts">
      <div>
        <h4>Filters</h4>
        <div>
          <FormField
            type="text"
            name="filter"
            label="Filter by name"
            value={nameFilter}
            onChange={handleNameFilterChange}
          />
        </div>
        <div>
          <p>Filter by tags</p>
          {tags.length > 0 && (
            <div className="tags-wrapper">
              {tags.map((tag) => (
                <FormField
                  key={tag}
                  type="checkbox"
                  name={tag}
                  label={tag}
                  className="tagFormField"
                  onChange={(e) => handleTagFilterChange(e, tag)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        {adverts.length > 0 ? (
          filteredAdverts.length > 0 ? (
            <ul>
              {filteredAdverts.map(({ id, ...advert }) => (
                <li key={id}>
                  <Link to={`/adverts/${id}`}>
                    <Advert {...advert} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No adverts found</p>
          )
        ) : (
          <EmptyList />
        )}
      </div>
    </Layout>
  );
}

export default AdvertsPage;
