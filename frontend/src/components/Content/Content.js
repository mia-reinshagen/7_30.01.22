import React, { useContext, useEffect } from 'react';
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
import { GlobalContext } from '../../Context/globalContext';
import axios from 'axios';

export const Content = ({
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
	const initial = { opacity: 0, y: 30 };
	const animation = useAnimation();

	const { ref, inView } = useInView({ threshold: 0.2 });
	const history = useHistory();
	const {appContext} = useContext(GlobalContext);
	const authstate = appContext.authState;
	const poststate = appContext.postsState;

	useEffect(() => {
		if (inView) {
			animation.start({
				opacity: 1,
				y: 0,
			});
		}
	}, [inView, animation]);

	const showOnePost = () =>{
		  history.push(`/post/${postid}`)
	}

	const deleteUserAccount = () => {
        axios.delete(`http://localhost:3500/api/auth/userInfo/${poststate.filter(p=>p.id==postid)[0].UserId}`, {
            headers: {connectedToken: localStorage.getItem("connectedToken")}
        })
            .then(() => {
               
                window.location.pathname = "/";
            })
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
								{
									localStorage.getItem("connectedToken") && authstate.isadmin ?
									(
									  <>
										<button onClick={deleteUserAccount} className="deleteUser">
											Supprimer le compte
										</button>
									  <h4>{topLine.text}</h4>
									  </>
									):topLine.text
								}
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
							<ContentButton
								initial={initial}
								transition={{ delay: 1, duration: 0.6 }}
								animate={animation}
								inverse={inverse.toString()}
								primary={primary}
								onClick={showOnePost}
							>
								{buttonLabel}

							</ContentButton>
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