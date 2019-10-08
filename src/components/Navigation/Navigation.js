import React from 'react';


/**
 * Function that changes the screen the user is on based off of which button they click.
 * @param  {onRouteChange} 
 * @param  {isSignedIn}   
 */
const Navigation = ({onRouteChange, isSignedIn}) => {
        if(isSignedIn){
            return(
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 point'>Sign Out</p>
        </nav>
            );
        } else {
            return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 point'>Register</p>
            <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 point'>Sign in</p>
        </nav>
       );
    }
}

export default Navigation;