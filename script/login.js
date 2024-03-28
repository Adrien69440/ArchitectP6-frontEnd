



// async function login() {
//     form.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const userEmail = email.value;
//         const userPwd = password.value;

//         try {
//             const response = await fetch("http://localhost:5678/api/users/login", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: userEmail,
//                     password: userPwd
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Identifiants incorrects');
//             }

//             const userData = await response.json();

//             if (userData && userData.token) {
//                 // Stockage du token dans sessionStorage
//                 window.sessionStorage.setItem('token', userData.token);
//                 // Redirection vers la page d'accueil ou autre page
//                 window.location.href = "../index.html";
//                 // console.log("je suis connecté");
//                 window.sessionStorage.loged = true;
//                 window.sessionStorage.setItem('loggedIn', 'true');
//             } else {
//                 // Gestion de l'erreur si le token est manquant ou incorrect
//                 email.classList.add("inputErrorLogin");
//                 password.classList.add("inputErrorLogin");
//                 messageErreur.textContent = "Votre email ou votre mot de passe est incorrect";
//             }
//         } catch (error) {
//             // Gestion de l'erreur en cas de problème avec la requête
//             console.error("Une erreur s'est produite lors de la connexion:", error);
//             messageErreur.textContent = error.message;
//         }
//     });
// }

// login();

// async function login() {
//     form.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const userEmail = email.value;
//         const userPwd = password.value;

//         try {
//             const response = await fetch("http://localhost:5678/api/users/login", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: userEmail,
//                     password: userPwd
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Identifiants incorrects');
//             }

//             const userData = await response.json();

//             if (userData && userData.token) {
//                 // Stockage du token dans sessionStorage
//                 window.sessionStorage.setItem('token', userData.token);
//                 // Redirection vers la page d'accueil ou autre page
//                 window.location.href = "../index.html";
//                 // console.log("je suis connecté");
//                 window.sessionStorage.loged = true;
//                 window.sessionStorage.setItem('loggedIn', 'true');
//             } else {
//                 // Gestion de l'erreur si le token est manquant ou incorrect
//                 email.classList.add("inputErrorLogin");
//                 password.classList.add("inputErrorLogin");
//                 messageErreur.textContent = "Votre email ou votre mot de passe est incorrect";
//             }
//         } catch (error) {
//             // Gestion de l'erreur en cas de problème avec la requête
//             console.error("Une erreur s'est produite lors de la connexion:", error);
//             messageErreur.textContent = error.message;
//         }
//     });
// }

// login();

// // Fonction de validation d'email
// function validateEmail(email) {
//     const re = /\S+@\S+\.\S+/;
//     return re.test(email);
// }

// // Fonction de validation de mot de passe
// function validatePassword(password) {
//     return password.length >= 6;
// }

// // Fonction login avec les validations
// async function login() {
//     form.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const userEmail = email.value;
//         const userPwd = password.value;

//         // Validation côté client
//         if (!validateEmail(userEmail)) {
//             messageErreur.textContent = "Veuillez saisir une adresse email valide.";
//             return;
//         }

//         if (!validatePassword(userPwd)) {
//             messageErreur.textContent = "Le mot de passe doit contenir au moins 6 caractères.";
//             return;
//         }

//         try {
//             const response = await fetch("http://localhost:5678/api/users/login", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: userEmail,
//                     password: userPwd
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Identifiants incorrects');
//             }

//             const userData = await response.json();

//             if (userData && userData.token) {
//                 // Stockage du token dans sessionStorage
//                 window.sessionStorage.setItem('token', userData.token);
//                 // Redirection vers la page d'accueil ou autre page
//                 window.location.href = "../index.html";
//                 // console.log("je suis connecté");
//                 window.sessionStorage.loged = true;
//                 window.sessionStorage.setItem('loggedIn', 'true');
//             } else {
//                 // Gestion de l'erreur si le token est manquant ou incorrect
//                 email.classList.add("inputErrorLogin");
//                 password.classList.add("inputErrorLogin");
//                 messageErreur.textContent = "Votre email ou votre mot de passe est incorrect";
//             }
//         } catch (error) {
//             // Gestion de l'erreur en cas de problème avec la requête
//             console.error("Une erreur s'est produite lors de la connexion:", error);
//             messageErreur.textContent = error.message;
//         }
//     });
// }

// login();

