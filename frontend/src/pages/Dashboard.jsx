import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

import WelcomeBanner from "../components/Dashboard/WelcomeBanner";
import SummaryCards from "../components/Dashboard/SummaryCards";
import RecentActivity from "../components/Dashboard/RecentActivity";

const Dashboard = () => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const token = urlParams.get("token");

    //     if (token) {
    //         localStorage.setItem("auth_token", token);
    //         window.history.replaceState(null, "", "/dashboard");
    //     } else {
    //         const storedToken = localStorage.getItem("auth_token");
    //         if (!storedToken) {
    //             navigate("/login");
    //         }
    //     }
    // }, [navigate]);

    const userName = useSelector((state) => state.user?.name || 'Guest')
    
    return (
        <div className="space-y-6 px-4 py-6">
            <WelcomeBanner userName={userName} />
            <SummaryCards />
            <RecentActivity />
        </div>
    );
    };

export default Dashboard;