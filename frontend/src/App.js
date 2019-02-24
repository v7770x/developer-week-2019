import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Dropdown,
  Menu,
  Container
} from 'semantic-ui-react';
import {
  Route,
  Switch,
  Link
} from 'react-router-dom';
import LandingPage from './components/LandingPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu inverted color='purple'>
          <Menu.Item><Link to='/'> Home </Link></Menu.Item>
          <Menu.Item><Link to='/birds'> Birds </Link></Menu.Item>
        </Menu>

        <section>
          <Container>
            <Switch>
              <Route exact path='/' component={LandingPage} />
            </Switch>
          </Container>
        </section>
      </div>
    );
  }
}

export default App;