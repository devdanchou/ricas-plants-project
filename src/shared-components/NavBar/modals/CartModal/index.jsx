import { useState, useContext, useEffect, useCallback } from "react";
import SessionContext from "contexts/SessionContext";
import { RemoveScroll } from "react-remove-scroll";
import LoadingSpinner from "shared-components/LoadingSpinner";
import * as cartService from "services/cart";
import CartItem from "./CartItem";
import clsx from "clsx";
import { motion } from "framer-motion";

const CartModal = (props) => {
  const { setIsCartOpen } = props;
  const { username } = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const fetchCart = useCallback(async () => {
    setIsLoading(true);
    const response = await cartService.getCart();
    const data = await response.json();
    setItems(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  let totalQuantity = 0;
  let subTotal = 0;

  for (let item of items) {
    totalQuantity += item.quantity;
    subTotal += item.quantity * item.price_per_unit
  }

  return (
        <motion.div
          className="flex flex-col w-full h-screen max-w-xl bg-white"
          initial={{ translateX: "100%"}}
          animate={{ translateX: 0 }}
          transition={{ duration: 0.5 }}
          >
          <div className="text-3xl text-center text-white py-8 shadow-md bg-emerald-800 font-playfair">
            {username}&apos;s Cart
          </div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="flex-1 overflow-y-scroll pb-20">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    className={clsx(
                      "pt-8 mx-5 mt-8",
                      idx !== 0 && "border-t border-slate-300"
                    )}
                  >
                    <CartItem item={item} fetchCart={fetchCart} />
                  </div>
                ))}{" "}
              </div>
              <div className="flex flex-col px-4 pb-4 border-t border-slate-300">
                <div className="flex justify-between py-4 text-slate-400">
                  <div>{totalQuantity} items</div>
                  <div>subtotal <span className="ml-2 text-lg text-slate-500">${subTotal}</span></div>
                </div>
                <button className="flex items-center justify-center py-3 text-lg text-white rounded-full bg-emerald-700"
                onClick={() => alert("Your checkout is complete!")}>
                  checkout
                  <i className="ml-2 text-2xl fa-regular fa-arrow-right"></i>
                </button>
              </div>
            </>
          )}
        </motion.div>
  );
};

export default CartModal;
