import React, { useContext, useState } from "react";
import cardImg from "../images/card.png";
import trash from "../images/trash.svg";
import heart from "../images/heartBlack.svg";
import heartLiked from "../images/heartLiked.svg";
import { FavoriteBorder, DeleteForever } from "@mui/icons-material";
import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";

const OrderCard = (props) => {
  const [count, setCount] = useState(1);
  const [liked, setLiked] = useState(false);
  const { dil } = useContext(Context);

  return (
    <div className="w-full flex justify-between items-center border-b-[1px] border-b-neutral-300 py-4">
      <div className="flex items-center">
        <img
          className="h-[90px] object-contain rounded-[8px] shadow-sm mr-4"
          src={props.img}
          alt="cardImg"
        />
        <div className="max-w-[300px]">
          <p className="text-[18px] min-w-[300px]  text-neutral-900 font-regular">
            {props.text}
          </p>
          {/* <p className="text-[16px] text-neutral-900 font-semi">
                        Имя бренда
                    </p> */}
        </div>
      </div>
      <div className="max-w-[162px]">
        <h1 className="w-full text-left text-[16px] font-bold text-neutral-900">
          22.80 TMT
        </h1>
        <div className="flex items-center">
          <p className="mr-2 text-white bg-red h-[18px] px-[3px] text-[12px] font-semi rounded-[8px]">
            -30%
          </p>
          <p className="mr-2 text-passive  text-[14px] font-semi line-through decoration-red">
            26.20 TMT
          </p>
        </div>
      </div>
      <div className="select-none w-[162px]   flex justify-evenly   py-[10px] rounded-[16px] text-[18px] h-[50px]">
        <p className="text-[16px] font-semi text-neutral-900">3 sany</p>
      </div>
      <div className="flex cursor-pointer">
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
        <img src={trash} className="mr-4" alt="" />
      </div>
    </div>
  );
};

export default OrderCard;
