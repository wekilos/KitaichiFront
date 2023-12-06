import React, { useContext, useState } from "react";
import box from "../images/box.svg";
import boxgreen from "../images/boxgreen.svg";
import location from "../images/location.svg";
import locationgreen from "../images/locationgreen.svg";
import heart from "../images/heart.svg";
import heartgreen from "../images/heartgreen.svg";
import profileCircle from "../images/profile-circle.svg";
import profileCirclegreen from "../images/profile-circlegreen.svg";
import logoutimg from "../images/logout.svg";
import trash from "../images/trash.svg";
import { useHistory, useLocation } from "react-router-dom";
import { Modal } from "antd";

import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";

const Sidebar = (props) => {
  const history = useHistory();
  const path = useLocation();
  const [open, setOpen] = useState(false);
  const [deleteAc, setDeleteAc] = useState(false);
  const { dil } = useContext(Context);
  return (
    <div className="w-full  ">
      <Modal
        className="font-roboto rounded-[32px] p-8"
        width={500}
        open={open}
        onCancel={() => setOpen(false)}
        footer={false}
      >
        <h1 className="text-[28px] mb-4 font-bold text-neutral-900 text-center ">
          {dil === "TM"
            ? tm["Siz ulgamdan çykmak isleýärsiňizmi?"]
            : dil === "RU"
            ? ru["Siz ulgamdan çykmak isleýärsiňizmi?"]
            : en["Siz ulgamdan çykmak isleýärsiňizmi?"]}
        </h1>
        <button
          onClick={() => history.push({ pathname: "/first" })}
          className="h-[50px] mb-4 w-full bg-red rounded-[8px] text-white text-[16px] font-semi"
        >
          {dil === "TM"
            ? tm["Ulgamdan çykmak"]
            : dil === "RU"
            ? ru["Ulgamdan çykmak"]
            : en["Ulgamdan çykmak"]}
        </button>
        <button
          onClick={() => setOpen(false)}
          className="h-[50px] w-full bg-green rounded-[8px] text-white text-[16px] font-semi"
        >
          {dil === "TM"
            ? tm["Yza gaýt"]
            : dil === "RU"
            ? ru["Yza gaýt"]
            : en["Yza gaýt"]}
        </button>
      </Modal>
      <Modal
        className="font-roboto rounded-[32px] p-8"
        width={640}
        open={deleteAc}
        onCancel={() => setDeleteAc(false)}
        footer={false}
      >
        <h1 className="text-[28px] mb-4 font-bold text-neutral-900 text-left ">
          {dil === "TM"
            ? tm["Hasaby Öçürmek"]
            : dil === "RU"
            ? ru["Hasaby Öçürmek"]
            : en["Hasaby Öçürmek"]}
        </h1>
        <p className="text-[16px] mb-4 font-regular text-neutral-800 text-left ">
          {dil === "TM"
            ? tm["Hasabyňyzy Öçürmek üçin aşakdaky öýjüge"]
            : dil === "RU"
            ? ru["Hasabyňyzy Öçürmek üçin aşakdaky öýjüge"]
            : en["Hasabyňyzy Öçürmek üçin aşakdaky öýjüge"]}
          <b className="!font-bold !text-red">
            {dil === "TM" ? tm.Öçürmek : dil === "RU" ? ru.Öçürmek : en.Öçürmek}
          </b>
          {dil === "TM"
            ? tm["diýip ýazyn we tassyklaň"]
            : dil === "RU"
            ? ru["diýip ýazyn we tassyklaň"]
            : en["diýip ýazyn we tassyklaň"]}
        </p>
        <input
          placeholder={
            dil === "TM"
              ? tm["Şu ýere ýazyň"]
              : dil === "RU"
              ? ru["Şu ýere ýazyň"]
              : en["Şu ýere ýazyň"]
          }
          type="text"
          className="h-[50px] mb-4 w-full bg-neutral-200 outline-none p-4 rounded-[8px] text-neutral-600 text-[16px] font-regular"
        />
        <div className="w-full flex justify-between">
          <button
            onClick={() => setDeleteAc(false)}
            className="h-[50px] w-[49%] bg-green-100 rounded-[8px] text-green text-[16px] font-semi"
          >
            {dil === "TM"
              ? tm["Yza gaýt"]
              : dil === "RU"
              ? ru["Yza gaýt"]
              : en["Yza gaýt"]}
          </button>
          <button className="h-[50px] mb-4 w-[49%] bg-red rounded-[8px] text-white text-[16px] font-semi">
            {dil === "TM"
              ? tm["Hasaby Öçürmek"]
              : dil === "RU"
              ? ru["Hasaby Öçürmek"]
              : en["Hasaby Öçürmek"]}
          </button>
        </div>
      </Modal>
      <div className="w-full rounded-[8px] py-2 px-4 border-[1px] border-neutral-300 shadow-sm">
        <div
          onClick={() => history.push({ pathname: "/rtn/profile/orders" })}
          className="w-full cursor-pointer flex py-3 border-b-[1px] border-b-neutral-300"
        >
          <img
            className="mr-2 "
            src={path.pathname.match("/rtn/profile/orders") ? boxgreen : box}
            alt="box"
          />
          <p
            className={
              path.pathname.match("/rtn/profile/orders")
                ? " text-green font-semi text-[18px]"
                : "text-[18px] text-neutral-900 font-semi "
            }
          >
            {dil === "TM"
              ? tm.Sargytlarym
              : dil === "RU"
              ? ru.Sargytlarym
              : en.Sargytlarym}
          </p>
        </div>
        <div
          onClick={() => history.push({ pathname: "/rtn/profile/address" })}
          className="w-full cursor-pointer flex py-3 border-b-[1px] border-b-neutral-300"
        >
          <img
            className="mr-2"
            src={
              path.pathname.match("/rtn/profile/address")
                ? locationgreen
                : location
            }
            alt="box"
          />
          <p
            className={
              path.pathname.match("/rtn/profile/address")
                ? " text-green font-semi text-[18px]"
                : "text-[18px] text-neutral-900 font-semi "
            }
          >
            {dil === "TM"
              ? tm.Salgylarym
              : dil === "RU"
              ? ru.Salgylarym
              : en.Salgylarym}
          </p>
        </div>
        <div
          onClick={() => history.push({ pathname: "/rtn/profile/favorites" })}
          className="w-full cursor-pointer flex py-3 border-b-[1px] border-b-neutral-300"
        >
          <img
            className="mr-2"
            src={
              path.pathname.match("/rtn/profile/favorites") ? heartgreen : heart
            }
            alt="box"
          />
          <p
            className={
              path.pathname.match("/rtn/profile/favorites")
                ? " text-green font-semi text-[18px]"
                : "text-[18px] text-neutral-900 font-semi "
            }
          >
            {dil === "TM"
              ? tm.Halanlarym
              : dil === "RU"
              ? ru.Halanlarym
              : en.Halanlarym}
          </p>
        </div>
        <div
          onClick={() => history.push({ pathname: "/rtn/profile/info" })}
          className="w-full cursor-pointer flex py-3  "
        >
          <img
            className="mr-2"
            src={
              path.pathname.match("/rtn/profile/info")
                ? profileCirclegreen
                : profileCircle
            }
            alt="box"
          />
          <p
            className={
              path.pathname.match("/rtn/profile/info")
                ? " text-green font-semi text-[18px]"
                : "text-[18px] text-neutral-900 font-semi "
            }
          >
            {dil === "TM" ? tm.Hasabym : dil === "RU" ? ru.Hasabym : en.Hasabym}
          </p>
        </div>
      </div>
      <div className="w-full rounded-[8px] py-2 px-4 mt-4 border-[1px] border-neutral-300 shadow-sm">
        <div
          onClick={() => setOpen(true)}
          className="w-full cursor-pointer flex py-3 border-b-[1px] border-b-neutral-300"
        >
          <img className="mr-2 !text-green" src={logoutimg} alt="box" />
          <p className="text-[18px] text-neutral-900 font-semi">
            {dil === "TM"
              ? tm["Ulgamdan çykmak"]
              : dil === "RU"
              ? ru["Ulgamdan çykmak"]
              : en["Ulgamdan çykmak"]}
          </p>
        </div>
        <div
          onClick={() => setDeleteAc(true)}
          className="w-full cursor-pointer flex py-3  "
        >
          <img className="mr-2" src={trash} alt="box" />
          <p className="text-[18px] text-red font-semi">
            {dil === "TM"
              ? tm["Hasaby Öçürmek"]
              : dil === "RU"
              ? ru["Hasaby Öçürmek"]
              : en["Hasaby Öçürmek"]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
