import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    theToys: []
  }

  componentDidMount(){
  fetch('http://localhost:3000/toys')
  .then(r => r.json())
  .then(toys => this.setState({ theToys: toys}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  toyData = toy => {
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(toy)
    }
    fetch('http://localhost:3000/toys', configObj)
    .then(r => r.json())
    .then(toy => 
      this.setState({
        theToys: [...this.state.theToys.toy]
      }))
  }

  deleteToy = (id, parentNode) => {
    console.log('here')

    const configObj = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    fetch(`http://localhost:3000/toys/${id}`, configObj)
    .then(r => r.json())
    .then(parentNode.remove)
  }

  patchLikes = toy =>{

    toy.likes += 1

    const toyObj = {
      likes: toy.likes
    }

    const configObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(toyObj)
    }
    fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
    .then(r => r.json())
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm toyData={this.toyData}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer deleteToy={this.deleteToy} patchLikes={this.patchLikes} toys={this.state.theToys}/>
      </>
    );
  }

}

export default App;
