import React, { useContext, useEffect, useState } from "react";
import { West, ArrowForwardIos, FavoriteBorder } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import { Modal } from "antd";
import { Cancel } from "@mui/icons-material";
import AddressCard from "../../components/AddressCard";
import map from "../../images/mapsargyt.svg";
import carta from "../../images/carta.svg";
import check_box from "../../images/check_box.svg";
import AddressCardCreate from "../../components/AddressCardCreate";
import OrderConfirm from "../../components/OrderConfirm";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosIntance";
import axios from "axios";
const Sargyt = () => {
  const [payment, setPeyment] = useState(1);
  const [plastik, setPlastik] = useState(false);
  const history = useHistory();
  const [address, setAddress] = useState(-1);
  const [address2, setAddress2] = useState("");
  const [note, setNote] = useState("");
  const [sargyt, setSargyt] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const { dil, basket, removeAll, is_logged } = useContext(Context);
  const [orderId, setOrderId] = useState(0);

  var data = JSON.parse(localStorage.getItem("userData"));

  let delivery = 0;
  let umumy = 0;
  let discount = 0;
  basket.map((item) => {
    item?.products?.map((pro) => {
      umumy = umumy + pro.quantity * pro.pro.price;
      if (!pro.pro.is_discount) {
        discount =
          discount + (pro.pro.price - pro.pro.discount_price) * pro.quantity;
      }
    });
  });

  var data = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    getAddress();
  }, [dil]);
  const getAddress = () => {
    if (data?.id !== undefined)
      axiosInstance
        .get("/api/address/all", {
          params: {
            UserId: data.id,
          },
        })
        .then((data) => {
          console.log(data.data);
          setAddresses(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const createOrder = () => {
    if (data?.id !== undefined) {
      let orderArray = [];
      basket?.map((item, i) => {
        orderArray.push({
          market_id: item.id,
          products: item.products,
        });
      });
      axiosInstance
        .post("/api/grocery_order", {
          user_id: data.id,
          phone_number: "123456",
          address: address != -1 ? addresses[address].address : address2,
          price: umumy,
          service_price: 10,
          discount_price: discount,
          delivery_price: delivery,
          note: note,
          code: "code1234",
          status: 1,
          type_payment:
            payment === 1
              ? "Nagt gornusi"
              : payment === 2
              ? "Onlayn gornusi"
              : "Terminal gornusi",
          order: orderArray,
          is_paid: 0,
        })
        .then((data) => {
          setOrderId(data.data.oid);

          data.data.body.map((item) => {
            if (item.type_payment === "Onlayn gornusi") {
              axiosInstance
                .post("/api/online-payment", {
                  price: umumy,
                  order_id: data.data.oid,
                })
                .then((res) => {
                  window.open(res.data.formUrl, "_blank");
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          });

          setSargyt(true);
          removeAll();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="inline-flex justify-between w-full pb-10 select-none">
      {payment !== 2 && (
        <Modal
          className="p-8 font-roboto"
          width={450}
          open={sargyt}
          onCancel={() => setSargyt(false)}
          footer={false}
        >
          <OrderConfirm orderId={orderId} />
        </Modal>
      )}
      <div className="w-full">
        <div className="flex items-center w-full">
          <p
            onClick={() => history.push({ pathname: "/mrt/home" })}
            className="text-[16px] font-regular text-black-secondary mr-2"
          >
            {dil === "TM"
              ? tm["Baş sahypa"]
              : dil === "RU"
              ? ru["Baş sahypa"]
              : en["Baş sahypa"]}
          </p>
          <ArrowForwardIos className="!text-[16px]  font-regular text-black-secondary mr-2" />
          <p
            onClick={() => history.push({ pathname: "/mrt/basket" })}
            className="text-[16px] font-regular text-black-secondary mr-2"
          >
            {dil === "TM" ? tm.Sebet : dil === "RU" ? ru.Sebet : en.Sebet}
          </p>
          <ArrowForwardIos className="!text-[16px]  font-regular text-black-secondary mr-2" />
          <p className="text-[16px] font-regular text-black-secondary mr-2">
            {dil === "TM" ? tm.Sargyt : dil === "RU" ? ru.Sargyt : en.Sargyt}
          </p>
        </div>

        <div className="flex items-center justify-between w-full mt-4">
          <div className="flex justify-start">
            <p className="text-[28px] font-bold text-neutral-900 mr-2">
              {dil === "TM"
                ? tm["Sargydy tassyklamak"]
                : dil === "RU"
                ? ru["Sargydy tassyklamak"]
                : en["Sargydy tassyklamak"]}
            </p>
          </div>
        </div>

        <div className="inline-flex flex-wrap justify-between w-full mt-6">
          <div className="lg:w-[75%] w-full">
            {/* <h1 className="w-full text-left text-[20px] text-black-secondary font-semi">
              Eltip bermeli ýeriňiz
            </h1>
            <img
              className="w-full object-contain rounded-[16px] mt-4"
              src={map}
              alt="map"
            /> */}
            {is_logged ? (
              <>
                <h1 className="w-full  text-left text-[20px] text-black-secondary font-semi">
                  {dil === "TM"
                    ? tm["Siziň salgylaryñyz"]
                    : dil === "RU"
                    ? ru["Siziň salgylaryñyz"]
                    : en["Siziň salgylaryñyz"]}
                </h1>
                <div className="flex flex-wrap justify-between w-full mt-4 ">
                  {addresses &&
                    addresses.length > 0 &&
                    addresses?.map((item, i) => {
                      return (
                        <>
                          {address === i ? (
                            <div
                              className="w-[49%]"
                              onClick={() => setAddress(-1)}
                            >
                              <AddressCard
                                data={item}
                                bg={"!bg-green "}
                                text={"!text-white "}
                                open={true}
                                arrow={false}
                              />
                            </div>
                          ) : (
                            <div
                              className="w-[49%]"
                              onClick={() => setAddress(i)}
                            >
                              <AddressCard
                                data={item}
                                open={true}
                                arrow={false}
                              />
                            </div>
                          )}
                        </>
                      );
                    })}

                  <AddressCardCreate getData={getAddress} />
                </div>
              </>
            ) : null}
            <h1 className="w-full mt-6 text-left text-[20px] text-black-secondary font-semi">
              {dil === "TM"
                ? tm["Salgyny saýlaň"]
                : dil === "RU"
                ? ru["Salgyny saýlaň"]
                : en["Salgyny saýlaň"]}
            </h1>
            <div className="flex justify-between w-full mt-4 ">
              <input
                onChange={(e) => {
                  address == -1 && setAddress2(e.target.value);
                }}
                value={address2}
                className="w-full text-[16px]  p-4 outline-none font-regular bg-neutral-200 rounded-[8px] text-neutral-600 text-left"
                placeholder={
                  dil === "TM"
                    ? tm["Salgyñyzyn ady, Mysal öy"]
                    : dil === "RU"
                    ? ru["Salgyñyzyn ady, Mysal öy"]
                    : en["Salgyñyzyn ady, Mysal öy"]
                }
                type="text"
              />
              {/* <div className="w-[55px] ml-4 text-[16px] p-4 outline-none font-regular bg-neutral-200 rounded-[8px] text-neutral-600 text-left">
                <img src={carta} alt="carta" />
              </div> */}
            </div>

            <h1 className="w-full mt-6 text-left text-[20px] text-black-secondary font-semi">
              {dil === "TM"
                ? tm["Gosmaça habar"]
                : dil === "RU"
                ? ru["Gosmaça habar"]
                : en["Gosmaça habar"]}
            </h1>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full h-[120px] text-[16px] font-regular text-neutral-600 text-left mt-4  p-4 outline-none  bg-neutral-200 rounded-[8px] "
              placeholder={
                dil === "TM"
                  ? tm["manat berjek, 4 manat zdaçi ýanyňyz bilen getiräýiň"]
                  : dil === "RU"
                  ? ru["manat berjek, 4 manat zdaçi ýanyňyz bilen getiräýiň"]
                  : en["manat berjek, 4 manat zdaçi ýanyňyz bilen getiräýiň"]
              }
              type="text"
            />

            <h1 className="w-full mt-6 text-left text-[20px] text-black-secondary font-semi">
              {dil === "TM"
                ? tm["Töleg görnüşi"]
                : dil === "RU"
                ? ru["Töleg görnüşi"]
                : en["Töleg görnüşi"]}
            </h1>
            <div className="flex flex-wrap justify-between w-full mt-4">
              <div
                onClick={() => setPeyment(1)}
                className="flex cursor-pointer mb-4 p-4 w-[49%] text-[16px] items-center outline-none font-regular bg-neutral-100 rounded-[8px] text-neutral-600 text-left"
              >
                <div className="w-[24px] h-[24px] mr-2 text-[16px] outline-none font-regular bg-neutral-300 rounded-[100%] text-neutral-600 text-left">
                  {payment === 1 && (
                    <img
                      className="h-[24px] object-contain"
                      src={check_box}
                      alt="check_box"
                    />
                  )}
                </div>
                <p className="text-[16px] text-neutral-900 font-semi">
                  {dil === "TM"
                    ? tm["Nagt görnüş"]
                    : dil === "RU"
                    ? ru["Nagt görnüş"]
                    : en["Nagt görnüş"]}
                </p>
              </div>
              <div
                onClick={() => setPeyment(2)}
                className="flex cursor-pointer mb-4 p-4 w-[49%] text-[16px] items-center outline-none font-regular bg-neutral-100 rounded-[8px] text-neutral-600 text-left"
              >
                <div className="w-[24px] h-[24px] mr-2 text-[16px] outline-none font-regular bg-neutral-300 rounded-[100%] text-neutral-600 text-left">
                  {payment === 2 && (
                    <img
                      className="h-[24px] object-contain"
                      src={check_box}
                      alt="check_box"
                    />
                  )}
                </div>
                <p className="text-[16px] text-neutral-900 font-semi">
                  {dil === "TM"
                    ? tm["Onlaýn töleg"]
                    : dil === "RU"
                    ? ru["Onlaýn töleg"]
                    : en["Onlaýn töleg"]}
                </p>
              </div>
              <div
                onClick={() => setPeyment(3)}
                className="flex cursor-pointer mb-4 p-4 w-[49%] text-[16px] items-center outline-none font-regular bg-neutral-100 rounded-[8px] text-neutral-600 text-left"
              >
                <div className="w-[24px] h-[24px] mr-2 text-[16px] outline-none font-regular bg-neutral-300 rounded-[100%] text-neutral-600 text-left">
                  {payment === 3 && (
                    <img
                      className="h-[24px] object-contain"
                      src={check_box}
                      alt="check_box"
                    />
                  )}
                </div>
                <p className="text-[16px] text-neutral-900 font-semi">
                  {dil === "TM"
                    ? tm["Terminal tölegi"]
                    : dil === "RU"
                    ? ru["Terminal tölegi"]
                    : en["Terminal tölegi"]}
                </p>
              </div>
            </div>
          </div>
          <div className="xl:w-[20%] lg:w-[24%] w-full h-fit rounded-[16px] border-[1px] border-neutral-300 p-4 shadow-sm">
            <h1 className="w-full text-[20px] font-semi text-black-secondary border-b-[1px] border-b-neutral-300 py-2">
              {dil === "TM"
                ? tm["Sargyt barada"]
                : dil === "RU"
                ? ru["Sargyt barada"]
                : en["Sargyt barada"]}
            </h1>
            <div className="w-full border-b-[1px] border-b-neutral-300 py-2 ">
              <div className="flex justify-between w-full py-2">
                <p className="text-[16px] font-medium text-black-secondary">
                  {dil === "TM" ? tm.Umumy : dil === "RU" ? ru.Umumy : en.Umumy}
                  :
                </p>
                <p className="text-[16px] font-medium text-black-secondary">
                  {umumy.toFixed(2)} TMT
                </p>
              </div>
              <div className="flex justify-between w-full py-2">
                <p className="text-[16px] font-medium text-black-secondary">
                  {dil === "TM"
                    ? tm["Eltip bermek"]
                    : dil === "RU"
                    ? ru["Eltip bermek"]
                    : en["Eltip bermek"]}
                  :
                </p>
                <p className="text-[16px] font-medium text-black-secondary">
                  +{delivery.toFixed(2)} TMT
                </p>
              </div>
              <div className="flex justify-between w-full py-2">
                <p className="text-[16px] font-medium text-red">
                  {dil === "TM"
                    ? tm.Arzanladyş
                    : dil === "RU"
                    ? ru.Arzanladyş
                    : en.Arzanladyş}
                  :
                </p>
                <p className="text-[16px] font-medium text-red">
                  -{discount.toFixed(2)} TMT
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full py-4">
              <p className="text-[18px] font-semi text-black-secondary">
                {dil === "TM" ? tm.Jemi : dil === "RU" ? ru.Jemi : en.Jemi}:
              </p>
              <p className="text-[18px] font-semi text-black-secondary">
                {(umumy - discount + delivery).toFixed(2)} TMT
              </p>
            </div>
            <div className="w-full">
              <button
                onClick={() => createOrder()}
                className="h-[43px] rounded-[8px] w-full bg-green text-[16px] font-semi text-white "
              >
                {dil === "TM"
                  ? tm.Tassyklamak
                  : dil === "RU"
                  ? ru.Tassyklamak
                  : en.Tassyklamak}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sargyt;
