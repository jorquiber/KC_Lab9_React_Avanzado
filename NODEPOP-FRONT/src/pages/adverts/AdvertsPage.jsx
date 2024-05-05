import { getAdverts } from "./service";
import { useEffect, useState } from "react";
import Advert from "./components/Advert";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import Button from "../../components/shared/Button";

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

  return (
    <Layout title="Adverts">
      <div>
        {adverts.length ? (
          <ul>
            {adverts.map(({ id, ...advert }) => (
              <li key={id}>
                <Link to={`/adverts/${id}`}>
                  <Advert {...advert} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Layout>
  );
}

export default AdvertsPage;
