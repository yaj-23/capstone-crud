import React from 'react'
import "./nav.css";
import logo from '../../images/newlogo.svg';
import {Button} from './button/Button';
import { Link, useNavigate, redirect  } from 'react-router-dom';
import { useUser } from '../../UserSession';


export default function Navbar() {
    const navigate = useNavigate ();
    const {user ,setLoggedUser, isAdmin, setAdminStatus} = useUser();

    const logoutBackend = async () => {
        try{
            const resp = await fetch("http://localhost:5000/logout", {
                method: "post",
                headers: {
                "Content-Type": "application/json",
                },
            });
            if (resp.ok) {
                setLoggedUser(null);
                setAdminStatus(false);
                console.log("Logged User Out");
            }
        } catch(error) {
            console.log(error);
            return null;
        }
    }

    const handleLogOut =() => {
        setLoggedUser(null);
        setAdminStatus(false);
        logoutBackend();
        navigate('/about');
    }
    
    const handleLogoClick =() => {
        navigate('/');
    }

    return (
        <div className='navbar'>
            <div className='navbar-container-logo'>
                <img className='logo' src={logo} onClick={handleLogoClick} alt=""/>
            </div>
            <div className='navbar-container-links'>
                <div className='navbar-links'> 
                    <ul className='custom-ul'><li><Link to='/about' className='custom-link'>About</Link></li></ul>
                    <ul className='custom-ul'><li><Link to='/signin' className='custom-link'>For Employees</Link></li></ul>
                </div>
                {/* <div className='navbar-end-button'>
                    <Link to='/signup'><Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary'>sign up</Button></Link>
                </div> */}
                <div className='navbar-end-button'>
                    {user ? (
                        <Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary' onClick={handleLogOut}>Logout</Button>
                    ) : (
                        <Link to='/signup'><Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary'>Sign up</Button></Link>
                    )}
                </div>
            </div>
        </div>
    )
}
