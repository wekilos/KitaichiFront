import React, { useContext, useState } from "react";
import marketimg from "../images/Store.png";
import heart from "../images/heart.svg";
import heartLiked from "../images/heartLiked.svg";

import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";
import { BASE_URL, BASE_URL, axiosInstance } from "../utils/axiosIntance";

function MarketCard(props) {
  const history = useHistory();
  const [is_like, setIs_like] = useState(
    props.is_liked ? props.is_liked : false
  );
  const { dil } = useContext(Context);
  var data = JSON.parse(localStorage.getItem("userData"));

  const addToFav = () => {
    if (data?.id !== undefined)
      axiosInstance
        .post("/api/grocery_favourite_market", {
          user_id: data.id,
          market_id: props.data.id,
        })
        .then((data) => {
          console.log(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  return (
    <div className="border flex justify-center items-start md2:min-w-[324px] min-w-[175px] w-[175px] md2:w-[324px] border-[#E9EBED] relative  h-[160px] rounded-[12px] cursor-pointer">
      {!is_like ? (
        <div
          onClick={() => {
            setIs_like(!is_like);
            addToFav();
          }}
          className="absolute cursor-pointer top-[10px] p-2 right-[10px] w-[42px] h-[42px] rounded-[100%] bg-white z-20"
        >
          {/* <FavoriteBorder className=" text-neutral-300" /> */}

          <img src={heart} alt="" />
        </div>
      ) : (
        <div
          onClick={() => {
            setIs_like(!is_like);
            addToFav();
          }}
          className="absolute cursor-pointer top-[10px] p-2 right-[10px] w-[42px] h-[42px] rounded-[100%] bg-white z-20"
        >
          {/* <Favorite className=" text-neutral-300" /> */}
          <img src={heartLiked} alt="" />
        </div>
      )}
      <div
        onClick={() =>
          history.push({ pathname: "/mrt/market/" + props.data.id })
        }
        className="border flex justify-center items-start md2:min-w-[324px] min-w-[175px] w-[175px] md2:w-[324px] border-[#E9EBED] relative  h-[160px] rounded-[12px] cursor-pointer"
      >
        <div className="absolute z-10 md2:max-w-[320px] md2:w-[320px] max-w-[170px] w-[170px] h-[160px] bg-black-100  rounded-[12px]"></div>
        <img
          className=" w-full object-cover h-[160px] rounded-[12px]  "
          src={BASE_URL + props.img}
          // src={"http://119.235.118.211:8181/itda/surat.jpg"}
          alt="brand"
        />

        <div className="absolute p-[20px] !z-20 md2:max-w-[300px] md2:w-[200px] max-w-[170px] w-[170px] text-white font-semi  text-[18px] left-0 bottom-0    ">
          {props.name}
        </div>
      </div>
    </div>
  );
}

export default MarketCard;
