import React, { useContext, useEffect, useState } from "react";
import food from "../images/food.svg";
import { Modal } from "antd";
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
import { BASE_URL, BASE_URL, axiosInstance } from "../utils/axiosIntance";

function ProductCard(props) {
  const history = useHistory();
  const [openProduct, setOpenProduct] = useState(false);
  const [is_like, setIs_like] = useState(true);
  const [animation, setAnimation] = useState(false);
  const [count, setCount] = useState(1);
  const { dil, addProFood, incProFood, decProFood, is_logged } =
    useContext(Context);

  // useEffect(() => {
  //   const time = setTimeout(() => {
  //     setAnimation(false);
  //   }, 2000);
  //   return () => clearTimeout(time);
  // }, [animation]);

  var data = JSON.parse(localStorage.getItem("userData"));

  const addFav = () => {
    if (data?.id !== undefined)
      axiosInstance
        .post("/api/food_favourite_meal", {
          user_id: data?.id,
          product_id: props?.data?.id,
        })
        .then((data) => {
          console.log(data.data);
          // getFavProducts();
        })
        .catch((err) => {
          console.log(err);
        });
  };

  console.log(BASE_URL + props?.data?.img[0]?.img);
  return (
    <div className="!min-w-[320px] w-[330px] rounded-[16px] relative">
      <Modal
        className=" p-8 "
        width={438}
        open={openProduct}
        onCancel={() => setOpenProduct(false)}
        footer={false}
      >
        <div className="!min-w-[320px] w-[330px] rounded-[16px] relative">
          <div className="w-fit z-20 h-fit p-2 absolute cursor-pointer top-4 right-4 rounded-[100%] bg-neutral-100-50">
            {is_like ? (
              <FavoriteBorder
                onClick={() => setIs_like(!is_like)}
                className=" text-neutral-300"
              />
            ) : (
              <Favorite
                onClick={() => setIs_like(!is_like)}
                className=" text-red"
              />
            )}
          </div>

          {!props?.data?.is_discount && (
            <div className="w-fit z-20 h-fit text-[14px] text-white font-semi px-2 py-[4px] absolute cursor-pointer top-[150px] right-0 rounded-[13px] bg-red">
              -{props?.data?.discount_percentage}%
            </div>
          )}

          <img
            onClick={() => setOpenProduct(true)}
            className="w-full h-[179px] object-cover rounded-[16px] cursor-pointer"
            src={BASE_URL + props?.data?.img[0]?.img}
            alt="food"
          />

          <div className="w-full mt-2 flex flex-wrap justify-between items-center">
            <p className="w-full text-left text-neutral-900 font-semi text-[16px] ">
              {props?.data?.text ? props?.data?.text : "Куриный лаваш"}
            </p>
            {!props?.data?.is_discount ? (
              <div className="w-fit flex items-center mt-2 mb-2">
                <p className="text-red text-[18px] font-semi mr-2">
                  {props?.data?.discount_price} TMT
                </p>
                <p className="text-neutral-600 line-through text-[18px] font-semi">
                  {props?.data?.price} TMT
                </p>
              </div>
            ) : (
              <div className="w-fit flex items-center mt-2 mb-2">
                <p className="text-neutral-900  text-[18px] font-semi">
                  {props?.data?.price} TMT
                </p>
              </div>
            )}
          </div>
        </div>
        {!animation && (
          <div
            onClick={() => {
              setAnimation(true);
              addProFood(props?.data);
            }}
            className="custom-button mt-2 select-none bg-green text-white rounded-[16px] text-[18px] h-[50px]"
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
            className="select-none mt-2 bg-green-100 flex justify-evenly text-green py-[10px] rounded-[16px] text-[18px] h-[50px]"
          >
            <button
              onClick={() => {
                setCount(count - 1);
                setAnimation(true);
                decProFood(props?.data?.id);
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
                incProFood(props?.data?.id);
              }}
              className="text-green bg-green-200 h-[30px] w-[30px] leading-[9px] rounded-[100%] p-2"
            >
              +
            </button>
          </div>
        )}
      </Modal>
      <div className="w-fit z-20 h-fit p-2 absolute cursor-pointer top-4 right-4 rounded-[100%] bg-neutral-100-50">
        {is_logged ? (
          is_like ? (
            <FavoriteBorder
              onClick={() => {
                setIs_like(!is_like);
                addFav();
              }}
              className=" text-neutral-300"
            />
          ) : (
            <Favorite
              onClick={() => setIs_like(!is_like)}
              className=" text-red"
            />
          )
        ) : null}
      </div>

      {!props?.data?.is_discount && (
        <div className="w-fit z-20 h-fit text-[14px] text-white font-semi px-2 py-[4px] absolute cursor-pointer top-[150px] right-0 rounded-[13px] bg-red">
          -{props?.data?.discount_percentage}%
        </div>
      )}

      <img
        onClick={() => setOpenProduct(true)}
        className="w-full h-[179px] object-cover rounded-[16px] cursor-pointer"
        src={BASE_URL + props?.data?.img[0]?.img}
        alt="food"
      />

      <div className="w-full mt-2 flex flex-wrap justify-between items-center">
        <p className="w-full text-left text-neutral-900 font-semi text-[16px] ">
          {props.text ? props.text : "Куриный лаваш"}
        </p>
        {!props?.data?.is_discount ? (
          <div className="w-fit flex items-center mt-2 mb-2">
            <p className="text-red text-[18px] font-semi mr-2">
              {props?.data?.discount_price} TMT
            </p>
            <p className="text-neutral-600 line-through text-[18px] font-semi">
              {props?.data?.price} TMT
            </p>
          </div>
        ) : (
          <div className="w-fit flex items-center mt-2 mb-2">
            <p className="text-neutral-900  text-[18px] font-semi">
              {props?.data?.price} TMT
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
