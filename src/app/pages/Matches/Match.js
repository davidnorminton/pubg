import React, { useEffect, useState } from 'react';
import Pubg from '../../Api/Pubg';

function Match() {

	const [matchData, setMatchData] = useState(null);

    useEffect(() => {
		Pubg.getMatch('112f0af5-f1f3-4015-936b-374612001626')
		.then((json) => {
			console.log(json)

			setMatchData(json)
  		}).then((json) => {
			  console.log(matchData)
		  });
	}, []);	  




	//const minMaxUrl = 'https://minmax.gg/chickendinner/embed/console/';
	//const datePath = '2022/04/17/19/50/';
	//const matchId = '112f0af5-f1f3-4015-936b-374612001626';
	//const test = 'https://chickendinner.gg/embed/console/2022/04/17/20/21/fd4feee4-be8b-11ec-a007-8e16811337c6?follow=oO%20davenorm%20Oo&ref=pubglookup';
	return (
		<div>
			Match
			
		</div>
	);
}
export default Match;