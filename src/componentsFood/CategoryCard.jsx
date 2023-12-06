import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import category from "../images/category.svg";

import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";

const CategoryCard = (props) => {
  const history = useHistory();
  const { dil } = useContext(Context);
  return (
    <div
      onClick={() => history.push({ pathname: "/rtn/category/9" })}
      className="mr-2   min-w-[139px] h-[180px] rounded-[16px]"
    >
      <img
        className="w-full object-contain rounded-[16px]"
        src={props.img ? props.img : category}
        alt="category"
      />
      <p className="text-[18px] my-2 font-semi text-black text-center">
        {props.text ? props.text : " Burger"}
      </p>
    </div>
  );
};

export default CategoryCard;
