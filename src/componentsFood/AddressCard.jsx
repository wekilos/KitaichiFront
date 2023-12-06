import { Modal } from "antd";
import React, { useContext, useState } from "react";
import {
  DoNotDisturbOnOutlined,
  RefreshOutlined,
  StarBorderOutlined,
  WhereToVoteOutlined,
  AddOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import carta from "../images/carta.svg";
import { Context } from "../context/context";

import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";

const AddressCard = (props) => {
  const [add, setAdd] = useState(false);
  const { dil } = useContext(Context);
  return (
    <div className="w-full select-none">
      <Modal
        className="font-roboto p-8"
        width={650}
        open={add}
        onCancel={() => setAdd(false)}
        footer={false}
      >
        <h1
          className={`text-[28px] mb-4 font-bold text-neutral-900 text-left `}
        >
          {dil === "TM"
            ? tm["Salgyny girizmek"]
            : dil === "RU"
            ? ru["Salgyny girizmek"]
            : en["Salgyny girizmek"]}
        </h1>

        <div className="w-full flex justify-between flex-wrap">
          <input
            className="w-full text-[16px] mb-4 p-4 outline-none font-regular bg-neutral-200 rounded-[8px] text-neutral-600 text-left"
            placeholder={
              dil === "TM"
                ? tm["Salgyñyzyn ady, Mysal öy"]
                : dil === "RU"
                ? ru["Salgyñyzyn ady, Mysal öy"]
                : en["Salgyñyzyn ady, Mysal öy"]
            }
            type="text"
          />
          {/* <div className="w-[55px] text-[16px] mb-4 p-4 outline-none font-regular bg-neutral-200 rounded-[8px] text-neutral-600 text-left">
            <img src={carta} alt="carta" />
          </div> */}
          <input
            className="w-full text-[16px] mb-4 p-4 outline-none font-regular bg-neutral-200 rounded-[8px] text-neutral-600 text-left"
            placeholder={
              dil === "TM" ? tm.Salgy : dil === "RU" ? ru.Salgy : en.Salgy
            }
            type="text"
          />
        </div>
        <button
          onClick={() => setAdd(false)}
          className="h-[50px] w-full bg-green rounded-[9px] text-white text-[16px] font-semi"
        >
          {dil === "TM"
            ? tm.Ugratmak
            : dil === "RU"
            ? ru.Ugratmak
            : en.Ugratmak}
        </button>
      </Modal>
      <div
        onClick={() => {
          props?.open ? setAdd(false) : setAdd(true);
        }}
        className={` ${props.bg} w-full mb-4 relative cursor-pointer bg-neutral-200 rounded-[8px] h-[65px] flex items-center justify-start px-2 text-green text-[16px] font-bold`}
      >
        <WhereToVoteOutlined
          className={`${props.text} mr-2 absolute top-2 left-2 text-neutral-700 text-[14px]`}
        />
        <div className="w-full ml-8">
          <h1
            className={`${props.text}  text-[18px] text-neutral-900 font-semi`}
          >
            Ejemiň öýi
          </h1>
          <p
            className={`${props.text} text-[16px] text-neutral-700 font-medium`}
          >
            Nurmuhammet andalyp köçe, Jaý 88, Kwartira 16
          </p>
        </div>
        {props.arrow !== false && (
          <ArrowForwardIosOutlined
            className={`mr-2 absolute top-5 right-2 text-neutral-700 text-[18px]`}
          />
        )}
      </div>
    </div>
  );
};

export default AddressCard;
