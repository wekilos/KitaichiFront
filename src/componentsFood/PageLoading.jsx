import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Logo from "../images/logo.svg";

const PageLoading = () => {
    const location = useLocation();
    return (
        <div className="flex flex-col justify-center items-center w-[70vw] h-[85vh] gap-5 md:h-[80vh] md:w-[50vw] sm:w-[60vw] lg:w-[40vw] xl:w-[30vw]">
            <img className="w-full" src={Logo} alt="Turkmen Express" />
            <BeatLoader
                size={"20px"}
                color={"#32BB78"}
                loading={true}
                width={"400px"}
            />
        </div>
    );
};

export default PageLoading;
