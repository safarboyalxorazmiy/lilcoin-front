import './index.css';
import { item1, item2, item3, item4, item5 } from './images';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CoinPage from './pages/CoinPage';
import InvitePage from './pages/InvitePage';
import AdvertizementPage from './pages/AdvertizementPage';
import BoostPage from './pages/BoostPage';
import SocialPage from './pages/SocialPage';

const App = () => {
  return (
    <Router>
      <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
        <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
          <Routes>
            <Route path="/advertisement" element={<AdvertizementPage />} />
            <Route path="/boost" element={<BoostPage />} />
            <Route path="/coin/:token" element={<CoinPage />} />
            <Route path="/invite" element={<InvitePage />} />
            <Route path="/social" element={<SocialPage />} />
          </Routes>
          
          <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
            <div className="w-full flex justify-between gap-2">
              <div className="flex-grow flex items-center max-w-100 text-sm">
                <div className="w-full bg-menu py-4 rounded-2xl flex justify-around">
                  <Link to="/advertisement">
                    <button className="flex flex-col items-center gap-1">
                      <img src={item1} width={44} />
                    </button>
                  </Link>

                  <Link to="/boost">
                    <button className="flex flex-col items-center gap-1">
                      <img src={item2} width={44} />
                    </button>
                  </Link>

                  <Link to="/invite">
                    <button className="flex flex-col items-center gap-1">
                      <img src={item3} width={44} />
                    </button>
                  </Link>
                  
                  <Link to="/coin">
                    <button className="flex flex-col items-center gap-1">
                      <img src={item4} width={44} />
                    </button>
                  </Link>
                  
                  <Link to="/social">
                    <button className="flex flex-col items-center gap-1">
                      <img src={item5} width={44} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

