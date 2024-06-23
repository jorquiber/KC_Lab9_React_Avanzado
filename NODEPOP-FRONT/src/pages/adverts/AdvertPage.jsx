import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdvertDetail from "./components/AdvertDetail";
import { getAdvert } from "../../store/selectors";
import { loadAdvert, deleteAdvert } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

function AdvertPage() {
  const params = useParams();
  const advert = useSelector(getAdvert(params.id));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdvert(params.id));
  }, [params.id, dispatch]);

  const handleDelete = async () => {
    dispatch(deleteAdvert(params.id));
  };

  return (
    <Layout title="Advert detail">
      {advert ? <AdvertDetail onDelete={handleDelete} {...advert} /> : null}
    </Layout>
  );
}

export default AdvertPage;
