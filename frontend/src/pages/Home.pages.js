import React,{useState,useContext,useEffect} from 'react';
import { Content } from '../components/Content/Content';
import { GlobalContext } from '../Context/globalContext';
import { heroOne } from '../data/HeroData';
import axios from 'axios';


const Home = () => {
    const { appContext, setAppContext } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
  
      axios
        .get("http://localhost:3500/api/post", {
          headers: {
            connectedToken: localStorage.getItem("connectedToken"),
            UserId: appContext.authState.userid,
          },
        })
        .then((response) => {
          setAppContext({
            ...appContext,
            postsState: [...response.data.listOfPosts],
          });
          //       setPostLikes(
          //         response.data.likedPosts.map((like) => {
          //           return like.PostId;
          //         })
          //       )
          console.log(response.data.listOfPosts);
          setIsLoading(false);
        });
    }, []);
  
    return (
      <div>
        {
        appContext.postsState.map((post)=>{
                console.log(post.filename)
        return(
        <Content
          postid = {post.id}
          {...{
            reverse: true,
            inverse: true,
            topLine: {
              text: `post créé par : ${post.username}`,
            },
            headline: `${post.postTitle}`,
            description: `${post.postText}`,
            buttonLabel: "en savoir plus",
            imgStart: "start",
            img: `http://localhost:3500/images/uploads/${post.filename}`,
            like: "https://cdn.pixabay.com/photo/2018/10/11/00/03/like-3738701_1280.png",
            start: "true",
          }}
        />)})}
      </div>
    );
  };
  
  export default Home;