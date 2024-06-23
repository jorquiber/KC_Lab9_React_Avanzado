import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdvert, deleteAdvert } from "./service";
import AdvertDetail from "./components/AdvertDetail";
import { useNavigate } from "react-router-dom";

function AdvertPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [advert, setAdvert] = useState(null);

  useEffect(() => {
    async function getAdvertsFromService() {
      try {
        const advert = await getAdvert(params.id);
        setAdvert(advert);
      } catch (error) {
        if (error.status === 404) {
          navigate("/404");
        }
      }
    }
    getAdvertsFromService();
  }, [params.id, navigate]);

  const handleDelete = async () => {
    try {
      await deleteAdvert(params.id);
      navigate("/");
    } catch (error) {
      if (error.status === 404) {
        navigate("/404");
      }
    }
  };

  return (
    <Layout title="Advert detail">
      {advert ? <AdvertDetail onDelete={handleDelete} {...advert} /> : null}
    </Layout>
  );
}

export default AdvertPage;
