import { ArrowForwardIos, Timer3 } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import card from "../../images/card.png";
import timer1 from "../../images/timer1.svg";
import timer2 from "../../images/timer2.svg";
import timer3 from "../../images/timer3.svg";
import timer4 from "../../images/timer4.svg";
import { useHistory } from "react-router-dom";

import img6 from "../../images/Image6.svg";
import img7 from "../../images/Image7.svg";
import img8 from "../../images/Image8.svg";
import img14 from "../../images/Image14.svg";
import img15 from "../../images/Image15.svg";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { BASE_URL, axiosInstance } from "../../utils/axiosIntance";

const Orders = () => {
  const history = useHistory();
  const { dil } = useContext(Context);
  const [orders, setOrders] = useState([]);

  const month = [
    dil === "TM" ? tm.Yanwar : dil === "RU" ? ru.Yanwar : en.Yanwar,
    dil === "TM" ? tm.Fewral : dil === "RU" ? ru.Fewral : en.Fewral,
    dil === "TM" ? tm.Mart : dil === "RU" ? ru.Mart : en.Mart,
    dil === "TM" ? tm.Aprel : dil === "RU" ? ru.Aprel : en.Aprel,
    dil === "TM" ? tm.May : dil === "RU" ? ru.May : en.May,
    dil === "TM" ? tm.Iyun : dil === "RU" ? ru.Iyun : en.Iyun,
    dil === "TM" ? tm.Iyul : dil === "RU" ? ru.Iyul : en.Iyul,
    dil === "TM" ? tm.Awgust : dil === "RU" ? ru.Awgust : en.Awgust,
    dil === "TM" ? tm.Sentyabr : dil === "RU" ? ru.Sentyabr : en.Sentyabr,
    dil === "TM" ? tm.Oktayabr : dil === "RU" ? ru.Oktayabr : en.Oktayabr,
    dil === "TM" ? tm.Noyabr : dil === "RU" ? ru.Noyabr : en.Noyabr,
    dil === "TM" ? tm.Dekabr : dil === "RU" ? ru.Dekabr : en.Dekabr,
  ];

  var data = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    getOrders();
  }, [dil]);
  function sortByMonthAndYear(info) {
    let ordersSorted = {};
    for (let order of info) {
      const orderDate = new Date(order.ordered_time.slice(0, 19));
      if (!ordersSorted.hasOwnProperty(orderDate.getFullYear()))
        //if this year is not exists in object then add
        ordersSorted[orderDate.getFullYear()] = {};

      if (
        !ordersSorted[orderDate.getFullYear()].hasOwnProperty(
          orderDate.getMonth()
        )
      )
        //if this month is not exists in year_object then add
        ordersSorted[orderDate.getFullYear()][orderDate.getMonth()] = [];

      ordersSorted[orderDate.getFullYear()][orderDate.getMonth()].push(order); //add order to object.year.month array
    }
    return ordersSorted;
  }
  const getOrders = () => {
    let id = data?.id ? data?.id : undefined;
    if (id != undefined)
      axiosInstance
        .get(`/api/grocery_orders?lang=${dil}&user_id=${id}&order=DESC`)
        .then((data) => {
          console.log(data.data.body);
          setOrders(sortByMonthAndYear(data.data.body));
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const returnPrice = (orders) => {
    let sum = 0;
    console.log(orders);
    orders?.order?.map((item) => {
      item?.products?.map((order) => {
        console.log(order);
        !order?.is_discount
          ? (sum = sum + order?.quantity * order.discount_price)
          : (sum = sum + order?.quantity * order.price);
      });
    });

    return sum;
  };
  return (
    <div className="w-full pb-10">
      <div className="flex items-center w-full">
        <p
          onClick={() => history.push({ pathname: "/mrt/home" })}
          className="text-[16px] cursor-pointer font-regular text-black-secondary mr-2"
        >
          {dil === "TM"
            ? tm["Baş sahypa"]
            : dil === "RU"
            ? ru["Baş sahypa"]
            : en["Baş sahypa"]}
        </p>
        <ArrowForwardIos className="!text-[16px]  font-regular text-black-secondary mr-2" />
        <p className="text-[16px] font-regular text-black-secondary mr-2">
          {dil === "TM"
            ? tm.Sargytlarym
            : dil === "RU"
            ? ru.Sargytlarym
            : en.Sargytlarym}
        </p>
      </div>
      <div className="flex items-center justify-between w-full my-4">
        <div className="flex justify-start">
          <p className="md2:text-[28px] text-[20px] font-bold text-neutral-900 mr-2">
            {dil === "TM"
              ? tm.Sargytlarym
              : dil === "RU"
              ? ru.Sargytlarym
              : en.Sargytlarym}
          </p>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="min-w-[246px] lg:block hidden w-[246px] h-fit">
          <Sidebar />
        </div>
        <div className="w-full lg:px-6">
          {orders
            ? Object.keys(orders).map((year_k) => {
                return Object.keys(orders[year_k]).map((month_k) => {
                  return (
                    <div className="w-full mb-4 ">
                      <h1 className="w-full mb-1 text-[20px] font-semi text-neutral-900 text-left">
                        {month[month_k]} {year_k}
                      </h1>
                      <div className="flex flex-wrap justify-between w-full">
                        {orders[year_k][month_k].map((item) => {
                          return (
                            <div
                              onClick={() =>
                                history.push({
                                  pathname: "/mrt/profile/orders/" + item.id,
                                })
                              }
                              className="md2:w-[48%] w-full mb-4 h-[98px] flex bg-neutral-200 rounded-[8px] p-2 items-stretch cursor-pointer"
                            >
                              <div className="w-[83px] flex justify-between flex-wrap mr-4 ">
                                {item?.order?.map((pro) => {
                                  return (
                                    <div className="bg-white h-[40px] w-[40px] rounded-tl-[4px] mb-[2px]">
                                      <img
                                        className=" h-[40px] rounded-tl-[4px] object-contain "
                                        src={BASE_URL + pro?.img}
                                        alt=""
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="w-fit ">
                                <div className="flex w-full mb-8">
                                  <img
                                    src={
                                      (item?.status === 1 && timer1) ||
                                      (item?.status === 2 && timer2) ||
                                      (item?.status === 3 && timer3) ||
                                      (item?.status === 4 && timer4)
                                    }
                                    className="mr-2"
                                    alt=""
                                  />
                                  <p className="text-[16px] text-neutral-900 font-semi ">
                                    {item?.status === 1 &&
                                      (dil === "TM"
                                        ? tm.Garaşylyar
                                        : dil === "RU"
                                        ? ru.Garaşylyar
                                        : en.Garaşylyar)}
                                    {item?.status === 2 &&
                                      (dil === "TM"
                                        ? tm.Taýýarlanylýar
                                        : dil === "RU"
                                        ? ru.Taýýarlanylýar
                                        : en.Taýýarlanylýar)}
                                    {item?.status === 3 &&
                                      (dil === "TM"
                                        ? tm.Gowshuryldy
                                        : dil === "RU"
                                        ? ru.Gowshuryldy
                                        : en.Gowshuryldy)}
                                    {item?.status === 4 &&
                                      (dil === "TM"
                                        ? tm.Yatyryldy
                                        : dil === "RU"
                                        ? ru.Yatyryldy
                                        : en.Yatyryldy)}
                                  </p>
                                </div>
                                <div className="flex w-fit">
                                  <p className="mr-6 ">
                                    {/* {returnPrice(item)} */}
                                    {(
                                      item?.price +
                                      item?.delivery_price +
                                      item?.service_price -
                                      item.discount_price
                                    ).toFixed(2)}
                                    TMT
                                  </p>
                                  <ul>
                                    <li className="list-disc">
                                      {item?.ordered_time?.slice(0, 10)}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                });
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Orders;
