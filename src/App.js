import React from 'react';
import './App.css';
//import Home from './home';
import Buyer from './buyer';
import DeliverNotFound from './buyer/screens/deliverNotFound';

function App() {
  return (
    <div className="App">
      <Buyer gender="female" name="PAULA" />
      {/* <DeliverNotFound name="PAULA" /> */}
    </div>
  );
}

export default App;
