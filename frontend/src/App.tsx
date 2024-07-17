import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BlockList } from './components/BlockList';
import { BlockDetails } from './components/BlockDetails';
import { TransactionDetails } from './components/TransactionDetails';
import { SearchBar } from './components/SearchBar';

function App() {
  return (
    <Router>
      <div className="App">
        <SearchBar />
        <Routes>
          <Route path="/" element={<BlockList />} />
          <Route path="/block/:blockNumber" element={<BlockDetails />} />
          <Route path="/tx/:signature" element={<TransactionDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;