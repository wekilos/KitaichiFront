import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

function ComponentLoading(props) {
    return (
        <div>
            <div className="spin text-[50px] font-medium text-[#32BB78] py-[30vh]">
                <AiOutlineLoading />
            </div>
        </div>
    );
}

export default ComponentLoading;
