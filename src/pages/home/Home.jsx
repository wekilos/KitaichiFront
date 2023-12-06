import React, { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import add1 from "../../images/cardAdd.jpeg";
import add2 from "../../images/cardAdd2.jpg";
import add3 from "../../images/cardAdd3.webp";
import longBanner from "../../images/longBanner.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ProductCard from "../../components/ProductCard";
import BrandCard from "../../components/BrandCard";
import { useHistory } from "react-router-dom";
import CategoryCard from "./categoryCard";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";

import dukan from "../../images/dukan.png";
import halanlarym from "../../images/halanlarym.png";
import kategoriya from "../../images/kategoriya.png";
import { BASE_URL, axiosInstance } from "../../utils/axiosIntance";
import { unstable_getUnit } from "@mui/material";

function Home(props) {
  const history = useHistory();
  const { dil } = useContext(Context);
  const slider = useRef(null);
  const [current, setCurrent] = useState({ currentSlide: 0 });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [discountPro, setDiscountPro] = useState([]);
  const [moreSalePro, setMoreSalePro] = useState([]);
  const [carusels, setCarusels] = useState([]);
  const [bannerCards, setBannerCards] = useState([]);
  const [un, setUn] = useState([]);
  const [cake, setCake] = useState([]);
  const sliders = useRef({});
  const [allCatPro, setAllCatPro] = useState([]);
  const brandsSliderSetting = {
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
        breakpoint: 920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const productsSliderSetting = {
    center: false,
    dots: false,
    infinite: true,
    speed: 2000,
    autoplay: true,
    slidesToShow: 1,
    initialSlide: 1,
    slidesToScroll: 1,
    arrows: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
        breakpoint: 920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };
  const testSettings = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    outline: "0",
  };
  const settings = {
    className: "center",
    center: true,
    autoplay: true,
    swipeToSlide: true,
    // autoplaySpeed: 2000,
    pauseOnHover: true,
    Infinity: true,
    dots: true,
    infinite: true,
    speed: 2000,
    // initialSlide: 0.8,
    // slidesToShow: 1.2,
    // slidesToScroll: 1,
    // initialSlide: 0.2,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (prev, next) => {
      setCurrent({ currentSlide: next });
    },
    afterChange: (index) => setCurrent({ currentSlide: index }),
    appendDots: (dots) => {
      return (
        <div className="mt-4">
          <ul>
            {dots?.map((item, index) => {
              return (
                <li
                  className={
                    current.currentSlide == index
                      ? "bg-green mt-4 mx-1 w-1 h-1 !text-green rounded-[100%]"
                      : "bg-neutral mt-4 mx-1 rounded-[100%]"
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
          className="mt-4 bg-green"
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
        breakpoint: 920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  // const images = [longBanner, longBanner, longBanner];

  useEffect(() => {
    getcategories();
    getdiscounts();
    getmoreSale();
    getbrands();
    getCarusels();
    // getCategoryProCake();
    // getCategoryPro();
    // getCategoriesPros();
    getBannerCards();
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
        getCategoriesPros(data.data.body);
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
          page: 0,
          limit: 10,
          lang: dil,
        },
      })
      .then((data) => {
        setBrands(data.data.body);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getdiscounts = async () => {
    axiosInstance
      .get("/api/grocery_discount_products", {
        params: {
          page: 0,
          limit: 10,
          lang: dil,
        },
      })
      .then((data) => {
        setDiscountPro(data.data.body);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getmoreSale = async () => {
    axiosInstance
      .get("/api/grocery_more_sale_products", {
        params: {
          page: 0,
          limit: 10,
          lang: dil,
        },
      })
      .then((data) => {
        setMoreSalePro(data.data.body);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCarusels = () => {
    axiosInstance
      .get("/api/e-carousel/all")
      .then((data) => {
        console.log("carousel", data.data);
        setCarusels(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBannerCards = () => {
    axiosInstance
      .get("/api/e-banner-card/all")
      .then((data) => {
        console.log("carousel", data.data);
        setBannerCards(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategoryPro = () => {
    axiosInstance
      .get("/api/grocery_category_products", {
        params: {
          lang: dil,
          category_id: 50,
        },
      })
      .then((data) => {
        console.log("un", data.data.body);
        setUn(data.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategoryProCake = () => {
    axiosInstance
      .get("/api/grocery_category_products", {
        params: {
          lang: dil,
          category_id: 51,
        },
      })
      .then((data) => {
        console.log("un", data.data.body);
        setCake(data.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategoriesPros = async (cats) => {
    let array = [];
    await cats?.map((item) => {
      axiosInstance
        .get("/api/grocery_category_products", {
          params: {
            lang: dil,
            category_id: item?.id,
          },
        })
        .then((data) => {
          // console.log("all pro", data.data.body);
          // array.push({ cat: data.data.body });
          setAllCatPro((oldArray) => [...oldArray, { cat: data.data.body }]);
          // setAllCatPro([...array]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  return (
    <div className="w-full pb-10 select-none">
      <div className="w-full h-[160px] md2:h-[320px] relative rounded-[20px] md2:mt-[25px] mt-[16px] mb-[50px]">
        <Slider ref={slider} {...settings}>
          {carusels &&
            carusels.length > 0 &&
            carusels?.map((item, i) => {
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

      <div className="hidden w-full select-none md2:block mt-14 ">
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-bold text-[#2F313F]">
            {dil === "TM"
              ? tm.Kategoriýalar
              : dil === "RU"
              ? ru.Kategoriýalar
              : en.Kategoriýalar}
          </h2>
          <div
            onClick={() => history.push({ pathname: "/mrt/kategories" })}
            className="border-[1px] hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[16px] font-semi"
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
            {categories?.map((item, i) => {
              return (
                <div key={"kat" + i} className="pr-5">
                  <CategoryCard data={item} title={item.name} />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>

      <div className="flex justify-between w-full select-none md2:hidden mt-14 ">
        <div
          onClick={() =>
            history.push({
              pathname: "/mrt/markets",
            })
          }
          className="w-[105px] h-[114px] bg-neutral-200 rounded-[8px] relative"
        >
          <h1 className="absolute top-[12px] left-[12px] text-black text-[16px] font-bold">
            {dil === "TM"
              ? tm.Dükanlar
              : dil === "RU"
              ? ru.Dükanlar
              : en.Dükanlar}
          </h1>
          <img className="absolute bottom-0 right-0" src={dukan} alt="dukan" />
        </div>

        <div
          onClick={() =>
            history.push({
              pathname: "/mrt/kategories",
            })
          }
          className="w-[105px] h-[114px] bg-neutral-200 rounded-[8px] relative"
        >
          <h1 className="absolute top-[12px] left-[12px] text-black text-[16px] font-bold">
            {dil === "TM"
              ? tm.Kategoriýa
              : dil === "RU"
              ? ru.Kategoriýa
              : en.Kategoriýa}
          </h1>
          <img
            className="absolute bottom-0 right-0"
            src={kategoriya}
            alt="dukan"
          />
        </div>

        <div
          onClick={() =>
            history.push({
              pathname: "/mrt/profile/favorites",
            })
          }
          className="w-[105px] h-[114px] bg-neutral-200 rounded-[8px] relative"
        >
          <h1 className="absolute top-[12px] left-[12px] text-black text-[16px] font-bold">
            {dil === "TM"
              ? tm.Halanlarym
              : dil === "RU"
              ? ru.Halanlarym
              : en.Halanlarym}
          </h1>
          <img
            className="absolute bottom-0 right-0"
            src={halanlarym}
            alt="dukan"
          />
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
            onClick={() => history.push({ pathname: "/mrt/discount" })}
            className="border-[1px] md2:block hidden hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[16px] font-semi"
          >
            {dil === "TM"
              ? tm["Hemmesini görkez"]
              : dil === "RU"
              ? ru["Hemmesini görkez"]
              : en["Hemmesini görkez"]}
          </div>
        </div>
        <div className="w-full">
          <Slider
            {...productsSliderSetting}
            slidesToShow={
              discountPro !== undefined &&
              discountPro.length !== undefined &&
              discountPro.length > 7
                ? 7
                : 1
            }
          >
            {discountPro?.map((item, i) => {
              return (
                <div key={item.name + i} className="mx-6 px-4">
                  <ProductCard
                    data={item}
                    text={item.name}
                    img={item.img[0].img}
                    key={"index"}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        {/* <div className="inline-flex justify-between w-full mt-4 overflow-y-auto md2:hidden md2:mt-6 scrollbar-hide">
          {products.arzan.map((item) => {
            return (
              <div key={item.name} className="mr-6">
                <ProductCard text={item.name} img={item.img} key={"index"} />
              </div>
            );
          })}
        </div> */}
        <div
          onClick={() => history.push({ pathname: "/mrt/discount" })}
          className="border-[1px] w-full text-center mt-[24px] md2:hidden block hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[14px] font-semi"
        >
          {dil === "TM"
            ? tm["Hemmesini görkez"]
            : dil === "RU"
            ? ru["Hemmesini görkez"]
            : en["Hemmesini görkez"]}
        </div>
      </div>

      <div className="inline-flex justify-between w-full mt-8 overflow-y-auto md2:mt-12 scrollbar-hide">
        {bannerCards &&
          bannerCards.length > 0 &&
          bannerCards?.map((item) => {
            return (
              <img
                className="rounded-[32px] md2:w-[400px] w-[370px] md2:h-[220px] h-[160px] object-cover mr-2"
                src={BASE_URL + item?.img}
                alt="slide"
              />
            );
          })}
      </div>
      {/* <ProductGroup name={"Maýonez,üwmeçler we souslar"} /> */}

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
            onClick={() => history.push({ pathname: "/mrt/moreSale" })}
            className="border-[1px] md2:block hidden hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[16px] font-semi"
          >
            {dil === "TM"
              ? tm["Hemmesini görkez"]
              : dil === "RU"
              ? ru["Hemmesini görkez"]
              : en["Hemmesini görkez"]}
          </div>
        </div>
        <div className="w-full mt-4">
          <Slider
            {...productsSliderSetting}
            slidesToShow={
              moreSalePro !== undefined &&
              moreSalePro.length !== undefined &&
              moreSalePro.length > 7
                ? 7
                : 1
            }
          >
            {moreSalePro?.map((item, i) => {
              return (
                <div key={item.name + i} className="mr-6">
                  <ProductCard
                    data={item}
                    text={item.name}
                    img={item.img[0].img}
                    key={"index"}
                  />
                </div>
              );
            })}
          </Slider>
        </div>

        <div
          onClick={() => history.push({ pathname: "/mrt/moreSale" })}
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
          src={longBanner}
          alt="banner"
        />
      </div>

      <div className="mt-6 md2:mt-10">
        <div className="flex items-center justify-between w-full">
          <h2 className="md2:text-[28px] text-[24px] font-bold text-[#2F313F]">
            {dil === "TM"
              ? tm.Brendler
              : dil === "RU"
              ? ru.Brendler
              : en.Brendler}
          </h2>
          <div
            onClick={() => history.push({ pathname: "/mrt/brends" })}
            className="border-[1px] md2:block hidden hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[16px] font-semi"
          >
            {dil === "TM"
              ? tm["Hemmesini görkez"]
              : dil === "RU"
              ? ru["Hemmesini görkez"]
              : en["Hemmesini görkez"]}
          </div>
        </div>
        <div className=" w-full mt-6">
          {/* <div className="inline-flex justify-between w-full mt-4 overflow-y-auto md2:mt-6 scrollbar-hide"> */}
          <Slider {...brandsSliderSetting}>
            {brands?.map((item, i) => {
              return (
                <div key={item.name + i} className="mr-6">
                  <BrandCard
                    data={item}
                    text={item.name}
                    img={item?.img}
                    key={"index"}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        {/* <div className="inline-flex justify-between w-full mt-4 overflow-y-auto md2:mt-6 scrollbar-hide">
          {brends.map((item) => {
            return (
              <div key={item.name + "n"} className="mr-6">
                <BrandCard text={item.name} img={item?.img} key={"index"} />
              </div>
            );
          })}
        </div> */}
        <div
          onClick={() => history.push({ pathname: "/mrt/brends" })}
          className="border-[1px] w-full text-center mt-[24px] md2:hidden block hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[14px] font-semi"
        >
          {dil === "TM"
            ? tm["Hemmesini görkez"]
            : dil === "RU"
            ? ru["Hemmesini görkez"]
            : en["Hemmesini görkez"]}
        </div>
      </div>

      {/* <div className="my-6 md2:my-10">
        <div className="flex items-center justify-between">
          <h2 className="md2:text-[28px] text-[24px] font-bold text-[#2F313F]">
            {cake.length > 0 && cake[0]?.categories.name}
          </h2>
          <div
            onClick={() => history.push({ pathname: "/mrt/kategory/51" })}
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
          {cake?.map((item, i) => {
            return (
              <div key={item.name + i} className="mr-6">
                <ProductCard
                  data={item}
                  text={item.name}
                  img={item.img[0].img}
                  key={"index"}
                />
              </div>
            );
          })}
        </div>
    
        <div
          onClick={() => history.push({ pathname: "/mrt/kategory/51" })}
          className="border-[1px] w-full text-center md2:hidden block mt-6  hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[14px] font-semi"
        >
          {dil === "TM"
            ? tm["Hemmesini görkez"]
            : dil === "RU"
            ? ru["Hemmesini görkez"]
            : en["Hemmesini görkez"]}
        </div>
      </div> */}

      {/* <div className="mt-6 md2:mt-10">
        <div className="flex items-center justify-between">
          <h2 className="md2:text-[28px] text-[24px] font-bold text-[#2F313F]">
            {un.length > 0 && un[0]?.categories.name}
          </h2>
          <div
            onClick={() => history.push({ pathname: "/mrt/kategory/50" })}
            className="border-[1px] md2:block hidden hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[16px] font-semi"
          >
            {dil === "TM"
              ? tm["Hemmesini görkez"]
              : dil === "RU"
              ? ru["Hemmesini görkez"]
              : en["Hemmesini görkez"]}
          </div>
        </div>
        <div className="inline-flex justify-between w-full mt-4 overflow-y-auto md2:mt-6 scrollbar-hide">
          {un?.map((item, i) => {
            return (
              <div key={item.name + "un" + i} className="mr-6">
                <ProductCard
                  data={item}
                  text={item.name}
                  img={item.img[0].img}
                  key={"index"}
                />
              </div>
            );
          })}
        </div>

        <div
          onClick={() => history.push({ pathname: "/mrt/kategory/50" })}
          className="border-[1px] w-full text-center md2:hidden block mt-6  hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[14px] font-semi"
        >
          {dil === "TM"
            ? tm["Hemmesini görkez"]
            : dil === "RU"
            ? ru["Hemmesini görkez"]
            : en["Hemmesini görkez"]}
        </div>
      </div> */}

      {allCatPro?.map((item, i) => {
        return (
          item?.cat?.length > 0 && (
            <div key={"allca" + i} className="mt-6 md2:mt-10">
              <div className="flex items-center justify-between">
                <h2 className="md2:text-[28px] text-[24px] font-bold text-[#2F313F]">
                  {item?.cat?.length > 0 && item?.cat[0]?.categories.name}
                </h2>
                <div
                  onClick={() =>
                    history.push({
                      pathname: "/mrt/kategory/" + item?.cat[0]?.categories?.id,
                    })
                  }
                  className="border-[1px] md2:block hidden hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[16px] font-semi"
                >
                  {dil === "TM"
                    ? tm["Hemmesini görkez"]
                    : dil === "RU"
                    ? ru["Hemmesini görkez"]
                    : en["Hemmesini görkez"]}
                </div>
              </div>
              <div className=" w-full mt-6 relative">
                <Slider
                  ref={(element) => (sliders.current[i] = element)}
                  {...productsSliderSetting}
                  slidesToShow={
                    item !== undefined &&
                    item.cat !== undefined &&
                    item.cat.length !== undefined &&
                    item.cat.length > 7
                      ? 7
                      : item !== undefined &&
                        item.cat !== undefined &&
                        item.cat.length !== undefined
                      ? item.cat.length
                      : 1
                  }
                >
                  {item?.cat?.map((item, i) => {
                    return (
                      <div key={item.name + "un" + i} className="mr-6">
                        <ProductCard
                          data={item}
                          text={item.name}
                          img={item.img[0].img}
                          key={"index"}
                        />
                      </div>
                    );
                  })}
                </Slider>
                <div
                  onClick={() => sliders.current[i].slickPrev(1)}
                  className="w-[40px] absolute z-[2] -left-[15px] bg-white cursor-pointer top-[65px] md2:top-[150px] text-right pr-1 shadow-sm leading-[35px] rounded-[100%] h-[40px]"
                >
                  <ArrowBackIos />
                </div>
                <div
                  onClick={() => sliders.current[i].slickNext(1)}
                  className="w-[40px] absolute z-[2] -right-[25px] cursor-pointer top-[65px] md2:top-[150px] shadow-sm text-center leading-[35px] rounded-[100%] h-[40px] bg-white"
                >
                  <ArrowForwardIos />
                </div>
              </div>

              <div
                onClick={() =>
                  history.push({
                    pathname: "/mrt/kategory/" + item?.cat[0]?.categories.id,
                  })
                }
                className="border-[1px] w-full text-center md2:hidden block mt-6  hover:bg-green-200 border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[14px] font-semi"
              >
                {dil === "TM"
                  ? tm["Hemmesini görkez"]
                  : dil === "RU"
                  ? ru["Hemmesini görkez"]
                  : en["Hemmesini görkez"]}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}

export default Home;
