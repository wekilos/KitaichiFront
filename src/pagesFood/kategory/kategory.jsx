import React, { useState } from "react";
import { West, ArrowForwardIos } from "@mui/icons-material";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Slider,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import ProductCard from "../../componentsFood/ProductCard";

const Kategory = () => {
	const [priceRange, setPriceRange] = useState([0, 1000]);
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

	return (
		<div className="w-full inline-flex justify-between mt-[25px] select-none">
			<div className="min-w-[245px] w-[245px]">
				{/* <button className="w-full h-[50px]  bg-green-100 text-green text-[18px] font-semi rounded-[8px]">
                    <West /> Ähli dükanlar
                </button> */}
				<div className="w-full px-4   rounded-[8px] border-[1px] border-neutral-300">
					<h1 className="py-3 text-[20px] text-neutral-900 font-semi text-left">
						Kategoriýalar
					</h1>
					<p className="py-3 text-[16px] text-neutral-900 font-[300] text-left border-t-[1px] border-t-neutral-300 cursor-pointer">
						Burger
					</p>
					<p className="py-3 text-[16px] text-neutral-900 font-[300] text-left border-t-[1px] border-t-neutral-300 cursor-pointer">
						Burger
					</p>
					<p className="py-3 text-[16px] text-neutral-900 font-[300] text-left border-t-[1px] border-t-neutral-300 cursor-pointer">
						Burger
					</p>
					<p className="py-3 text-[16px] text-neutral-900 font-[300] text-left border-t-[1px] border-t-neutral-300 cursor-pointer">
						Burger
					</p>
				</div>

				<div className="w-full px-4 mt-4 rounded-[8px] border-[1px] border-neutral-300">
					<h1 className="py-3 text-[20px] border-b-[1px] border-b-neutral-300 text-neutral-900 font-semi text-left">
						Brendlar
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
						Dükanlar
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
						Baha
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
					<div className=" mt-4 w-full px-2">
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
							className="z-10  text-green"
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
			<div className="w-full pl-8">
				<div className="w-full flex items-center">
					<p className="text-[16px] font-regular text-black-secondary mr-2">
						Baş sahypa
					</p>
					<ArrowForwardIos className="!text-[16px] mt-1 font-regular text-black-secondary mr-2" />
					<p className="text-[16px] font-regular text-black-secondary mr-2">
						Kategoriýa
					</p>
					<ArrowForwardIos className="!text-[16px] mt-1 font-regular text-black-secondary mr-2" />
					<p className="text-[16px] font-regular text-black-secondary mr-2">
						Subkategoriýa
					</p>
				</div>

				<div className="w-full mt-4 flex justify-between  items-center">
					<p className="text-[32px] font-semi text-neutral-900 mr-2">
						Şokolad we süýji önümleri
					</p>
					<div className="w-[200px]">
						<FormControl size="small" fullWidth>
							<InputLabel
								style={{ color: "#32BB78" }}
								id="demo-simple-select-label"
							>
								Saýhallamak
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
								<MenuItem value={"Default"}>Default</MenuItem>
								<MenuItem value={"Cheep to Expensive"}>
									Cheep to Expensive
								</MenuItem>
								<MenuItem value={"Expensive to Cheep"}>
									Expensive to Cheep
								</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>
				<div className="w-full  mt-2 flex justify-start items-center">
					<div className="flex justify-between overflow-x-auto items-center mr-2 rounded-[32px] h-[30px] p-[5px] pl-[10px] bg-green text-white text-[16px] font-medium overflow-y-hidden">
						<p className="mr-2">Baha: 20 - 120 TMT</p>
						<Cancel className="cursor-pointer" />
					</div>
					<div className="flex cursor-pointer items-center rounded-[32px] h-[30px] p-[5px] px-[10px] bg-neutral-300 text-black-secondary text-[16px] font-medium">
						Filteri arassalamak
					</div>
				</div>
				<div className="w-full  mt-4 flex justify-between   flex-wrap">
					<div className="min-w-1/4 mb-8 mr-4">
						<ProductCard />
					</div>
					<div className="min-w-1/4 mb-8 mr-4">
						<ProductCard />
					</div>
					<div className="min-w-1/4 mb-8 mr-4">
						<ProductCard />
					</div>
					<div className="min-w-1/4 mb-8 mr-4">
						<ProductCard />
					</div>
					<div className="min-w-1/4 mb-8 mr-4">
						<ProductCard />
					</div>
					<div className="min-w-1/4 mb-8 mr-4">
						<ProductCard />
					</div>

					<div className="min-w-1/4 mb-8 mr-4">
						<ProductCard />
					</div>
					<div className="min-w-1/4 mb-8 mr-4">
						<ProductCard />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Kategory;
