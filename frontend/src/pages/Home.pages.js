import React from 'react';
import { Content } from '../components/Content/Content';
import { Container } from '../globalStyles';
import { heroOne, heroTwo, heroThree } from '../data/HeroData';


const Home = () => {
	return (
        <div>
        <Content {...heroOne} />
        <Content {...heroTwo} />
        <Content {...heroThree} />
        </div>
	);
};

export default Home;
