import React, { useState,useContext } from 'react';
import { FaRProject, FaTimes } from 'react-icons/fa';
import { CgMenuRight } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import {
	Nav,
	NavbarContainer,
	NavLogo,
	NavIcon,
	MobileIcon,
	NavMenu,
	NavLinks,
	NavItem,
} from './NavbarStyles.js';
import { useLocation, useHistory } from 'react-router-dom';
import { data } from '../../data/NavbarData';
import { GlobalContext } from '../../Context/globalContext';

const initAppState = {
    authState : {
                  username: "",
                  userid: 0,
                  isconnected: false,
                  isadmin:false,
                  imgprofil: ""
                },
    postsState:{
              postId: null,
              username: "",
              userId: null,
              postTitle:"",
              postText: "",
              postImage: null
    }            
  }

  
const Navbar = () => {
	const {appContext,setAppContext} = useContext(GlobalContext);
	console.log(appContext)
	const [show, setShow] = useState(false);

	let history = useHistory();
	let location = useLocation();

	const handleClick = () => {
		setShow(!show);
	};

	const scrollTo = (id) => {
		const element = document.getElementById(id);

		element.scrollIntoView({
			behavior: 'smooth',
		});
	};

	const logout = () => {
    /* pour se déconnecter, on retire le token du locasStorage */
    localStorage.removeItem("connectedToken");
    setAppContext(initAppState);
    window.location.pathname = "/signin";
  };

	const closeMobileMenu = (to, id) => {
		if (id && location.pathname === '/Home') {
			scrollTo(id);
		}
		
		if(id==="logout"){
			logout();
		}

		history.push(to);
		setShow(false);
	};

	return (
		<IconContext.Provider value={{ color: '#fff' }}>
			<Nav>
				<NavbarContainer>
					<NavLogo to="/">
						<NavIcon src="icon-left-font-monochrome-black.png" alt="logo" />
					</NavLogo>
					<MobileIcon onClick={handleClick}>
						{show ? <FaTimes /> : <CgMenuRight />}
					</MobileIcon>
					<NavMenu show={show}>
						
							{
								!appContext.authState.isconnected  ?
								(
								<>
									<NavItem>
										<NavLinks onClick={() => closeMobileMenu("/signin","signin")}>
											Sign In
										</NavLinks>
									</NavItem>
									<NavItem>
										<NavLinks onClick={() => closeMobileMenu("/signup","signup")}>
											Sign Up
										</NavLinks>
									</NavItem>
								</>
								) :
								(
								<>
									<NavItem>
										<NavLinks onClick={() => closeMobileMenu("/","home")}>
											Home
										</NavLinks>
									</NavItem>
									<NavItem>
										<NavLinks onClick={() => closeMobileMenu("/profil","profil")}>
											Profil<span><img src={appContext.authState.imgprofil} /></span>
										</NavLinks>
									</NavItem>
									<NavItem>
										<NavLinks onClick={() => closeMobileMenu("/createpost","createpost")}>
											Create Post
										</NavLinks>
									</NavItem>
									<NavItem>
										<NavLinks onClick={() => closeMobileMenu("/logout","logout")}>
											Logout
										</NavLinks>
									</NavItem>
								</>
								)
							}
					</NavMenu>
				</NavbarContainer>
			</Nav>
		</IconContext.Provider>
	)
};

export default Navbar;
