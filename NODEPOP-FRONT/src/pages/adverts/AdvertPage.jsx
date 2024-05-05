import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdvert } from "./service";
import AdvertDetail from "./components/AdvertDetail";
import { useNavigate } from "react-router-dom";

function AdvertPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState(null);

  useEffect(() => {
    try {
      async function getAdvertsFromService() {
        const advert = await getAdvert(params.id);
        setAdvert(advert);
      }
      getAdvertsFromService();
    } catch (error) {
      if (error.status === 404) {
        navigate("/404");
      }
    }
  }, [params.id]);

  return (
    <Layout title="Advert detail">
      {advert ? <AdvertDetail {...advert} /> : null}
    </Layout>
  );
}

export default AdvertPage;
