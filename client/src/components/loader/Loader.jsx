import React from 'react'
import './Loader.css'
const Loader = () => {
    return (
        <>
            <div className="bodyloader">
                <div className="scene" style={{ "--hue": 260, "--saturation": 53, "--lightness": 68 }}>
                    <div className="word">
                        <div className="letter__wrap" style={{ "--index": 0 }}>
                            <div className="letter" data-letter="L"><span className="letter__panel" aria-hidden="true">L</span><span className="letter__panel" aria-hidden="true">W</span><span className="letter__panel" aria-hidden="true">L</span><span className="letter__panel" aria-hidden="true">W</span><span className="letter__panel"></span></div>
                        </div>
                        <div className="letter__wrap" style={{ "--index": 1 }}>
                            <div className="letter" data-letter="o"><span className="letter__panel" aria-hidden="true">o</span><span className="letter__panel" aria-hidden="true">a</span><span className="letter__panel" aria-hidden="true">o</span><span className="letter__panel" aria-hidden="true">a</span><span className="letter__panel"></span></div>
                        </div>
                        <div className="letter__wrap" style={{ "--index": 2 }}>
                            <div className="letter" data-letter="a"><span className="letter__panel" aria-hidden="true">a</span><span className="letter__panel" aria-hidden="true">i</span><span className="letter__panel" aria-hidden="true">a</span><span className="letter__panel" aria-hidden="true">i</span><span className="letter__panel"></span></div>
                        </div>
                        <div className="letter__wrap" style={{ "--index": 3 }}>
                            <div className="letter" data-letter="d"><span className="letter__panel" aria-hidden="true">d</span><span className="letter__panel" aria-hidden="true">t</span><span className="letter__panel" aria-hidden="true">d</span><span className="letter__panel" aria-hidden="true">t</span><span className="letter__panel"></span></div>
                        </div>
                        <div className="letter__wrap" style={{ "--index": 4 }}>
                            <div className="letter" data-letter="i"><span className="letter__panel" aria-hidden="true">i</span><span className="letter__panel" aria-hidden="true">.</span><span className="letter__panel" aria-hidden="true">i</span><span className="letter__panel" aria-hidden="true">.</span><span className="letter__panel"></span></div>
                        </div>
                        <div className="letter__wrap" style={{ "--index": 5 }}>
                            <div className="letter" data-letter="n"><span className="letter__panel" aria-hidden="true">n</span><span className="letter__panel" aria-hidden="true">.</span><span className="letter__panel" aria-hidden="true">n</span><span className="letter__panel" aria-hidden="true">.</span><span className="letter__panel"></span></div>
                        </div>
                        <div className="letter__wrap" style={{ "--index": 6 }}>
                            <div className="letter" data-letter="g"><span className="letter__panel" aria-hidden="true">g</span><span className="letter__panel" aria-hidden="true">.</span><span className="letter__panel" aria-hidden="true">g</span><span className="letter__panel" aria-hidden="true">.</span><span className="letter__panel"></span></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Loader