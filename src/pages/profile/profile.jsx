import { ArrowForwardIos, Timer3 } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import card from "../../images/card.png";
import timer1 from "../../images/timer1.svg";
import timer2 from "../../images/timer2.svg";
import timer3 from "../../images/timer3.svg";
import timer4 from "../../images/timer4.svg";

import { useHistory, useLocation } from "react-router-dom";
import { Modal, message } from "antd";
import img6 from "../../images/Image6.svg";
import img7 from "../../images/Image7.svg";
import img8 from "../../images/Image8.svg";
import img14 from "../../images/Image14.svg";
import img15 from "../../images/Image15.svg";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { BASE_URL, axiosInstance } from "../../utils/axiosIntance";

import menu from "../../images/menu.svg";
import mainMenu from "../../images/mainMenu.svg";
import orderBox from "../../images/orderBox.svg";
import location from "../../images/location-tick.svg";
import heartMenu from "../../images/heartMenu.svg";
import global from "../../images/global.svg";
import logout from "../../images/logout.svg";
import trash from "../../images/trash.png";

const Profile = () => {
  const [wich, setWich] = useState(true);
  const { dil } = useContext(Context);
  const [user, setUser] = useState({});
  const history = useHistory();
  const path = useLocation();
  const [open, setOpen] = useState(false);
  const [inp, setInp] = useState("");
  const [deleteAc, setDeleteAc] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    var data = JSON.parse(localStorage.getItem("userData"));
    // setUser(data);
    axiosInstance
      .get("/api/user/" + data?.id ? data?.id : 1)
      .then((data) => {
        console.log(data.data);
        setUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeletUser = () => {
    inp == tm.Öçürmek || inp == ru.Öçürmek || inp == en.Öçürmek
      ? axiosInstance
          .patch("/api/user/disActive/" + 1)
          .then((data) => {
            console.log(data.data);
            history.push({ pathname: "/mrt/home" });
          })
          .catch((err) => {
            console.log(err);
          })
      : message.warning(
          dil === "TM"
            ? tm.Öçürmek
            : dil === "RU"
            ? ru.Öçürmek
            : en.Öçürmek + inp
        );
  };
  return (
    <div className=" w-full">
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
          onChange={(e) => setInp(e.target.value)}
          value={inp}
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
          <button
            onClick={() => DeletUser()}
            className="h-[50px] mb-4 w-[49%] bg-red rounded-[8px] text-white text-[16px] font-semi"
          >
            {dil === "TM"
              ? tm["Hasaby Öçürmek"]
              : dil === "RU"
              ? ru["Hasaby Öçürmek"]
              : en["Hasaby Öçürmek"]}
          </button>
        </div>
      </Modal>

      <div
        onClick={() => history.push({ pathname: "/mrt/profile/info" })}
        className="w-full"
      >
        <h1 className="w-full text-neutral-900 font-bold text-[24px]">
          Aman Amonow
        </h1>
        <p className="w-full text-neutral-700 font-semi text-[16px]">
          +993 64 75 48 46
        </p>
      </div>
      <div className="w-full mt-[70px]">
        <div
          onClick={() => history.push({ pathname: "/mrt/home" })}
          className="w-full flex mb-6"
        >
          <img className="mr-2" src={mainMenu} alt="" />
          <h1 className="text-[18px] text-neutral-800 font-regular">
            {dil === "TM"
              ? tm["Baş sahypa"]
              : dil === "RU"
              ? ru["Baş sahypa"]
              : en["Baş sahypa"]}
          </h1>
        </div>

        <div
          onClick={() => history.push({ pathname: "/mrt/profile/orders" })}
          className="w-full flex mb-6"
        >
          <img className="mr-2" src={orderBox} alt="" />
          <h1 className="text-[18px] text-neutral-800 font-regular">
            {dil === "TM"
              ? tm.Sargytlar
              : dil === "RU"
              ? ru.Sargytlar
              : en.Sargytlar}
          </h1>
        </div>

        <div
          onClick={() => history.push({ pathname: "/mrt/profile/address" })}
          className="w-full flex mb-6"
        >
          <img className="mr-2" src={location} alt="" />
          <h1 className="text-[18px] text-neutral-800 font-regular">
            {dil === "TM"
              ? tm.Salgylarym
              : dil === "RU"
              ? ru.Salgylarym
              : en.Salgylarym}
          </h1>
        </div>

        <div
          onClick={() => history.push({ pathname: "/mrt/profile/favorites" })}
          className="w-full flex mb-6"
        >
          <img className="mr-2" src={heartMenu} alt="" />
          <h1 className="text-[18px] text-neutral-800 font-regular">
            {dil === "TM"
              ? tm.Halanlarym
              : dil === "RU"
              ? ru.Halanlarym
              : en.Halanlarym}
          </h1>
        </div>

        <div className="w-full flex mb-6">
          <img className="mr-2" src={global} alt="" />
          <h1 className="text-[18px] text-neutral-800 font-regular">
            {dil === "TM" ? "Türkmen" : dil === "RU" ? "Русский" : "English"}
          </h1>
        </div>
      </div>

      <div onClick={() => setOpen(true)} className="w-full flex mb-6 mt-16">
        <img className="mr-2" src={logout} alt="" />
        <h1 className="text-[18px] text-neutral-800 font-regular">
          {dil === "TM"
            ? tm["Ulgamdan çykmak"]
            : dil === "RU"
            ? ru["Ulgamdan çykmak"]
            : en["Ulgamdan çykmak"]}
        </h1>
      </div>

      <div onClick={() => setDeleteAc(true)} className="w-full flex mb-6 mt-16">
        <img className="mr-2" src={trash} alt="" />
        <h1 className="text-[18px] text-red font-regular">
          {dil === "TM"
            ? tm["Hasaby Öçürmek"]
            : dil === "RU"
            ? ru["Hasaby Öçürmek"]
            : en["Hasaby Öçürmek"]}
        </h1>
      </div>
    </div>
  );
};

export default Profile;
