import React, { useState } from 'react';
import {
	FormColumn,
	FormWrapper,
	FormInput,
	FormSection,
	FormRow,
	FormLabel,
	FormInputRow,
	FormMessage,
	FormButton,
	FormTitle,
} from './FormStyles';
import { Container } from '../../globalStyles';
import axios from "axios";

const SignupForm = () => {
	const [firstname, setFirstName] = useState('');
	const [name, setName] = useState('');
	const [username, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();


		if (confirmPass !== password) {
			setError('Le mot de passe ne correspond pas');
			return;
		};
		const newUser = {

			firstname: firstname,
			lastname: name,
			username: username,
			email: email,
			password: password,
			isAdminAccount: 0

		}


		axios.post("http://localhost:3500/api/auth/signup", newUser)
			.then((response) => {
				setFirstName('');
				setName('');
				setUserName('');
				setEmail('');
				setPassword('');
				setConfirmPass('');
				setSuccess(response.data.message);
				setError('');

			}).catch(error => {
				setError(error.response.data.message);
			});

	};

	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	const formData = [
		{ label: 'Prénom', value: firstname, onChange: (e) => setFirstName(e.target.value), type: 'text' },
		{ label: 'Nom', value: name, onChange: (e) => setName(e.target.value), type: 'text' },
		{ label: 'Pseudo', value: username, onChange: (e) => setUserName(e.target.value), type: 'text' },
		{ label: 'Email', value: email, onChange: (e) => setEmail(e.target.value), type: 'email' },
		{
			label: 'Mot de passe',
			value: password,
			onChange: (e) => setPassword(e.target.value),
			type: "password",
		},
		{
			label: 'Verifier Mot de passe',
			value: confirmPass,
			onChange: (e) => setConfirmPass(e.target.value),
			type: "password",
		},
	];
	return (
		<FormSection>
			<Container>
				<FormRow>
					<FormColumn small>
						<FormTitle>Sign up</FormTitle>
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

							<FormButton type="submit">Signup</FormButton>
						</FormWrapper>
						{error && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
								error
							>
								{error}
							</FormMessage>
						)}
						{success && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
							>
								{success}
							</FormMessage>
						)}
					</FormColumn>
				</FormRow>
			</Container>
		</FormSection>
	);
};

export default SignupForm;
