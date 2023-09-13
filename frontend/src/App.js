import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Explore from './components/Explore/Explore';
import ListingDetailPage from './components/ListingDetailPage/ListingDetailPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/listings' element={<Explore />} />
        <Route path='/detail/:property_id' element={<ListingDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
