import React, { memo } from 'react'
import './Portfolio.css'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Image1 from '../../../../assets/img/portofile/01.jpg'
import Image2 from '../../../../assets/img/portofile/02.jpg'
import Image3 from '../../../../assets/img/portofile/03.jpg'
import Image4 from '../../../../assets/img/portofile/04.jpg'
import Image5 from '../../../../assets/img/portofile/05.jpg'
import Image6 from '../../../../assets/img/portofile/06.jpg'

const Portfolio = memo(() => {
    const options = {
        items: 3, // Number of items to display
        margin: 10, // Margin between items
        responsive: {
            0: {
                items: 1 // Number of items to display on small screens
            },
            768: {
                items: 3 // Number of items to display on medium screens
            },
            1024: {
                items: 4 // Number of items to display on large screens
            }
        }
    };
    const images = [
        { image: Image1 },
        { image: Image2 },
        { image: Image3 },
        { image: Image4 },
        { image: Image5 },
        { image: Image6 },
    ]
    return (
        <>
            <section className="portfolio-area pt-16 pb-16">
                <div className="site-heading text-center">
                    <span className="site-title-tagline">Portfolio</span>
                    <h2 className="site-title">Explore <span>Portfolio</span></h2>
                    <div className="heading-divider"></div>
                </div>
                <OwlCarousel className='owl-theme' loop autoplay margin={20} responsive={options.responsive} items={4} >
                    {images.map(ele =>
                    (
                        <div className="portfolio-item">
                            <div className="portfolio-img">
                                <img src={ele.image} alt="" />
                            </div>
                            <div className="portfolio-content">
                                <a className="popup-img portfolio-link" href="assets/img/portfolio/01.jpg"><i className="far fa-plus"></i></a>
                                <div className="portfolio-info">
                                    <h5 className="portfolio-subtitle"><span>//</span> Car Wash</h5>
                                    <a href="#">
                                        <h4 className="portfolio-title">Full Car Wash</h4>
                                    </a>
                                </div>
                            </div>
                        </div>))
                    }
                </OwlCarousel>
            </section>

        </>
    )
})

export default Portfolio