import './App.css';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Workflows from './Workflows';
import WorkflowForm from './WorkflowForm';
import WorkflowDetails from './WorkflowDetails';

function App() {
  return (
    <div className="App">
        {/*Links to different forms*/}
        <Router>
            <Routes>
                <Route path="/" element={<Workflows/>} />
                <Route path="/workflows" element={<Workflows/>} />
                <Route path="/createworkflow" element={<WorkflowForm/>} />
                <Route path="/workflow/:id" element={<WorkflowDetails/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
