export default function validateForm({ firstname, name, username, email, password, confirmPass }) {
	if (!firstname.trim() || !name.trim() || !username.trim() || !email.trim() || !password.trim() || !confirmPass.trim()) {
		return 'Vous devez remplir tout les champs';
	}

	if (confirmPass !== password) {
		return 'Le mot de passe ne correspond pas';
	}
	return '';
}

export const isEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const isPassword = password => {
	const re = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,}$/;
	return re.test(password);
}
