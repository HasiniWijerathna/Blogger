import React from 'react';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderBar from '../components/HeaderBar';

const App = ({children}) => (
  <MuiThemeProvider>
    <div>
      <HeaderBar/>
      <header>
        <h1>React Starterify</h1>
        <Link to="/home">Home</Link>
        <Link to="/blogs">Blogs</Link>
      </header>
      <section>
        {children || 'Welcome to React Starterify'}
      </section>
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default App;
