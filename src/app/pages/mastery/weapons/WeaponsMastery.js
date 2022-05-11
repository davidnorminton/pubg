import React, { useEffect, useState } from 'react';
import { Pubg } from '../../../../app/Api/Pubg';
import { Loading } from '../../../Components/Loading';
import { weaponsMap, emblemsMap } from '../../../Data/maps/weapons/weapons';

function WeaponsMastery() {

    const [isLoading, setIsLoading] = useState(true);
    const [state, setState] = useState(weaponsMap);
    const [activeWeapon, setActiveWeapon] = useState(null);
    const [activeCategory, setActiveCategory] = useState('AR');

    function getXpRemaining(xp, level) {
        if(xp <= 2500) {
            return {
                "points": xp,
                "points_in_level": 2500
            }
        };
        let prevXpAmount = 0;
        let lastAmountAdded = 0;
        for(let i = 1; i <= level; i++) {            
            if(i < 10) lastAmountAdded = 2500;
            else if(i > 9 && i < 20) lastAmountAdded = 5000;
            else if(i > 29 && i < 30)  lastAmountAdded = 7500;
            else lastAmountAdded = (Math.floor(i / 10) * 1000) + 5500;
            prevXpAmount = xp;
            xp -= lastAmountAdded;
            if(xp <= 0) {
                return {
                    "points": prevXpAmount,
                    "points_in_level": lastAmountAdded
                }
            } 
        }
    }

    function getAmountLevelComplete(xp, level) {
        const getXp = getXpRemaining(xp, level);
        const points = getXp.points;
        const points_in_level = getXp.points_in_level;
        return {
            "percentage": Math.floor((points / points_in_level) * 100),
            "points": points,
            "points_in_level": points_in_level
        }
    }

    function getWeaponCategory(weaponName) {
        for(const category in weaponsMap) {
            for(const weapon in weaponsMap[category]) {
                if(weaponName === weapon) {
                    return category;
                }
            }
        }
    }

    function extractName(weapon) {
        const split = weapon.split('_');
        split.pop();
        return split[split.length -1]

    }

    function weaponsData(weapon, data) {
        const category = getWeaponCategory(weapon);
        if(!data.hasOwnProperty('StatsTotal')) {
            data.StatsTotal = {};
        }
        return {
            "name":  weapon,
            "game_name": (weaponsMap[category][weapon]).hasOwnProperty('game_name') ? (weaponsMap[category][weapon]['game_name']) : extractName(weapon),
            "category": category,
            "image":  weapon + '.png',
            "XPTotal": data.hasOwnProperty('XPTotal') ? data.XPTotal : 0,
            "LevelCurrent": data.LevelCurrent  || 0,
            "TierCurrent": data.TierCurrent || 0,    
            "MostDefeatsInAGame": data.StatsTotal.MostDefeatsInAGame || 0,
            "Defeats": data.StatsTotal.Defeats || 0,
            "MostDamagePlayerInAGame": data.StatsTotal.MostDamagePlayerInAGame || 0,
            "DamagePlayer": data.StatsTotal.DamagePlayer || 0,
            "MostHeadShotsInAGame": data.StatsTotal.MostHeadShotsInAGame || 0,
            "HeadShots": data.StatsTotal.HeadShots || 0,
            "LongestDefeat": data.StatsTotal.LongestDefeat || 0,
            "LongRangeDefeats": data.StatsTotal.LongRangeDefeats || 0,
            "Kills": data.StatsTotal.Kills || 0,
            "MostKillsInAGame": data.StatsTotal.MostKillsInAGame || 0
        }
    };

    function changeTab(cat) {
        setActiveCategory(cat)
        const firstWeaponInCategory = Object.keys(state[cat])[0];
        setActiveWeapon(firstWeaponInCategory);
    }

    function WeaponsList(props) {
        return Object.keys(state[props.cat]).map((weapon, index) => {
            const active = (weapon === activeWeapon);
            const TierCount = state[props.cat][weapon].TierCurrent;
            const tierCount = TierCount > 1 ? TierCount : 1;
            const emblem = emblemsMap[tierCount- 1];
            const emblemImg = emblem + '.png';
            const emblemUrl = '../images/Assets/Mastery/Weapon_Mastery/Emblems/' + emblemImg;

            const categoryPath = state[props.cat][weapon];
            const xp = getAmountLevelComplete((categoryPath.XPTotal || 0), (categoryPath.LevelCurrent || 0));

            return (
                <li onClick={() => setActiveWeapon(weapon)} key={index}
                    className={`weapon-${active ? "active" : "inactive"}`}
                >
                    <div className='emblem-container'>
                        <div className='emblem'
                            style={{ 
                            backgroundImage: "url(" + emblemUrl + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            zoom: 1.2}}                        
                        ></div>
                    </div>
                    <div className='weapon-tab-weapon'>
                        <div className='tab-weapon-name'>
                            {(state[props.cat][weapon]['game_name']) ? (state[props.cat][weapon]['game_name']) : weapon}
                        </div>
                        <div className='weapon-tab-lvl'>
                            {emblem} {String(state[props.cat][weapon].LevelCurrent).slice(-1)}[Lv. {state[props.cat][weapon].LevelCurrent}]
                        </div>
                        <div className='xp-level-bar'>
                            <div className='gauge' style={{ "width": xp.percentage + "%"}}></div>
                        </div>
                    </div>
                </li>
            );
        })
    }

    function WeaponAttr(props) {
        return (
            <li>
                <div>
                    <h5 className='weapon-attr'>{props.title1}</h5>
                    <div className='attr-stat'> {props.data1}</div>
                </div>
                <div>
                    <h5 className='weapon-attr'>{props.title2}</h5>
                    <div className='attr-stat'> {props.data2}</div>
                </div>
            </li>
        );
    }

    function WeaponContainer(props) {
        const categoryPath = state[props.category][props.weapon];
        const xp = getAmountLevelComplete(categoryPath.XPTotal, categoryPath.LevelCurrent);

        return (
            <div className='weapon-attr'>
                <div className='top-pane'>
                    <div className='image-container'>
                    <div style={{  
                            backgroundImage: "url(" + '../images/Assets/Item/Weapon/Main/' + categoryPath.image +")",
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            zoom: 1.2}}
                            className={'image w_' + extractName(props.weapon)}>
                        </div>    
                    </div>
                </div>
                <div className='weapon-level'>
                    <div className='level-box'>Lv.{categoryPath.LevelCurrent}</div>
                    <div className='xp-level'>
                        <div className='xp-level-bar'>
                            <div className='gauge' style={{ "width": xp.percentage + "%"}}></div>
                        </div>
                        <div className='points-out-of'>{xp.points} / {xp.points_in_level}</div>
                        <div className='percentage'>{xp.percentage}%</div>
                    </div>
                </div>
                <div className='second-row'>
                    <ul>
                        <WeaponAttr title1="Kills" data1={(categoryPath.Kills)} title2="Most Kills" data2={categoryPath.MostKillsInAGame} />
                        <WeaponAttr title1="damage dealt" data1={(categoryPath.DamagePlayer).toFixed(2)} title2="Match High" data2={(categoryPath.MostDamagePlayerInAGame).toFixed(2)} />
                        <WeaponAttr title1="Headshots" data1={categoryPath.HeadShots} title2="Match High" data2={categoryPath.MostHeadShotsInAGame} />
                        <WeaponAttr title1="Long Range Kills" data1={categoryPath.LongRangeDefeats} title2="Longest Kill" data2={(categoryPath.LongestDefeat).toFixed(2)} />
                    </ul>
                </div>
            </div>
       );
    }

    function Weapon(props) {
        return ((activeWeapon == props.weapon)? (<WeaponContainer category={props.category} weapon={props.weapon} />): null);
    } 

    function WeaponCategories(props) {
        return Object.keys(state[props.cat]).map((weaponName, index) => {
            return <Weapon category={props.cat} weapon={weaponName} key={index}/>   
        })
    }

    function WeaponsListData() {
        return Object.keys(state).map((categoryName, index) => {
            return (
                (activeCategory !== categoryName) ? 
                null : 
                (
                    <div className='weapons-category' id={categoryName + "-pane"} key={index}>
                        <div className='inner'>
                            <div className='weapons-menu'>
                                <ul>
                                    <WeaponsList cat={categoryName} />
                                </ul>
                            </div>
                            <div className='weapon-view'>
                                <WeaponCategories cat={categoryName}/>
                            </div>
                        </div>
                    </div>
                )
            );        
        });
    }


    
    useEffect(() => {
        const sortedData = {}
        const data = Pubg.getMasteryData();
		data.then((json) => {
            const weaponData = json.data.data.attributes.weaponSummaries;
			for(const category in weaponsMap) {
                for(const weapon in weaponsMap[category]) {
                    console.log(weapon)
                    const data = weaponsData(
                        weapon, 
                        weaponData.hasOwnProperty(weapon) ? weaponData[weapon] : weaponsMap[category][weapon]
                    );
                    console.log(data)
                    
                    sortedData[data.category] = weaponsMap[data.category];
                    console.log(sortedData[data.category])
                    sortedData[data.category][data.name] = data;
                }
                console.log(sortedData)

            };
            setState((prevState) => ({...prevState, ...sortedData}))
            console.log(state)
  		}).then(() => {
            setIsLoading(false);
            const firstItemInCategory = Object.keys(weaponsMap[activeCategory])[0];
            setActiveWeapon(firstItemInCategory);
          });
	}, []);	 

    return (
        <div className='mastery-page'>
            <div>
                <ul className='mastery-tabs'>
                    {Object.keys(weaponsMap).map((cat, index) => {
                        const active = (cat === activeCategory);
                        return (
                            <li onClick={() => changeTab(cat)} key={index}
                                className={`tab cat-${active ? "active" : "inactive"}`}
                            >
                                {cat}
                            </li>
                        )
                    })}
                </ul>
                <div className='weapon-stats'>
                    {(isLoading) ? <Loading /> : <WeaponsListData />}
                </div>                
            </div>
        </div>
    )
}
export default WeaponsMastery;