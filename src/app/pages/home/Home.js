import React, { useEffect, useState } from 'react';
import { Pubg } from '../../../app/Api/Pubg';
import { useNavigate } from "react-router-dom";

function Home() {
	const [player, setPlayer] = useState(null);
	const [plateform, setPlatform] = useState(null);

	function SetPlayerStorage(e) {
		e.preventDefault();
		const plateformVal = e.target[0].value
		const playerVal = e.target[1].value;
		localStorage.setItem('currentPlayer', playerVal);
		localStorage.setItem('currentPlayerPlateform', plateformVal)
		setPlayer(playerVal);
		setPlatform(plateformVal);
		const pubg = Pubg.setPlayerId(playerVal)
		addPlayerToSearchedList();
		console.log('reached')
		let navigate = useNavigate();

		return navigate("/overview");
	}

	function addPlayerToSearchedList() {
		const player = {
			name: Pubg.getPlayer(),
			id: Pubg.getPlayerIdStorage(),
			plateform: Pubg.getCurrentPlayerPlatform
		}

		if(localStorage.getItem('searched_players')) {
			let isInList = false;
			const players = JSON.parse(localStorage.getItem('searched_players'));
			[...players].forEach(function(player) {
				if(Pubg.getPlayer() === player.name) {
					isInList = true;
				}
			})
			if(!isInList) {
				players.push(player);
				localStorage.setItem('searched_players', JSON.stringify(players));
			}
		} else {
			const players = [];
			players.push(player)
			localStorage.setItem('searched_players', JSON.stringify(players));
		}
	
	} 
  
	function PlayerHtml(name) {
		return (<span className='current-player'>{name.name}</span>);
	}

	function CurrentPlayer() {
		return (player === null ? <PlayerHtml name="No Player Selected" /> : <PlayerHtml name={player} />);
	}

	function PrevSearches() {
		if(localStorage.getItem('searched_players')) {
			const searches = JSON.parse(localStorage.getItem('searched_players'));
			return (
				<ul>
				{searches.map((search, index) => {
					return (
						<li key={index}>{search.name}</li>
					);
				})}
				</ul>
			);

		} else {
			return null;
		}
	}

	useEffect(() => {
		const player = localStorage.getItem('currentPlayer');
		if(player) {
			setPlayer(player);
		}
	}, []);

    return (
      	<div className='narrow-content'>
        	<h1 className='main-title'>
				<span className='main-part'>PUBG Player</span><CurrentPlayer />
			</h1>
			<h2>Find Player</h2>
        	<div className=''>
				
				<form onSubmit={SetPlayerStorage} className="find-player-form">
					<select name="region" className="region-select">
						<option value="xbox">XBOX</option>
						<option value="psn">PSN</option>
						<option value="steam">Steam</option>
						<option value="stadia">Stadia</option>
					</select>
            		<input className='set-player' type="text" id="player"/>
        			<button className='set-player-btn' type="submit">get</button>
				</form>
      		</div>
			<PrevSearches />
    	</div>
  );
}

export default Home;