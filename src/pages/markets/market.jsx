import React, { useContext, useEffect, useState } from "react";
import {
  West,
  ArrowForwardIos,
  FavoriteBorder,
  TimesOneMobiledata,
} from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import { Cancel, StarOutlined } from "@mui/icons-material";
import { Modal } from "antd";
import ProductCard from "../../components/ProductCard";
import heart from "../../images/heartWhite.svg";
import heartLiked from "../../images/heartLiked.svg";
import star from "../../images/star.svg";
import { useHistory } from "react-router-dom";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { useParams } from "react-router-dom";
import { BASE_URL, BASE_URL, axiosInstance } from "../../utils/axiosIntance";

const Market = () => {
  const history = useHistory();
  const { id } = useParams();
  const { dil } = useContext(Context);
  const [liked, setLiked] = useState(false);
  const [starOpen, setStarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [market, setMarket] = useState({});
  const [wichCat, setWichCat] = useState(0);

  useEffect(() => {
    getmarket();
  }, [dil]);

  const getmarket = async () => {
    axiosInstance
      .get("/api/grocery_market", {
        params: {
          market_id: id,
          lang: dil,
          limit: 9999,
        },
      })
      .then((data) => {
        console.log("market:", data.data.body);
        setMarket(data.data.body[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToFav = () => {
    axiosInstance
      .post("/api/grocery_favourite_market", {
        user_id: 1,
        market_id: id,
      })
      .then((data) => {
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full inline-flex pb-10 justify-between select-none">
      <Modal
        className="font-roboto p-8 "
        width={650}
        open={starOpen}
        onCancel={() => setStarOpen(false)}
        footer={false}
      >
        <h1 className="text-[28px] mb-4 font-bold text-neutral-900 text-left ">
          {dil === "TM"
            ? tm["Baha bermek"]
            : dil === "RU"
            ? ru["Baha bermek"]
            : en["Baha bermek"]}
        </h1>

        <div className="w-full overflow-y-auto max-h-[470px]">
          {market?.rating?.feedback?.map((item, i) => {
            return (
              <div className="w-full mb-2 py-2 border-b-[1px] border-b-neutral-300">
                <h1 className="w-full text-left text-[18px] text-neutral-900 font-semi">
                  {item?.name}
                </h1>
                <p className="w-full text-left text-[14px] text-neutral-700 font-medium">
                  {item?.date.slice(0, 10) +
                    " (" +
                    item?.date.slice(11, 16) +
                    ")"}
                </p>
                <div className="flex my-2">
                  <p className="w-fit mr-2 text-left text-[16px] text-neutral-900 font-semi">
                    {item?.rating.toFixed(1)}
                  </p>
                  <div className="flex">
                    {item?.rating > 0 ? (
                      <StarOutlined className="text-yellow" />
                    ) : (
                      <StarOutlined className="text-neutral-400" />
                    )}
                    {item?.rating > 1 ? (
                      <StarOutlined className="text-yellow" />
                    ) : (
                      <StarOutlined className="text-neutral-400" />
                    )}
                    {item?.rating > 2 ? (
                      <StarOutlined className="text-yellow" />
                    ) : (
                      <StarOutlined className="text-neutral-400" />
                    )}
                    {item?.rating > 3 ? (
                      <StarOutlined className="text-yellow" />
                    ) : (
                      <StarOutlined className="text-neutral-400" />
                    )}
                    {item?.rating > 4 ? (
                      <StarOutlined className="text-yellow" />
                    ) : (
                      <StarOutlined className="text-neutral-400" />
                    )}
                  </div>
                </div>
                <p className="w-full text-left text-[14px] text-neutral-700 font-regular">
                  {item?.text}
                </p>
              </div>
            );
          })}
        </div>
      </Modal>
      <div className="min-w-[245px] md2:block hidden w-[245px]">
        <button
          onClick={() => history.push({ pathname: "/mrt/markets" })}
          className="w-full h-[50px]  bg-green-100 text-green text-[18px] font-semi rounded-[8px]"
        >
          <West />
          {dil === "TM"
            ? tm["Ähli dükanlar"]
            : dil === "RU"
            ? ru["Ähli dükanlar"]
            : en["Ähli dükanlar"]}
        </button>
        <div className="w-full px-4 mt-4 rounded-[8px] border-[1px] border-neutral-300">
          <h1 className="py-3 text-[20px] text-neutral-900 font-semi text-left">
            {dil === "TM"
              ? tm.Kategoriýalar
              : dil === "RU"
              ? ru.Kategoriýalar
              : en.Kategoriýalar}
          </h1>

          {market?.categories?.map((item, i) => {
            return (
              <p
                key={"cat" + i}
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
        <div className="w-full md2:flex hidden items-center">
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
          <p
            onClick={() => history.push({ pathname: "/mrt/markets" })}
            className="text-[16px] cursor-pointer font-regular text-black-secondary mr-2"
          >
            {dil === "TM"
              ? tm.Dükanlar
              : dil === "RU"
              ? ru.Dükanlar
              : en.Dükanlar}
          </p>
          <ArrowForwardIos className="!text-[16px]  font-regular text-black-secondary mr-2" />
          <p className="text-[16px] font-regular text-black-secondary mr-2">
            {market?.name}
          </p>
        </div>

        <div className="w-full relative md2:mt-6 mt-2">
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
                onClick={() => {
                  setLiked(!liked);
                  addToFav();
                }}
                className="text-white"
                src={heart}
                alt=""
              />
            )}
          </div>
          <img
            src={BASE_URL + market?.img}
            className="w-full h-[285px] object-cover rounded-[24px]"
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
                {" " + market?.rating?.count.toFixed(2)}
              </h1>
              <p className="text-[16px] text-neutral-700 font-medium">
                {market?.rating?.feedback.length + " "}
                {dil === "TM" ? "Reýting" : dil === "RU" ? "Оценки" : "Ratings"}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md2:mt-6 mt-2 flex justify-between  items-center">
          <p className="md2:text-[32px] text-[20px] font-semi text-neutral-900 mr-2">
            {market?.name}
          </p>
          <div className="md2:w-[200px] w-[150px]">
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

        <div className="w-full  mt-5 md2:flex hidden justify-start items-center">
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

        <div className="w-full overflow-y-scroll scrollbar-hide h-[50px]  mt-5 md2:hidden inline-flex justify-start items-center">
          {market?.categories?.map((item, i) => {
            return (
              <div
                onClick={() => setWichCat(i)}
                className={
                  `${i == wichCat && "bg-neutral-300 "}` +
                  "block w-fit whitespace-nowrap mr-2 cursor-pointer items-center rounded-[12px] h-[40px] p-[10px] px-[15px]  text-black-secondary text-[16px] font-medium"
                }
              >
                {item?.name}
              </div>
            );
          })}
        </div>

        {market?.categories?.map((item) => {
          return (
            <div>
              <div className="w-full flex items-center justify-start mt-8">
                <h1 className="font-bold text-[20px] text-neutral-900 mr-2">
                  {item?.name}
                </h1>
                <p className="font-medium text-[16px] text-neutral-600"></p>
              </div>
              <div className="w-full mt-4 grid gap-8 place-items-center md:grid-cols-2  lg:grid-cols-3  2xl:grid-cols-4  4xl:grid-cols-5 5xl:grid-cols-6">
                {item?.products?.map((pro) => {
                  return (
                    <ProductCard
                      data={pro}
                      text={pro.name}
                      img={pro?.img[0]?.img}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Market;
