import React, { memo, useEffect, useState } from 'react'
import './Team.css'
import data from '../../../public/data.json'
import HeroCard from '../ui/herocard/HeroCard'
const Team = () => {
    const [members, setMembers] = useState([])
    useEffect(() => {
        if (data) {
            setMembers(data.team_member)
        }
    }, [data])
    return (
        <>
            <HeroCard page={'Team'} />
            <section className="team-member">
                <h3>we are the best</h3>
                <h2><span>dream </span> team</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis,
                    pulvinar dapibus leo.
                </p>
                <div className='members'>
                    {
                        members && members.map(member => {
                            return (
                                <div className='member' key={member.id}>
                                    <img src={member.img} className="member-img" alt="" />
                                    <h3 className="member-name">{member.name}</h3>
                                    <p className="member-track">{member.track}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>        </>
    )
}

export default Team