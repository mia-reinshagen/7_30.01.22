import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Content } from '../components/Content/Content';
import { GlobalContext } from "../Context/globalContext";



const OnePost = () => {
    let {id} = useParams();
    const [post, setPost] = useState({});
    const {appContext} = useContext(GlobalContext);
    const history = useHistory();
   

    useEffect(() => {
         console.log(appContext.authState)
        if(!appContext.authState.isconnected) {
            history.push("/signin")
        } else {
            axios.get(`http://localhost:3500/api/post/${id}`, {
                headers: {connectedToken: localStorage.getItem("connectedToken")}
            })
                .then(response => {
                    setPost(response.data);
            });
        }
        
    }, [])
    
	return (
    <div>
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
          imgStart: "start",
          img: `http://localhost:3500/images/uploads/${post.filename}`,
          start: "true",
        }}
      />
  
        </div>
	);
};

export default OnePost;