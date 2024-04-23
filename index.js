const filters = document.querySelector(".filters");
const worksContainer = document.getElementById("worksContainer");

// cette fonction récupere les travaux sur la route Api works

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}

// cette fonction affiche les travaux depuis l'Api works

async function affichageWorks(works) {
    try {
        worksContainer.innerHTML = ""; // Efface le contenu précédent

        works.forEach((work) => {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");
            img.src = work.imageUrl;
            img.alt = work.title;
            figcaption.textContent = work.title;
            figure.classList.add("galleryStyle");
            figure.appendChild(img);
            figure.appendChild(figcaption);
            worksContainer.appendChild(figure);
        });
    } catch (error) {
        console.error("Erreur lors de l'affichage des travaux:", error);
    }
}
// cette fonction récupere les categories sur la route Api works

async function getCategory() {
    const responseCategory = await fetch("http://localhost:5678/api/categories");
    return await responseCategory.json();
}
// cette fonction affiche les travaux en filtre avec les differentes categories

async function initializePortfolio() {
    try {
        const categories = await getCategory();

        // Création du bouton "TOUS"
        const allButton = document.createElement("button");
        allButton.textContent = "Tous";
        allButton.id = "TOUS";
        filters.appendChild(allButton);
        allButton.classList.add("active");
        // Création d'un bouton pour chaque catégorie en parcourant le tableau
        categories.forEach((category) => {
            const btn = document.createElement("button");
            btn.textContent = category.name;
            btn.id = category.id;
            filters.appendChild(btn);
        });

        const works = await getWorks();

        // Affichage de tous les travaux au démarrage
        await affichageWorks(works);

        filters.addEventListener("click", async (e) => {
            if (e.target.tagName === "BUTTON") {
                
                // Désactiver la classe active du bouton "TOUS" s'il est actif
                const allButton = document.getElementById("TOUS");
                if (allButton.classList.contains("active")) {
                    allButton.classList.remove("active");
                }

                // Appliquer la classe active uniquement au bouton cliqué
                e.target.classList.add("active");

                const btnId = e.target.id;
                let filteredWorks = [];

                if (btnId !== "TOUS") {
                    filteredWorks = works.filter((work) => work.categoryId == btnId);
                } else {
                    filteredWorks = works;
                }

                await affichageWorks(filteredWorks);
            }
        });
    } catch (error) {
        console.error("Une erreur s'est produite:", error);
    }
}

initializePortfolio();



// ************************************************************************************************************************************************
 

// Fonction pour vérifier l'état de connexion de l'utilisateur
async function checkLoggedIn() {
    const loggedIn = window.sessionStorage.getItem("loggedIn");

    const logoutLink = document.querySelector("header nav .login");
    const filterButtons = document.querySelectorAll(".filters"); // Sélectionnez les boutons de filtre

    if (loggedIn === "true") {
        logoutLink.textContent = "logout";

        // Masquer les boutons de filtre
        filterButtons.forEach(button => {
            button.style.display = "none";
        });
    } else {
        // Si l'utilisateur n'est pas connecté, afficher les boutons de filtre
        filterButtons.forEach(button => {
           
        });

        logoutLink.textContent = "login";
    }

    // Gérer la déconnexion de l'utilisateur
    logoutLink.addEventListener("click", () => {
        window.sessionStorage.removeItem("loggedIn");
    });
}

// Appel de la fonction pour vérifier l'état de connexion
checkLoggedIn();

// Si l'utilisateur et connecté

const loged = window.sessionStorage.loged;
console.log(loged);
const adminMode = document.querySelector("#adminMode");
const admin = document.querySelector("main #portfolio .admin");
const logout = document.querySelector("header nav .login");
const containerModal = document.querySelector(".containerModal");
const xmark = document.querySelector(".containerModal .fa-xmark");
const projetModalContent = document.querySelector(".projetModalContent");

