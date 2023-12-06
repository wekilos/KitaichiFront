import React, { useContext, useEffect, useState } from "react";
import { West, ArrowForwardIos } from "@mui/icons-material";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Slider,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import ProductCard from "../../components/ProductCard";
import { BeatLoader } from "react-spinners";

import img14 from "../../images/Image14.svg";
import img15 from "../../images/Image15.svg";
import img16 from "../../images/Image16.svg";
import img17 from "../../images/Image17.svg";
import img18 from "../../images/Image18.svg";

import { Context } from "../../context/context";
import tm from "../../lang/tm/home.json";
import en from "../../lang/en/home.json";
import ru from "../../lang/ru/home.json";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosIntance";
import { useParams } from "react-router-dom";

const Kategory = () => {
	const [priceRange, setPriceRange] = useState([0, 1000]);
	const { dil } = useContext(Context);
	const { id } = useParams();
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState([]);
	const [wichCat, setWichCat] = useState(0);
	const [brends, setBrends] = useState([
		{ id: 1, name: "Mars" },
		{ id: 1, name: "Pepsi" },
		{ id: 1, name: "Colo" },
		{ id: 1, name: "Snicers" },
		{ id: 1, name: "Turan" },
		{ id: 1, name: "Apple" },
		{ id: 1, name: "Fanta" },
		{ id: 1, name: "Sprite" },
	]);
	const [filterBrends, setFilterBrends] = useState(brends);

	const [markets, setMarkets] = useState([
		{ id: 1, name: "Mars" },
		{ id: 1, name: "Pepsi" },
		{ id: 1, name: "Colo" },
		{ id: 1, name: "Snicers" },
		{ id: 1, name: "Turan" },
		{ id: 1, name: "Apple" },
		{ id: 1, name: "Fanta" },
		{ id: 1, name: "Sprite" },
	]);
	const [filterMarkets, setFilterMarkets] = useState(markets);

	const SearchBrends = (value) => {
		let filter = value.toUpperCase();
		let newArray = brends.filter((item) => {
			return item.name.toUpperCase().indexOf(filter) > -1;
		});
		if (value.length === 0) {
			setFilterBrends([...brends]);
		} else {
			setFilterBrends([...newArray]);
		}
	};

	const SearchMarkets = (value) => {
		let filter = value.toUpperCase();
		let newArray = markets.filter((item) => {
			return item.name.toUpperCase().indexOf(filter) > -1;
		});
		if (value.length === 0) {
			setFilterMarkets([...markets]);
		} else {
			setFilterMarkets([...newArray]);
		}
	};

	const cake = [
		{
			name: "Batonçiik şokoladly Twix Extra kökeler we karamel bilen 82 gr",
			img: img14,
		},
		{
			name: "Şokoladly batonçik Bounty Trio süýt şokolady bilen örtülen",
			img: img15,
		},
		{
			name: "Mini wafli Kinder Bueno 18 sany 108 g",
			img: img16,
		},
		{
			name: "Süýjüler Коркунов şokoladlaryň ýygyndysy gara",
			img: img17,
		},
		{
			name: "Süýji sowgat Snickers Twix MilkyWay 81 g",
			img: img18,
		},
		{
			name: "Batonçiik şokoladly Twix Extra kökeler we karamel bilen 82 gr",
			img: img14,
		},
		{
			name: "Şokoladly batonçik Bounty Trio süýt şokolady bilen örtülen",
			img: img15,
		},
		{
			name: "Mini wafli Kinder Bueno 18 sany 108 g",
			img: img16,
		},
		{
			name: "Süýjüler Коркунов şokoladlaryň ýygyndysy gara",
			img: img17,
		},
		{
			name: "Süýji sowgat Snickers Twix MilkyWay 81 g",
			img: img18,
		},
	];

	useEffect(() => {
		getCategory();
		getCategories();
		getBrands();
		getMarkets();
	}, [dil, id]);

	const getCategories = () => {
		axiosInstance
			.get("/api/grocery_categories", {
				params: {
					lang: dil,
					limit: 9999,
				},
			})
			.then((data) => {
				console.log(data.data);
				setCategories(data.data.body);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getCategory = () => {
		setLoading(true);
		axiosInstance
			.get("/api/grocery_category_products", {
				params: {
					lang: dil,
					category_id: id,
					limit: 9999,
				},
			})
			.then((data) => {
				console.log("category page:" + data.data);
				setCategory(data.data.body);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	const getBrands = () => {
		axiosInstance
			.get("/api/grocery_brands", {
				params: {
					lang: dil,
					limit: 9999,
				},
			})
			.then((data) => {
				console.log(data.data);
				setFilterBrends(data.data.body);
				setBrends(data.data.body);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getMarkets = () => {
		axiosInstance
			.get("/api/grocery_markets", {
				params: {
					lang: dil,
					limit: 999,
				},
			})
			.then((data) => {
				console.log(data.data);
				setFilterMarkets(data.data.body);
				setMarkets(data.data.body);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="inline-flex justify-between w-full pb-10 select-none">
			<div className="min-w-[245px] md2:block hidden w-[245px]">
				{/* <button className="w-full h-[50px]  bg-green-100 text-green text-[18px] font-semi rounded-[8px]">
                    <West /> Ähli dükanlar
                </button> */}
				<div className="w-full px-4   rounded-[8px] border-[1px] border-neutral-300">
					<h1 className="py-3 text-[20px] text-neutral-900 font-semi text-left">
						{dil === "TM"
							? tm.Kategoriýalar
							: dil === "RU"
							? ru.Kategoriýalar
							: en.Kategoriýalar}
					</h1>

					{categories?.map((item, i) => {
						return (
							<p
								onClick={() =>
									history.push({ pathname: "/mrt/kategory/" + item.id })
								}
								key={"catcats" + i}
								className="py-3 text-[16px] text-neutral-900 font-[300] text-left border-t-[1px] border-t-neutral-300 cursor-pointer"
							>
								{item?.name}
							</p>
						);
					})}
				</div>

				<div className="w-full px-4 mt-4 rounded-[8px] border-[1px] border-neutral-300">
					<h1 className="py-3 text-[20px] border-b-[1px] border-b-neutral-300 text-neutral-900 font-semi text-left">
						{dil === "TM"
							? tm.Brendler
							: dil === "RU"
							? ru.Brendler
							: en.Brendler}
					</h1>
					<input
						onKeyUp={(e) => SearchBrends(e.target.value)}
						className="w-full h-[50px] mt-2 outline-none p-4 rounded-[8px] border-[1px] border-neutral-300"
						type="text"
						placeholder="Search"
					/>
					<div
						style={{ scrollbarColor: "#32BB78" }}
						className="max-h-[250px] overflow-auto"
					>
						{filterBrends.map((item, index) => {
							return (
								<div
									key={"brends" + index}
									className={
										"flex items-center py-3 text-left   border-t-[1px] border-t-neutral-300"
									}
								>
									<input
										className="mr-3 bg-neutral-300 text-neutral-300 border-neutral-300 w-[16px] h-[16px] "
										type="checkbox"
										id="brend1"
									/>
									<label
										htmlFor="brend1"
										className="text-[16px] cursor-pointer text-neutral-900 font-[300] "
									>
										{item.name}
									</label>
								</div>
							);
						})}
					</div>
				</div>

				<div className="w-full px-4 mt-4 rounded-[8px] border-[1px] border-neutral-300">
					<h1 className="py-3 text-[20px] border-b-[1px] border-b-neutral-300 text-neutral-900 font-semi text-left">
						{dil === "TM"
							? tm.Dükanlar
							: dil === "RU"
							? ru.Dükanlar
							: en.Dükanlar}
					</h1>
					<input
						onKeyUp={(e) => SearchMarkets(e.target.value)}
						className="w-full h-[50px] mt-2 outline-none p-4 rounded-[8px] border-[1px] border-neutral-300"
						type="text"
						placeholder="Search"
					/>
					<div
						style={{ scrollbarColor: "#32BB78" }}
						className="max-h-[250px] overflow-auto"
					>
						{filterMarkets.map((item, index) => {
							return (
								<div
									key={index}
									className={
										"flex items-center py-3 text-left   border-t-[1px] border-t-neutral-300"
									}
								>
									<input
										className="mr-3 bg-neutral-300 text-neutral-300 border-neutral-300 w-[16px] h-[16px] "
										type="checkbox"
										id="brend1"
									/>
									<label
										htmlFor="brend1"
										className="text-[16px] cursor-pointer text-neutral-900 font-[300] "
									>
										{item.name}
									</label>
								</div>
							);
						})}
					</div>
				</div>

				<div className="w-full px-4 mt-4 rounded-[8px] border-[1px] border-neutral-300">
					<h1 className="py-3 text-[20px] border-b-[1px] border-b-neutral-300 text-neutral-900 font-semi text-left">
						{dil === "TM" ? tm.Bahasy : dil === "RU" ? ru.Bahasy : en.Bahasy}
					</h1>
					<div className="flex justify-between">
						<input
							className="w-[45%] h-[50px] mt-2 outline-none p-2 rounded-[8px] border-[1px] border-neutral-300"
							type="text"
							placeholder="0 TMT"
							value={priceRange[0] + " TMT"}
						/>
						<input
							className="w-[45%] h-[50px] mt-2 outline-none p-2 rounded-[8px] border-[1px] border-neutral-300"
							type="text"
							placeholder="0 TMT"
							value={priceRange[1] + " TMT"}
						/>
					</div>
					<div className="w-full px-2 mt-4 ">
						<Slider
							sx={{
								"& .MuiSlider-thumb": {
									color: "#32BB78",
								},
								"& .MuiSlider-track": {
									color: "#32BB78",
								},
								"& .MuiSlider-rail": {
									color: "#E9EAEE",
								},
								"& .MuiSlider-active": {
									color: "#32BB78",
								},
							}}
							className="z-10 text-green"
							min={0}
							max={1000}
							getAriaLabel={() => "Minimum distance"}
							defaultValue={priceRange}
							// value={priceRange}
							onChange={(e) => {
								setPriceRange(e.target.value);
							}}
							valueLabelDisplay="auto"
							getAriaValueText={(e) => console.log("value text", e)}
							disableSwap
						/>
					</div>
				</div>
			</div>
			<div className="w-full md2:pl-8">
				<div className="items-center hidden w-full md2:flex">
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
					<p
						onClick={() => history.push({ pathname: "/mrt/kategories" })}
						className="text-[16px] cursor-pointer font-regular text-black-secondary mr-2"
					>
						{dil === "TM"
							? tm.Kategoriýalar
							: dil === "RU"
							? ru.Kategoriýalar
							: en.Kategoriýalar}
					</p>
					<ArrowForwardIos className="!text-[16px]  font-regular text-black-secondary mr-2" />
					<p className="text-[16px] font-regular text-black-secondary mr-2">
						{category[0]?.categories?.name}
					</p>
				</div>

				<div className="flex items-center justify-between w-full mt-0 md2:mt-5">
					<p className="md2:text-[32px]  text-[20px] font-semi text-neutral-900 mr-2">
						{category[0]?.categories?.name}
					</p>
					<div className="md2:w-[200px] w-[150px]">
						<FormControl size="small" fullWidth>
							<InputLabel
								style={{ color: "#32BB78" }}
								id="demo-simple-select-label"
							>
								{dil === "TM"
									? tm.Saýhallamak
									: dil === "RU"
									? ru.Saýhallamak
									: en.Saýhallamak}
							</InputLabel>
							<Select
								labelStyle={{ color: "#32BB78" }}
								sx={{
									borderRadius: "22px",
									color: "#32BB78",
									".MuiOutlinedInput-notchedOutline": {
										borderColor: "#32BB78",
									},
									"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
										borderColor: "#32BB78",
									},
									"&:hover .MuiOutlinedInput-notchedOutline": {
										borderColor: "#32BB78",
									},
									".MuiSvgIcon-root ": {
										fill: "#32BB78 !important",
									},
								}}
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								// value={age}
								label="Saýhallamak"
								// onChange={handleChange}
							>
								<MenuItem value={"Default"}>
									{dil === "TM"
										? tm["Meşhurlygyna görä"]
										: dil === "RU"
										? ru["Meşhurlygyna görä"]
										: en["Meşhurlygyna görä"]}
								</MenuItem>
								<MenuItem value={"Cheep to Expensive"}>
									{dil === "TM"
										? tm["Arzandan gymmada"]
										: dil === "RU"
										? ru["Arzandan gymmada"]
										: en["Arzandan gymmada"]}
								</MenuItem>
								<MenuItem value={"Expensive to Cheep"}>
									{dil === "TM"
										? tm["Gymmatdan arzana"]
										: dil === "RU"
										? ru["Gymmatdan arzana"]
										: en["Gymmatdan arzana"]}
								</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>

				<div className="items-center justify-start hidden w-full mt-5 md2:flex">
					<div className="flex justify-between overflow-x-auto items-center mr-2 rounded-[32px] h-[30px] p-[5px] pl-[10px] bg-green text-white text-[16px] font-medium overflow-y-hidden">
						<p className="mr-2">
							{dil === "TM" ? tm.Bahasy : dil === "RU" ? ru.Bahasy : en.Bahasy}:
							{" " + priceRange[0]} - {priceRange[1]} TMT
						</p>
						<Cancel className="cursor-pointer" />
					</div>
					<div className="flex cursor-pointer items-center rounded-[32px] h-[30px] p-[5px] px-[10px] bg-neutral-300 text-black-secondary text-[16px] font-medium">
						{dil === "TM"
							? tm["Filtrleri arassalamak"]
							: dil === "RU"
							? ru["Filtrleri arassalamak"]
							: en["Filtrleri arassalamak"]}
					</div>
				</div>

				<div className="w-full overflow-y-scroll scrollbar-hide h-[50px]  mt-5 md2:hidden inline-flex justify-start items-center">
					{categories?.map((item, i) => {
						return (
							<div
								onClick={() => {
									history.push({ pathname: "/mrt/kategory/" + item.id });
									setWichCat(item.id);
								}}
								className={
									`${item.id == wichCat && "bg-neutral-300 "}` +
									"block w-fit whitespace-nowrap mr-2 cursor-pointer items-center rounded-[12px] h-[40px] p-[10px] px-[15px]  text-black-secondary text-[16px] font-medium"
								}
							>
								{item?.name}
							</div>
						);
					})}
				</div>
				<div className="grid w-full grid-cols-2 gap-8 mt-7 place-items-center lg:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 5xl:grid-cols-6">
					{loading ? (
						<div className="flex w-full justify-center flex-col items-center mx-auto     md:w-[50vw] sm:w-[60vw] lg:w-[40vw] xl:w-[30vw]">
							<BeatLoader
								size={"20px"}
								color={"#32BB78"}
								loading={true}
								width={"100%"}
							/>
						</div>
					) : (
						category?.map((item) => {
							return (
								<ProductCard
									data={item}
									text={item.name}
									img={item?.img[0]?.img}
								/>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
};

export default Kategory;
