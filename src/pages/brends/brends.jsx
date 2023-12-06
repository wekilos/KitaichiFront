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
import BrandCard from "../../components/BrandCard";

import brend1 from "../../images/brend1.svg";
import brend2 from "../../images/brend2.svg";
import brend3 from "../../images/brend3.svg";
import brend4 from "../../images/brend4.svg";
import brend5 from "../../images/brend5.svg";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { useHistory } from "react-router-dom";
import { BASE_URL, BASE_URL, axiosInstance } from "../../utils/axiosIntance";

const Brends = () => {
  const { dil } = useContext(Context);
  const [brends, setBrends] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getBrends();
  }, [dil]);
  const getBrends = () => {
    axiosInstance
      .get("/api/grocery_brands", {
        params: {
          lang: dil,
          limit: 9999,
        },
      })
      .then((data) => {
        console.log("brands:", data.data.body);
        setBrends(data.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full inline-flex justify-between pb-10 select-none">
      <div className="w-full">
        <div className="w-full md2:flex hidden items-center">
          <p className="text-[16px] font-regular text-black-secondary mr-2">
            {dil === "TM"
              ? tm["Baş sahypa"]
              : dil === "RU"
              ? ru["Baş sahypa"]
              : en["Baş sahypa"]}
          </p>
          <ArrowForwardIos className="!text-[16px]  font-regular text-black-secondary mr-2" />
          <p className="text-[16px] font-regular text-black-secondary mr-2">
            {dil === "TM"
              ? tm.Brendler
              : dil === "RU"
              ? ru.Brendler
              : en.Brendler}
          </p>
        </div>

        <div className="w-full md2:hidden flex justify-between bg-neutral-200 p-1 rounded-[8px]">
          <p
            onClick={() => history.push({ pathname: "/mrt/kategories" })}
            className="text-[18px] h-[40px] leading-[40px] text-center w-1/3 font-semi text-neutral-600 mr-2"
          >
            {dil === "TM"
              ? tm.Görnüşler
              : dil === "RU"
              ? ru.Görnüşler
              : en.Görnüşler}
          </p>
          <p
            onClick={() => history.push({ pathname: "/mrt/markets" })}
            className="text-[18px] h-[40px] leading-[40px] text-center w-1/3 font-semi text-neutral-600 mr-2"
          >
            {dil === "TM"
              ? tm.Dükanlar
              : dil === "RU"
              ? ru.Dükanlar
              : en.Dükanlar}
          </p>

          <p className="text-[18px] bg-white rounded-[8px] h-[40px] leading-[40px] text-center w-1/3 font-semi text-neutral-900 mr-2">
            {dil === "TM"
              ? tm.Brendler
              : dil === "RU"
              ? ru.Brendler
              : en.Brendler}
          </p>
        </div>

        <div className="w-full my-6 flex justify-between  items-center">
          <div className="flex justify-start">
            <p className="md2:text-[32px] text-[24px] font-semi text-neutral-900 mr-2">
              {dil === "TM"
                ? tm.Brendler
                : dil === "RU"
                ? ru.Brendler
                : en.Brendler}
            </p>
          </div>
        </div>

        <div className="w-full grid place-items-center grid-cols-2 gap-6 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 md2:grid-cols-4 lg:grid-cols-5  xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 6xl:grid-cols-9">
          {brends.map((item) => {
            return <BrandCard data={item} text={item.name} img={item?.img} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Brends;
