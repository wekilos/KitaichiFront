import { ArrowForwardIos } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../componentsFood/SideBar";
import carta from "../../images/carta.svg";

import { Modal } from "antd";
import AddressCard from "../../components/AddressCard";
import AddressCardCreate from "../../components/AddressCardCreate";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosIntance";

const Address = () => {
  const [wich, setWich] = useState(true);
  const { dil } = useContext(Context);
  const history = useHistory();
  const [add, setAdd] = useState(false);
  const [addresses, setAddresses] = useState([]);

  var data = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    getAddress();
  }, []);
  const getAddress = () => {
    if (data?.id !== undefined)
      axiosInstance
        .get("/api/address/all", {
          params: { UserId: data.id },
        })
        .then((data) => {
          console.log("adddress", data.data);
          setAddresses(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  return (
    <div className="w-full pb-10">
      <Modal
        className="p-8 font-roboto"
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

        <div className="flex flex-wrap justify-between w-full">
          <input
            className="w-[85%] text-[16px] mb-4 p-4 outline-none font-regular bg-neutral-200 rounded-[8px] text-neutral-600 text-left"
            placeholder={
              dil === "TM"
                ? tm["Salgyñyzyn ady, Mysal öy"]
                : dil === "RU"
                ? ru["Salgyñyzyn ady, Mysal öy"]
                : en["Salgyñyzyn ady, Mysal öy"]
            }
            type="text"
          />
          <div className="w-[55px] text-[16px] mb-4 p-4 outline-none font-regular bg-neutral-200 rounded-[8px] text-neutral-600 text-left">
            <img src={carta} alt="carta" />
          </div>
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
      <div className="flex items-center w-full">
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
            ? tm.Salgylarym
            : dil === "RU"
            ? ru.Salgylarym
            : en.Salgylarym}
        </p>
      </div>
      <div className="flex items-center justify-between w-full my-4">
        <div className="flex justify-start">
          <p className="text-[28px] font-bold text-neutral-900 mr-2">
            {dil === "TM"
              ? tm.Salgylarym
              : dil === "RU"
              ? ru.Salgylarym
              : en.Salgylarym}
          </p>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="min-w-[246px] lg:block hidden w-[246px] h-fit">
          <Sidebar />
        </div>
        <div className="flex flex-wrap justify-between w-full h-fit lg:px-6">
          {addresses &&
            addresses.length > 0 &&
            addresses?.map((item, i) => {
              return (
                <div key={"add" + i} className="md2:w-[49%] w-full">
                  <AddressCard getData={getAddress} data={item} />
                </div>
              );
            })}
          {/* <div
                        onClick={() => setAdd(true)}
                        className="w-[49%] mb-4 cursor-pointer bg-green-100 rounded-[8px] h-[65px] flex items-center justify-center text-green text-[16px] font-bold"
                    >
                        <AddOutlined className="mr-2 rounded-[8px] bg-green-200 text-[14px]" />
                        Täze adres goşmak
                    </div> */}
          <div className="md2:w-[49%] w-full">
            <AddressCardCreate getData={getAddress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
