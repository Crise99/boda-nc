import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";

const ShowCounter = ({ days, hours, minutes, seconds }) => {
	return (
		<div className="text-base-900 font-heading-1 flex flex-col items-center justify-center text-center">
			<p className="mb-2 text-lg font-medium">Os esperamos en...</p>
			<div className="flex items-center justify-center gap-4 text-2xl font-bold md:gap-6 md:text-4xl">
				<DateTimeDisplay value={days} type={"Días"} />
				<div className="bg-base-700/50 h-12 w-[2px] md:h-18"></div>
				<DateTimeDisplay value={hours} type={"Horas"} />
				<div className="bg-base-700/50 h-12 w-[2px] md:h-18"></div>
				<DateTimeDisplay value={minutes} type={"Min"} />
				<div className="bg-base-700/50 h-12 w-[2px] md:h-18"></div>
				<DateTimeDisplay value={seconds} type={"Seg"} />
			</div>
			<p className="mt-4 text-2xl font-semibold">Nuria & Cristian</p>
			<p className="mt-2 text-xl">08 • 06 • 2025</p>
		</div>
	);
};

export default ShowCounter;
