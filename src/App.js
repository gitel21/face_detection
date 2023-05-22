import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceDetection from './components/FaceDetection/FaceDetection';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import ParticlesBg from 'particles-bg';

const initialState = {
   input: '',
   imageUrl: '',
   boxes: [],
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
      this.state = initialState;
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

   calculateFaceLocation = (clarifaiOutput) => {
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      const faces = clarifaiOutput.outputs[0].data.regions;
      return faces.map(face => {
         const clarifaiFace = face.region_info.bounding_box;
         return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
         }
      })
   }
   
   displayFaceBox = (boxes) => {
      this.setState({boxes: boxes});
   }

   onInputChange = (event) => {
      this.setState({input: event.target.value});
   }

   onBtnSubmit = () => {
      this.setState({imageUrl: this.state.input});
         fetch('https://morning-depths-69919.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
               input: this.state.input
            })
         })
         .then(response => response.json())
         .then(response => {
            if(response) {
               fetch('https://morning-depths-69919.herokuapp.com/image', {
                  method: 'put',
                  headers: {'Content-type': 'application/json'},
                  body: JSON.stringify({
                     id: this.state.user.id
                  })
               })
                  .then(count => count.json())
                  .then(count => {
                     this.setState(Object.assign(this.state.user, {
                        entries: count}))
                  })
                  .catch(console.log)
               }
            this.displayFaceBox(this.calculateFaceLocation(response))
         })
         .catch(err => console.log(err))
   }

   onRouteChange = (route) => {
      if (route === 'signout'){
         this.setState(initialState)
      } else if (route === 'home'){
         this.setState({isSignedIn: true})
      }
      this.setState({route: route})
   }

   render() {
      const { isSignedIn, imageUrl, route, boxes, user } = this.state;
      return (
         <div className="App">
            <ParticlesBg color="#FFEE00" num={150} type="cobweb" bg={true} />
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
            { route === 'home'
               ? <div>
                     <Logo />
                     <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit} />
                     <Rank name={user.name} entries={user.entries}/>
                     <FaceDetection boxes={boxes} imageUrl={imageUrl} />
                 </div>
               : (
                  route === 'signin' 
                  ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                 )
            }
         </div>
      )
   }
}

export default App;
