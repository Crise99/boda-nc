import React from "react";

const DateTimeDisplay = ({ value, type }) => {
	return (
		<div className={"flex flex-col items-center gap-1 md:gap-2"}>
			<span className="text-4xl md:text-6xl">{value}</span>
			<span className="text-sm md:text-base">{type}</span>
		</div>
	);
};

export default DateTimeDisplay;
