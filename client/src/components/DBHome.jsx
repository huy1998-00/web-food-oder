import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllProducts } from "../context/actions/productActions";
import { getAllProduct } from "../API/index";
import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!products) {
      getAllProduct().then((data) => {
        console.log("fetch data");
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md:w-508 ">
            {/*  cần fix ddataa cho này thành số lượng sản phẩm theo từng mục */}
            <CChart
              type="bar"
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
                datasets: [
                  {
                    label: "GitHub Commits",
                    backgroundColor: "#f87979",
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                  },
                ],
              }}
              labels="months"
            />
          </div>
        </div>
        <div className="flex items-center justify-center h-full w-full ">
          <div className="w-275 md:w-460">
            <CChart
              // cần fix data chỗ này thành tổng doanh thu ( tổng tiền tất cả cấc order)
              type="doughnut"
              data={{
                labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
                datasets: [
                  {
                    backgroundColor: [
                      "#41B883",
                      "#E46651",
                      "#00D8FF",
                      "#DD1B16",
                    ],
                    data: [40, 20, 80, 10],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
