import React from 'react';
import './App.css';
//import Home from './home';
import Header from './components/molecules/header';
import Footer from './components/molecules/footer';
import GPaper from './components/atoms/gpaper';
import GButton from './components/atoms/button';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <Header userName="PAULA" />
      <GPaper>
        <GButton
          text='blue'
          type='blue'
        /> 

        <GButton
          text='purple'
          type='purple'
        /> 

        <GButton
          text='orange'
          type='orange'
        /> 

        <GButton
          text='red'
          type='red'
        /> 
      </GPaper>
      <Footer />
    </div>
  );
}

export default App;
