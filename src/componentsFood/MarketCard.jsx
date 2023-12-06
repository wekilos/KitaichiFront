import React, { useContext, useEffect, useState } from "react";
import resturan from "../images/resturan.svg";
import {
  Favorite,
  FavoriteBorder,
  AccessTimeOutlined,
  LoyaltyOutlined,
  StarOutlined,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";

import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";
import { BASE_URL, axiosInstance } from "../utils/axiosIntance";

function MarketCard(props) {
  const history = useHistory();
  const [is_like, setIs_like] = useState(true);
  const [animation, setAnimation] = useState(false);
  const [count, setCount] = useState(1);
  const { dil } = useContext(Context);

  var data = JSON.parse(localStorage.getItem("userData"));
  const addToFav = () => {
    if (data?.id !== undefined)
      axiosInstance
        .post("/api/food_favourite_restaurant", {
          user_id: data?.id,
          market_id: props?.data?.id,
        })
        .then((data) => {
          console.log(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <div
      className={
        props.width
          ? `!min-w-[400px] w-[430px] rounded-[16px] relative`
          : "!min-w-[400px] w-[430px] rounded-[16px] relative"
      }
    >
      <div className="w-fit z-20 h-fit p-2 absolute cursor-pointer top-4 right-4 rounded-[100%] bg-neutral-100-50">
        {is_like ? (
          <FavoriteBorder
            onClick={() => {
              setIs_like(!is_like);
              addToFav();
            }}
            className=" text-neutral-300"
          />
        ) : (
          <Favorite
            onClick={() => setIs_like(!is_like)}
            className=" text-red"
          />
        )}
      </div>
      <div className="w-fit z-20 h-fit text-[16px] text-white font-semi py-2 px-[15px] absolute cursor-pointer top-4 left-4 rounded-[24px] bg-neutral-100-50">
        <AccessTimeOutlined /> 10:30-22:30
      </div>
      {!props.is_discount && (
        <div
          className={
            props.width
              ? "w-fit z-20 h-fit text-[16px] text-white font-semi py-2 px-[15px] absolute cursor-pointer top-[180px] left-4 rounded-[24px] bg-red-700"
              : "w-fit z-20 h-fit text-[16px] text-white font-semi py-2 px-[15px] absolute cursor-pointer top-[180px] left-4 rounded-[24px] bg-red-700"
          }
        >
          <LoyaltyOutlined />{" "}
          {dil === "TM"
            ? tm.Arzanladyşlar
            : dil === "RU"
            ? ru.Arzanladyşlar
            : en.Arzanladyşlar}
        </div>
      )}
      {props.close && (
        <div
          className={
            props.width
              ? "w-full h-[231px] rounded-[16px] z-10 text-[16px] flex flex-wrap items-center justify-center text-white font-semi py-2 px-[15px] absolute cursor-pointer top-0 left-0   bg-black-100"
              : "w-full h-[231px] rounded-[16px] z-10 text-[16px] flex flex-wrap items-center justify-center text-white font-semi py-2 px-[15px] absolute cursor-pointer top-0 left-0   bg-black-100"
          }
        >
          <div className="w-full">
            <p className="w-full text-center text-[24px] text-white font-semi">
              Ýapyk
            </p>
            <p className="w-full text-center text-[14px] text-neutral-400 font-semi">
              {props.data?.open_time} -da açylýar
            </p>
          </div>
        </div>
      )}
      <img
        onClick={() =>
          history.push({ pathname: "/rtn/market/" + props.data.id })
        }
        className={
          props.width
            ? "w-full h-[231px] object-cover rounded-[16px] cursor-pointer"
            : "w-full h-[231px] object-cover rounded-[16px] cursor-pointer"
        }
        src={BASE_URL + props?.data?.img}
        alt="image"
      />

      <div className="w-full mt-2 flex justify-between items-center">
        <p className=" text-black font-bold text-[20px] ">{props.data?.name}</p>
        <div className="w-fit flex items-center">
          <StarOutlined className="text-yellow mr-1" />
          <p className="text-neutral-900 text-[16px] font-semi mr-1">
            {props.data?.rating?.count}
          </p>
          <p className="text-neutral-700 text-[16px] font-semi">
            ( {props.data?.rating?.feedback?.length})
          </p>
        </div>
      </div>
    </div>
  );
}

export default MarketCard;