if (loged == "true") {
    // Créer le span parent pour l'icône et le texte "Modifier"
    const adminSpan = document.createElement("span");
    adminSpan.classList.add("admin");

    // Créer l'icône "Modifier"
    const modifierIcon = document.createElement("i");
    modifierIcon.classList.add("fa-regular", "fa-pen-to-square");
    modifierIcon.id = "modifierIcon";
    modifierIcon.style.color = "black";

    // Créer un premier span pour l'icône
    const iconSpan = document.createElement("span");
    iconSpan.style.backgroundColor = "#FFFEF8";
    iconSpan.style.padding = "5px";
    iconSpan.appendChild(modifierIcon);

    // Créer un deuxième span pour le texte "Modifier"
    const textSpan = document.createElement("span");
    textSpan.textContent = "Modifier";
    textSpan.style.color = "black";
    textSpan.style.marginLeft = "5px";

    // Ajouter les deux span au span parent
    adminSpan.appendChild(iconSpan);
    adminSpan.appendChild(textSpan);

    // Ajouter le span parent à son emplacement d'origine
    admin.appendChild(adminSpan);

    // Créer le span parent pour l'icône et le texte "Mode édition"
    const adminModeSpan = document.createElement("span");
    adminModeSpan.classList.add("admin");

    // Créer l'icône "Mode édition"
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-regular", "fa-pen-to-square");
    editIcon.style.color = "white";

    // Créer un premier span pour l'icône
    const editIconSpan = document.createElement("span");
    editIconSpan.style.backgroundColor = "black";
    editIconSpan.style.padding = "5px";
    editIconSpan.appendChild(editIcon);

    // Créer un deuxième span pour le texte "Mode édition"
    const editTextSpan = document.createElement("span");
    editTextSpan.textContent = "Mode édition";
    editTextSpan.style.color = "white";
    editTextSpan.style.marginLeft = "5px";

    // Ajouter les deux span au span parent
    adminModeSpan.appendChild(editIconSpan);
    adminModeSpan.appendChild(editTextSpan);

    // Centrer le bouton "Mode édition"
    adminModeSpan.style.display = "flex";
    adminModeSpan.style.alignItems = "center";
    adminModeSpan.style.justifyContent = "center";

    // Modifier la couleur d'arrière-plan et la couleur du texte du span parent du bouton "Mode édition"
    adminModeSpan.style.backgroundColor = "black";
    adminModeSpan.style.color = "white";
    adminModeSpan.style.padding = "10px";

    // Définir la largeur et les marges du bandeau "adminMode"
    adminMode.style.width = "calc(100% + 18.74rem)";
    adminMode.style.marginLeft = "-9.37rem";
    adminMode.style.marginRight = "-9.37rem";
  
    // Ajouter le span parent au bandeau "adminMode"
    adminMode.appendChild(adminModeSpan);

    logout.textContent = "logout";
    logout.addEventListener("click", () => {
        window.sessionStorage.loged = false;
    });
}



// affichage de la modale au clic

admin.addEventListener("click", () => {
    console.log(admin);
    containerModal.style.display = "flex";
});

xmark.addEventListener("click", () => {
    console.log(xmark);
    containerModal.style.display = "none";
});

containerModal.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target.className == "containerModal") {
        containerModal.style.display = "none";
    }
});

// affichage de la gallerie dans la modale

async function displayGaleryModal() {
    projetModalContent.innerHTML = "";
    const gallery = await getWorks();
    console.log(gallery);
    gallery.forEach((projet) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i");
        trash.classList.add("fa-regular", "fa-trash-can");
        trash.id = projet.id;
        img.src = projet.imageUrl;
        span.appendChild(trash);
        figure.appendChild(span);
        figure.appendChild(img);
        projetModalContent.appendChild(figure);
    });
    deleteProjet();
}
displayGaleryModal();

// faire apparaitre la deuxième modale une fois le html terminé

const btnAddModal = document.querySelector(".modalProjet button");
const projetAddModal = document.querySelector(".projetAddModal");
const modalProjet = document.querySelector(".modalProjet");
const arrowLeft = document.querySelector(".fa-arrow-left");
const xMark = document.querySelector(".projetAddModal .fa-xmark");

function displayAddModal() {
    btnAddModal.addEventListener("click", () => {
        projetAddModal.style.display = "flex";
        modalProjet.style.display = "none";
    });
    arrowLeft.addEventListener("click", () => {
        projetAddModal.style.display = "none";
        modalProjet.style.display = "flex";
    });
    xMark.addEventListener("click", () => {
        containerModal.style.display = "none";
    });
}

displayAddModal();



// **********************************************************

async function deleteProjet() {
    try {
        const token = window.sessionStorage.getItem('token'); 
        const trashAll = document.querySelectorAll(".fa-trash-can");

        // Ajouter l'écouteur d'événements une seule fois en dehors de la boucle forEach
        const deleteProjectHandler = async (e) => {
            const trash = e.target;
            const id = trash.id;
            const init = {
                method: "DELETE",
                headers: new Headers({
                    "content-type": "application/json",
                    "Authorization": "Bearer " + token 
                }),
            };
            try {
                const response = await fetch("http://localhost:5678/api/works/" + id, init);
                if (!response.ok) {
                    throw new Error("Le delete n'a pas marché");
                }
                console.log("Le delete a réussi");
                
                trash.parentElement.parentElement.remove(); // Supprimer visuellement le projet du DOM
                
                // Actualiser la galerie après la suppression du projet
                const updatedWorks = await getWorks(); // Récupérer les travaux mis à jour
                await affichageWorks(updatedWorks); // Mettre à jour la galerie avec les travaux mis à jour
            } catch (error) {
                console.error("Une erreur s'est produite lors de la suppression du projet:", error);
            }
        };

        trashAll.forEach(trash => {
            trash.addEventListener("click", deleteProjectHandler);
        });

    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression du projet:", error);
    }
}

