import React, { useEffect, useState } from 'react';

function PlayerLifetimeStats (statsObj) {
    const stats = statsObj.statsObj;
    const statKeys = Object.keys(stats);

    function camelCaseToSentence(str) {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    }

    function StatsList(section) {
        
        return Object.keys(stats[section.section]).map((stat, index) => {
            return (
                <li key={index}>
                    <h5>
                        {stat}
                    </h5>
                    <span className='stat-value'>{stats[section.section][stat]}</span>
                </li>
            );
        })
    }

    const sectionsList = statKeys.map((section, index) => {
        return (
            <ul className='section' key={index}>
                <StatsList section={section} />
            </ul>
        );
    })

    return <div className='sections'>{sectionsList}</div>;
}

export default PlayerLifetimeStats;