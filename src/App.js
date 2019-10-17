import React from 'react';
import './App.css';
//import Home from './home';
import Header from './components/molecules/header';
import Footer from './components/molecules/footer';
import GPaper from './components/atoms/gpaper';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <Header userName="PAULA" />
      <GPaper>Ola</GPaper>
      <Footer />
    </div>
  );
}

export default App;
