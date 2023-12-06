import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { West, ArrowForwardIos, FavoriteBorder } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import ProductCard from "../../componentsFood/ProductCard";
import MarketCard from "../../componentsFood/MarketCard";
import brendimg from "../../images/category.svg";

import restoran1 from "../../images/restoran1.jpg";
import restoran2 from "../../images/restoran2.jpg";
import restoran3 from "../../images/restoran3.jpg";
import restoran4 from "../../images/restoran4.jpg";
import restoran5 from "../../images/restoran5.jpg";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { axiosInstance } from "../../utils/axiosIntance";

const Category = () => {
  const history = useHistory();
  const { dil } = useContext(Context);
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [res, setRes] = useState([]);

  useEffect(() => {
    getCategories();
    getCategoryRes();
  }, [dil, id]);
  const getCategories = () => {
    axiosInstance
      .get("/api/food_categories", {
        params: {
          page: 0,
          limit: 9999,
          lang: dil,
          order: "ASC",
        },
      })
      .then((data) => {
        console.log(data.data.body);
        setCategories(data.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategoryRes = () => {
    axiosInstance
      .get("/api/food_restaurant_category", {
        params: {
          page: 0,
          limit: 9999,
          lang: dil,
          order: "ASC",
          category_id: id,
        },
      })
      .then((data) => {
        console.log(data.data.body);
        setRes(data.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="inline-flex justify-between w-full pb-10 select-none">
      <div className="min-w-[245px] w-[245px]">
        <button
          onClick={() => history.push({ pathname: "/rtn/markets" })}
          className="w-full h-[50px] mb-4 bg-green-100 text-green text-[18px] font-semi rounded-[8px]"
        >
          <West />{" "}
          {dil === "TM"
            ? tm["Ähli restoranlar"]
            : dil === "RU"
            ? ru["Ähli restoranlar"]
            : en["Ähli restoranlar"]}
        </button>
        <div className="w-full px-4 rounded-[8px] border-[1px] border-neutral-300">
          <h1 className="py-3 text-[20px] text-neutral-900 font-semi text-left">
            {dil === "TM"
              ? tm.Kategoriýalar
              : dil === "RU"
              ? ru.Kategoriýalar
              : en.Kategoriýalar}
          </h1>
          {categories?.map((item) => {
            return (
              <p
                onClick={() => {
                  history.push({ pathname: "/rtn/category/" + item?.id });
                }}
                className="py-3 text-[16px] text-neutral-900 font-[300] text-left border-t-[1px] border-t-neutral-300 cursor-pointer"
              >
                {item?.name}
              </p>
            );
          })}
        </div>
      </div>
      <div className="w-full pl-8">
        <div className="flex items-center w-full">
          <p
            onClick={() => history.push({ pathname: "/rtn/home" })}
            className="text-[16px] cursor-pointer font-regular text-black-secondary mr-2"
          >
            {dil === "TM"
              ? tm["Baş sahypa"]
              : dil === "RU"
              ? ru["Baş sahypa"]
              : en["Baş sahypa"]}
          </p>
          <ArrowForwardIos className="!text-[16px]  font-regular text-black-secondary mr-2" />
          <p className="text-[16px] font-regular text-black-secondary mr-2">
            {dil === "TM" ? tm.Görnüş : dil === "RU" ? ru.Görnüş : en.Görnüş}
          </p>
          <ArrowForwardIos className="!text-[16px]  font-regular text-black-secondary mr-2" />
          <p className="text-[16px] font-regular text-black-secondary mr-2">
            Kofe içilýän ýerler
          </p>
        </div>

        <div className="flex items-center justify-between w-full mt-6">
          <div className="flex justify-start">
            <img
              src={brendimg}
              className="h-[48px] object-contain rounded-[8px] shadow-sm mr-4"
              alt=""
            />
            <p className="text-[32px] mb-2 font-semi text-neutral-900 mr-2">
              Kofe içilýän ýerler
            </p>
          </div>
        </div>

        <div className="grid w-full gap-8 mt-8 place-items-center lg:grid-cols-1 xl:grid-cols-2 5xl:grid-cols-3 6xl2:grid-cols-3 ">
          {res?.map((item, index) => {
            return (
              <div key={index} className="mr-6">
                <MarketCard
                  width={490}
                  data={item}
                  is_discount={item.is_discount}
                  close={item.close}
                  img={item.img}
                  name={item.name}
                  text={item.text}
                  key={"index"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
