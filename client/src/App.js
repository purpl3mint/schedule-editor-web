//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';


function App() {
  const {token, login, logout} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{token, login, logout, isAuthenticated}}>
      <Router>
        { isAuthenticated && <Navbar /> }
        <div className='wrapper'>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
}

export default App;
