import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="main-body-container">
          <Main />
        </div>
      </Router>
    </div>
  );
}

export default App;
