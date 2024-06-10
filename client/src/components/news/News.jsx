import React, { memo } from 'react'
import HeroCard from '../ui/herocard/HeroCard'

const News = memo(() => {
    return (
        <>
            <HeroCard page={"News"} />
        </>
    )
})

export default News