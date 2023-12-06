import React, { useContext, useEffect, useState } from "react";
import { West, ArrowForwardIos, FavoriteBorder } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import ProductCard from "../../components/ProductCard";
import brendimg from "../../images/brand.png";
import ProductDetail from "../../components/ProductDetail";
import ProductBasketCard from "../../componentsFood/ProductBasketCard";
import { useHistory } from "react-router-dom";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";

const Basket = () => {
  const history = useHistory();
  const { dil, basketFood } = useContext(Context);

  let umumy = 0;
  let discount = 0;
  let sum = 0;
  basketFood[0]?.products?.map((item) => {
    console.log(item);
    umumy = item?.pro?.price * item?.quantity + umumy;
    discount = !item?.pro?.is_discount
      ? item?.pro?.discount_price * item?.quantity
      : 0 + discount;
  });
  return (
    <div className="w-full inline-flex justify-between pb-10 select-none">
      <div className="w-full">
        <div className="w-full flex items-center">
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
          <p className="text-[16px] font-regular text-black-secondary mr-2">
            {dil === "TM" ? tm.Sebet : dil === "RU" ? ru.Sebet : en.Sebet}
          </p>
        </div>

        <div className="w-full mt-4 flex justify-between  items-center">
          <div className="flex justify-start">
            <p className="text-[28px] font-bold text-neutral-900 mr-2">
              {dil === "TM" ? tm.Sebet : dil === "RU" ? ru.Sebet : en.Sebet}
            </p>
          </div>
        </div>

        <div className="w-full mt-6 inline-flex justify-between flex-wrap">
          <div className="w-[75%]">
            <ProductBasketCard text={basketFood[0]?.name} />
          </div>
          <div className="w-[20%] h-fit rounded-[16px] border-[1px] border-neutral-300 p-4 shadow-sm">
            <h1 className="w-full text-[20px] font-semi text-black-secondary border-b-[1px] border-b-neutral-300 py-2">
              {dil === "TM"
                ? tm["Sargyt barada"]
                : dil === "RU"
                ? ru["Sargyt barada"]
                : en["Sargyt barada"]}
            </h1>
            <div className="w-full border-b-[1px] border-b-neutral-300 py-2 ">
              <div className="w-full flex justify-between py-2">
                <p className="text-[16px] font-medium text-black-secondary">
                  {dil === "TM" ? tm.Umumy : dil === "RU" ? ru.Umumy : en.Umumy}
                  :
                </p>
                <p className="text-[16px] font-medium text-black-secondary">
                  {umumy.toFixed(2)} TMT
                </p>
              </div>
              <div className="w-full flex justify-between py-2">
                <p className="text-[16px] font-medium text-black-secondary">
                  {dil === "TM"
                    ? tm["Eltip bermek"]
                    : dil === "RU"
                    ? ru["Eltip bermek"]
                    : en["Eltip bermek"]}
                  :
                </p>
                <p className="text-[16px] font-medium text-black-secondary">
                  +15 TMT
                </p>
              </div>
              <div className="w-full flex justify-between py-2">
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
            <div className="w-full flex justify-between py-4">
              <p className="text-[18px] font-semi text-black-secondary">
                {dil === "TM" ? tm.Jemi : dil === "RU" ? ru.Jemi : en.Jemi}:
              </p>
              <p className="text-[18px] font-semi text-black-secondary">
                {(umumy - discount).toFixed(2)} TMT
              </p>
            </div>
            <div className="w-full">
              <button
                onClick={() => history.push({ pathname: "/rtn/sargyt" })}
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

export default Basket;
