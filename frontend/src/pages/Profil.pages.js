import React from 'react';
import { Content } from '../components/Content/Content';
import { heroThree } from '../data/HeroData';


const Home = () => {
	return (
        <div>
        <Content {...heroThree} />
        <div className="modifProfil">
        <div>
                <label htmlFor=''>Changer l'image de profil</label><br/>
                 <input type="file"/>
        </div>

         <div>
                 <label htmlFor=''>Modifier le mot de passe</label><br/>
                 <input type="text" placeholder='ancien mot de passe'/><br/>
                 <input type="text" placeholder='nouveau mot de passe'/>
        </div>
        <div>
                <button className='btnDeleteUser'>Supprimer le Compte</button>
        </div>
        </div>
        </div>
	);
};

export default Home;