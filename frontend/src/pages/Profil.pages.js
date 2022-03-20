import React from 'react';
import { Content } from '../components/Content/Content';
import { heroThree } from '../data/HeroData';


const Home = () => {
	return (
        <div>
        <Content {...heroThree} />
        </div>
	);
};

export default Home;