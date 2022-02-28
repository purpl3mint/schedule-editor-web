//import logo from './logo.svg';
import './App.css';
import 'materialize-css'
import { HeadTag } from './components/HeadTag';
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
        <HeadTag />
        { isAuthenticated && <Navbar /> }
        <div className='wrapper'>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
