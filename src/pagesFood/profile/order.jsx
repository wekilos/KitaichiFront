import { ArrowForwardIos } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../componentsFood/SideBar";
import timer1 from "../../images/timer1.svg";
import timer2 from "../../images/timer2.svg";
import timer3 from "../../images/timer3.svg";
import timer4 from "../../images/timer4.svg";
import {
  DoNotDisturbOnOutlined,
  RefreshOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import ProductOrderCard from "../../components/ProductOrderCard";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosIntance";

const Order = () => {
  const history = useHistory();
  const { dil } = useContext(Context);
  const { id } = useParams();
  const [order, setOrder] = useState([]);

  var data = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    getOrder();
  }, [dil, id]);
  const getOrder = () => {
    axiosInstance
      .get("/api/food_order", {
        params: {
          order_id: id,
        },
      })
      .then((data) => {
        console.log("order food:", data.data.body[0]);
        setOrder(data.data.body[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelOrder = (id) => {
    let user_id = data?.id ? data?.id : 1;
    axiosInstance
      .post("/api/food_rejected_order", {
        user_id: user_id,
        order_id: id,
      })
      .then((data) => {
        console.log(data.data);
        getOrder();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full pb-10">
      <div className="w-full md2:flex hidden items-center">
        <p
          onClick={() => history.push({ pathname: "/rtn/home" })}
          className="text-[16px] cursor-pointer font-regular text-black-secondary mr-2"
        >
          {dil === "TM"
            ? tm["Baş sahypa"]
            : dil === "RU"
            ? ru["Baş sahypa"]
            : en["Baş sahypa"]}
        </p>
        <ArrowForwardIos className="!text-[16px]  font-regular text-black-secondary mr-2" />
        <p
          onClick={() => history.push({ pathname: "/rtn/profile/orders" })}
          className="text-[16px] cursor-pointer font-regular text-black-secondary mr-2"
        >
          {dil === "TM"
            ? tm.Sargytlarym
            : dil === "RU"
            ? ru.Sargytlarym
            : en.Sargytlarym}
        </p>
        <ArrowForwardIos className="!text-[16px]  font-regular text-black-secondary mr-2" />
        <p className="text-[16px] font-regular text-black-secondary mr-2">
          {dil === "TM"
            ? tm["Sargyt barada maglumatlar"]
            : dil === "RU"
            ? ru["Sargyt barada maglumatlar"]
            : en["Sargyt barada maglumatlar"]}
        </p>
      </div>
      <div className="w-full my-4 flex justify-between  items-center">
        <div className="flex justify-start">
          <p className="md2:text-[28px] text-[20px] font-bold text-neutral-900 mr-2">
            {dil === "TM"
              ? tm["Sargyt barada maglumatlar"]
              : dil === "RU"
              ? ru["Sargyt barada maglumatlar"]
              : en["Sargyt barada maglumatlar"]}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className="min-w-[246px] lg:block hidden w-[246px] h-fit">
          <Sidebar />
        </div>
        <div className="w-full lg:px-6">
          {order?.status === 1 && (
            <div className="w-full flex flex-wrap md2:justify-between justify-center rounded-[16px] p-6 border-[1px] border-neutral-300">
              <div className="w-fit flex md2:mb-0 mb-1  items-center">
                <img
                  src={
                    (order?.status === 1 && timer1) ||
                    (order?.status === 2 && timer2) ||
                    (order?.status === 3 && timer3) ||
                    (order?.status === 4 && timer4)
                  }
                  className="mr-2 h-[48px] object-contain"
                  alt=""
                />
                <p className="text-[18px] text-neutral-900 font-semi ">
                  {order?.status === 1 &&
                    (dil === "TM"
                      ? tm.Garaşylyar
                      : dil === "RU"
                      ? ru.Garaşylyar
                      : en.Garaşylyar)}
                </p>
              </div>
              <div
                onClick={() => cancelOrder(order?.id)}
                className="w-fit flex"
              >
                <button className="text-white h-[42px] rounded-[9px] whitespace-nowrap px-6 bg-red text-[16px] font-semi ">
                  <DoNotDisturbOnOutlined />{" "}
                  {dil === "TM"
                    ? tm["Sargydy ýatyrmak"]
                    : dil === "RU"
                    ? ru["Sargydy ýatyrmak"]
                    : en["Sargydy ýatyrmak"]}
                </button>
              </div>
            </div>
          )}
          {order?.status === 3 && (
            <div className="w-full flex flex-wrap  md2:justify-between justify-center rounded-[16px] p-6 border-[1px] border-neutral-300">
              <div className="w-fit flex items-center">
                <img
                  src={
                    (order?.status === 1 && timer1) ||
                    (order?.status === 2 && timer2) ||
                    (order?.status === 3 && timer3) ||
                    (order?.status === 4 && timer4)
                  }
                  className="mr-2 h-[48px] object-contain"
                  alt=""
                />
                <p className="text-[18px] text-neutral-900 font-semi ">
                  {order?.status === 3 &&
                    (dil === "TM"
                      ? tm.Gowshuryldy
                      : dil === "RU"
                      ? ru.Gowshuryldy
                      : en.Gowshuryldy)}
                </p>
              </div>
              <div className="w-fit flex">
                <button
                  onClick={() =>
                    history.push({
                      pathname: "/rtn/basket",
                    })
                  }
                  className="text-neutral-900 h-[42px] mr-4 rounded-[9px] whitespace-nowrap px-6 bg-neutral-200 text-[16px] font-semi "
                >
                  <RefreshOutlined />
                  {dil === "TM"
                    ? tm["Sargydy gaýtalamak"]
                    : dil === "RU"
                    ? ru["Sargydy gaýtalamak"]
                    : en["Sargydy gaýtalamak"]}
                </button>
              </div>
            </div>
          )}
          {order?.status === 2 && (
            <div className="w-full flex justify-between rounded-[16px] p-6 border-[1px] border-neutral-300">
              <div className="w-full flex items-center">
                <img
                  src={
                    (order?.status === 1 && timer1) ||
                    (order?.status === 2 && timer2) ||
                    (order?.status === 3 && timer3) ||
                    (order?.status === 4 && timer4)
                  }
                  className="mr-2 h-[48px] object-contain"
                  alt=""
                />
                <p className="text-[18px] text-neutral-900 font-semi ">
                  {order?.status === 2 &&
                    (dil === "TM"
                      ? tm.Taýýarlanylýar
                      : dil === "RU"
                      ? ru.Taýýarlanylýar
                      : en.Taýýarlanylýar)}
                </p>
              </div>
              {/* <div className="w-fit flex">
                                <button className="text-white h-[42px] rounded-[9px] whitespace-nowrap px-6 bg-red text-[16px] font-semi ">
                                    <DoNotDisturbOnOutlined /> Sargydy ýatyrmak
                                </button>
                            </div> */}
            </div>
          )}
          {order?.status === 4 && (
            <div className="w-full flex justify-between rounded-[16px] p-6 border-[1px] border-neutral-300">
              <div className="w-full flex items-center">
                <img
                  src={
                    (order?.status === 1 && timer1) ||
                    (order?.status === 2 && timer2) ||
                    (order?.status === 3 && timer3) ||
                    (order?.status === 4 && timer4)
                  }
                  className="mr-2 h-[48px] object-contain"
                  alt=""
                />
                <p className="text-[18px] text-neutral-900 font-semi ">
                  {order?.status === 4 &&
                    (dil === "TM"
                      ? tm.Yatyryldy
                      : dil === "RU"
                      ? ru.Yatyryldy
                      : en.Yatyryldy)}
                </p>
              </div>
              {/* <div className="w-fit flex">
                                <button className="text-white h-[42px] rounded-[9px] whitespace-nowrap px-6 bg-red text-[16px] font-semi ">
                                    <DoNotDisturbOnOutlined /> Sargydy ýatyrmak
                                </button>
                            </div> */}
            </div>
          )}
          <h1 className="w-full text-left text-[18px] font-semi text-neutral-900 mt-4">
            {dil === "TM"
              ? tm["Sargyt edilen önümler"]
              : dil === "RU"
              ? ru["Sargyt edilen önümler"]
              : en["Sargyt edilen önümler"]}
          </h1>
          <div className="w-full mt-4">
            {order?.order?.map((item) => {
              return <ProductOrderCard data={item} />;
            })}
          </div>
          <div className="w-full flex flex-wrap justify-between mt-4">
            <div className="md2:w-[49%] w-full">
              <h1 className="w-full text-left text-[18px] text-neutral-900 font-semi">
                {dil === "TM"
                  ? tm["Sargytyň bahasy"]
                  : dil === "RU"
                  ? ru["Sargytyň bahasy"]
                  : en["Sargytyň bahasy"]}
                :
              </h1>
              <div className="w-full mt-4 rounded-[16px] border-[1px] border-neutral-300 shadow-sm p-6">
                <div className="flex pb-2 justify-between">
                  <p className="text-[16px] text-neutral-900 font-medium">
                    {dil === "TM"
                      ? tm["Umumy baha"]
                      : dil === "RU"
                      ? ru["Umumy baha"]
                      : en["Umumy baha"]}
                    :
                  </p>
                  <p className="text-[16px] text-neutral-900 font-medium">
                    {order?.price?.toFixed(2)}
                    TMT
                  </p>
                </div>
                <div className="flex pb-2 justify-between">
                  <p className="text-[16px] text-neutral-900 font-medium">
                    {dil === "TM"
                      ? tm["Hyzmat üçin"]
                      : dil === "RU"
                      ? ru["Hyzmat üçin"]
                      : en["Hyzmat üçin"]}
                    :
                  </p>
                  <p className="text-[16px] text-neutral-900 font-medium">
                    +{order?.service_price?.toFixed(2)} TMT
                  </p>
                </div>
                <div className="flex pb-2 justify-between">
                  <p className="text-[16px] text-red font-medium">
                    {dil === "TM"
                      ? tm.Arzanladyş
                      : dil === "RU"
                      ? ru.Arzanladyş
                      : en.Arzanladyş}
                    (-
                    {(
                      100 -
                      ((order?.price - order?.discount_price) * 100) /
                        order?.price
                    )?.toFixed(2)}
                    %)
                  </p>
                  <p className="text-[16px] text-red font-medium">
                    -{order?.discount_price?.toFixed(2)} TMT
                  </p>
                </div>
                <div className="flex pb-2 border-b-[1px] border-b-neutral-300 justify-between">
                  <p className="text-[16px] text-neutral-900 font-medium">
                    {dil === "TM"
                      ? tm["Eltip bermek hyzmaty"]
                      : dil === "RU"
                      ? ru["Eltip bermek hyzmaty"]
                      : en["Eltip bermek hyzmaty"]}
                    :
                  </p>
                  <p className="text-[16px] text-neutral-900 font-medium">
                    +{order.delivery_price?.toFixed(2)} TMT
                  </p>
                </div>
                <div className="flex pt-4 justify-between">
                  <p className="text-[16px] text-neutral-900 font-semi">
                    {dil === "TM" ? tm.Jemi : dil === "RU" ? ru.Jemi : en.Jemi}:
                  </p>
                  <p className="text-[16px] text-neutral-900 font-semi">
                    {(
                      +order.price +
                      +order.service_price +
                      +order.delivery_price -
                      +order.discount_price
                    )?.toFixed(2)}{" "}
                    TMT
                  </p>
                </div>
              </div>
            </div>
            <div className="md2:w-[49%] w-full md2:mt-0 mt-4">
              <h1 className="w-full text-left text-[18px] text-neutral-900 font-semi">
                {dil === "TM"
                  ? tm["Sargyt barada maglumat"]
                  : dil === "RU"
                  ? ru["Sargyt barada maglumat"]
                  : en["Sargyt barada maglumat"]}
              </h1>
              <div className="w-full mt-4 ">
                <div className="flex h-[48px] mb-2 bg-neutral-200 rounded-[8px] px-4 items-center justify-between">
                  <p className="text-[16px] text-neutral-800 font-medium">
                    {dil === "TM"
                      ? tm["Sargydyn kody"]
                      : dil === "RU"
                      ? ru["Sargydyn kody"]
                      : en["Sargydyn kody"]}
                    :
                  </p>
                  <p className="text-[16px] text-neutral-900 font-semi">
                    {order?.code}
                  </p>
                </div>
                <div className="flex h-[48px] mb-2 bg-neutral-200 rounded-[8px] px-4 items-center justify-between">
                  <p className="text-[16px] text-neutral-800 font-medium">
                    {dil === "TM"
                      ? tm["Sargyt berlen wagty"]
                      : dil === "RU"
                      ? ru["Sargyt berlen wagty"]
                      : en["Sargyt berlen wagty"]}
                  </p>
                  <p className="text-[16px] text-neutral-900 font-semi">
                    {order?.ordered_time?.slice(0, 10)} -{" "}
                    {order?.ordered_time?.slice(11, 16)}
                  </p>
                </div>
                <div className="flex h-[48px] mb-2 bg-neutral-200 rounded-[8px] px-4 items-center justify-between">
                  <p className="text-[16px] text-neutral-800 font-medium">
                    {dil === "TM"
                      ? tm["Eltip berlen wagty"]
                      : dil === "RU"
                      ? ru["Eltip berlen wagty"]
                      : en["Eltip berlen wagty"]}
                    :
                  </p>
                  <p className="text-[16px] text-neutral-900 font-semi">
                    {order?.delivered_time?.slice(0, 10)} -{" "}
                    {order?.delivered_time?.slice(11, 16)}
                  </p>
                </div>
                <div className="flex h-[48px] bg-neutral-200 rounded-[8px] px-4 items-center justify-between">
                  <p className="text-[16px] text-neutral-900 font-medium">
                    {dil === "TM"
                      ? tm["Eltip berlen yeri"]
                      : dil === "RU"
                      ? ru["Eltip berlen yeri"]
                      : en["Eltip berlen yeri"]}
                  </p>
                  <p className="text-[16px] text-neutral-900 font-semi">
                    {order?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