// const email = document.querySelector("form #email");
// const password = document.querySelector("form #password");
// const form = document.querySelector("form");
// const messageErreur = document.querySelector(".login p");
// // Fonction pour valider le mot de passe
// function validatePassword(password) {
//     // Vérifier si le mot de passe a au moins 6 caractères
//     return password.length >= 6;
// }

// // Sélection du bouton de connexion
// const boutonConnexion = document.querySelector("#boutonConnexion");

// // Fonction pour activer le bouton de connexion
// function activerBoutonConnexion() {
//     boutonConnexion.disabled = false;
// }

// // Fonction pour désactiver le bouton de connexion
// function desactiverBoutonConnexion() {
//     boutonConnexion.disabled = true;
// }

// // Sélection des champs email et mot de passe
// // const email = document.querySelector("#email");
// // const password = document.querySelector("#password");

// // Ajout d'un écouteur d'événement sur le champ de mot de passe pour vérifier sa validité
// password.addEventListener("input", () => {
//     if (validatePassword(password.value)) {
//         activerBoutonConnexion();
//     } else {
//         desactiverBoutonConnexion();
//     }
// });

// // Fonction login avec les validations
// async function login() {
//     const form = document.querySelector("form");
//     const messageErreur = document.querySelector(".messageErreur");

//     form.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const userEmail = email.value;
//         const userPwd = password.value;

//         // Validation côté client
//         if (!validatePassword(userPwd)) {
//             messageErreur.textContent = "Le mot de passe doit contenir au moins 6 caractères.";
//             return;
//         }

//         try {
//             const response = await fetch("http://localhost:5678/api/users/login", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: userEmail,
//                     password: userPwd
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Identifiants incorrects');
//             }

//             const userData = await response.json();

//             if (userData && userData.token) {
//                 // Stockage du token dans sessionStorage
//                 window.sessionStorage.setItem('token', userData.token);
//                 // Redirection vers la page d'accueil ou autre page
//                 window.location.href = "../index.html";
//                 // console.log("je suis connecté");
//                 window.sessionStorage.loged = true;
//                 window.sessionStorage.setItem('loggedIn', 'true');
//             } else {
//                 // Gestion de l'erreur si le token est manquant ou incorrect
//                 messageErreur.textContent = "Votre email ou votre mot de passe est incorrect";
//             }
//         } catch (error) {
//             // Gestion de l'erreur en cas de problème avec la requête
//             console.error("Une erreur s'est produite lors de la connexion:", error);
//             messageErreur.textContent = error.message;
//         }
//     });
// }

// login();
const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const messageErreur = document.querySelector(".login p");

// Fonction pour valider le mot de passe
function validatePassword(password) {
    // Vérifier si le mot de passe a au moins 6 caractères
    return password.length >= 6;
}

// // Fonction login avec les validations
// async function login() {
//     form.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const userEmail = email.value;
//         const userPwd = password.value;

//         // Validation côté client
//         if (!validatePassword(userPwd)) {
//             messageErreur.textContent = "Le mot de passe doit contenir au moins 6 caractères.";
//             return;
//         }

//         try {
//             const response = await fetch("http://localhost:5678/api/users/login", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: userEmail,
//                     password: userPwd
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Identifiants incorrects');
//             }

//             const userData = await response.json();

//             if (userData && userData.token) {
//                 // Stockage du token dans sessionStorage
//                 window.sessionStorage.setItem('token', userData.token);
//                 // Redirection vers la page d'accueil ou autre page
//                 window.location.href = "../index.html";
//                 // console.log("je suis connecté");
//                 window.sessionStorage.loged = true;
//                 window.sessionStorage.setItem('loggedIn', 'true');
//             } else {
//                 // Gestion de l'erreur si le token est manquant ou incorrect
//                 messageErreur.textContent = "Votre email ou votre mot de passe est incorrect";
//             }
//         } catch (error) {
//             // Gestion de l'erreur en cas de problème avec la requête
//             console.error("Une erreur s'est produite lors de la connexion:", error);
//             messageErreur.textContent = error.message;
//         }
//     });
// }

// login();

// Fonction login avec les validations
async function login() {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userEmail = email.value;
        const userPwd = password.value;

        // Validation côté client
        if (!validatePassword(userPwd)) {
            document.getElementById('passwordError').textContent = "Le mot de passe doit contenir au moins 6 caractères.";
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

