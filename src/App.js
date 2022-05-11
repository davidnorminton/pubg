
import { Routes ,Route, NavLink, BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Overview from './app/pages/overview/Overview';
import Home from './app/pages/home/Home';
import ApiKey from './app/pages/setApi/ApiKey';
import WeaponsMastery from './app/pages/mastery/weapons/WeaponsMastery';
import Help from './app/pages/help/Help';
import Matches from './app/pages/Matches/Matches';
import Match from './app/pages/Matches/Match';
import Survival from './app/pages/mastery/survival/Survival';

export default function App() {

	const [showOption, setShowOptions] = useState(false);

	function NavItem(props) {
		return (
			<li>
				<NavLink
					to={props.route}
					className={({ isActive }) => (isActive ? 'active' : 'inactive')}
				>
					{props.title}
				</NavLink>
			</li>
		);
	}


	function showOptionsMenu() {
		return (showOption === false) ? setShowOptions(true) : setShowOptions(false);
	}

	function OptionsMenu() {
		return (
			(!showOption) ?
			null : (
				<div className='options-menu-bubble'
					onClick={() => setShowOptions(false)}
				>
					<ul className='bubble'>
						<NavItem route='/api' title='Api Key' />
						<NavItem route='/help' title='Help' />
					</ul>
				</div>
			)
		);
	}

	function MainNav() {
		return (
			<nav>
				<ul className='main-menu'>
					<NavItem route='/' title='Find Player' />
					<NavItem route='/overview' title='Overview' />
					<NavItem route='/survival' title='Survival' />
					<NavItem route='/matches' title='Matches' />
					<NavItem route='/match' title='Match' />
					<NavItem route='/weapons' title='Weapons' />
				</ul>
			</nav>	
		);
	}

	function Header() {
		const optionsIcon = (showOption) ? 'CarePackage_Open.png': 'CarePackage_Normal.png';
		return (
			<header>
				<div className='header-inner'>
					<div className='logo-container'></div>  
					<MainNav />
				</div>
				<div className='options-menu'
					style={{ backgroundImage: "url(../images/Assets/Icons/CarePackage/" + optionsIcon +")"}}
					onClick={() => showOptionsMenu()}></div>
				<OptionsMenu />
		  </header>
		);
	}

  	return (
    	<BrowserRouter>
			<Header /> 
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/overview' element={<Overview />} />
				<Route path='/survival' element={<Survival />} />
				<Route path='/api' element={<ApiKey />} />
				<Route path='/weapons' element={<WeaponsMastery />} />
				<Route path='/help' element={<Help />} />
				<Route path='/matches' element={<Matches />} />
				<Route path='/match' element={<Match />} />
            </Routes>
    	</BrowserRouter>
  );
}