import React, { useState, useEffect, useRef } from "react";
import './dashboard.css'
import { useUser } from '../UserSession'
import { useNavigate } from 'react-router-dom';
import dailyUsageData from './components/test-data/dailyUsageDaata';
import monthCostData from './components/test-data/monthCostData';
import DailyUsageLineChart from "./components/chart/chart";
import MonthlyCostLineChart from "./components/chart/monthlychart";
import { Button } from "./components/button/Button";

import Navbar from "./components/nav";

export default function Dashboard() {
    const {user ,setLoggedUser, isAdmin, setAdminStatus} = useUser();
    const navigate = useNavigate();
    const [userName, setUsername] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userAddr, setUserAddr] = useState(null);
    const [userPhone, setUserPhone] = useState(null);
    const [accountID, setAccountID] = useState(null);

    const testData = dailyUsageData;
    const test2Data = monthCostData;

    if (user == null) {
        navigate('/');
    }

    const handleLogOut =() => {
        setLoggedUser(null);
        setAdminStatus(false);
        navigate('/');
    }
    

    const fetchUserDetails = async() => {
        try{
            const resp = await fetch(`http://localhost:5000/users/${user}/getDetails`);
            const json = await resp.json();
            setUsername(json.name);
            setUserEmail(json.email);
            setUserAddr(json.address);
            setUserPhone(json.phoneNumber);
            setAccountID(json.accountNumber);
            // console.log("Formatted Details: ", json);
        } catch (error) {
            console.log("error", error);
        }
    }

    if(userName === null && userEmail === null){
        fetchUserDetails();
    }

    const moveToSettings = () =>{
        navigate("/settings")
    }


    return(
    <>  
        <Navbar/>
        <div className='dashboard'>
            <h1 className='dashboard-text'>Account Dashboard</h1>

            <div className='dash-layers'>
                <div className="dash-layer1">   
                    <h3 className="layer-headertext">Accounts Overview</h3>
                    <div className='id-layers'>
                        <p1 className='layer-small'>Account ID:{accountID}</p1>
                        <p1 className='layer-small'>Premise ID:{accountID}</p1>
                        <p1 className='layer-small'>Meter ID:{accountID}</p1>
                    </div>
                    <div className='personal-info'>
                        <p1>{userName}</p1>
                        <p1>{userEmail}</p1>
                        <p1>{userAddr}</p1>
                        <p1>{userPhone}</p1> 
                    </div>
                    <div className='usage-payments'>
                        <h3>Electricity</h3>
                        <p3>Distributed by HydroSec</p3>
                        <p2>Total Usage: 900kWh</p2>
                        <p2>Cost Per: $0.103</p2>
                        <p1>Total Cost: $159.78</p1>
                        <p2>Statement Date: 1/1/2024</p2>
                        <p2>Payment Due On: 1/18/2024</p2>
                    </div>
                </div>

                <div className="dash-layer2">
                    <h3 className="layer-headertext">Consumption Overview</h3>
                    <h1>Daily Usage</h1>
                    <div className="usage-container">
                        <h1>39.1</h1>
                        <p3>kWh</p3>
                    </div>
                    <h1>Monthly Average</h1>
                    <div className="avg-usage-container">
                        <h1>39.1</h1>
                        <p3>kWh</p3>
                    </div>
                    <div className="change-container">
                        <h1>Net Change:  11%</h1>
                        <p2>Note this is number is derived from your average monthly usage. It is subject to change every date depending on degree of usage</p2>
                    </div>
                </div>

                <div className="dash-layer3">
                    <div className='dash-layer-top'>
                        <h1>Energy Usage</h1>
                        <DailyUsageLineChart data={testData} />
                    </div>

                    <div className='dash-layer-top'>
                        <h1>Monthly Cost</h1>
                        <MonthlyCostLineChart className='chat' data={test2Data} />
                    </div>
                </div>
                <div className="dash-layer4">
                    <h3 className="layer-headertext">View User Activity</h3>
                    <Button
                        buttonColor="primary"
                        buttonSize="btn-medium"
                        buttonStyle="btn-primary"
                        onClick={moveToSettings}
                    >
                        Settings
                    </Button>
                </div>
            </div>
        </div>



        {/* Used for verifying if user is not null          */}
        {/* <h1>{user}</h1>
        { user != null && (<button  onClick={handleLogOut}>log out</button>)} */}

    </>
    )
}