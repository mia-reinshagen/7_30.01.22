import React,{useState,useEffect} from 'react';
import GlobalStyle from './globalStyles';
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom';
import { GlobalContext } from './Context/globalContext';
import axios from 'axios';
//Pages

import Home from './pages/Home.pages';
import SignUp from './pages/Signup.pages';
import SignIn from './pages/Signin.pages';
import Profil from './pages/Profil.pages';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PostCreate from './pages/PostCreate.pages';
import OnePost from './pages/Post.pages';
import './app.css';


function App() {

  const [appContext, setAppContext] = useState({
    authState : {
                  username: "",
                  userid: 0,
                  isconnected: false,
                  isadmin:false,
                  imgprofil: "",
                  created:null
                },
    postsState:[]
  });

    useEffect(() => {
    axios
      .get("http://localhost:3500/api/auth/authuser", {
        headers: {
          connectedToken: localStorage.getItem("connectedToken"),
        },
      })
      .then((response) => { 
      console.log(response)
        if (response.data.error) {
          setAppContext({ 
            ...appContext,
            authState:{...appContext.authState, isconnected: false }});
        } else {
          setAppContext({
            ...appContext,
            authState:{
            username: response.data.username,
            userid: response.data.id,
            isconnected: true,
            isadmin: response.data.isAdminAccount,
            imgprofil: response.data.filename,
            created: response.data.createdAt
            }
          });
        }
      });
  }, [appContext.authState.isconnected]);


  return (
     <GlobalContext.Provider value={{ appContext, setAppContext}}>
    <Router>
      <GlobalStyle />
      <Navbar/>
      <Switch>
       
          <Route path="/" exact component={Home}/>
               
                {/* <Route path="/profil" exact={true} component={()=> {return appContext.authState.isconnected ? <Profil/> : < Redirect to="/" />}}/> */}
                <Route path="/profil" exact={true} component={Profil}/>
                <Route path="/createpost" exact={true} component={()=> {return appContext.authState.isconnected ? <PostCreate/> : < Redirect to="/" />}}/>
                {/* <Route path="/post/:id" exact={true} component={()=> {return appContext.authState.isconnected ? <OnePost/> : < Redirect to="/" />}}/> */}
                <Route path="/post/:id" exact component={OnePost} />
                <Route path="/signup" exact={true} component={()=> {return !appContext.authState.isconnected ? <SignUp/> : < Redirect to="/" />}}/>
                <Route path="/signin" exact={true} component={()=> {return !appContext.authState.isconnected ? <SignIn/> : < Redirect to="/" />}}/>


      </Switch>
      <Footer />
      
    </Router>
  </GlobalContext.Provider>
  );
}

export default App;