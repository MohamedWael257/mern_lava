import React from 'react'
import Heroteam from './heroteam/Heroteam'
import TeamMember from './teamMember/TeamMember'

import HeroCard from '../ui/herocard/HeroCard'
const Team = () => {
    return (
        <>
            <HeroCard page={'Team'} />
            <TeamMember />
        </>
    )
}

export default Team