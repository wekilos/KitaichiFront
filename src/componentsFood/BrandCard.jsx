import React from "react";
import brand from "../images/brand.png";
import { useHistory } from "react-router-dom";

function BrandCard(props) {
    const history = useHistory();
    return (
        <div
            onClick={() => history.push({ pathname: "/rtn/brend/1" })}
            className="border cursor-pointer border-[#E9EBED] w-[196px] h-[196px] rounded-[8px]"
        >
            <div className="flex w-full py-[12px] px-[15px] ">
                <img
                    className="w-full object-contain border-b-[1px] border-b-neutral-300"
                    src={brand}
                    alt="brand"
                />
            </div>
            <p className="w-full text-center font-medium text-[16px]">
                Nescafe
            </p>
        </div>
    );
}

export default BrandCard;
