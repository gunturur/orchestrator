import './App.css';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
//import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Workflows from './workflows';

function App() {
  return (
    <div className="App">
        {/*Links to different forms*/}
        <Router>
            <Routes>
                <Route exact path="/" element={<Workflows/>}/>
                <Route path="workflows" element={<Workflows/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;