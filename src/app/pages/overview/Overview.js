import React, { useEffect, useState } from 'react';
import PlayerLifetimeStats from '../../../app/Components/PlayerLifetimeStats';
import Pubg from '../../Api/Pubg';
import { Loading } from '../../../app/Components/Loading';

function Overview() {

  	const [state, setState] = useState({
    	bestRankPoint: 0,
    	"attributes": {
      		"gameModeStats": {
				  "solo": {},
				  "solo-fpp": {},
				  "duo": {},
				  "duo-fpp": {},
				  "squad": {},
				  "squad-fpp": {}
			}
    	}  
  	});
	
	const [isLoading, setIsLoading] = useState(true);

	const battleModes = [
		"solo", "solo-fpp", "duo", "duo-fpp", "squad", "squad-fpp"
	];

	function getAvgVal(val1, val2, check) {
		if(check === 0 || check === null) return 0;
		return ((val1 / val2) * 100).toFixed(2);
	}

	function getDataObject(layer) {
		return {
			"Overview": {
				"Total Wins": layer.wins,
				"Rank Points": layer.rankPoints,
				"Total Matches Played": layer.roundsPlayed,
				"Win Rate": getAvgVal(layer.wins, layer.roundsPlayed, layer.wins) + '%',
				"Total Top 10s" : layer.top10s,
				"Top 10 Rate":  getAvgVal(layer.top10s, layer.roundsPlayed,layer.top10s) + '%',
				"Avg Survival Time": (layer.roundsPlayed === 0) ? '0' : calcLngTimeSurvive(layer.timeSurvived / layer.roundsPlayed)
			},
			"Combat": {
				"Kill Death Ratio": layer.kills === 0 ? 0 : (layer.kills /layer.roundsPlayed).toFixed(2) ,
				"Total Kills": layer.kills,
				"Total Assists": layer.assists,
				"Most Kills": layer.roundMostKills,
				"Kill Streak": layer.maxKillStreaks,
				"Longest Kill": layer.longestKill.toFixed(2),
				"Headshot Kills": layer.headshotKills,
				"Headshot Kill Rate": layer.headshotKills === 0 ? 0 : (layer.kills / layer.headshotKills).toFixed(2),
				"Avg Damage Dealt": layer.damageDealt === 0 ? 0 : (layer.damageDealt / layer.roundsPlayed).toFixed(2)
			},
			"Survival": {
				"Longest Time Survived": calcLngTimeSurvive(layer.longestTimeSurvived),
				"Avg Boosts": layer.boosts === 0 ? 0 : (layer.boosts / layer.roundsPlayed).toFixed(2),
				"Avg Heals": layer.heals === 0 ? 0 : (layer.heals / layer.roundsPlayed).toFixed(2),
				"Total Revives": layer.revives,
				"Avg Weapons Aquired": layer.weaponsAcquired === 0 ? 0 : (layer.weaponsAcquired / layer.roundsPlayed).toFixed(2),
				"Avg Walk Distance": layer.walkDistance  === 0? 0 : (layer.walkDistance / layer.roundsPlayed).toFixed(2),
				"Avg Ride Distance": layer.rideDistance === 0 ? 0 : (layer.rideDistance / layer.roundsPlayed).toFixed(2),
				"Avg Swim Distance": layer.swimDistance === 0 ? 0 : (layer.swimDistance / layer.roundsPlayed).toFixed(2)
			}
		}
	}  

	function calcLngTimeSurvive(seconds) {
		const minutes = Math.floor(seconds / 60);
		const secsRemain = parseInt(seconds - (minutes * 60));
		return `${minutes}:${secsRemain}`;
	}

	function changeTab(tab) {
		const showTab = document.getElementById(tab);
		const showPane = document.getElementById(tab + '-pane');

		deactiveTabs();
		hideAllPanes();
		showPane.classList.add('active-pane');
		showPane.classList.remove('in-active-pane');
		showTab.classList.add('active');
		showTab.classList.remove('in-active');
	}

	function deactiveTabs() {
		const tabs = document.querySelectorAll('.tabs li');
		tabs.forEach((tab) => {
			tab.classList.remove('active');
			tab.classList.add('in-active')
		})
	}

	function hideAllPanes() {
		const panes = document.getElementsByClassName('active-pane');
		[...panes].forEach(element => {
			element.classList.remove('active-pane');
			element.classList.add('in-active-pane');

		});
	}

  	useEffect(() => {
		const data = Pubg.getPlayerOverview();
		data.then((json) => {
			const dataAttr = json.data.data.attributes;
			const jsonData = dataAttr.gameModeStats;
			setState(prevState => ({
				...prevState,
				bestRankPoint: dataAttr.bestRankPoint,
				attributes: { 
					gameModeStats: {
						"solo": getDataObject(jsonData.solo),
						"solo-fpp": getDataObject(jsonData["solo-fpp"]),
						"duo": getDataObject(jsonData.duo),
						"duo-fpp": getDataObject(jsonData["duo-fpp"]),
						"squad": getDataObject(jsonData.squad),
						"squad-fpp": getDataObject(jsonData["squad-fpp"])
					}
				}
			}));
  		}).then( () => setIsLoading(false))
	}, []);	  


	function tabItem(mode) {
		return (
			<li onClick={() => changeTab(mode)}>
				{mode.replace('-', ' ')}
			</li>
		);
	}

	function seasonSelected(event) {
		console.log(event)
	}

	function MainContent() {
		return (
			<div>
				{battleModes.map((mode, index) => {
					return (
						<div id={mode + '-pane'} key={index} className={(mode == 'solo') ? 'active-pane mode-pane': 'in-active-pane mode-pane'}>
							<PlayerLifetimeStats statsObj={state.attributes.gameModeStats[mode]} />
						</div>
					);
				})}
			</div>
		);
	}

  	return (
    	<div className='content'>
			<ul className="tabs">
				{battleModes.map((mode, index) => {
					return (
						<li onClick={() => changeTab(mode)} key={index} className={(mode === 'solo')? 'active': 'in-active'} id={mode}>
						 	{mode.replace('-', ' ')}
						</li>
					);
				})}
			</ul>
			<div className='mode-panes'>
				{(isLoading ? <Loading /> : <MainContent /> )}
			</div>
    	</div>	
  	);

}

export default Overview;