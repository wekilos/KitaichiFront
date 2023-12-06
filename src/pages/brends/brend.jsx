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

import img14 from "../../images/Image14.svg";
import img15 from "../../images/Image15.svg";
import img16 from "../../images/Image16.svg";
import img17 from "../../images/Image17.svg";
import img18 from "../../images/Image18.svg";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { useHistory } from "react-router-dom";
import { BASE_URL, BASE_URL, axiosInstance } from "../../utils/axiosIntance";
import { useParams } from "react-router-dom";

const Brend = () => {
  const { dil } = useContext(Context);
  const { id } = useParams();
  const history = useHistory();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [brend, setBrend] = useState([]);
  const [categories, setCategories] = useState([]);

  const cake = [
    {
      name: "Batonçiik şokoladly Twix Extra kökeler we karamel bilen 82 gr",
      img: img14,
    },
    {
      name: "Şokoladly batonçik Bounty Trio süýt şokolady bilen örtülen",
      img: img15,
    },
    {
      name: "Mini wafli Kinder Bueno 18 sany 108 g",
      img: img16,
    },
    {
      name: "Süýjüler Коркунов şokoladlaryň ýygyndysy gara",
      img: img17,
    },
    {
      name: "Süýji sowgat Snickers Twix MilkyWay 81 g",
      img: img18,
    },
    {
      name: "Batonçiik şokoladly Twix Extra kökeler we karamel bilen 82 gr",
      img: img14,
    },
    {
      name: "Şokoladly batonçik Bounty Trio süýt şokolady bilen örtülen",
      img: img15,
    },
    {
      name: "Mini wafli Kinder Bueno 18 sany 108 g",
      img: img16,
    },
    {
      name: "Süýjüler Коркунов şokoladlaryň ýygyndysy gara",
      img: img17,
    },
    {
      name: "Süýji sowgat Snickers Twix MilkyWay 81 g",
      img: img18,
    },
  ];

  useEffect(() => {
    getBrend();
    getCategories();
  }, [dil]);
  const getBrend = () => {
    axiosInstance
      .get("/api/grocery_brand_products", {
        params: {
          lang: dil,
          brand_id: id,
        },
      })
      .then((data) => {
        console.log("brend:", data.data.body);
        setBrend(data.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategories = () => {
    axiosInstance
      .get("/api/grocery_categories", {
        params: {
          lang: dil,
        },
      })
      .then((data) => {
        console.log("brend:", data.data.body);
        setCategories(data.data.body);
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
        <div className="w-full px-4 rounded-[8px] border-[1px] border-neutral-300">
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
                key={"catb" + i}
                className="py-3 text-[16px] text-neutral-900 font-[300] text-left border-t-[1px] border-t-neutral-300 cursor-pointer"
              >
                {item.name}
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
              getAriaValueText={(e) => console.log("value text", e)}
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
            {brend.length > 0 && brend[0].brands?.name}
          </p>
        </div>

        <div className="flex items-center justify-between w-full mt-5">
          <div className="flex justify-start">
            <img
              src={brend.length > 0 && BASE_URL + brend[0].brands?.img}
              className="h-[48px] object-contain rounded-[8px] shadow-sm mr-4"
              alt=""
            />
            <p className="md2:text-[32px] whitespace-nowrap text-[20px] font-semi text-neutral-900 mr-2">
              {brend.length > 0 && brend[0].brands?.name}
            </p>
          </div>
          <div className="w-[200px] md2:block hidden">
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
        <div className="items-center justify-start hidden w-full mt-6 md2:flex">
          <div className="flex justify-between overflow-x-auto items-center mr-2 rounded-[32px] h-[30px] p-[5px] pl-[10px] bg-green text-white text-[16px] font-medium overflow-y-hidden">
            <p className="mr-2">
              {dil === "TM" ? tm.Bahasy : dil === "RU" ? ru.Bahasy : en.Bahasy}:
              {" " + priceRange[0]} - {priceRange[1]} TMT
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
        {/* <div className="flex items-center justify-start w-full mt-4">
                    <h1 className="font-[700] text-[20px] text-neutral-900 mr-2">
                        Şokolad we süýji önümleri
                    </h1>
                    <p className="font-medium text-[16px] text-neutral-600">
                        (sany 8)
                    </p>
                </div> */}
        <div className="grid w-full grid-cols-2 gap-8 mt-7 place-items-center lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 5xl:grid-cols-6">
          {brend?.map((item, i) => {
            return (
              <ProductCard
                data={item}
                text={item.name}
                img={item?.img[0]?.img}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Brend;
