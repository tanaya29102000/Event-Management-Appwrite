import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateEvent from './components/CreateEvent';  // Updated component name
import ShowEvents from './components/ShowEvents';    // Updated component name

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CreateEvent />} />
        <Route path="/show" element={<ShowEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
