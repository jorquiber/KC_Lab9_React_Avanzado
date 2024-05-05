import { getAdverts } from "./service";
import { useEffect, useState } from "react";
import Advert from "./components/Advert";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import Button from "../../components/shared/Button";
import FormField from "../../components/shared/FormField";

const EmptyList = () => (
  <div>
    <p>No adverts on the web</p>
    <Button variant="secondary" to="/adverts/new">
      Create advert
    </Button>
  </div>
);

function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const advertsData = await getAdverts();
        setAdverts(advertsData);
      } catch (error) {
        console.error("Error fetching adverts:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setNameFilter(event.target.value);
  };

  const filteredAdverts = adverts.filter(({ name }) =>
    name.toLowerCase().startsWith(nameFilter.toLowerCase())
  );

  return (
    <Layout title="Adverts">
      <div>
        <h4>Filtros</h4>
        <FormField
          type="text"
          name="filter"
          label="Filter by name"
          value={nameFilter}
          onChange={handleChange}
        />
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
