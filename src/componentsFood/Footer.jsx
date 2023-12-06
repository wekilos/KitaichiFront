import React, { useContext } from "react";

import en from "../lang/en/home.json";
import tm from "../lang/tm/home.json";
import ru from "../lang/ru/home.json";
import { Context } from "../context/context";

function Footer(props) {
  const { dil } = useContext(Context);
  return (
    <div className="flex select-none bg-neutral-200 justify-center w-full  py-6 text-[18px]">
      <p className="text-neutral-700 w-full text-center whitespace-nowrap font-medium">
        <b> © 2023 Söwda onlaýn.</b>
        {dil === "TM"
          ? "Ähli Hukuklar goralan"
          : dil === "RU"
          ? "Все права защищены"
          : "All Rights Reserved"}
      </p>
    </div>
  );
}

export default Footer;
