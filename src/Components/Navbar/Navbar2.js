//navbar2 is planter
import React from "react";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import './Navbar.css'

export const Navbar2 = () =>{
    return(
        <div className="Navbar">
            <div className="Navbar_logo">
                HARITHA AGROS
            </div>
            <div className="Navbar_option-set">
                <div className="Navbar_option">
                    <div className="Navbar_option_icon">
                        <HowToRegIcon/>
                    </div>
                    <div className="Navbar_option_text">View Update</div>
                </div>
                <div className="Navbar_option">
                    <div className="Navbar_option_icon">
                    <RAccessTimeIcon/>
                    </div>
                    <div className="Navbar_option_text">View Arrivals</div>
                </div>
                <div className="Navbar_option">
                    <div className="Navbar_option_icon">
                        <AnalyticsIcon/>
                    </div>
                    <div className="Navbar_option_text">Predictions</div>
                </div>
                <div className="Navbar_option">
                    <div className="Navbar_option_icon">
                        <HThunderstormIconn/>
                    </div>
                    <div className="Navbar_option_text">Weather</div>
                </div>
            </div>
        </div>
    );
}

export default Navbar2;