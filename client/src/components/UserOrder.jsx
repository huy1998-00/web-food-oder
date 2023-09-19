import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setOrders } from "../context/actions/orderActions";
import { getAllOrder } from "../API";
import { OrderData } from "../components";
const UserOrder = () => {
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [userOrders, setuserOrders] = useState(null);

  useEffect(() => {
    if (!order) {
      getAllOrder().then((res) => {
        dispatch(setOrders(res));
        setuserOrders(res.filter((data) => data.userId === user?.user_id));
      });
    } else {
      setuserOrders(order.filter((data) => data.userId === user?.user_id));
    }
  }, []);

  return (
    <main className="flex w-screen min-h-screen flex-col items-center justify-start bg-primary">
      <Header></Header>
      <div className="w-full flex flex-col items-start justify mt-40 px-6  md:px-24 2xl:px-96 gap-12 pb-24">
        {userOrders?.length > 0 ? (
          <>
            {userOrders?.map((item, i) => (
              <OrderData
                key={i}
                index={i}
                data={item}
                admin={false}
              ></OrderData>
            ))}
          </>
        ) : (
          <>
            <h1 className="font-semibold ">No Order</h1>
          </>
        )}
      </div>
    </main>
  );
};

export default UserOrder;
