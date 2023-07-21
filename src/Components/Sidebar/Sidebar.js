//navbar is collector dashboard
import React from "react";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import RateReviewIcon from '@mui/icons-material/RateReview';
import './Sidebar.css'

export const Sidebar = () =>{
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
                    <div className="Navbar_option_text">Update</div>
                </div>
                <div className="Navbar_option">
                    <div className="Navbar_option_icon">
                    <RateReviewIcon/>
                    </div>
                    <div className="Navbar_option_text">Set Arrivals</div>
                </div>
                <div className="Navbar_option">
                    <div className="Navbar_option_icon">
                        <RateReviewIcon/>
                    </div>
                    <div className="Navbar_option_text">Planter Registration</div>
                </div>
                <div className="Navbar_option">
                    <div className="Navbar_option_icon">
                        <HowToRegIcon/>
                    </div>
                    <div className="Navbar_option_text">Weather</div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;