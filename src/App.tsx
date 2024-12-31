import './index.css';
import { item1, item2, item3, item4, item5 } from './images';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CoinPage from './pages/CoinPage';
import InvitePage from './pages/InvitePage';
import AdvertizementPage from './pages/AdvertizementPage';
import BoostPage from './pages/BoostPage';
import SocialPage from './pages/SocialPage';
import { Navigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">
      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        <Routes>
          <Route path="/" element={<Navigate to="/coin" />} />
          <Route path="/advertisement" element={<AdvertizementPage />} />
          <Route path="/boost" element={<BoostPage />} />
          <Route path="/coin" element={<CoinPage />} />
          <Route path="/invite" element={<InvitePage />} />
          <Route path="/social" element={<SocialPage />} />
        </Routes>

        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <div className="w-full flex justify-between gap-2">
            <div className="flex-grow flex items-center max-w-100 text-sm">
              <div className="w-full bg-menu py-4 rounded-2xl flex justify-around">
                <button onClick={() => navigate('/advertisement')} className="flex flex-col items-center gap-1">
                  <img src={item1} width={44} />
                </button>
                <button onClick={() => navigate('/boost')} className="flex flex-col items-center gap-1">
                  <img src={item2} width={44} />
                </button>
                <button onClick={() => navigate('/invite')} className="flex flex-col items-center gap-1">
                  <img src={item3} width={44} />
                </button>
                <button onClick={() => navigate('/coin')} className="flex flex-col items-center gap-1">
                  <img src={item4} width={44} />
                </button>
                <button onClick={() => navigate('/social')} className="flex flex-col items-center gap-1">
                  <img src={item5} width={44} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;