
const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const messageErreur = document.querySelector(".login p");

// Fonction pour valider le mot de passe
function validatePassword(password) {
    // Vérifier si le mot de passe a au moins 6 caractères
    return password.length >= 6;
}

// Fonction login avec les validations
async function login() {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userEmail = email.value;
        const userPwd = password.value;

        // Validation côté client
        if (!validatePassword(userPwd)) {
            document.getElementById('passwordError').textContent = "Mot de passe incorect.";
            return;
        } else {
            document.getElementById('passwordError').textContent = ""; // Réinitialiser le message d'erreur
        }

        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: userPwd
                })
            });

            if (!response.ok) {
                throw new Error('Identifiants incorrects');
            }

            const userData = await response.json();

            if (userData && userData.token) {
                // Stockage du token dans sessionStorage
                window.sessionStorage.setItem('token', userData.token);
                // Redirection vers la page d'accueil ou autre page
                window.location.href = "../index.html";
                window.sessionStorage.loged = true;
                window.sessionStorage.setItem('loggedIn', 'true');
            } else {
                // Gestion de l'erreur si le token est manquant ou incorrect
                document.getElementById('emaildError').textContent = "Votre email ou votre mot de passe est incorrect";
            }
        } catch (error) {
            // Gestion de l'erreur en cas de problème avec la requête
            console.error("Une erreur s'est produite lors de la connexion:", error);
            document.getElementById('passwordError').textContent = error.message;
        }
    });
}

login();

