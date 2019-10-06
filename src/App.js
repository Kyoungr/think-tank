import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin'
import Register from "./components/Register/Register"
import './App.css';

class App extends Component {

  constructor(){
    super();

    this.state = {
      input: '',
      route: 'signin',
      isSignedIn: false
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    if (route === "signout"){
      this.setState({isSignedIn: false})
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {

    const {isSignedIn, route } = this.state;

    return (
    <div className="App">
     <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
     {route === 'home' 
     ? 
     <div>
       <Logo />
     </div>
     : (
       this.state.route === 'signin'
       ? <Signin onRouteChange={this.onRouteChange} /> 
       : <Register onRouteChange={this.onRouteChange} />
     )
     }
    </div>
  );
  }
}

export default App;
