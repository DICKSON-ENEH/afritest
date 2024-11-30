import React from "react";
import OverviewTiles from "./OverviewTiles";
import OverviewChart from "./OverviewChart";
import TopSells from "./TopSells";

const OverviewMainScreen = () => {
	return (
		<div>
			<OverviewTiles />
			<OverviewChart />
			<TopSells />
		</div>
	);
};

export default OverviewMainScreen;
