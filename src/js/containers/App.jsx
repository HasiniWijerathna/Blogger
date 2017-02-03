import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HeaderBar from '../components/HeaderBar';
import Footer from '../components/Footer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  fontFamily: 'Overpass, sans-serif',
});

const App = ({children}) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <HeaderBar logo="/img/logo.png"/>
      <section>
        {children || 'Blogger App loading...'}
      </section>
      <Footer/>
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default App;
