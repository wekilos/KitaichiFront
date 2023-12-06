import { ArrowForwardIos } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../componentsFood/SideBar";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosIntance";

const Info = () => {
  const [wich, setWich] = useState(true);
  const { dil } = useContext(Context);
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    var data = JSON.parse(localStorage.getItem("userData"));
    axiosInstance
      .get(`api/user/${data?.id ? data?.id : 1}`)
      .then((data) => {
        console.log(data.data);
        setUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUserInfo = () => {
    axiosInstance
      .patch("/api/user/update", user)
      .then((data) => {
        console.log(data.data);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full pb-10">
      <div className="w-full flex items-center">
        <p
          onClick={() => history.push({ pathname: "/rtn/home" })}
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
          {dil === "TM" ? tm.Hasabym : dil === "RU" ? ru.Hasabym : en.Hasabym}
        </p>
      </div>
      <div className="w-full my-4 flex justify-between  items-center">
        <div className="flex justify-start">
          <p className="text-[28px] font-bold text-neutral-900 mr-2">
            {dil === "TM" ? tm.Hasabym : dil === "RU" ? ru.Hasabym : en.Hasabym}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className="min-w-[246px]  lg:block hidden w-[246px] h-fit">
          <Sidebar />
        </div>
        <div className="w-full lg:px-6">
          <div className="w-full text-left  text-black text-[18px] font-semi">
            {dil === "TM"
              ? tm["Esasy maglumatlar"]
              : dil === "RU"
              ? ru["Esasy maglumatlar"]
              : en["Esasy maglumatlar"]}
          </div>

          <div className="w-full mt-4 flex justify-between flex-wrap">
            <input
              className="h-[48px] text-[16px] font-semi text-neutral-900 select-none outline-none w-[49%] px-4 rounded-[8px] bg-neutral-200 mb-4"
              value={user?.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <input
              className="h-[48px] text-[16px] font-semi text-neutral-900 select-none outline-none w-[49%] px-4 rounded-[8px] bg-neutral-200 mb-4"
              value={user?.lastname}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            />
            <input
              readOnly
              className="h-[48px] text-[16px] font-medium text-neutral-600 select-none outline-none w-[49%] px-4 rounded-[8px] bg-neutral-200 mb-4"
              type="text"
              defaultValue={user?.birthday?.slice(0, 10)}
            />
            <input
              readOnly
              className="h-[48px] text-[16px] font-medium text-neutral-600 select-none w-[49%] outline-none px-4 rounded-[8px] bg-neutral-200 mb-4"
              value={user?.phone_number}
            />
          </div>
          <div className="w-full mt-4 flex justify-start">
            <button
              onClick={() => updateUserInfo()}
              className="h-[48px] text-[16px] mr-4 font-semi text-white select-none  w-[175px] px-4 rounded-[16px] bg-green mb-4"
            >
              {dil === "TM"
                ? tm["Ýatda saklamak"]
                : dil === "RU"
                ? ru["Ýatda saklamak"]
                : en["Ýatda saklamak"]}
            </button>
            <button className="h-[48px] text-[16px] font-semi text-white select-none  w-[175px] px-4 rounded-[16px] bg-red mb-4">
              {dil === "TM"
                ? tm["Yza gaýt"]
                : dil === "RU"
                ? ru["Yza gaýt"]
                : en["Yza gaýt"]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
