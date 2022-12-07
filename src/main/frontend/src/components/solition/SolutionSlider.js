import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Solution1_1 from "../../assets/img/solution/1/sample1.png";
import Solution1_2 from "../../assets/img/solution/1/sample2.png";
import Solution2_1 from "../../assets/img/solution/2/sample2.png";
import Solution2_2 from "../../assets/img/solution/2/sample2.png";
import Solution2_3 from "../../assets/img/solution/2/sample2.png";
import Solution3_1 from "../../assets/img/solution/3/sample3.png";
import Solution3_2 from "../../assets/img/solution/3/sample3.png";
import Solution3_3 from "../../assets/img/solution/3/sample3.png";
import Solution3_4 from "../../assets/img/solution/3/sample3.png";

function SolutionSlider({solutionId}) {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    let slider = '';

    if (solutionId == 1) {
        slider = (
            <Slider {...sliderSettings}>
                <div className="img-box">
                    <img src={Solution1_1}/>
                </div>
                <div className="img-box">
                    <img src={Solution1_2}/>
                </div>
            </Slider>
        );

    } else if (solutionId == 2) {
        slider = (
            <Slider {...sliderSettings}>
                <div className="img-box">
                    <img src={Solution2_1}/>
                </div>
                <div className="img-box">
                    <img src={Solution2_2}/>
                </div>
                <div className="img-box">
                    <img src={Solution2_3}/>
                </div>
            </Slider>
        );

    } else if (solutionId == 3) {
        slider = (
            <Slider {...sliderSettings}>
                <div className="img-box">
                    <img src={Solution3_1}/>
                </div>
                <div className="img-box">
                    <img src={Solution3_2}/>
                </div>
                <div className="img-box">
                    <img src={Solution3_3}/>
                </div>
                <div className="img-box">
                    <img src={Solution3_4}/>
                </div>
            </Slider>
        );
    }

    return slider;
}

export default SolutionSlider;
