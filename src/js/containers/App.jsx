import React from 'react';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderBar from '../components/HeaderBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  fontFamily: 'Overpass, sans-serif',
});

const App = ({children}) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <HeaderBar/>
      <section>
        {children || 'Blogger App loading...'}
      </section>
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default App;