async function addProject(token, title, category, imageFile) {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("image", imageFile);

        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout du projet : " + response.status);
        }

        console.log("Projet ajouté avec succès");

        // Actualiser la galerie après l'ajout du projet
        await affichageWorks(await getWorks());

        return await response.json(); // Retourner les données du projet ajouté si nécessaire
    } catch (error) {
        console.error("Erreur lors de l'ajout du projet :", error);
        throw error;
    }
}

// faire la prévisualition de l'image

const prewiewImg = document.querySelector(".containerFile img");
const inputFile = document.querySelector(".containerFile input");
const labelFile = document.querySelector(".containerFile label");
const iconFile = document.querySelector(".containerFile .fa-image");
const pFile = document.querySelector(".containerFile p");

// ecouter les changements sur input file

inputFile.addEventListener("change", () => {
    const file = inputFile.files[0];
    // console.log(file);
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            prewiewImg.src = e.target.result;
            prewiewImg.style.display = "flex";
            prewiewImg.style.maxWidth = "100%";
            prewiewImg.style.maxHeight = "100%";
            labelFile.style.display = "none";
            iconFile.style.display = "none";
            pFile.style.display = "none";
        };
        reader.readAsDataURL(file);
    }
});

// Creer une liste de catégorie dans l'input select

async function displayCategoryModale() {
    const select = document.querySelector(".projetAddModal select");
    const category = await getCategory();

    category.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });
}

displayCategoryModale();

const form = document.querySelector(".projetAddModal form");
const title = document.querySelector("#title");
const category = document.querySelector("#category");
const imageFileInput = document.querySelector("#imageFile"); // Ajout de cette référence pour le champ de fichier image

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const titleValue = title.value;
    const categoryValue = category.value;
    const imageFile = formData.get("image"); // Récupération du fichier image à partir du FormData

    try {
        const token = window.sessionStorage.getItem("token"); // Récupération du token depuis la session
        if (!token) {
            throw new Error("Utilisateur non connecté. Veuillez vous connecter pour ajouter un projet.");
        }

        // // Appel de la fonction pour ajouter un projet
        const response = await addProject(token, titleValue, categoryValue, imageFile);
        
        // Réinitialiser les champs du formulaire après l'ajout du projet
        inputTitle.value = '';
        inputCategory.value = '';
        inputImage.value = ''; // Réinitialiser le champ de fichier
        btnValider.disabled = true; // Désactiver le bouton de validation
        btnValider.classList.remove("validated"); // Retirer la classe "validated" du bouton

        // Réinitialiser l'aperçu de l'image
        prewiewImg.src = "#";
        prewiewImg.style.display = "none";
        labelFile.style.display = "block";
        iconFile.style.display = "inline-block";
        pFile.style.display = "block";

        // Actualiser la galerie après l'ajout du projet
        displayGaleryModal();
    } catch (error) {
        console.error("Une erreur s'est produite lors de l'ajout du projet :", error);
    }
});


const inputTitle = document.querySelector("#title");
const inputCategory = document.querySelector("#category");
const inputImage = document.querySelector("#file"); // Modifié pour sélectionner le champ de fichier
const btnValider = document.querySelector(".myButton"); // Sélectionnez le bouton "valider" correctement

// Fonction pour vérifier si tous les champs sont remplis
function checkFields() {
    const title = inputTitle.value.trim();
    const category = inputCategory.value.trim();
    const image = inputImage.files[0]; // Récupérez le fichier image à partir de l'élément input

    // Vérifiez si tous les champs sont remplis
    if (title && category && image) {
        btnValider.disabled = false; // Activer le bouton "valider" si tous les champs sont remplis
        btnValider.classList.add("validated");
    } else {
        btnValider.disabled = true; // Désactiver le bouton "valider" si un champ est vide
        btnValider.classList.remove("validated");
        // Ajouter l'attribut "disabled" au bouton si un champ est vide
        btnValider.setAttribute("disabled", "");
    }
}

// Ajoutez un écouteur d'événements sur les champs de l'input pour vérifier leur contenu
inputTitle.addEventListener("input", checkFields);
inputCategory.addEventListener("input", checkFields);
inputImage.addEventListener("change", checkFields);