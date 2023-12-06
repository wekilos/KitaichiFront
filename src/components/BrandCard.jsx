import React, { useContext } from "react";
import brand from "../images/brand.png";
import { useHistory } from "react-router-dom";

import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";
import { BASE_URL } from "../utils/axiosIntance";

function BrandCard(props) {
  const history = useHistory();
  const { dil } = useContext(Context);

  return (
    <div
      onClick={() => history.push({ pathname: "/mrt/brend/" + props.data.id })}
      className="border cursor-pointer border-[#E9EBED] md2:w-[196px] w-[170px] md2:h-[196px] h-[180px] rounded-[8px]"
    >
      <div className="flex w-full py-[12px] px-[15px] ">
        <img
          className="w-full md2:h-[127px] h-[114px] object-contain border-b-[1px] border-b-neutral-300"
          src={BASE_URL + props?.img}
          alt="brand"
        />
      </div>
      <p className="w-full text-center font-medium text-[16px]">
        {props.text ? props.text : "Nescafe"}
      </p>
    </div>
  );
}

export default BrandCard;
