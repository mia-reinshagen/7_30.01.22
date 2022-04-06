import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { Container, Section } from '../../globalStyles';
import {
	ContentRow,
	TextWrapper,
	TopLine,
	Heading,
	ContentButton,
	Subtitle,
	ImgWrapper,
	Img,
	ContentColumn,
} from './ContentStyles.js';

import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import axios from "axios";
//import { GlobalContext } from "../Context/globalContext";
import { useContext } from 'react';
import { GlobalContext } from '../../Context/globalContext';
import OnePost from '../../pages/Post.pages';



export const ContentPost = ({
	postid,
	primary,
	topLine,
	headline,
	description,
	buttonLabel,
	img,
	alt,
	inverse,
	reverse,
}) => {
	const [onePost, setOnePost] = useState({});
	const initial = { opacity: 0, y: 30 };
	const animation = useAnimation();

	const { ref, inView } = useInView({ threshold: 0.2 });
	const history = useHistory();
	const { appContext } = useContext(GlobalContext);
	const post1 = appContext.postsState.filter(post => post.id == postid);
	useEffect(() => {
		if(postid){
			setOnePost(post1[0]);
		console.log(post1)}
		
	}, [postid]);

	useEffect(() => {
		if (inView) {
			animation.start({
				opacity: 1,
				y: 1,
			});
		}
	}, [inView, animation,postid,initial]);

	const deletePost = () => {
		axios.delete(`http://localhost:3500/api/post/${postid}`, {
			headers: { connectedToken: localStorage.getItem("connectedToken") }
		})
			.then(response => {
				history.push("/");
			});
	}

	return (
		<Section inverse={inverse} ref={ref}>
			<Container>
				<ContentRow reverse={reverse}>
					<ContentColumn>
						<TextWrapper>
							<TopLine
								initial={initial}
								transition={{ delay: 0.3, duration: 0.6 }}
								animate={animation}
							>
								{topLine.text}
							</TopLine>
							<Heading
								initial={initial}
								transition={{ delay: 0.5, duration: 0.6 }}
								animate={animation}
								inverse={inverse.toString()}
							>
								{headline}
							</Heading>
							<Subtitle
								initial={initial}
								transition={{ delay: 0.7, duration: 0.6 }}
								animate={animation}
								inverse={inverse.toString()}
							>
								{description}
							</Subtitle>
							{console.log(appContext.authState.username == onePost.username)}
							{(appContext.authState.username == onePost.username || appContext.authState.isadmin == true) && (
								<ContentButton
									initial={initial}
									transition={{ delay: 1, duration: 0.6 }}
									animate={animation}
									inverse={inverse.toString()}
									primary={primary}
									onClick={deletePost}
								>
									{buttonLabel}

								</ContentButton>)}
						</TextWrapper>
					</ContentColumn>
					<ContentColumn
						initial={initial}
						transition={{ delay: 0.5, duration: 0.6 }}
						animate={animation}
					>
						<ImgWrapper>
							<Img
								src={img}
								alt={alt}
								whileHover={{ rotate: 2, scale: 1.02 }}
								transition={{ duration: 0.5 }}
							/>
						</ImgWrapper>
					</ContentColumn>
				</ContentRow>
			</Container>
		</Section>
	);
};