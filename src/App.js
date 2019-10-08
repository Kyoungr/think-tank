import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from "./components/Register/Register";
import './App.css';


//Where we create an iniitalState variable to reset the state once a user logs out
const iniitalState = {
  input: '',
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {


  constructor(){
    super();
    this.state = iniitalState;
  }

 
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


/**
 * Function used to change the state of the application based on what has been inputted from the user
 * @param  {event} 
 * 
 */
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  /**
 * Funtion used to set the state based on which route the application is on
 * @param  {route} 
 */
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(iniitalState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {

    const {isSignedIn, route } = this.state;

    return (

    //Where we render our components and set up the structure for our application
    <div className="App">
     <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
     {route === 'home' 
     ? 
     <div>
       <Logo />
     </div>
     : (
      route === 'signin'
      ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
     )
     }
    </div>
  );
  }
}

export default App;
