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
import ProductDetail from "../../components/ProductDetail";

import img6 from "../../images/Image6.svg";
import img7 from "../../images/Image7.svg";
import img8 from "../../images/Image8.svg";
import img14 from "../../images/Image14.svg";
import img15 from "../../images/Image15.svg";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosIntance";

const Product = () => {
  const { dil } = useContext(Context);
  const { id } = useParams();
  const [sameproduct, setSameProduct] = useState([]);
  const history = useHistory();
  const kop = [
    {
      name: "Maýonez Nur Näzli 30% 800 g",
      img: img6,
    },
    {
      name: "Ketçup Mr.Ricco Grill Menu Towuk karri üçin 350 gr",
      img: img7,
    },
    {
      name: "Limon sousy Arslan Küpü 500 ml",
      img: img8,
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
      name: "Maýonez Nur Näzli 30% 800 g",
      img: img6,
    },
    {
      name: "Ketçup Mr.Ricco Grill Menu Towuk karri üçin 350 gr",
      img: img7,
    },
    {
      name: "Limon sousy Arslan Küpü 500 ml",
      img: img8,
    },
    {
      name: "Batonçiik şokoladly Twix Extra kökeler we karamel bilen 82 gr",
      img: img14,
    },
    {
      name: "Şokoladly batonçik Bounty Trio süýt şokolady bilen örtülen",
      img: img15,
    },
  ];

  useEffect(() => {
    getSamePro();
  }, [id, dil]);
  const getSamePro = () => {
    axiosInstance
      .get("/api/grocery_same_products", {
        params: {
          lang: dil,
          product_id: id,
          limit: 9999,
        },
      })
      .then((data) => {
        console.log(data.data.body);
        setSameProduct(data.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full inline-flex justify-between pb-10 select-none">
      <div className="w-full ">
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
          <p className="text-[16px] font-regular text-black-secondary mr-2">
            {dil === "TM"
              ? tm.Kategoriýa
              : dil === "RU"
              ? ru.Kategoriýa
              : en.Kategoriýa}
          </p>
          <ArrowForwardIos className="!text-[16px]  font-regular text-black-secondary mr-2" />
          <p className="text-[16px] font-regular text-black-secondary mr-2">
            Kategoriýa bölümi
          </p>
          <ArrowForwardIos className="!text-[16px]  font-regular text-black-secondary mr-2" />
          <p className="text-[16px] font-regular text-black-secondary mr-2">
            Haryt ady
          </p>
        </div>
        <div className="w-full md2:my-8">
          <ProductDetail />
        </div>
        {sameproduct?.length>0?(        <div className="w-full mt-10 mb-6 flex justify-between  items-center">
          <div className="flex justify-start">
            <p className="text-[28px] font-bold text-neutral-900 mr-2">
              {dil === "TM"
                ? tm["Meňzeş harytlar"]
                : dil === "RU"
                ? ru["Meňzeş harytlar"]
                : en["Meňzeş harytlar"]}
            </p>
          </div>
          <div className="border-[1px] md2:block hidden border-[#E9EAEE] text-[#1D965C] cursor-pointer py-[5px] px-[12px] rounded-[24px] text-[16px] font-semi">
            {dil === "TM"
              ? tm["Hemmesini görkez"]
              : dil === "RU"
              ? ru["Hemmesini görkez"]
              : en["Hemmesini görkez"]}
          </div>
        </div>
):null}
        <div className="w-full inline-flex scrollbar-hide justify-between overflow-y-auto">
          {sameproduct?.map((item, i) => {
            return (
              <div key={item.name + i} className="mr-4">
                <ProductCard
                  data={item}
                  text={item.name}
                  img={item?.img[0].img}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
