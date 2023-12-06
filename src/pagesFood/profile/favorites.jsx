import { ArrowForwardIos } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../componentsFood/SideBar";

import ProductCard from "../../componentsFood/ProductCard";
import MarketCard from "../../componentsFood/MarketCard";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { useHistory } from "react-router-dom";
import { BASE_URL, axiosInstance } from "../../utils/axiosIntance";

const Favorites = () => {
  const [wich, setWich] = useState(true);
  const { dil, getFavProducts } = useContext(Context);
  const history = useHistory();
  const [favPro, setFavPro] = useState([]);
  const [favMar, setFavMar] = useState([]);

  var data = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    getFavPro();
    getFavMar();
    getFavProducts();
  }, [dil]);

  const getFavPro = () => {
    if (data?.id !== undefined)
      axiosInstance
        .get("/api/food_favourite_meals", {
          params: {
            lang: dil,
            user_id: data.id,
            // user_id: 1,
          },
        })
        .then((data) => {
          console.log(data.data);
          setFavPro(data.data.body);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const getFavMar = () => {
    if (data?.id !== undefined)
      axiosInstance
        .get("/api/food_favourite_restaurants", {
          params: {
            lang: dil,
            user_id: data.id,
          },
        })
        .then((data) => {
          console.log("search", data.data.body);
          setFavMar(data.data.body);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  return (
    <div className="w-full pb-10">
      <div className="flex items-center w-full">
        <p
          onClick={() => history.push({ pathname: "/mrt/home" })}
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
          {dil === "TM"
            ? tm.Halanlarym
            : dil === "RU"
            ? ru.Halanlarym
            : en.Halanlarym}
        </p>
      </div>
      <div className="flex items-center justify-between w-full my-4">
        <div className="flex justify-start">
          <p className="text-[28px] font-bold text-neutral-900 mr-2">
            {dil === "TM"
              ? tm.Halanlarym
              : dil === "RU"
              ? ru.Halanlarym
              : en.Halanlarym}
          </p>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="min-w-[246px] lg:block hidden w-[246px] h-fit">
          <Sidebar />
        </div>
        <div className="w-full lg:px-6">
          <div className="w-full flex justify-between bg-neutral-200 rounded-[8px] p-1 border-[1px] border-neutral-300">
            {wich ? (
              <button
                onClick={() => setWich(true)}
                className="w-[49%] rounded-[8px] py-2 text-neutral-900 font-semi bg-white "
              >
                {dil === "TM"
                  ? tm.Harytlar
                  : dil === "RU"
                  ? ru.Harytlar
                  : en.Harytlar}
              </button>
            ) : (
              <button
                onClick={() => setWich(true)}
                className="w-[49%] rounded-[8px] py-2 bg-neutral-200 font-semi text-neutral-700 "
              >
                {dil === "TM"
                  ? tm.Harytlar
                  : dil === "RU"
                  ? ru.Harytlar
                  : en.Harytlar}
              </button>
            )}
            {wich ? (
              <button
                onClick={() => setWich(false)}
                className="w-[49%] rounded-[8px] py-2 bg-neutral-200 font-semi text-neutral-700 "
              >
                {dil === "TM"
                  ? tm.Dükanlar
                  : dil === "RU"
                  ? ru.Dükanlar
                  : en.Dükanlar}
              </button>
            ) : (
              <button
                onClick={() => setWich(false)}
                className="w-[49%] rounded-[8px] py-2 text-neutral-900 font-semi bg-white "
              >
                {dil === "TM"
                  ? tm.Dükanlar
                  : dil === "RU"
                  ? ru.Dükanlar
                  : en.Dükanlar}
              </button>
            )}
          </div>

          {wich ? (
            <div className="grid w-full grid-cols-2 gap-8 mt-6 place-items-center lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 5xl:grid-cols-6">
              {favPro?.map((item) => {
                return (
                  <ProductCard
                    is_liked={true}
                    data={item}
                    text={item.name}
                    img={item?.img[0]?.img}
                  />
                );
              })}
            </div>
          ) : (
            <div className="grid w-full grid-cols-2 gap-4 mt-6 place-items-center 2xl:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4 6xl:grid-cols-5 ">
              {favMar?.map((item) => {
                return (
                  <div className="">
                    <MarketCard
                      is_liked={true}
                      data={item}
                      img={item?.img}
                      name={item.name}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
