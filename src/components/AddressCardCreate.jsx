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

import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";
import { axiosInstance } from "../utils/axiosIntance";

const AddressCardCreate = (props) => {
  const [add, setAdd] = useState(false);
  const { dil } = useContext(Context);
  const [address, setAddress] = useState({ title: "", address: "" });

  var data = JSON.parse(localStorage.getItem("userData"));

  const createUserAddress = () => {
    if (data?.id !== undefined)
      axiosInstance
        .post("/api/address/create", {
          address: address.address,
          title: address.title,
          UserId: data.id,
        })
        .then((data) => {
          console.log(data.data);
          setAdd(false);
          props.getData();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  return (
    <div className="md2:w-full w-full">
      <Modal
        className="font-roboto p-8"
        width={650}
        open={add}
        onCancel={() => setAdd(false)}
        footer={false}
      >
        <h1 className="text-[28px] mb-4 font-bold text-neutral-900 text-left ">
          {dil === "TM"
            ? tm["Salgyny girizmek"]
            : dil === "RU"
            ? ru["Salgyny girizmek"]
            : en["Salgyny girizmek"]}
        </h1>

        <div className="w-full flex justify-between flex-wrap">
          <input
            onChange={(e) => setAddress({ ...address, title: e.target.value })}
            value={address.title}
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
            onChange={(e) =>
              setAddress({ ...address, address: e.target.value })
            }
            value={address.address}
            className="w-full text-[16px] mb-4 p-4 outline-none font-regular bg-neutral-200 rounded-[8px] text-neutral-600 text-left"
            placeholder={
              dil === "TM" ? tm.Salgy : dil === "RU" ? ru.Salgy : en.Salgy
            }
            type="text"
          />
        </div>
        <button
          onClick={() => createUserAddress()}
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
        onClick={() => setAdd(true)}
        className="w-full mb-4 cursor-pointer bg-green-100 rounded-[8px] h-[65px] flex items-center justify-center text-green text-[16px] font-bold"
      >
        <AddOutlined className="mr-2 rounded-[8px] bg-green-200 text-[14px]" />
        {dil === "TM"
          ? tm["Täze salgyny goşmak"]
          : dil === "RU"
          ? ru["Täze salgyny goşmak"]
          : en["Täze salgyny goşmak"]}
      </div>
    </div>
  );
};

export default AddressCardCreate;
