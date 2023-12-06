import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { BASE_URL } from "../../utils/axiosIntance";

const CategoryCard = (props) => {
  const history = useHistory();
  const { dil } = useContext(Context);
  return (
    <div
      onClick={() =>
        history.push({
          pathname: "/mrt/kategory/" + props.data.id,
        })
      }
      className="cursor-pointer hover:bg-green-200  md2:mr-2 text-[18px] md2:max-w-[300px] md2:w-[200px] max-w-[170px] w-[170px] h-[120px] bg-[#F4F4F6] rounded-[24px]"
    >
      <div className="absolute z-10 md2:max-w-[300px] md2:w-[200px] max-w-[170px] w-[170px]   h-[120px] bg-black-100  rounded-[24px]"></div>
      <img
        className="absolute md2:max-w-[300px] md2:w-[200px] max-w-[170px] w-[170px] h-[120px] z-0  rounded-[24px]"
        src={BASE_URL + props?.data?.img}
        alt="category_surat"
      />

      <div className="absolute p-[20px] !z-20 md2:max-w-[300px] md2:w-[200px] max-w-[170px] w-[170px] text-white font-semi  text-[18px]    ">
        {props.title}
      </div>
    </div>
  );
};

export default CategoryCard;
