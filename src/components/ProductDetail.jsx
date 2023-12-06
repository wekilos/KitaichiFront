import React, { useEffect, useState, useRef, useContext } from "react";
import card from "../images/card.png";
import brend from "../images/brand.png";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";

import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";
import { useParams } from "react-router-dom";
import { BASE_URL, BASE_URL, axiosInstance } from "../utils/axiosIntance";

function ProductCard(props) {
  const history = useHistory();
  const [animation, setAnimation] = useState(false);
  const [count, setCount] = useState(1);

  const [product, setProduct] = useState({});
  const { id } = useParams();

  const {
    dil,
    decPro,
    addPro,
    is_liked,
    is_logged,
    favoriteProducts,
    getFavProducts,
  } = useContext(Context);

  const slider = useRef(null);
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
    dots: false,
    infinite: true,
    speed: 500,
    initialSlide: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    // beforeChange: (prev, next) => {
    //     setCurrent({ currentSlide: next });
    // },
    // afterChange: (index) => setCurrent({ currentSlide: index }),
    // appendDots: (dots) => {
    //     return (
    //         <div className="mt-2">
    //             <ul>
    //                 {dots.map((item, index) => {
    //                     return (
    //                         <li
    //                             className={
    //                                 current.currentSlide == index
    //                                     ? "bg-green mx-1 w-2 h-2 !text-green rounded-[100%]"
    //                                     : "bg-neutral mx-1 rounded-[100%]"
    //                             }
    //                             key={index}
    //                         >
    //                             <img
    //                                 className="h-[72px] object-contain mr-4"
    //                                 src={card}
    //                                 alt="card"
    //                             />
    //                         </li>
    //                     );
    //                 })}
    //             </ul>
    //         </div>
    //     );
    // },
    // customPaging: (index) => {
    //     return (
    //         <button
    //             style={index === current.currentSlide ? testSettings : null}
    //             className="bg-green"
    //         >
    //             {index + 1}
    //         </button>
    //     );
    // },
  };

  useEffect(() => {
    getProduct();
    setCount(0);
  }, [id, dil]);

  const getProduct = () => {
    axiosInstance
      .get("/api/grocery_product", {
        params: {
          lang: dil,
          product_id: id,
        },
      })
      .then((data) => {
        console.log(data.data.body[0]);
        setProduct(data.data.body.length > 0 ? data.data.body[0] : {});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  var data = JSON.parse(localStorage.getItem("userData"));

  const addToFav = () => {
    if (data?.id !== undefined)
      axiosInstance
        .post("/api/grocery_favourite_product", {
          user_id: data.id,
          product_id: id,
        })
        .then((data) => {
          console.log(data.data);
          getProduct();
          getFavProducts();
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <div className="w-full flex  flex-wrap justify-between rounded-[24px] border-[1px] border-neutral-300 shadow-sm md2:p-6 p-2">
      <div className="lg:w-1/3 w-full border-r-[1px] border-r-neutral-300 md2:p-8">
        <div className="w-full h-[320px]  relative rounded-[20px] md2:my-[25px] mb-[50px]">
          <Slider ref={slider} {...settings}>
            {product?.img?.map((item, i) => {
              return (
                <div
                  key={item.img + i}
                  className="w-full md2:px-2   outline-none"
                >
                  <img
                    className=" w-full h-[320px]  object-contain rounded-[20px]"
                    src={BASE_URL + item.img}
                    alt="slide"
                  />
                </div>
              );
            })}
          </Slider>
          <div>
            <div
              onClick={() => slider.current.slickPrev(1)}
              className="w-[32px] absolute -left-[10px] cursor-pointer pl-2 top-[150px] shadow-sm text-center leading-[30px] rounded-[8px] h-[32px] bg-neutral-200"
            >
              <ArrowBackIos className="text-neutral-400  font-bold" />
            </div>
            <div
              onClick={() => slider.current.slickNext(1)}
              className="w-[32px] absolute -right-[10px] cursor-pointer top-[150px] shadow-sm text-center leading-[30px] rounded-[8px] h-[32px] bg-neutral-200"
            >
              <ArrowForwardIos className="text-neutral-400 font-bold" />
            </div>
          </div>
          <div className="w-full  mt-[10px] md2:flex hidden justify-center">
            {product?.img?.map((item) => {
              return (
                <img
                  key={"mini" + item.img}
                  className="h-[72px] cursor-pointer object-contain mr-3"
                  src={BASE_URL + item?.img}
                  alt="card"
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="lg:w-2/3 w-full md2:px-8 flex flex-wrap justify-between flex-row">
        <div className="w-full mb-4 flex md2:hidden justify-between">
          <div className="w-1/2">
            <h1 className="w-full text-left text-[24px] font-bold text-neutral-900">
              {!product?.is_discount
                ? product?.discount_price?.toFixed(2)
                : product?.price?.toFixed(2)}
              TMT
            </h1>
            {!product?.is_discount && (
              <div className="flex items-center">
                <p className="mr-2 text-white bg-red h-[22px] px-[3px] text-[14px] font-semi rounded-[8px]">
                  -{product?.discount_percentage?.toFixed(2)}%
                </p>
                <p className="mr-2 text-passive  text-[14px] font-semi line-through decoration-red">
                  {product?.price?.toFixed(2)} TMT
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center w-1/2">
            {!animation && (
              <div
                onClick={() => setAnimation(true)}
                className="custom-button w-[180px] mr-2 select-none bg-green text-white rounded-[16px] text-[18px] h-[50px]"
              >
                {dil === "TM"
                  ? tm["Sebede goş"]
                  : dil === "RU"
                  ? ru["Sebede goş"]
                  : en["Sebede goş"]}
              </div>
            )}
            {animation && (
              <div
                onClick={() => setAnimation(true)}
                className="select-none mr-2 w-[180px] bg-green-100 flex justify-evenly text-green py-[10px] rounded-[16px] text-[18px] h-[50px]"
              >
                <button
                  onClick={() => {
                    decPro(product);
                    count > 1 && setCount(count - 1);
                    setAnimation(true);
                  }}
                  className="text-green bg-green-200 h-[30px] w-[30px] leading-[9px] rounded-[100%] p-2"
                >
                  -
                </button>
                <p className="text-[16px] text-green">{count}</p>
                <button
                  onClick={() => {
                    addPro(product);
                    setCount(count + 1);
                    setAnimation(true);
                  }}
                  className="text-green bg-green-200 h-[30px] w-[30px] leading-[9px] rounded-[100%] p-2"
                >
                  +
                </button>
              </div>
            )}
            {product?.is_liked ? (
              <div
                onClick={() => addToFav()}
                className="h-[50px] cursor-pointer !w-[50px] flex items-center justify-center rounded-[16px] bg-neutral-300  "
              >
                <FavoriteBorder className="text-neutral-900" />
              </div>
            ) : (
              <div
                onClick={() => addToFav()}
                className="h-[50px] cursor-pointer !w-[50px] flex items-center justify-center rounded-[16px] bg-neutral-300  "
              >
                <Favorite className=" text-red" />
              </div>
            )}
          </div>
        </div>

        <div className="md2:mb-0 mb-2  w-full">
          {!product?.is_discount && (
            <div className="h-[41px] mb-4 w-fit md2:block hidden rounded-[32px] px-4 py-2 bg-red text-white font-semi text[20px]">
              -{product?.discount_percentage}%
              {dil === "TM"
                ? tm.Arzanladyş
                : dil === "RU"
                ? ru.Arzanladyş
                : en.Arzanladyş}
            </div>
          )}
          <div className="md2:text-[24px] text-[18px] md2:border-none border-t-[1px] border-b-[1px] md2:pt-0 pt-2 md2:pb-0 pb-1 font-medium text-black-secondary ">
            {product?.name}
          </div>
        </div>

        <div className="w-full md2:mt-4">
          <h1 className="text-[16px] mb-3 font-semi text-neutral-900">
            {dil === "TM"
              ? tm["Esasy maglumatlar"]
              : dil === "RU"
              ? ru["Esasy maglumatlar"]
              : en["Esasy maglumatlar"]}
            :
          </h1>
          <div className="w-full flex justify-between flex-wrap">
            <div className="md2:w-[48%] w-full md2:mb-4 mb-2 bg-neutral-200 rounded-[8px] p-[15px] flex items-center justify-between">
              <p className="text-[16px] font-medium text-neutral-800">
                {dil === "TM"
                  ? tm["Önümiň kody"]
                  : dil === "RU"
                  ? ru["Önümiň kody"]
                  : en["Önümiň kody"]}
                :
              </p>
              <p className="text-[16px] font-medium text-neutral-900">
                {product?.code}
              </p>
            </div>
            <div className="md2:w-[48%] w-full md2:mb-4 mb-2 bg-neutral-200 rounded-[8px] p-[15px] flex items-center justify-between">
              <p className="text-[16px] font-medium text-neutral-800">
                {dil === "TM" ? tm.Brend : dil === "RU" ? ru.Brend : en.Brend}:
              </p>
              <div
                onClick={() =>
                  history.push({
                    pathname: "/mrt/brend/" + product?.brands?.id,
                  })
                }
                className="flex cursor-pointer items-center"
              >
                <p className="text-[16px] mr-2 font-medium text-green">
                  {product?.brands?.name}
                </p>
                <p className="!text-[12px] h-[20px] w-[20px] pl-1 flex items-center rounded-[4px] text-green border-[1px] border-green">
                  <ArrowForwardIos className="!text-[12px]" />
                </p>
              </div>
            </div>
            <div className="md2:w-[48%] w-full md2:mb-4 mb-2 bg-neutral-200 rounded-[8px] p-[15px] flex items-center justify-between">
              <p className="text-[16px] font-medium text-neutral-800">
                {dil === "TM"
                  ? tm.Kategoriýa
                  : dil === "RU"
                  ? ru.Kategoriýa
                  : en.Kategoriýa}
                :
              </p>
              <div
                onClick={() =>
                  history.push({
                    pathname: "/mrt/kategory/" + product?.categories?.id,
                  })
                }
                className="flex cursor-pointer items-center"
              >
                <p className="text-[16px] mr-2 font-medium text-green">
                  {product?.categories?.name}
                </p>
                <p className="!text-[12px] h-[20px] w-[20px] pl-1 flex items-center rounded-[4px] text-green border-[1px] border-green">
                  <ArrowForwardIos className="!text-[12px]" />
                </p>
              </div>
            </div>
            <div className="md2:w-[48%] w-full md2:mb-4 mb-2 bg-neutral-200 rounded-[8px] p-[15px] flex items-center justify-between">
              <p className="text-[16px] font-medium text-neutral-800">
                {dil === "TM" ? tm.Dükan : dil === "RU" ? ru.Dükan : en.Dükan}:
              </p>
              <div
                onClick={() =>
                  history.push({
                    pathname: "/mrt/market/" + product?.market?.id,
                  })
                }
                className="flex cursor-pointer items-center"
              >
                <p className="text-[16px] mr-2 font-medium text-green">
                  {product?.market?.name}
                </p>
                <p className="!text-[12px] h-[20px] w-[20px] pl-1 flex items-center rounded-[4px] text-green border-[1px] border-green">
                  <ArrowForwardIos className="!text-[12px]" />
                </p>
              </div>
            </div>
            <div className="md2:w-[48%] w-full md2:mb-4 mb-2 bg-neutral-200 rounded-[8px] p-[15px] flex items-center justify-between">
              <p className="text-[16px] font-medium text-neutral-800">
                {dil === "TM"
                  ? "Öndürilen ýeri"
                  : dil === "RU"
                  ? "Сделано место"
                  : "Made place"}
                :
              </p>
              <div className="flex cursor-pointer items-center">
                <p className="text-[16px] mr-2 font-medium text-green">
                  {product?.country}
                </p>
              </div>
            </div>
            <div className="md2:w-[48%] w-full md2:mb-4 mb-2 bg-neutral-200 rounded-[8px] p-[15px] flex items-center justify-between">
              <p className="text-[16px] font-medium text-neutral-800">
                {dil === "TM"
                  ? "Ýarowlylyk möhleti"
                  : dil === "RU"
                  ? "Дата окончания срока"
                  : "Expiration date"}
                :
              </p>
              <div className="flex cursor-pointer items-center">
                <p className="text-[16px] mr-2 font-medium text-green">
                  {product?.expiredate?.slice(0, 10)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-[18px] font-medium text-black-secondary">
          {product?.note}
        </div>

        <div className="w-full mt-4 md2:flex hidden justify-between">
          <div className="w-1/2">
            <h1 className="w-full text-left text-[24px] font-bold text-neutral-900">
              {!product?.is_discount
                ? product?.discount_price?.toFixed(2)
                : product?.price?.toFixed(2)}
              TMT
            </h1>
            {!product?.is_discount && (
              <div className="flex items-center">
                <p className="mr-2 text-white bg-red h-[22px] px-[3px] text-[14px] font-semi rounded-[8px]">
                  -{product?.discount_percentage?.toFixed(2)}%
                </p>
                <p className="mr-2 text-passive  text-[14px] font-semi line-through decoration-red">
                  {product?.price?.toFixed(2)} TMT
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center w-1/2">
            {!animation && (
              <div
                onClick={() => setAnimation(true)}
                className="custom-button w-[200px] select-none bg-green text-white rounded-[16px] text-[18px] h-[50px]"
              >
                {dil === "TM"
                  ? tm["Sebede goş"]
                  : dil === "RU"
                  ? ru["Sebede goş"]
                  : en["Sebede goş"]}
              </div>
            )}
            {animation && (
              <div
                onClick={() => setAnimation(true)}
                className="select-none w-[200px] bg-green-100 flex justify-evenly text-green py-[10px] rounded-[16px] text-[18px] h-[50px]"
              >
                <button
                  onClick={() => {
                    decPro(product);
                    count > 1 && setCount(count - 1);
                    setAnimation(true);
                  }}
                  className="text-green bg-green-200 h-[30px] w-[30px] leading-[9px] rounded-[100%] p-2"
                >
                  -
                </button>
                <p className="text-[16px] text-green">{count}</p>
                <button
                  onClick={() => {
                    addPro(product);
                    setCount(count + 1);
                    setAnimation(true);
                  }}
                  className="text-green bg-green-200 h-[30px] w-[30px] leading-[9px] rounded-[100%] p-2"
                >
                  +
                </button>
              </div>
            )}
            {is_logged ? (
              !is_liked(product.id) ? (
                <div
                  onClick={() => addToFav()}
                  className="h-[50px] cursor-pointer w-[50px] flex items-center justify-center rounded-[16px] bg-neutral-300 ml-4"
                >
                  <FavoriteBorder className="text-neutral-900" />
                </div>
              ) : (
                <div
                  onClick={() => addToFav()}
                  className="h-[50px] cursor-pointer w-[50px] flex items-center justify-center rounded-[16px] bg-neutral-300 ml-4"
                >
                  <Favorite className=" text-red" />
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
