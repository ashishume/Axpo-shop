import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearState, fetchCategoryProducts } from "../../store/slices/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../../components/Product-card";
import Layout from "../../components/layout";
import SpinningLoader from "../../components/SpinningLoader";
import { newTitle } from "../../Utils/convertTextToLink";
import { IProduct } from "../../models/product";

const CategoryItems = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const products = useAppSelector((state) => state.productsSlice.categoryProducts);
  useEffect(() => {
    dispatch(fetchCategoryProducts(params.categoryId as string));
    return () => {
      dispatch(clearState());
    };
  }, []);
  function handleProduct(product: IProduct) {
    navigate(`/product/${newTitle(product.name)}/${product._id}`);
  }
  return (
    <Layout>
      {products?.length ? (
        products.map((product) => {
          return <ProductCard product={product} handleProduct={() => handleProduct(product)} />;
        })
      ) : (
        <SpinningLoader />
      )}
    </Layout>
  );
};

export default CategoryItems;