export default function validateForm({ firstname, name, username, email, password, confirmPass }) {
	if (!firstname.trim() || !name.trim() || !username.trim() || !email.trim()) {
		return 'Vous devez remplir tout les champs';
	}

	if (!password) {
		return 'Mot de Passe obligatoire';
	} else if (password.length < 6) {
		return 'Mot de Passe doit faire au moins 6 caractères';
	}

	if (!confirmPass) {
		return 'Besoin de confirmation du mot de passe';
	} else if (confirmPass !== password) {
		return 'Le mot de passe ne correspond pas';
	}
	return '';
}

export const isEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
