import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ContentProfil } from '../components/Content/ContentProfil';
import { GlobalContext } from '../Context/globalContext';



const initAppState = {
        authState: {
                username: "",
                userid: 0,
                isconnected: false,
                isadmin: false,
                imgprofil: "",
                created: null
        },
        postsState: {
                postId: null,
                username: "",
                userId: null,
                postTitle: "",
                postText: "",
                postImage: null
        }
}


const dateParser = (num) => {
        let options = {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
        };

        let timestamp = Date.parse(num);

        let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

        return date.toString();
};


const Profil = () => {

        const { appContext, setAppContext } = useContext(GlobalContext);
        const { authState } = appContext;
        let id = authState.userid;
        const [modifProfil, setModifProfil] = useState(false);
        const [oldPass, setOldPass] = useState("");
        const [newPass, setNewPass] = useState("");

        const history = useHistory();

        const password_regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,}$/;

        const showModal = () => {
                setModifProfil(true);
        }

        useEffect(() => {
                if (!localStorage.getItem('connectedToken')) {
                        history.push("/signin")
                }
        }, [])


        const changePassword = () => {

                if (oldPass.trim() == "" || newPass.trim() == "") {
                        alert('Vous devez remplir tous les champs');
                        return;
                }
                axios.put(`http://localhost:3500/api/auth/editPassword/${id}`, {
                        oldPassword: oldPass,
                        newPassword: newPass,
                        id: id,
                }, {
                        headers: { connectedToken: localStorage.getItem("connectedToken") },
                }
                ).then((response) => {
                        if (response.data.error) {
                                alert(response.data.error);
                        } else {
                                alert(response.data)
                        }
                });

        };


        const updateProfilImage = (e) => {
                e.preventDefault();
                const formFile = document.getElementById('formFile');
                let formData = new FormData(formFile);
                formData.append('username', appContext.authState.username);
                formData.append('userId', appContext.authState.userid)


                const fileType = formData.get('file').type;



                const nofile = fileType.split("/")[1] == 'octet-stream';

                if (nofile) {
                        alert("Vous devez choisir une image ")
                        return;
                }

                if (!nofile && fileType !== "image/jpeg" && fileType !== "image/png" && fileType !== "image/gif") {
                        alert("Ce format d'image n'est pas pris en compte ")
                        return;
                }

                const ufile = formData.get('file');

                if (ufile.size > 1048576) {
                        alert("Veuiller réduire la taille de l'image ")
                        return;
                }




                axios.put(`http://localhost:3500/api/auth/editPicture/${id}`, formData, {
                        headers: {
                                "content-Type": "multipart/form-data",
                                connectedToken: localStorage.getItem("connectedToken")
                        },
                }
                )
                window.location.reload("/profil")
        };


        const deleteUserAccount = () => {
                axios.delete(`http://localhost:3500/api/auth/userInfo/${id}`, {
                        headers: { connectedToken: localStorage.getItem("connectedToken") }
                })
                        .then(() => {
                                localStorage.removeItem("connectedToken");
                                setAppContext(initAppState);
                                window.location.pathname = "/signin";
                        })
        }


        return (
                <div>
                        <ContentProfil onModifProfil={showModal} {...{

                                reverse: true,
                                inverse: true,
                                topLine: {
                                        text: 'Votre Profil',
                                },
                                headline: `Pseudo : ${appContext.authState.username}`,
                                description:
                                        `Profile créé le  ${dateParser(appContext.authState.created)}`,
                                buttonLabel: 'modifier mon profil',

                                linkTo: '/download',
                                imgStart: 'start',
                                img: `http://localhost:3500/images/uploads/${authState.imgprofil}`,
                                start: 'true',
                        }} />

                        {modifProfil && (<div className="modifProfil">
                                <div>
                                        <h2>Changer l'image de profil</h2><br />
                                        <form id="formFile" encType="multipart/form-data">
                                                <label>Choisir un fichier : </label>
                                                <input id="file" type="file" className="file" name="file" accept=".jpg, .jpeg, .png, .gif" />

                                                <button onClick={updateProfilImage}> Modifier l'image </button>
                                        </form>
                                </div>
                                <br></br>
                                <div>
                                        <label htmlFor=''>Modifier le mot de passe</label><br />
                                        <input type="password" placeholder='ancien mot de passe'
                                                onChange={(e) => { setOldPass(e.target.value); }}
                                        /><br />
                                        <input type="password" placeholder='nouveau mot de passe'
                                                onChange={(e) => { setNewPass(e.target.value); }}
                                        />
                                </div>
                                <div>
                                        <button className='btnValider' onClick={changePassword}>Modifier le mot de passe</button>
                                        <button className='btnDeleteUser' onClick={() => deleteUserAccount(authState.userid)}>Supprimer le Compte</button>
                                </div>
                        </div>)}

                </div>
        );
};

export default Profil;