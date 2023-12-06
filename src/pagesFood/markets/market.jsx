import React, { useContext, useEffect, useState } from "react";
import { West, ArrowForwardIos, FavoriteBorder } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import { Cancel, StarOutlined } from "@mui/icons-material";
import { Modal } from "antd";
import ProductCard from "../../componentsFood/ProductCard";
import heart from "../../images/heartWhite.svg";
import heartLiked from "../../images/heartLiked.svg";
import star from "../../images/star.svg";
import { useHistory, useParams } from "react-router-dom";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { BASE_URL, axiosInstance } from "../../utils/axiosIntance";

const Market = () => {
  const history = useHistory();
  const { dil } = useContext(Context);
  const { id } = useParams();
  const [starOpen, setStarOpen] = useState(false);
  const [sort, setSort] = useState("ASC");
  const [liked, setLiked] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [market, setMarket] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getMarket();
    getCategories();
  }, [dil, sort]);
  const getMarket = () => {
    axiosInstance
      .get("/api/food_restaurant_meals", {
        params: {
          page: 0,
          limit: 9999,
          lang: dil,
          order: sort,
          restaurant_id: id,
        },
      })
      .then((data) => {
        console.log("restoran", data.data.body);
        setMarket(data.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategories = () => {
    axiosInstance
      .get("/api/food_categories", {
        params: {
          page: 0,
          limit: 9999,
          lang: dil,
          order: sort,
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
  return (
    <div className="w-full inline-flex justify-between pb-10 select-none">
      <div className="min-w-[245px] md2:block hidden w-[245px]">
        <button
          onClick={() => history.goBack()}
          className="w-full h-[50px]  bg-green-100 text-green text-[18px] font-semi rounded-[8px]"
        >
          <West />
          {dil === "TM"
            ? tm["Ähli restoranlar"]
            : dil === "RU"
            ? ru["Ähli restoranlar"]
            : en["Ähli restoranlar"]}
        </button>
        <div className="w-full px-4 mt-4 rounded-[8px] border-[1px] border-neutral-300">
          <h1 className="py-3 text-[20px] text-neutral-900 font-semi text-left">
            {dil === "TM"
              ? tm["Nahar kategoriýalary"]
              : dil === "RU"
              ? ru["Nahar kategoriýalary"]
              : en["Nahar kategoriýalary"]}
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

        <div className="w-full px-4 mt-4 rounded-[8px] border-[1px] border-neutral-300">
          <h1 className="py-3 text-[20px] border-b-[1px] border-b-neutral-300 text-neutral-900 font-semi text-left">
            {dil === "TM" ? tm.Bahasy : dil === "RU" ? ru.Bahasy : en.Bahasy}
          </h1>
          <div className="flex justify-between">
            <input
              className="w-[45%] h-[50px] mt-2 outline-none p-2 rounded-[8px] border-[1px] border-neutral-300"
              type="text"
              placeholder="0 TMT"
              value={priceRange[0] + " TMT"}
            />
            <input
              className="w-[45%] h-[50px] mt-2 outline-none p-2 rounded-[8px] border-[1px] border-neutral-300"
              type="text"
              placeholder="0 TMT"
              value={priceRange[1] + " TMT"}
            />
          </div>
          <div className=" mt-4 w-full px-2">
            <Slider
              sx={{
                "& .MuiSlider-thumb": {
                  color: "#32BB78",
                },
                "& .MuiSlider-track": {
                  color: "#32BB78",
                },
                "& .MuiSlider-rail": {
                  color: "#E9EAEE",
                },
                "& .MuiSlider-active": {
                  color: "#32BB78",
                },
              }}
              className="z-10  text-green"
              min={0}
              max={1000}
              getAriaLabel={() => "Minimum distance"}
              defaultValue={priceRange}
              // value={priceRange}
              onChange={(e) => {
                setPriceRange(e.target.value);
              }}
              valueLabelDisplay="auto"
              getAriaValueText={(e) => console.log("value text", e)}
              disableSwap
            />
          </div>
        </div>
      </div>
      <div className="w-full md2:pl-8">
        <div className="w-full flex items-center">
          <p className="text-[16px] font-regular text-black-secondary mr-2">
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
            {market.length > 0 && market[0]?.market?.name}
          </p>
        </div>

        <div className="w-full relative mt-6">
          <div className="absolute top-[20px] cursor-pointer right-[20px] h-[50px] w-[50px] rounded-[100%] bg-neutral-900-50 opacity-100 flex justify-center items-center">
            {/* <FavoriteBorder className="text-white font-semi opacity-100 " /> */}
            {liked ? (
              <img
                onClick={() => setLiked(!liked)}
                className="text-white"
                src={heartLiked}
                alt=""
              />
            ) : (
              <img
                onClick={() => setLiked(!liked)}
                className="text-white"
                src={heart}
                alt=""
              />
            )}
          </div>
          <img
            src={market.length > 0 && BASE_URL + market[0]?.market?.img}
            className="w-full object-contain h-[300px]"
            alt="marketImg"
          />
          <div
            onClick={() => setStarOpen(true)}
            className="absolute cursor-pointer bottom-4 left-4 rounded-[8px] bg-white px-4 py-2 flex items-center "
          >
            <img className="mr-2" src={star} alt="star" />
            <div>
              <h1 className="text-[16px] text-neutral-900 font-semi">
                {dil === "TM"
                  ? tm["Baha bermek"]
                  : dil === "RU"
                  ? ru["Baha bermek"]
                  : en["Baha bermek"]}
                4.0
              </h1>
              <p className="text-[16px] text-neutral-700 font-medium">
                124 ses
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mt-6 flex justify-between  items-center">
          <p className="text-[32px] font-semi text-neutral-900 mr-2">
            {market.length > 0 && market[0]?.market?.name}
          </p>
          <div className="w-[200px]">
            <FormControl size="small" fullWidth>
              <InputLabel
                style={{ color: "#32BB78" }}
                id="demo-simple-select-label"
              >
                {dil === "TM"
                  ? tm.Saýhallamak
                  : dil === "RU"
                  ? ru.Saýhallamak
                  : en.Saýhallamak}
              </InputLabel>
              <Select
                labelStyle={{ color: "#32BB78" }}
                sx={{
                  borderRadius: "22px",
                  color: "#32BB78",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#32BB78",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#32BB78",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#32BB78",
                  },
                  ".MuiSvgIcon-root ": {
                    fill: "#32BB78 !important",
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Saýhallamak"
                onChange={(value) => {
                  setSort(value.target.value);
                  console.log(value.target.value);
                }}
              >
                <MenuItem value={"Default"}>
                  {dil === "TM"
                    ? tm["Meşhurlygyna görä"]
                    : dil === "RU"
                    ? ru["Meşhurlygyna görä"]
                    : en["Meşhurlygyna görä"]}
                </MenuItem>
                <MenuItem value={"ASC"}>
                  {dil === "TM"
                    ? tm["Arzandan gymmada"]
                    : dil === "RU"
                    ? ru["Arzandan gymmada"]
                    : en["Arzandan gymmada"]}
                </MenuItem>
                <MenuItem value={"DESC"}>
                  {dil === "TM"
                    ? tm["Gymmatdan arzana"]
                    : dil === "RU"
                    ? ru["Gymmatdan arzana"]
                    : en["Gymmatdan arzana"]}
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="w-full  mt-5 flex justify-start items-center">
          <div className="flex justify-between overflow-x-auto items-center mr-2 rounded-[32px] h-[30px] p-[5px] pl-[10px] bg-green text-white text-[16px] font-medium overflow-y-hidden">
            <p className="mr-2">
              {dil === "TM" ? tm.Bahasy : dil === "RU" ? ru.Bahasy : en.Bahasy}:
              {priceRange[0]} - {priceRange[1]} TMT
            </p>
            <Cancel className="cursor-pointer" />
          </div>
          <div className="flex cursor-pointer items-center rounded-[32px] h-[30px] p-[5px] px-[10px] bg-neutral-300 text-black-secondary text-[16px] font-medium">
            {dil === "TM"
              ? tm["Filtrleri arassalamak"]
              : dil === "RU"
              ? ru["Filtrleri arassalamak"]
              : en["Filtrleri arassalamak"]}
          </div>
        </div>

        <div className="w-full">
          <div className="w-full flex items-center justify-start mt-8">
            <h1 className="font-bold text-[20px] text-neutral-900 mr-2">
              {market.length > 0 && market[0].categories.name}
            </h1>
            <p className="font-medium text-[16px] text-neutral-600"></p>
          </div>
          <div className="w-full mt-4 grid gap-8 place-items-center md:grid-cols-1  lg:grid-cols-2  2xl:grid-cols-3  5xl:grid-cols-4 6xl2:grid-cols-5">
            {market?.map((item) => {
              return (
                <ProductCard data={item} text={item.name} img={item.img} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
