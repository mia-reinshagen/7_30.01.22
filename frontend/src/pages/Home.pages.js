import React from 'react';
import { Content } from '../components/Content/Content';
import { heroOne } from '../data/HeroData';


const Home = () => {
	return (
        <div>
        <Content {...heroOne} />
        <Content {...heroOne} />
        <Content {...heroOne} />
        <Content {...heroOne} />
        </div>
	);
};

export default Home;
