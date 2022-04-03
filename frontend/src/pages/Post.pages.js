import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Content } from '../components/Content/Content';
import { GlobalContext } from "../Context/globalContext";
import { ContentPost } from "../components/Content/ContentPost";



const OnePost = () => {
    let { id } = useParams();
    const [post, setPost] = useState({});
    const { appContext } = useContext(GlobalContext);
    const [allComments, setAllComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    console.log(appContext);
    const history = useHistory();


    useEffect(() => {
        console.log(appContext.authState)
        if (!appContext.authState.isconnected) {
            history.push("/signin")
        } else {
            axios.get(`http://localhost:3500/api/post/${id}`, {
                headers: { connectedToken: localStorage.getItem("connectedToken") }
            })
                .then(response => {
                    setPost(response.data);
                });

            axios.get(`http://localhost:3500/api/comments/${id}`, {
                headers: { connectedToken: localStorage.getItem("connectedToken") }
            })
                .then(response => {
                    setAllComments(response.data)
                });
        }

    }, [id])

    const addComment = () => {
        axios.post("http://localhost:3500/api/comments", {
            comment: newComment,
            PostId: id,
            UserId: appContext.authState.userid,
            username: appContext.authState.username
        }, {
            headers: { connectedToken: localStorage.getItem("connectedToken") }
        })
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    const commentAdd = {
                        comment: newComment,
                        username: response.data.username,
                    };
                    setAllComments([...allComments, commentAdd]);
                    setNewComment(newComment);
                    //history.push(`/post/${id}`)
                }
            });
    };

    const deleteComment = (id) => {
        axios.delete(`http://localhost:3500/api/comments/${id}`, {
            headers: { connectedToken: localStorage.getItem("connectedToken") },
        }).then(() => {
        setAllComments(allComments.filter((comment) => {return comment.id != id}))
        });
    };

    return (
        <div>
            <ContentPost

                postid={post.id}
                {...{
                    reverse: true,
                    inverse: true,
                    topLine: {
                        text: `post créé par : ${post.username}`,
                    },
                    headline: `${post.postTitle}`,
                    description: `${post.postText}`,
                    buttonLabel: "supprimer",
                    imgStart: "start",
                    img: `http://localhost:3500/images/uploads/${post.filename}`,
                    start: "true",

                }}

            />
            <div className="postFoot1">
                <div className="addComs">
                    <textarea placeholder="Ajoutez un commentaire" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <button onClick={addComment}>Publier</button>
                </div>
                <div className="listeCommentaires">
                    {allComments.map((comment, index) => {
                        return (
                            <div className="commentaire" key={index}>
                                <label className="commentaireLabel"> Par : {comment.username}</label>
                                <div> {comment.comment}  </div>
                                <button className="divBtn" onClick={() => {
                                    deleteComment(comment.id)
                                }}> X </button>
                            </div>
                        )
                    })
                    }

                </div>

            </div>
        </div>

    );
};

export default OnePost;