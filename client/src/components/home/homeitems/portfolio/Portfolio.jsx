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

    return (
        <>
            <section className="portfolio-area pt-16 pb-16">
                <div class="site-heading text-center">
                    <span class="site-title-tagline">Portfolio</span>
                    <h2 class="site-title">Explore <span>Portfolio</span></h2>
                    <div class="heading-divider"></div>
                </div>
                <OwlCarousel className='owl-theme' loop autoplay margin={20} responsive={options.responsive} items={4} >
                    <div class="portfolio-item">
                        <div class="portfolio-img">
                            <img src={Image1} alt="" />
                        </div>
                        <div class="portfolio-content">
                            <a class="popup-img portfolio-link" href="assets/img/portfolio/01.jpg"><i class="far fa-plus"></i></a>
                            <div class="portfolio-info">
                                <h5 class="portfolio-subtitle"><span>//</span> Car Wash</h5>
                                <a href="#">
                                    <h4 class="portfolio-title">Full Car Wash</h4>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-img">
                            <img src={Image2} alt="" />
                        </div>
                        <div class="portfolio-content">
                            <a class="popup-img portfolio-link" href="assets/img/portfolio/01.jpg"><i class="far fa-plus"></i></a>
                            <div class="portfolio-info">
                                <h5 class="portfolio-subtitle"><span>//</span> Car Wash</h5>
                                <a href="#">
                                    <h4 class="portfolio-title">Full Car Wash</h4>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-img">
                            <img src={Image3} alt="" />
                        </div>
                        <div class="portfolio-content">
                            <a class="popup-img portfolio-link" href="assets/img/portfolio/01.jpg"><i class="far fa-plus"></i></a>
                            <div class="portfolio-info">
                                <h5 class="portfolio-subtitle"><span>//</span> Car Wash</h5>
                                <a href="#">
                                    <h4 class="portfolio-title">Full Car Wash</h4>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-img">
                            <img src={Image4} alt="" />
                        </div>
                        <div class="portfolio-content">
                            <a class="popup-img portfolio-link" href="assets/img/portfolio/01.jpg"><i class="far fa-plus"></i></a>
                            <div class="portfolio-info">
                                <h5 class="portfolio-subtitle"><span>//</span> Car Wash</h5>
                                <a href="#">
                                    <h4 class="portfolio-title">Full Car Wash</h4>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-img">
                            <img src={Image5} alt="" />
                        </div>
                        <div class="portfolio-content">
                            <a class="popup-img portfolio-link" href="assets/img/portfolio/01.jpg"><i class="far fa-plus"></i></a>
                            <div class="portfolio-info">
                                <h5 class="portfolio-subtitle"><span>//</span> Car Wash</h5>
                                <a href="#">
                                    <h4 class="portfolio-title">Full Car Wash</h4>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-img">
                            <img src={Image6} alt="" />
                        </div>
                        <div class="portfolio-content">
                            <a class="popup-img portfolio-link" href="assets/img/portfolio/01.jpg"><i class="far fa-plus"></i></a>
                            <div class="portfolio-info">
                                <h5 class="portfolio-subtitle"><span>//</span> Car Wash</h5>
                                <a href="#">
                                    <h4 class="portfolio-title">Full Car Wash</h4>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* <div class="portfolio-item">
                        <div class="portfolio-img">
                            <img src={Image} alt="" />
                        </div>
                        <div class="portfolio-content">
                            <a class="popup-img portfolio-link" href="assets/img/portfolio/01.jpg"><i class="far fa-plus"></i></a>
                            <div class="portfolio-info">
                                <h5 class="portfolio-subtitle"><span>//</span> Car Wash</h5>
                                <a href="#">
                                    <h4 class="portfolio-title">Full Car Wash</h4>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="portfolio-item">
                        <div class="portfolio-img">
                            <img src={Image} alt="" />
                        </div>
                        <div class="portfolio-content">
                            <a class="popup-img portfolio-link" href="assets/img/portfolio/01.jpg"><i class="far fa-plus"></i></a>
                            <div class="portfolio-info">
                                <h5 class="portfolio-subtitle"><span>//</span> Car Wash</h5>
                                <a href="#">
                                    <h4 class="portfolio-title">Full Car Wash</h4>
                                </a>
                            </div>
                        </div>
                    </div> */}
                </OwlCarousel>
            </section>

        </>
    )
})

export default Portfolio