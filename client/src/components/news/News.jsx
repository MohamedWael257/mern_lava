import React, { memo } from 'react'
import HeroCard from '../ui/herocard/HeroCard'

const News = memo(() => {
    return (
        <>
            <HeroCard page={"News"} />
            <section className="news">
                News
            </section>
        </>
    )
})

export default News