import React,{useState,useContext,useEffect} from 'react';
import { Content } from '../components/Content/Content';
import { GlobalContext } from '../Context/globalContext';
import { heroOne } from '../data/HeroData';
import axios from 'axios';


const Home = () => {

        const {appContext,setAppContext} = useContext(GlobalContext);
           const [isLoading, setIsLoading] = useState(false)

        useEffect(() => {
                setIsLoading(true)

           axios.get("http://localhost:3500/api/post", {
            headers: {connectedToken: localStorage.getItem("connectedToken"),
            UserId: appContext.authState.userid},
            
        })
          .then(response => {
               setAppContext({...appContext,postsState :[...response.data.listOfPosts] })
        //       setPostLikes(
        //         response.data.likedPosts.map((like) => {
        //           return like.PostId;
        //         })
        //       )
        console.log(response.data.listOfPosts)
              setIsLoading(false)
          })
        }, []);

	return (
        <div>
                {console.log(appContext.postsState)}
        <Content {...heroOne} />
        <Content {...heroOne} />
        <Content {...heroOne} />
        <Content {...heroOne} />
        </div>
	);
};

export default Home;
