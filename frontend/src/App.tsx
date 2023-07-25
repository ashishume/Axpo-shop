import CategoryCard from "./components/category-card";
import Layout from "./components/layout";
import Thumbnail from "./components/thumbnail";
import { useAppDispatch, useAppSelector } from "./store/hooks";
function App() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.productsSlice.products);
  const isLoading = useAppSelector((state) => state.productsSlice.isLoading);

  return (
    <Layout>
      {!isLoading &&
        products.map((value) => {
          return <div>{value.brand}</div>;
        })}
      <Thumbnail />
      <CategoryCard imageSource="assets/headphone.jpg" title="Beauty picks" />
      <CategoryCard
        imageSource="https://rukminim2.flixcart.com/image/200/200/kokdci80/dslr-camera/v/e/x/z-24-200mm-z5-nikon-original-imag2zuekuxgxsgg.jpeg?q=70"
        title="Beauty picks"
      />
      <CategoryCard
        imageSource="https://rukminim2.flixcart.com/image/200/200/l4x2rgw0/monitor/n/y/y/q24i-20-full-hd-23-8-66eegac3in-lenovo-original-imagfpgxzsk8ef26.jpeg?q=70"
        title="Beauty picks"
      />
    </Layout>
  );
}

export default App;
