import React, { useContext } from "react";

import { useHistory } from "react-router-dom";
import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";

import homeGreen from "../images/homeGreen.svg";
import homeGrey from "../images/homeGrey.svg";
import categoryGreen from "../images/categoryGreen.svg";
import categoryGrey from "../images/categoryGrey.svg";
import shopGreen from "../images/shopGreen.svg";
import shopGrey from "../images/shopGrey.svg";
import profileGreen from "../images/profileGreen.svg";
import profileGrey from "../images/profileGrey.svg";

function Footer(props) {
  const { dil } = useContext(Context);
  const history = useHistory();
  return (
    <div className="w-full fixed bottom-0 bg-neutral-200">
      <div className="hidden xl:flex select-none bg-neutral-200 justify-center w-full  py-6 text-[18px]">
        <p className="text-neutral-700 w-full text-center whitespace-nowrap font-medium">
          <b>
            © 2023 {/* Günlük söwda  */}
            Söwda müdürligi onlaýn.{" "}
          </b>
          {dil === "TM"
            ? "Ähli Hukuklar goralan"
            : dil === "RU"
            ? "Все права защищены"
            : "All Rights Reserved"}
        </p>
      </div>

      <div className="flex w-full  bottom-0 z-10 xl:hidden select-none bg-neutral-200 justify-around mx-auto  py-6 text-[18px]">
        <div
          onClick={() => history.push({ pathname: "/mrt/home" })}
          className="flex w-[30px] items-center flex-wrap justify-center"
        >
          <img src={homeGreen} alt="" />
          <p className="mt-[3px] text-green text-[10px] font-regular">Home</p>
        </div>

        <div
          onClick={() => history.push({ pathname: "/mrt/kategories" })}
          className="flex w-[30px] items-center flex-wrap justify-center"
        >
          <img src={categoryGreen} alt="" />
          <p className="mt-[3px] text-green text-[10px] font-regular">
            Category
          </p>
        </div>

        <div
          onClick={() => history.push({ pathname: "/mrt/basket" })}
          className="flex w-[30px] items-center flex-wrap justify-center"
        >
          <img src={shopGreen} alt="" />
          <p className="mt-[3px] text-green text-[10px] font-regular">Basket</p>
        </div>

        <div
          onClick={() => history.push({ pathname: "/mrt/profile" })}
          className="flex w-[30px] items-center flex-wrap justify-center"
        >
          <img src={profileGreen} alt="" />
          <p className="mt-[3px] text-green text-[10px] font-regular">
            Profile
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
