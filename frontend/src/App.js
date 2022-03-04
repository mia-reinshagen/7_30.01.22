import React from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Pages

import Home from './pages/Home.pages';
import SignUp from './pages/Signup.pages';
import SignIn from './pages/Signin.pages';
import Profil from './pages/Profil.pages';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
		<Router>
			<GlobalStyle />
			<Navbar/>
			<Switch>
				<Route path="/home" exact component={Home} />
				<Route path="/signup" exact component={SignUp} />
				<Route path="/signin" exact component={SignIn} />
        <Route path="/profil" exact component={Profil} />
			</Switch>
      <Footer />
			
		</Router>
	);
}

export default App;
