import React, { useContext, useState } from "react";
import cardImg from "../images/card.png";
import trash from "../images/trash.svg";
import heart from "../images/heartBlack.svg";
import heartLiked from "../images/heartLiked.svg";
import plus from "../images/add-circle.svg";
import minus from "../images/minus-cirlce.svg";
import { FavoriteBorder, DeleteForever } from "@mui/icons-material";

import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";
import { BASE_URL } from "../utils/axiosIntance";

const BasketCard = (props) => {
  const [count, setCount] = useState(1);
  const [liked, setLiked] = useState(false);
  const { dil, incPro, decPro, removePro } = useContext(Context);

  return (
    <div className="w-full flex md2:flex-nowrap flex-wrap justify-between items-center border-b-[1px] border-b-neutral-300 py-4">
      <div className="flex items-center">
        <img
          className="h-[90px] object-contain rounded-[8px] shadow-sm mr-4"
          src={BASE_URL + props?.img}
          alt="cardImg"
        />
        <div className="lg:max-w-[300px]">
          <p className="md2:text-[18px] text-[16px] xl:min-w-[300px]  text-neutral-900 font-regular">
            {props?.data?.pro?.name}
          </p>
          <p className="text-[16px] text-neutral-900 font-semi">
            {props?.data?.pro?.brands?.name}
          </p>
        </div>
      </div>
      <div className="flex justify-end w-full gap-4">
        <div className="max-w-[162px] whitespace-nowrap">
          <h1 className="w-full text-left text-[16px]  font-bold text-neutral-900">
            {!props?.data?.pro?.is_discount
              ? (props?.data?.pro?.discount_price).toFixed(2)
              : (props?.data?.pro?.price).toFixed(2)}
            TMT
          </h1>
          {!props?.data?.pro?.is_discount && (
            <div className="flex items-center">
              <p className="mr-2 text-white bg-red h-[18px] px-[3px] text-[12px] font-semi rounded-[8px]">
                -{(props?.data?.pro?.discount_percentage).toFixed(2)}%
              </p>
              <p className="mr-2 text-passive  text-[14px] font-semi line-through decoration-red">
                {(props?.data?.pro?.price).toFixed(2)} TMT
              </p>
            </div>
          )}
        </div>
        <div className="select-none w-[162px] bg-green-100 flex items-center justify-evenly text-green py-[10px] rounded-[16px] text-[18px] h-[50px]">
          <button
            onClick={() => {
              // setCount(count - 1);
              decPro(props?.data?.pro?.id);
            }}
            className=" h-[20px] w-[20px]"
          >
            <img className="w-full object-contain" src={minus} alt="" />
          </button>
          <p className="text-[16px] text-green">{props?.data?.quantity}</p>
          <button
            onClick={() => {
              // setCount(count + 1);
              incPro(props?.data?.pro?.id);
            }}
            className=" h-[20px] w-[20px]"
          >
            <img className="w-full object-contain" src={plus} alt="" />
          </button>
        </div>
        <div className="hidden md2:flex cursor-pointer ">
          {/* <FavoriteBorder className="mr-4" /> */}
          {liked ? (
            <img
              onClick={() => setLiked(!liked)}
              src={heartLiked}
              className="mr-4"
              alt="heartLiked"
            />
          ) : (
            <img
              onClick={() => setLiked(!liked)}
              src={heart}
              className="mr-4"
              alt="heart"
            />
          )}
          {/* <DeleteForever className="mr-4" /> */}
          <img
            onClick={() => removePro(props?.data?.pro?.id)}
            src={trash}
            className="mr-4"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default BasketCard;
