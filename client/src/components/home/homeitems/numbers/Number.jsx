import React, { memo } from 'react'
import './Number.css'
const Number = memo(() => {
    return (
        <>
            <div className="section numbers" id="services">
                <div className="container">
                    <div className="items">
                        <div className="item">
                            <i className="icon fa fa-users fa-2x"></i>
                            <h3 className="item-title">451k</h3>
                            <span className="item-text">happy clients</span>
                        </div>
                        <div className="item">
                            <i className="icon fa fa-trophy fa-2x"></i>
                            <h3 className="item-title">12</h3>
                            <span className="item-text">awards won</span>
                        </div>
                        <div className="item">
                            <i className="icon fa fa-coffee fa-2x"></i>
                            <h3 className="item-title">154k</h3>
                            <span className="item-text">cups of coffee</span>
                        </div>
                        <div className="item">
                            <i className="icon fa fa-file fa-2x"></i>
                            <h3 className="item-title">45</h3>
                            <span className="item-text">projects completed</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
})

export default Number