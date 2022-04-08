import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { Content } from '../components/Content/Content';
import { GlobalContext } from '../Context/globalContext';
import { heroOne } from '../data/HeroData';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container } from '../globalStyles';


const Home = () => {
  const { appContext, setAppContext } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [postsLiked, setPostsLiked] = useState([])
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
        setPostsLiked(
          response.data.likedPosts.map((like) => {
            return like.PostId;
          })
        )
        console.log(response.data.listOfPosts);
        setIsLoading(false);
      }).catch(err => {
        console.log(err.response)
        history.push("/signin");
      });
  }, [appContext.postsState.length]);



  const likeUserPost = (postId) => {
    axios.post("http://localhost:3500/api/post/likes", {
      PostId: postId,
      UserId: appContext.authState.userid,
    }, {
      headers: { connectedToken: localStorage.getItem("connectedToken") }
    }
    ).then((response) => {
      setAppContext({
        ...appContext, postsState: appContext.postsState.map((post) => {
          if (post.id === postId) {
            if (response.data.liked) {
              return { ...post, Likes: [...post.Likes, 0] };
            } else {
              const likesArray = post.Likes;
              likesArray.pop();
              return { ...post, Likes: likesArray };
            }
          } else {
            return post;
          }
        })
      });

      if (postsLiked.includes(postId)) {
        setPostsLiked(postsLiked.filter((id) => {
          return id != postId;
        })
        );
      } else {
        setPostsLiked([...postsLiked, postId]);
      }
    });

  };

  return (
    <>

      {
        !isLoading ? (appContext.postsState.map((post, index) => {
          console.log(post.filename)
          return (
            <div className="postcontainer" key={index} style={{ position: 'relative' }}><Content
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
              }} /><span
                onClick={() => { likeUserPost(post.id) }}
                className={postsLiked.includes(post.id) ? "like" : "noLike"}
              >
                <i className="fas fa-heart"></i>&nbsp;{post.Likes.length}</span>
            </div>)
        })) : (<div className="nopost">En attente de Post ...</div>)

      }
    </>
  );
};

export default Home;