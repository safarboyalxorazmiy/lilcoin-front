import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './HomeScreen';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;