import React from 'react'
import { Link } from 'react-router-dom';
import { useUser } from '../UserSession';


export default function Homepage() {

    const {user ,setLoggedUser} = useUser();

    return (<>
    
    
    <div>Homepage</div>

    <div className = "buttons">
            {user != null && <Link to='/dashboard'><button >explore</button></Link>}
            {user == null && <Link to='/signin'><button >explore</button></Link>}
            <Link to='/signup'><button>sign up</button></Link>
    </div>

  </>)
}

