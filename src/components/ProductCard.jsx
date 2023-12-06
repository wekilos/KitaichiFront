import React, { useContext, useEffect, useState } from "react";
import card from "../images/card.png";
import heart from "../images/heart.svg";
import heartLiked from "../images/heartLiked.svg";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";
import { BASE_URL, axiosInstance } from "../utils/axiosIntance";

function ProductCard(props) {
  const history = useHistory();

  const [liked, setLiked] = useState(props?.is_liked ? props?.is_liked : false);
  const [animation, setAnimation] = useState(false);
  const [count, setCount] = useState(1);
  const {
    dil,
    addPro,
    decPro,
    is_logged,
    favoriteProducts,
    is_liked,
    getFavProducts,
  } = useContext(Context);

  let dragStart = undefined;

  const mouseDown = () => {
    dragStart = new Date();
  };

  const showDetails = () => {
    const cD = new Date();
    console.log(cD - dragStart);
    if (cD - dragStart < 100) {
      history.push({ pathname: "/mrt/product/" + props.data.id });
    } else dragStart = undefined;
  };

  var data = JSON.parse(localStorage.getItem("userData"));

  const addFav = () => {
    if (data?.id !== undefined)
      axiosInstance
        .post("/api/grocery_favourite_product", {
          user_id: data.id,
          product_id: props.data.id,
        })
        .then((data) => {
          console.log(data.data);
          getFavProducts();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  return (
    <div className="sm:w-[236px] w-[165px] sm:mr-0 mr-1 md2:min-h-[460px] min-h-[375px] flex flex-col justify-between flex-wrap relative">
      {is_logged && favoriteProducts !== undefined ? (
        !is_liked(props.data.id) ? (
          // <FavoriteBorder className="absolute top-4 right-4 text-neutral-300" />
          <img
            onClick={() => {
              setLiked(!liked);
              addFav();
            }}
            className="absolute cursor-pointer top-4 right-4 "
            src={heart}
            alt=""
          />
        ) : (
          // <Favorite className="absolute top-4 right-4 text-red" />
          <img
            onClick={() => {
              setLiked(!liked);
              addFav();
            }}
            className="absolute cursor-pointer top-4 right-4 "
            src={heartLiked}
            alt=""
          />
        )
      ) : null}
      <img
        onMouseDown={mouseDown}
        onClick={showDetails}
        className="md2:h-[236px] h-[175px] w-full object-contain rounded-[24px] cursor-pointer"
        // src={props.img ? BASE_URL + props.img : card}
        src={BASE_URL + props?.img}
        alt="image"
      />
      <p className="font-semi mt-2 md2:text-[20px] text-[16px] text-neutral-900">
        {!props.data?.is_discount
          ? props.data?.discount_price.toFixed(2)
          : props.data?.price.toFixed(2)}{" "}
        TMT
      </p>

      <div className="flex gap-[8px] h-[24px] my-[8px]">
        {!props.data?.is_discount && (
          <div className="bg-red px-[3px] py-[3px] rounded-[8px]">
            <p className="text-white md2:text-[15px] text-[12px] m-0 font-semi">
              -{props.data?.discount_percentage.toFixed(2)}%
            </p>
          </div>
        )}
        {!props.data?.is_discount && (
          <p className="text-passive font-regular md2:text-[16px] text-[14px] line-through decoration-red">
            {props.data?.price.toFixed(2)} TMT
          </p>
        )}
      </div>

      <p
        onMouseDown={mouseDown}
        onClick={showDetails}
        className="line-clamp-2 cursor-pointer text-neutral-900 font-regular md2:text-[18px] text-[16px] md2:h-[52px] h-[45px] leading-6 mt-3"
      >
        {props.text ? props.text : "Üwmeç 3 желания klassyk 250 g"}
      </p>

      <p className="line-clamp-2 text-neutral-900 font-semi mt-2  text-[16px] leading-6 ">
        {props.data?.market?.name}
      </p>
      {!animation && (
        <div
          onClick={() => {
            setAnimation(true);
            addPro(props?.data);
            // setCount(count - 1);
          }}
          className="custom-button mt-2  select-none bg-green text-white rounded-[16px] text-[18px] h-[50px]"
        >
          {dil === "TM"
            ? tm["Sebede goş"]
            : dil === "RU"
            ? ru["Sebede goş"]
            : en["Sebede goş"]}
        </div>
      )}
      {animation && (
        <div
          onClick={() => setAnimation(true)}
          className="select-none mt-2  bg-green-100 flex justify-evenly text-green py-[10px] rounded-[16px] text-[18px] h-[50px]"
        >
          <button
            onClick={() => {
              count > 1 && setCount(count - 1);
              decPro(props?.data);
              setAnimation(true);
            }}
            className="text-green bg-green-200 h-[30px] w-[30px] leading-[9px] rounded-[100%] p-2"
          >
            -
          </button>
          <p className="text-[16px] text-green">{count}</p>
          <button
            onClick={() => {
              setCount(count + 1);
              setAnimation(true);
              addPro(props?.data);
            }}
            className="text-green bg-green-200 h-[30px] w-[30px] leading-[9px] rounded-[100%] p-2"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(ProductCard);
