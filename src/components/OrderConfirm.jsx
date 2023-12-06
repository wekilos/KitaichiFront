import React, { useContext } from "react";
import nahar from "../images/nahar.svg";
import gro from "../images/gro.svg";
import { useHistory } from "react-router-dom";

import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";

const OrderConfirm = (props) => {
  const history = useHistory();
  const { dil } = useContext(Context);
  return (
    <div className="w-full p-2">
      <h1 className="w-full text-center text-[28px] font-bold">
        {dil === "TM"
          ? tm["Zakazyňyz ugradyldy"]
          : dil === "RU"
          ? ru["Zakazyňyz ugradyldy"]
          : en["Zakazyňyz ugradyldy"]}
      </h1>
      <img src={gro} className="w-full mt-8 object-contain" alt="" />
      <p className="w-[90%] text-[16px] mt-8 text-neutral-800 font-regular text-center">
        {dil === "TM"
          ? tm[
              "Siziň sargydyňyz üstünikli ugradyldy, sargydyňyzy profilden sargytlar bölüminden yzarlap bilersiñiz"
            ]
          : dil === "RU"
          ? ru[
              "Siziň sargydyňyz üstünikli ugradyldy, sargydyňyzy profilden sargytlar bölüminden yzarlap bilersiñiz"
            ]
          : en[
              "Siziň sargydyňyz üstünikli ugradyldy, sargydyňyzy profilden sargytlar bölüminden yzarlap bilersiñiz"
            ]}
      </p>
      <button
        onClick={() =>
          history.push({ pathname: "/mrt/profile/orders/" + props?.orderId })
        }
        className="w-full h-[58px] mt-8 bg-green rounded-[9px] text-[18px] text-white font-semi"
      >
        {dil === "TM"
          ? tm["Sargydy yzarlamak"]
          : dil === "RU"
          ? ru["Sargydy yzarlamak"]
          : en["Sargydy yzarlamak"]}
      </button>
      <button
        onClick={() => history.push({ pathname: "/mrt/home" })}
        className="w-full h-[58px] mt-2 bg-neutral-300 rounded-[9px] text-[18px] text-neutral-900 font-semi"
      >
        {dil === "TM"
          ? tm["Baş sahypa"]
          : dil === "RU"
          ? ru["Baş sahypa"]
          : en["Baş sahypa"]}
      </button>
    </div>
  );
};

export default OrderConfirm;
