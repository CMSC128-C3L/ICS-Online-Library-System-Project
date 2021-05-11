import logo from './logo.svg';
import './App.css';
import AdminHome from './pages/AdminHome';
import Button from '@material-ui/core/Button'
import { Fragment } from 'react';

function App() {
  return (
    <div className="App">

      <Fragment>
        <Button>hello</Button>
      </Fragment>
      
      <AdminHome />
    </div>
  );
}

export default App;
