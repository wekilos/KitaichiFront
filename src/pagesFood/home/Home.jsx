import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import slide from "../../images/slide.jpg";
import longBanner from "../../images/longBanner.png";
import category from "../../images/category.svg";

import restoran1 from "../../images/restoran1.jpg";
import restoran2 from "../../images/restoran2.jpg";
import restoran3 from "../../images/restoran3.jpg";
import restoran4 from "../../images/restoran4.jpg";
import restoran5 from "../../images/restoran5.jpg";

import pizza from "../../images/pizza.jpg";
import ertirlik from "../../images/ertirlik.jpg";
import esasy from "../../images/esasy.jpg";
import hamyr from "../../images/hamyr.jpg";

import food_slide_1 from "../../images/food_slide_1.avif";
import food_slide_2 from "../../images/food_slide_2.avif";
import food_slide_3 from "../../images/food_slide_3.avif";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ProductCard from "../../componentsFood/ProductCard";
import BrandCard from "../../componentsFood/BrandCard";
import { useHistory } from "react-router-dom";
import MarketCard from "../../componentsFood/MarketCard";
import CategoryCard from "../../componentsFood/CategoryCard";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { BASE_URL, BASE_URL, axiosInstance } from "../../utils/axiosIntance";

function Home(props) {
  const history = useHistory();
  const { dil } = useContext(Context);
  const slider = useRef(null);
  const [sliders, setSliders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [moreSale, setMoreSale] = useState([]);
  const [current, setCurrent] = useState({ currentSlide: 0 });
  const testSettings = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    outline: "0",
  };
  const settings = {
    className: "center",
    // centerMode: true,
    autoplay: true,
    swipeToSlide: true,
    // autoplaySpeed: 2000,
    pauseOnHover: true,
    Infinity: true,
    dots: true,
    infinite: true,
    speed: 500,
    // initialSlide: 0.8,
    // slidesToShow: 1.2,
    // slidesToScroll: 1,
    initialSlide: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (prev, next) => {
      setCurrent({ currentSlide: next });
    },
    afterChange: (index) => setCurrent({ currentSlide: index }),
    appendDots: (dots) => {
      return (
        <div className="mt-2">
          <ul>
            {dots.map((item, index) => {
              return (
                <li
                  className={
                    current.currentSlide == index
                      ? "bg-green mx-1 w-2 h-2 !text-green rounded-[100%]"
                      : "bg-neutral mx-1 rounded-[100%]"
                  }
                  key={index}
                >
                  {/* {item.props.children} */}
                </li>
              );
            })}
          </ul>
        </div>
      );
    },
    customPaging: (index) => {
      return (
        <button
          style={index === current.currentSlide ? testSettings : null}
          className="bg-green"
        >
          {index + 1}
        </button>
      );
    },
  };

  const settingsCategory = {
    dots: false,
    infinite: true,
    speed: 2000,
    autoplay: true,
    slidesToShow: 7,
    initialSlide: 1,
    slidesToScroll: 1,
    arrows: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 0.5,
          infinite: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const markets = [
    {
      img: restoran1,
      close: false,
      is_discount: true,
      text: "Soltan Restoran",
    },
    {
      img: restoran2,
      close: true,
      is_discount: true,
      text: "Şa kofe",
    },
    {
      img: restoran3,
      close: false,
      is_discount: true,
      text: "Bazzeti",
    },
    {
      img: restoran4,
      close: true,
      is_discount: true,
      text: "Şabaz",
    },
    {
      img: restoran5,
      close: false,
      is_discount: true,
      text: "Tagamçy",
    },
  ];

  useEffect(() => {
    getSliders();
    getCategories();
    getDiscounts();
    getMoresales();
  }, [dil]);
  const getSliders = () => {
    axiosInstance
      .get("/api/f-carousel/all")
      .then((data) => {
        console.log(data.data);
        setSliders(data.data);
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
          order: "ASC",
        },
      })
      .then((data) => {
        console.log(data.data.body);
        let array = data.data.body
          .concat(data.data.body)
          .concat(data.data.body);
        setCategories(array);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDiscounts = () => {
    axiosInstance
      .get("/api/food_restaurant_discount", {
        params: {
          page: 0,
          limit: 9999,
          lang: dil,
          order: "ASC",
        },
      })
      .then((data) => {
        console.log(data.data);
        setDiscounts(data.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMoresales = () => {
    axiosInstance
      .get("/api/food_restaurant_more_sale", {
        params: {
          page: 0,
          limit: 9999,
          lang: dil,
          order: "ASC",
        },
      })
      .then((data) => {
        console.log(data.data);
        setMoreSale(data.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full pb-10 select-none">
      <div className="w-full h-[160px] md2:h-[320px] relative rounded-[20px] md2:mt-[25px] mt-[16px] mb-[50px]">
        <Slider ref={slider} {...settings}>
          {sliders.map((item, i) => {
            return (
              <div key={"img" + i} className="w-full px-2 outline-none">
                <img
                  className=" w-full h-[160px] md2:h-[320px] mb-3  object-cover rounded-[20px]"
                  src={BASE_URL + item?.img}
                  alt="slide"
                />
              </div>
            );
          })}
        </Slider>
        <div>
          <div
            onClick={() => slider.current.slickPrev(1)}
            className="w-[40px] absolute -left-[15px] cursor-pointer top-[65px] md2:top-[150px] text-right pr-1 shadow-sm leading-[35px] rounded-[100%] h-[40px] bg-white"
          >
            <ArrowBackIos />
          </div>
          <div
            onClick={() => slider.current.slickNext(1)}
            className="w-[40px] absolute -right-[25px] cursor-pointer top-[65px] md2:top-[150px] shadow-sm text-center leading-[35px] rounded-[100%] h-[40px] bg-white"
          >
            <ArrowForwardIos />
          </div>
        </div>
      </div>

      <div className="w-full mt-14 md2:mt-10">
        <div className="flex items-center justify-between w-full">
          <h2 className="md2:text-[28px] text-[24px] font-bold text-[#2F313F]">
            {dil === "TM"
              ? tm["Nahar kategoriýalary"]
              : dil === "RU"
              ? ru["Nahar kategoriýalary"]
              : en["Nahar kategoriýalary"]}
          </h2>
          <div
            onClick={() => history.push({ pathname: "/rtn/categories" })}
            className="border-[1px] md2:block hidden hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[16px] font-semi"
          >
            {dil === "TM"
              ? tm["Hemmesini görkez"]
              : dil === "RU"
              ? ru["Hemmesini görkez"]
              : en["Hemmesini görkez"]}
          </div>
        </div>
        <div className="w-full mt-6">
          <Slider {...settingsCategory}>
            {categories.map((item) => {
              return (
                <div kety={item.name} className="pr-5">
                  <CategoryCard text={item.name} img={BASE_URL + item.img} />
                </div>
              );
            })}
          </Slider>
        </div>
        <div
          onClick={() => history.push({ pathname: "/rtn/categories" })}
          className="border-[1px] w-full text-center mt-[24px] md2:hidden block hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[14px] font-semi"
        >
          {dil === "TM"
            ? tm["Hemmesini görkez"]
            : dil === "RU"
            ? ru["Hemmesini görkez"]
            : en["Hemmesini görkez"]}
        </div>
      </div>

      <div className="mt-6 md2:mt-10">
        <div className="flex items-center justify-between">
          <h2 className="md2:text-[28px] text-[24px] font-bold text-[#2F313F]">
            {dil === "TM"
              ? tm.Arzanladyşlar
              : dil === "RU"
              ? ru.Arzanladyşlar
              : en.Arzanladyşlar}
          </h2>
          <div
            onClick={() => history.push({ pathname: "/rtn/discount" })}
            className="border-[1px] md2:block hidden hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[16px] font-semi"
          >
            {dil === "TM"
              ? tm["Hemmesini görkez"]
              : dil === "RU"
              ? ru["Hemmesini görkez"]
              : en["Hemmesini görkez"]}
          </div>
        </div>
        <div className="inline-flex justify-between w-full mt-6 overflow-y-auto scrollbar-hide">
          {discounts?.map((item, index) => {
            return (
              <div key={index} className="mr-6">
                <MarketCard
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
        <div
          onClick={() => history.push({ pathname: "/rtn/discount" })}
          className="border-[1px] w-full text-center mt-[24px] md2:hidden block hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[14px] font-semi"
        >
          {dil === "TM"
            ? tm["Hemmesini görkez"]
            : dil === "RU"
            ? ru["Hemmesini görkez"]
            : en["Hemmesini görkez"]}
        </div>
      </div>

      <div className="mt-6 md2:mt-10">
        <div className="flex items-center justify-between">
          <h2 className="md2:text-[28px] text-[24px] font-bold text-[#2F313F]">
            {dil === "TM"
              ? tm["Köp satylanlar"]
              : dil === "RU"
              ? ru["Köp satylanlar"]
              : en["Köp satylanlar"]}
          </h2>
          <div
            onClick={() => history.push({ pathname: "/rtn/moreSale" })}
            className="border-[1px] md2:block hidden hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[16px] font-semi"
          >
            {dil === "TM"
              ? tm["Hemmesini görkez"]
              : dil === "RU"
              ? ru["Hemmesini görkez"]
              : en["Hemmesini görkez"]}
          </div>
        </div>
        <div className="inline-flex justify-between w-full mt-6 overflow-y-auto scrollbar-hide">
          {moreSale?.map((item, index) => {
            return (
              <div key={index} className="mr-6">
                <MarketCard
                  is_discount={item.is_discount}
                  close={item.close}
                  img={BASE_URL + item.img}
                  name={item.name}
                  text={item.text}
                  key={"index"}
                />
              </div>
            );
          })}
        </div>
        <div
          onClick={() => history.push({ pathname: "/rtn/moreSale" })}
          className="border-[1px] w-full text-center mt-[24px] md2:hidden block hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[14px] font-semi"
        >
          {dil === "TM"
            ? tm["Hemmesini görkez"]
            : dil === "RU"
            ? ru["Hemmesini görkez"]
            : en["Hemmesini görkez"]}
        </div>
      </div>

      <div className="w-full mt-6 md2:mt-10 ">
        <img
          className="w-full h-[200px] rounded-[24px] object-cover "
          src={BASE_URL + sliders[1]?.img}
          alt="banner"
        />
      </div>

      <div className="mt-6 md2:mt-10">
        <div className="flex items-center justify-between">
          <h2 className="md2:text-[28px] text-[24px] font-bold text-[#2F313F]">
            Burger
          </h2>
          <div
            onClick={() => history.push({ pathname: "/rtn/category/1" })}
            className="border-[1px] md2:block hidden hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[16px] font-semi"
          >
            {dil === "TM"
              ? tm["Hemmesini görkez"]
              : dil === "RU"
              ? ru["Hemmesini görkez"]
              : en["Hemmesini görkez"]}
          </div>
        </div>
        <div className="inline-flex justify-between w-full mt-6 overflow-y-auto scrollbar-hide">
          {markets.map((item, index) => {
            return (
              <div key={index} className="mr-6">
                <MarketCard
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
        <div
          onClick={() => history.push({ pathname: "/rtn/category/1" })}
          className="border-[1px] w-full text-center mt-[24px] md2:hidden block hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[14px] font-semi"
        >
          {dil === "TM"
            ? tm["Hemmesini görkez"]
            : dil === "RU"
            ? ru["Hemmesini görkez"]
            : en["Hemmesini görkez"]}
        </div>
      </div>

      <div className="mt-6 md2:mt-10">
        <div className="flex items-center justify-between">
          <h2 className="md2:text-[28px] text-[24px] font-bold text-[#2F313F]">
            Burger
          </h2>
          <div
            onClick={() => history.push({ pathname: "/rtn/category/1" })}
            className="border-[1px] md2:block hidden hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[16px] font-semi"
          >
            {dil === "TM"
              ? tm["Hemmesini görkez"]
              : dil === "RU"
              ? ru["Hemmesini görkez"]
              : en["Hemmesini görkez"]}
          </div>
        </div>
        <div className="inline-flex justify-between w-full mt-6 overflow-y-auto scrollbar-hide">
          {markets.map((item, index) => {
            return (
              <div key={index} className="mr-6">
                <MarketCard
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
        <div
          onClick={() => history.push({ pathname: "/rtn/category/1" })}
          className="border-[1px] w-full text-center mt-[24px] md2:hidden block hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[14px] font-semi"
        >
          {dil === "TM"
            ? tm["Hemmesini görkez"]
            : dil === "RU"
            ? ru["Hemmesini görkez"]
            : en["Hemmesini görkez"]}
        </div>
      </div>
    </div>
  );
}

export default Home;
