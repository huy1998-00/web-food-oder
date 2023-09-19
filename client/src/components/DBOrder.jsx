import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../API";
import { setOrders } from "../context/actions/orderActions";
import OrderData from "./OrderData";

const DBOrder = () => {
  const order = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!order) {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
      });
    }
  }, []);
  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full gap-4">
      {order ? (
        <>
          {order?.map((item, i) => (
            <OrderData key={i} index={i} data={item} admin={true}></OrderData>
          ))}
        </>
      ) : (
        <>
          <h1 className="font-semibold ">No Order</h1>
        </>
      )}
    </div>
  );
};

export default DBOrder;
