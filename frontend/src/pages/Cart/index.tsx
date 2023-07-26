import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCart } from "../../store/slices/cartSlice";
import Layout from "../../components/layout";
import styles from "./cart.module.scss";
import SpinningLoader from "../../components/SpinningLoader";
import CartProduct from "../../components/CartProduct";
const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart, isLoading } = useAppSelector((state) => state.cartSlice);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) dispatch(fetchCart(userId));
    console.log(cart);
  }, []);
  return (
    <Layout>
      <div className="text-2xl font-bold ml-10">Cart</div>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          {!isLoading ? (
            cart.map(({ product, user }) => {
              return <CartProduct product={product} key={product._id} />;
            })
          ) : (
            <SpinningLoader />
          )}
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.productDetails}>
            <div>Price details</div>
            <div className={styles.totalMrp}>Total MRP : ₹ 200</div>
            <div className={styles.Covenience}>Covenience Fee: ₹20</div>
            <div className={styles.totalAmount}>Total amount: ₹220</div>
          </div>
          <button className={styles.checkoutButton}> Place order</button>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
