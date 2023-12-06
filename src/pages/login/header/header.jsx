import React, { useState, useRef, useEffect, useContext } from "react";
import logo from "../../../images/ast_logo.webp";
import turkmenistan from "../../../images/turkmenistan.svg";
import russia from "../../../images/russia.svg";
import usa from "../../../images/united-states.svg";
import arrowDown from "../../../images/arrowDown.svg";
import { useHistory } from "react-router-dom";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

import { Context } from "../../../context/context";
import tm from "../../../lang/tm/home.json";
import en from "../../../lang/en/home.json";
import ru from "../../../lang/ru/home.json";

const Header = (props) => {
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const { dil, ChangeDil } = useContext(Context);
	function useOutsideAlerter(ref) {
		useEffect(() => {
			/**
			 * Alert if clicked on outside of element
			 */
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					setOpen(false);
				}
			}
			// Bind the event listener
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);

	return (
		<div className="w-[85%] mx-auto md2:h-[116px] h-[200px] flex items-center md2:justify-between justify-center">
			<div className="items-center block logo-div md2:flex">
				<img
					className="h-[70px] object-contain md2:mr-2 mx-auto"
					src={logo}
					alt=""
				/>
				<h1 className="w-fit text-center leading-[27px] text-neutral-900 font-bold text-[22px]">
					{dil === "TM"
						? tm["Arkadag şäheriniň"]
						: dil === "RU"
						? ru["Arkadag şäheriniň"]
						: en["Arkadag şäheriniň"]}
					<br />
					{dil === "TM"
						? tm["Söwda onlaýn platformasy"]
						: dil === "RU"
						? ru["Söwda onlaýn platformasy"]
						: en["Söwda onlaýn platformasy"]}
				</h1>
			</div>
			<div className="items-center hidden w-fit md2:flex">
				{props.first === true ? (
					<button
						onClick={() => history.push({ pathname: "/login" })}
						className="custom-border font-semi mr-6  w-[180px] h-[50px] flex justify-center items-center gap-[10px] py-[13px] px-[24px] cursor-pointer"
					>
						{dil === "TM"
							? tm["Ulgama girmek"]
							: dil === "RU"
							? ru["Ulgama girmek"]
							: en["Ulgama girmek"]}
					</button>
				) : (
					<button
						onClick={() => history.push({ pathname: "/first" })}
						className="custom-border whitespace-nowrap  font-semi mr-6 w-[180px] h-[50px] flex justify-center items-center gap-[10px] py-[13px] px-[24px] cursor-pointer"
					>
						{dil === "TM"
							? tm["Baş sahypa"]
							: dil === "RU"
							? ru["Baş sahypa"]
							: en["Baş sahypa"]}
					</button>
				)}
				<div
					onClick={() => setOpen(!open)}
					ref={wrapperRef}
					className="custom-border justify-center relative w-[180px] h-[50px] flex items-center gap-[10px] py-[13px] px-[24px] cursor-pointer"
				>
					{/* <img
                                className="w-[24px] h-[24px]"
                                src={turkmenistan}
                                alt="Turkmenistan"
                            /> */}
					<img
						className="w-[24px] h-[24px] mr-2"
						src={dil === "TM" ? turkmenistan : dil === "RU" ? russia : usa}
						alt="Turkmenistan"
					/>
					{/* <LanguageOutlinedIcon className=" text-[16px] font-semi" /> */}
					<p className="text-[16px] font-semi m-0">
						{dil === "TM" ? "Türkmen" : dil === "RU" ? "Русский" : "English"}
					</p>

					<img
						className="w-[18px] h-[18px]"
						src={arrowDown}
						alt="Turkmenistan"
					/>
					{open && (
						<div className="absolute font-semi z-50 top-12 left-0 w-[180px] gap-[10px] py-[10px] px-[24px] cursor-pointer custom-border bg-white">
							{dil !== "TM" && (
								<div
									onClick={() => ChangeDil("TM")}
									className="flex items-center py-[10px] px-[14px] border-b-neutral-300 border-b-[1px]"
								>
									<img
										className="w-[24px] h-[24px] mr-2"
										src={turkmenistan}
										alt="Turkmenistan"
									/>
									<p className="text-[16px] whitespace-nowrap m-0">Turkmen</p>
								</div>
							)}
							{dil !== "RU" && (
								<div
									onClick={() => ChangeDil("RU")}
									className="flex items-center py-[10px] px-[14px] border-b-neutral-300 border-b-[1px]"
								>
									<img
										className="w-[24px] h-[24px] mr-2"
										src={russia}
										alt="Turkmenistan"
									/>
									<p className="text-[16px] whitespace-nowrap m-0">Русский</p>
								</div>
							)}
							{dil !== "EN" && (
								<div
									onClick={() => ChangeDil("EN")}
									className="flex items-center py-[10px] px-[14px] "
								>
									<img
										className="w-[24px] h-[24px] mr-2"
										src={usa}
										alt="Turkmenistan"
									/>
									<p className="text-[16px] whitespace-nowrap m-0">English</p>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default Header;
