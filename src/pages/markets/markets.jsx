import React, { useContext, useEffect, useState } from "react";
import { West, ArrowForwardIos } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import ProductCard from "../../components/ProductCard";
import MarketCard from "../../components/MarketCard";

import img1 from "../../images/Store1.svg";
import img2 from "../../images/Store2.svg";
import img3 from "../../images/Store3.svg";
import img4 from "../../images/Store4.svg";
import img5 from "../../images/Store5.svg";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { useHistory } from "react-router-dom";
import { BASE_URL, BASE_URL, axiosInstance } from "../../utils/axiosIntance";

const Markets = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const { dil } = useContext(Context);
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [brends, setBrends] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [filterBrends, setFilterBrends] = useState();

  const SearchBrends = (value) => {
    let filter = value.toUpperCase();
    let newArray = brends.filter((item) => {
      return item.name.toUpperCase().indexOf(filter) > -1;
    });
    if (value.length === 0) {
      setFilterBrends([...brends]);
    } else {
      setFilterBrends([...newArray]);
    }
  };

  // const markets = [img1, img2, img3, img4, img5, img1, img2, img3, img4, img5];

  useEffect(() => {
    getcategories();
    getbrands();
    getmarkets();
  }, [dil]);

  const getcategories = async () => {
    axiosInstance
      .get("/api/grocery_categories", {
        params: {
          lang: dil,
        },
      })
      .then((data) => {
        setCategories(data.data.body);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getbrands = async () => {
    axiosInstance
      .get("/api/grocery_brands", {
        params: {
          lang: dil,
          limit: 9999,
        },
      })
      .then((data) => {
        setBrends(data.data.body);
        setFilterBrends(data.data.body);
        console.log("brends:", data.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getmarkets = async () => {
    axiosInstance
      .get("/api/grocery_markets", {
        params: {
          lang: dil,
          user_id: 1,
          limit: 9999,
        },
      })
      .then((data) => {
        setMarkets(data.data.body);
        console.log("setMarkets:", data.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="inline-flex justify-between w-full pb-10 select-none">
      <div className="min-w-[245px] md2:block hidden w-[245px]">
        {/* <button className="w-full h-[50px]  bg-green-100 text-green text-[18px] font-semi rounded-[8px]">
                    <West /> Ähli dükanlar
                </button> */}
        <div className="w-full px-4   rounded-[8px] border-[1px] border-neutral-300">
          <h1 className="py-3 text-[20px] text-neutral-900 font-semi text-left">
            {dil === "TM"
              ? tm.Kategoriýalar
              : dil === "RU"
              ? ru.Kategoriýalar
              : en.Kategoriýalar}
          </h1>

          {categories?.map((item, i) => {
            return (
              <p
                key={item.name + i}
                className="py-3 text-[16px] text-neutral-900 font-[300] text-left border-t-[1px] border-t-neutral-300 cursor-pointer"
              >
                {item?.name}
              </p>
            );
          })}
        </div>

        <div className="w-full px-4 mt-4 rounded-[8px] border-[1px] border-neutral-300">
          <h1 className="py-3 text-[20px] border-b-[1px] border-b-neutral-300 text-neutral-900 font-semi text-left">
            {dil === "TM"
              ? tm.Brendler
              : dil === "RU"
              ? ru.Brendler
              : en.Brendler}
          </h1>
          <input
            onKeyUp={(e) => SearchBrends(e.target.value)}
            className="w-full h-[50px] mt-2 outline-none p-4 rounded-[8px] border-[1px] border-neutral-300"
            type="text"
            placeholder="Search"
          />
          <div
            style={{ scrollbarColor: "#32BB78" }}
            className="max-h-[250px] overflow-auto"
          >
            {filterBrends?.map((item, index) => {
              return (
                <div
                  key={item.name + index}
                  className={
                    "flex items-center py-3 text-left   border-t-[1px] border-t-neutral-300"
                  }
                >
                  <input
                    className="mr-3 bg-neutral-300 text-neutral-300 border-neutral-300 w-[16px] h-[16px] "
                    type="checkbox"
                    id="brend1"
                  />
                  <label
                    htmlFor="brend1"
                    className="text-[16px] cursor-pointer text-neutral-900 font-[300] "
                  >
                    {item?.name}
                  </label>
                </div>
              );
            })}
          </div>
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
          <div className="w-full px-2 mt-4 ">
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
              className="z-10 text-green"
              min={0}
              max={1000}
              getAriaLabel={() => "Minimum distance"}
              defaultValue={priceRange}
              // value={priceRange}
              onChange={(e) => {
                setPriceRange(e.target.value);
              }}
              valueLabelDisplay="auto"
              // getAriaValueText={(e) => console.log("value text", e)}
              disableSwap
            />
          </div>
        </div>
      </div>
      <div className="w-full md2:pl-8">
        <div className="items-center hidden w-full md2:flex">
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
              ? tm.Dükanlar
              : dil === "RU"
              ? ru.Dükanlar
              : en.Dükanlar}
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

          <p className="text-[18px] bg-white rounded-[8px] h-[40px] leading-[40px] text-center w-1/3 font-semi text-neutral-900 mr-2">
            {dil === "TM"
              ? tm.Dükanlar
              : dil === "RU"
              ? ru.Dükanlar
              : en.Dükanlar}
          </p>
          <p
            onClick={() => history.push({ pathname: "/mrt/brends" })}
            className="text-[18px] h-[40px] leading-[40px] text-center w-1/3 font-semi text-neutral-600 mr-2"
          >
            {dil === "TM"
              ? tm.Brendler
              : dil === "RU"
              ? ru.Brendler
              : en.Brendler}
          </p>
        </div>
        <div className="items-center justify-between hidden w-full mt-4 md2:flex">
          <p className="text-[32px] font-semi text-neutral-900 mr-2">
            {dil === "TM"
              ? tm.Dükanlar
              : dil === "RU"
              ? ru.Dükanlar
              : en.Dükanlar}
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
                // onChange={handleChange}
              >
                <MenuItem value={"Default"}>
                  {dil === "TM"
                    ? tm["Meşhurlygyna görä"]
                    : dil === "RU"
                    ? ru["Meşhurlygyna görä"]
                    : en["Meşhurlygyna görä"]}
                </MenuItem>
                <MenuItem value={"Cheep to Expensive"}>
                  {dil === "TM"
                    ? tm["Arzandan gymmada"]
                    : dil === "RU"
                    ? ru["Arzandan gymmada"]
                    : en["Arzandan gymmada"]}
                </MenuItem>
                <MenuItem value={"Expensive to Cheep"}>
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
        <div className="items-center justify-start hidden w-full mt-5 md2:flex">
          <div className="flex justify-between overflow-x-auto items-center mr-2 rounded-[32px] h-[30px] p-[5px] pl-[10px] bg-green text-white text-[16px] font-medium overflow-y-hidden">
            <p className="mr-2">
              {dil === "TM" ? tm.Bahasy : dil === "RU" ? ru.Bahasy : en.Bahasy}:
              20 - 120 TMT
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
        <div className="grid w-full grid-cols-2 gap-4 mt-8 place-items-center lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4 6xl:grid-cols-5 ">
          {markets.map((item) => {
            return (
              <div className="">
                <MarketCard
                  data={item}
                  img={item.img}
                  name={item.name}
                  is_liked={item?.is_liked}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Markets;
