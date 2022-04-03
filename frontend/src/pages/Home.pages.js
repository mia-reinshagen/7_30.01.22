import React, { useState, useContext, useEffect } from 'react';
import { Content } from '../components/Content/Content';
import { GlobalContext } from '../Context/globalContext';
import { heroOne } from '../data/HeroData';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Home = () => {
    const { appContext, setAppContext } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

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
            }).catch(err => {
                console.log(err.response)
                history.push("/signin");
            });
    }, []);

    return (
        <>
            {
                appContext.postsState.length > 0 && appContext.postsState.map((post, index) => {
                    console.log(post.filename)
                    return (
                        <div key={index} style={{ position: 'relative' }}><Content
                            postid={post.id}
                            {...{
                                reverse: true,
                                inverse: true,
                                topLine: {
                                    text: `post créé par : ${post.username}`,
                                },
                                headline: `${post.postTitle}`,
                                description: `${post.postText}`,
                                buttonLabel: "Voir le detail du Post",
                                imgStart: "start",
                                img: `http://localhost:3500/images/uploads/${post.filename}`,
                                like: "https://icon-library.com/images/like-png-icon/like-png-icon-1.jpg",
                                start: "true",
                            }} /><span className='like'><i className="fas fa-heart"></i>0</span></div>)
                })}
        </>
    );
};

export default Home;