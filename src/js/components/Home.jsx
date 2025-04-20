import React from "react";
import SecondsCounter from "./SecondsCounter";



//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<SecondsCounter startTime="0"/>
		</div>
	);
};

export default Home;