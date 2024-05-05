import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdvert } from "./service";
import AdvertDetail from "./components/AdvertDetail";

function AdvertPage() {
  const params = useParams();
  const [advert, setAdvert] = useState(null);

  useEffect(() => {
    async function getAdvertsFromService() {
      const advert = await getAdvert(params.id);
      setAdvert(advert);
    }
    getAdvertsFromService();
  }, [params.id]);

  return (
    <Layout title="Advert detail">
      {advert ? <AdvertDetail {...advert} /> : null}
    </Layout>
  );
}

export default AdvertPage;
