import React, { useState, useContext } from "react";
import {
  FormColumn,
  FormWrapper,
  FormInput,
  FormTextArea,
  FormSection,
  FormRow,
  FormLabel,
  FormInputRow,
  FormSuccess,
  FormError,
  FormButton,
  FormTitle,
} from "./FormStyles";
import { Container } from "../../globalStyles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../Context/globalContext";

const initAppState = {
    authState : {
                  username: "",
                  userid: 0,
                  isconnected: false,
                  isadmin:false,
                  imgprofil: ""
                },
    postsState:[]
  }

const CreatePostForm = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {appContext, setAppContext } = useContext(GlobalContext);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

	 const form = document.getElementById('formpost');
        let formData = new FormData(form);
		const fileType = formData.get('file').type;

        if (!formData.get('postTitle') || !formData.get('postText') ){
          setError("Vous devez remplir tous les champs ")
          return;
        }

        const nofile = fileType.split("/")[1] == 'octet-stream';
        console.log(nofile)
		   if (!nofile && fileType !=="image/jpeg" && fileType !=="image/png" && fileType !=="image/gif") {
            setError("Ce format d'image n'est pas pris en compte ")
			 return;
        }

        const ufile = formData.get('file');
        
		   if (ufile.size > 1048576) {
            setError("Veuiller réduire la taille de l'image ")
			 return;
        }

        formData.append('username', appContext.authState.username);
		  formData.append('UserId', appContext.authState.userid)

      
        axios.post('http://localhost:3500/api/post/createPost', formData, {
          headers: {
            "content-Type": "multipart/form-data",
             connectedToken: localStorage.getItem("connectedToken")
          }
        })
          .then(response => {
			    console.log(response.data)
            const NewPost = {
              postId: response.data.id,
              username: response.data.username,
              userId: response.data.UserId,
              postTitle: response.data.postTitle,
              postText: response.data.postText,
              postImage: response.data.filename
          };

		  setAppContext({...appContext,postsState:{...appContext.postsState, NewPost}})
          history.push("/");
          }).catch((err) => {
		 setError(err.response.data.message)
      });
      
  };

  const messageVariants = {
    hidden: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
  };

  return (
    <FormSection>
      <Container>
        <FormRow>
          <FormColumn small>
            <FormTitle>Poster une annonce</FormTitle>
            <FormWrapper onSubmit={handleSubmit} noValidate id="formpost">
              <FormInputRow>
                <FormLabel>Titre du post</FormLabel>
                <FormInput
                  type="text"
                  placeholder="Veuillez entrer le titre du post"
                  value={postTitle}
				  name="postTitle"
                  onChange={(e) => setPostTitle(e.target.value)}
                />
              </FormInputRow>

              <FormInputRow>
                <FormLabel>Texte du post</FormLabel>
                <FormTextArea
                  type="text"
                  placeholder="Veuillez saisir votre annonce"
                  value={postText}
				  name="postText"
                  onChange={(e) => setPostText(e.target.value)}
                />
              </FormInputRow>

              <FormInput
                type="file"
                name = "file"
              />

              <FormButton type="submit">Soumettre</FormButton>
            </FormWrapper>
            {error && (
              <FormError
                variants={messageVariants}
                initial="hidden"
                animate="animate"
              >
                {error}
              </FormError>
            )}
            {success && (
              <FormSuccess
                variants={messageVariants}
                initial="hidden"
                animate="animate"
              >
                {success}
              </FormSuccess>
            )}
          </FormColumn>
        </FormRow>
      </Container>
    </FormSection>
  );
};

export default CreatePostForm;
