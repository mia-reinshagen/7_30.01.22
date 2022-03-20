import React, { useState,useContext } from 'react';
import {
	FormColumn,
	FormWrapper,
	FormInput,
	FormSection,
	FormRow,
	FormLabel,
	FormInputRow,
	FormSuccess,
	FormError,
	FormButton,
	FormTitle,
} from './FormStyles';
import { Container } from '../../globalStyles';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../Context/globalContext';


const SigninForm = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const { appContext,setAppContext } = useContext(GlobalContext);

	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();

		const connectUser = {
			email: email,
			password: password,
		}

		axios.post("http://localhost:3500/api/auth/login", connectUser)
			.then((response) => {
				console.log(response.data.token)
				localStorage.setItem("connectedToken", response.data.token);

				setAppContext({...appContext,authState:{
				username: response.data.username,
				userid: response.data.id,
				isconnected: true,
				isadmin: response.data.isAdmin,
				}});

				setError('');
				history.push('/');

			}).catch(error => {
				setError(error.response.data.message);
        setSuccess("")
			});
	};

	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	const formData = [

		{ label: 'Email', value: email, onChange: (e) => setEmail(e.target.value), type: 'email' },
		{
			label: 'Mot de passe',
			value: password,
			onChange: (e) => setPassword(e.target.value),
			type: "password",
		},

	];
	return (
		<FormSection>
			<Container>
				<FormRow>
					<FormColumn small>
						<FormTitle>Sign in</FormTitle>
						<FormWrapper onSubmit={handleSubmit} noValidate>
							{formData.map((el, index) => (
								<FormInputRow key={index}>
									<FormLabel>{el.label}</FormLabel>
									<FormInput
										type={el.type}
										placeholder={`Veuillez entrer votre ${el.label.toLocaleLowerCase()}`}
										value={el.value}
										onChange={el.onChange}
									/>
								</FormInputRow>
							))}

							<FormButton type="submit">Sign in</FormButton>
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

export default SigninForm;