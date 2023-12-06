import React, { useContext, useEffect, useState } from "react";
import card from "../images/card.png";
import {
  ExpandMore,
  StarOutlined,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Modal } from "antd";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import marketImg from "../images/Store.png";
import OrderCard from "./OrderCard";
import star from "../images/feedStar.svg";

import nahar1 from "../images/nahar1.jpg";
import nahar2 from "../images/nahar2.jpg";
import nahar3 from "../images/nahar3.jpg";
import nahar4 from "../images/nahar4.jpg";
import nahar5 from "../images/nahar5.jpg";
import nahar6 from "../images/nahar6.jpg";
import nahar7 from "../images/nahar7.jpg";

import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";

function ProductOrderCard(props) {
  const history = useHistory();
  const [openStar, setOpenStar] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [count, setCount] = useState(1);
  const { dil } = useContext(Context);
  useEffect(() => {
    const time = setTimeout(() => {
      setAnimation(false);
    }, 2000);
    return () => clearTimeout(time);
  }, [animation]);

  const naharlar = [
    {
      name: "Gowurdakly ýumurtga",
      img: nahar1,
    },
    {
      name: "Saçda ýumurtga",
      img: nahar2,
    },
    {
      name: "Toplumly ertirlik",
      img: nahar3,
    },
    {
      name: "Wetçina we peýnirli sendwiç",
      img: nahar4,
    },
    {
      name: " Çopan gowurma",
      img: nahar5,
    },
    {
      name: "Kombo fahitos",
      img: nahar6,
    },
    {
      name: "Saç gowurma",
      img: nahar7,
    },
  ];

  return (
    <div className="w-full p-4 rounded-[16px] border-[1px] border-neutral-300 shadow-sm">
      <Modal
        className="font-roboto p-8 "
        width={650}
        open={openStar}
        onCancel={() => setOpenStar(false)}
        footer={false}
      >
        <h1 className="text-[28px] mb-2 font-bold text-neutral-900 text-left ">
          {dil === "TM"
            ? tm["Baha bermek"]
            : dil === "RU"
            ? ru["Baha bermek"]
            : en["Baha bermek"]}
        </h1>

        <div className="w-full overflow-y-auto max-h-[470px]">
          <div className="w-full mb-2 py-2 ">
            <h1 className="w-full text-left text-[16px] text-neutral-800 font-semi">
              {dil === "TM"
                ? tm[
                    "Harytlara ýa-da dükanyň hyzmaty barada pikirleriňizi galdyryň"
                  ]
                : dil === "RU"
                ? ru["Оставьте свой отзыв о товарах или услугах магазина"]
                : en["Оставьте свой отзыв о товарах или услугах магазина"]}
            </h1>

            <div className="flex my-2">
              <div className="flex cursor-pointer">
                <StarOutlined className="text-yellow !text-[32px]" />
                <StarOutlined className="text-yellow !text-[32px]" />
                <StarOutlined className="text-yellow !text-[32px]" />
                <StarOutlined className="text-yellow !text-[32px]" />
                <StarOutlined className="text-neutral-400 !text-[32px]" />
              </div>
            </div>

            <textarea
              placeholder={
                dil === "TM"
                  ? tm.Hatyñyz
                  : dil === "RU"
                  ? ru.Hatyñyz
                  : en.Hatyñyz
              }
              className="w-full h-[200px] text-left text-[16px] bg-neutral-200 text-neutral-900 font-semi rounded-[8px] outline-none p-4"
              type="text"
            />
            <button
              onClick={() => setOpenStar(false)}
              className="h-[50px] w-full mt-2 bg-green rounded-[9px] text-white text-[16px] font-semi"
            >
              {dil === "TM"
                ? tm.Ugratmak
                : dil === "RU"
                ? ru.Ugratmak
                : en.Ugratmak}
            </button>
          </div>
        </div>
      </Modal>

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
                  src={marketImg}
                  alt="Market"
                />
                <h1 className="text-[18px] font-semi text-neutral-900">
                  Soltan Restoran
                </h1>
              </div>
              <div className="flex items-center">
                <div
                  className="flex items-center"
                  onClick={() => setOpenStar(true)}
                >
                  {/* <StarOutlineOutlinedIcon className="text-[16px] mr-2 no-underline text-yellow-700 font-semi" /> */}
                  <img
                    className="h-5 mr-2 object-contain"
                    src={star}
                    alt="star"
                  />
                  <span className="text-[16px] mr-6 no-underline text-yellow-700 font-semi">
                    {dil === "TM"
                      ? tm["Baha bermek"]
                      : dil === "RU"
                      ? ru["Baha bermek"]
                      : en["Baha bermek"]}
                  </span>
                </div>
                <div className="text-[18px] underline sum relative self-center mr-4  font-semi text-neutral-900">
                  {dil === "TM" ? tm.Jemi : dil === "RU" ? ru.Jemi : en.Jemi}:
                  242 TMT
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
                        <p className="text-[16px] font-semi text-black-secondary">
                          {dil === "TM"
                            ? tm.Umumy
                            : dil === "RU"
                            ? ru.Umumy
                            : en.Umumy}
                          :
                        </p>
                        <p className="text-[16px] font-semi text-black-secondary">
                          232351 TMT
                        </p>
                      </div>

                      <div className="w-full flex justify-between py-2">
                        <p className="text-[16px] font-semi text-red">
                          {dil === "TM"
                            ? tm.Arzanladyş
                            : dil === "RU"
                            ? ru.Arzanladyş
                            : en.Arzanladyş}
                          :
                        </p>
                        <p className="text-[16px] font-semi text-red">
                          -120 TMT
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
                        156 TMT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {naharlar.map((item) => {
              return <OrderCard text={item.name} img={item.img} />;
            })}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default ProductOrderCard;
