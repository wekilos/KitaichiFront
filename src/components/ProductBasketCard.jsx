import React, { useContext, useEffect, useState } from "react";
import card from "../images/card.png";
import { ExpandMore, Favorite, FavoriteBorder } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import marketImg from "../images/Store.png";
import trash from "../images/trash.svg";
import BasketCard from "./BasketCard";

import img6 from "../images/Image6.svg";
import img7 from "../images/Image7.svg";
import img8 from "../images/Image8.svg";
import img14 from "../images/Image14.svg";
import img15 from "../images/Image15.svg";

import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";
import { BASE_URL } from "../utils/axiosIntance";

function ProductBasketCard(props) {
  const history = useHistory();
  const [animation, setAnimation] = useState(false);
  const [count, setCount] = useState(1);
  const { dil } = useContext(Context);

  useEffect(() => {
    const time = setTimeout(() => {
      setAnimation(false);
    }, 2000);
    return () => clearTimeout(time);
  }, [animation]);

  let umumy = 0;
  let discount = 0;
  props.data?.products?.map((pro) => {
    umumy = umumy + pro.quantity * pro.pro.price;
    if (!pro.pro.is_discount) {
      discount =
        discount + (pro.pro.price - pro.pro.discount_price) * pro.quantity;
    }
  });

  return (
    <div className="w-full mb-6 p-4 rounded-[16px] border-[1px] border-neutral-300 shadow-sm">
      <div className="w-full rounded-[16px]">
        <Accordion
          defaultExpanded={true}
          style={{
            borderRadius: "16px",
            border: "none",
            boxShadow: "none",
          }}
        >
          <AccordionSummary
            style={{
              borderRadius: "16px",
              backgroundColor: "#F4F4F6",
              padding: "16px",
            }}
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="w-full flex  justify-between ">
              <div className="flex pl-4 items-center">
                <img
                  className="h-[45px] w-[45px] rounded-[12px] object-cover mr-2"
                  src={BASE_URL + props?.data?.img}
                  alt="Market"
                />
                <h1 className="text-[18px] font-semi text-neutral-900">
                  {props?.data?.name}
                </h1>
              </div>
              <div className="text-[18px] hidden  md2:block sum relative self-center mr-4 underline font-semi text-neutral-900">
                {dil === "TM" ? tm.Jemi : dil === "RU" ? ru.Jemi : en.Jemi}:{" "}
                {(umumy - discount).toFixed(2) + " "}
                TMT
                {
                  <div className="w-[250px] z-10 detail hidden absolute top-[55px] -right-[55px] bg-white  rounded-[16px] border-[1px] border-neutral-300 p-4 shadow-sm">
                    <h1 className="w-full text-[20px] font-semi text-black-secondary border-b-[1px] border-b-neutral-300 py-2">
                      {dil === "TM"
                        ? tm["Sargyt barada"]
                        : dil === "RU"
                        ? ru["Sargyt barada"]
                        : en["Sargyt barada"]}
                    </h1>
                    <div className="w-full border-b-[1px] border-b-neutral-300 py-2 ">
                      <div className="w-full flex justify-between py-2">
                        <p className="text-[16px] font-medium text-black-secondary">
                          {dil === "TM"
                            ? tm.Umumy
                            : dil === "RU"
                            ? ru.Umumy
                            : en.Umumy}
                          :
                        </p>
                        <p className="text-[16px] font-medium text-black-secondary">
                          {umumy.toFixed(2)} TMT
                        </p>
                      </div>

                      <div className="w-full flex justify-between py-2">
                        <p className="text-[16px] font-medium text-red">
                          {dil === "TM"
                            ? tm.Arzanladyş
                            : dil === "RU"
                            ? ru.Arzanladyş
                            : en.Arzanladyş}
                          :
                        </p>
                        <p className="text-[16px] font-medium text-red">
                          -{discount.toFixed(2)} TMT
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex justify-between py-4">
                      <p className="text-[18px] font-semi text-black-secondary">
                        {dil === "TM"
                          ? tm.Jemi
                          : dil === "RU"
                          ? ru.Jemi
                          : en.Jemi}
                        :
                      </p>
                      <p className="text-[18px] font-semi text-black-secondary">
                        {(umumy - discount).toFixed(2)} TMT
                      </p>
                    </div>
                  </div>
                }
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {props?.data?.products?.map((item, i) => {
              return (
                <BasketCard
                  data={item}
                  text={item.name}
                  img={item?.pro?.img.length > 0 && item?.pro?.img[0]?.img}
                />
              );
            })}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default ProductBasketCard;
