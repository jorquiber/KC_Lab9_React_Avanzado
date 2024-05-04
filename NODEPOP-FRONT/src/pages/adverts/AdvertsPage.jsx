import { getAdverts } from "./service";
import { useEffect, useState } from "react";
import Advert from "./components/Advert";

const EmptyList = () => (
  <div>
    <p>N oadverts on the web</p>
    <button>Create advert</button>
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
    <div>
      {adverts.length ? (
        <ul>
          {adverts.map(({ id, ...advert }) => (
            <li key={id}>
              <Advert {...advert} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyList />
      )}
    </div>
  );
}

export default AdvertsPage;
