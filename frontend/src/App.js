import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Pages

import Home from './pages/Home.pages';
import SignUp from './pages/Signup.pages';
import SignIn from './pages/Signin.pages';
import Profil from './pages/Profil.pages';

function App() {
  return (
		<Router>
			<GlobalStyle />
			
			<Switch>
				<Route path="/home" exact component={Home} />
				<Route path="/signup" exact component={SignUp} />
				<Route path="/signin" exact component={SignIn} />
        <Route path="/profil" exact component={Profil} />
			</Switch>
			
		</Router>
	);
}

export default App;
