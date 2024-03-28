
const filters = document.querySelector(".filters");
const worksContainer = document.getElementById("worksContainer");

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}

async function affichageWorks(works) {
    try {
        worksContainer.innerHTML = ""; // Efface le contenu précédent

        works.forEach(work => {
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

async function getCategory() {
    const responseCategory = await fetch("http://localhost:5678/api/categories");
    return await responseCategory.json();
}
async function initializePortfolio() {
    try {
        const categories = await getCategory();

        // Création du bouton "TOUS"
        const allButton = document.createElement("button");
        allButton.textContent = "Tous";
        allButton.id = "TOUS";
        filters.appendChild(allButton);
        allButton.classList.add('active');

        categories.forEach(category => {
            const btn = document.createElement("button");
            btn.textContent = category.name;
            btn.id = category.id;
            filters.appendChild(btn);
        });

        const works = await getWorks();
        
        // Affichage de tous les travaux au démarrage
        await affichageWorks(works);

        // filters.addEventListener("click", async (e) => {
        //     if (e.target.tagName === "BUTTON") {
        //         const btnId = e.target.id;
        //         let filteredWorks = [];

        //         if (btnId !== "TOUS") {
        //             filteredWorks = works.filter(work => work.categoryId == btnId);
        //         } else {
        //             filteredWorks = works;
        //         }

        //         await affichageWorks(filteredWorks);
        //     }
        // });

        filters.addEventListener("click", async (e) => {
            if (e.target.tagName === "BUTTON") {
                // Désactiver la classe active du bouton "TOUS" s'il est actif
                const allButton = document.getElementById('TOUS');
                if (allButton.classList.contains('active')) {
                    allButton.classList.remove('active');
                }
        
                // Appliquer la classe active uniquement au bouton cliqué
                e.target.classList.add('active');
        
                const btnId = e.target.id;
                let filteredWorks = [];
        
                if (btnId !== "TOUS") {
                    filteredWorks = works.filter(work => work.categoryId == btnId);
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



// // Si l'utilisateur et connecté

const loged = window.sessionStorage.loged;
console.log(loged);
const admin = document.querySelector("main #portfolio .admin");
const logout = document.querySelector("header nav .login");
const containerModal = document.querySelector(".containerModal");
const xmark = document.querySelector(".containerModal .fa-xmark");
const projetModalContent = document.querySelector(".projetModalContent");

if (loged == "true") {
  admin.textContent = ""; // Supprimer le texte existant pour éviter la duplication
  const modifierIcon = document.createElement("i");
  modifierIcon.classList.add("fa-regular", "fa-pen-to-square");
  modifierIcon.id = "modifierIcon";
  const span = document.createElement("span");
  span.appendChild(modifierIcon);
  span.appendChild(document.createTextNode("Modifier")); // Ajouter le texte "Modifier" après l'icône
  admin.appendChild(span);
  logout.textContent = "logout";
  logout.addEventListener("click", () => {
    window.sessionStorage.loged = false;
  });
}

// Fonction pour vérifier l'état de connexion de l'utilisateur
async function checkLoggedIn() {
    const loggedIn = window.sessionStorage.getItem('loggedIn');
  
    const logoutLink = document.querySelector("header nav .login");

    if (loggedIn === 'true') {
     
        logoutLink.textContent = "logout";
    } else {
        adminLink.textContent = ""; // Masquer le lien "Admin" en effaçant son contenu
        logoutLink.textContent = "login";
    }

    // Gérer la déconnexion de l'utilisateur
    logoutLink.addEventListener("click", () => {
        window.sessionStorage.removeItem('loggedIn');
    });
}

// Appel de la fonction pour vérifier l'état de connexion
checkLoggedIn();

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
    if(e.target.className == "containerModal"){
        containerModal.style.display = "none";
    }
  });

// affichage de la gallerie dans la modale

 async function displayGaleryModal() {
    projetModalContent.innerHTML = ""
    const gallery = await getWorks()
    console.log(gallery);
    gallery.forEach(projet => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const span = document.createElement("span")
        const trash = document.createElement("i")
        trash.classList.add("fa-regular","fa-trash-can")
        trash.id = projet.id
        img.src = projet.imageUrl
        span.appendChild(trash)
        figure.appendChild(span)
        figure.appendChild(img)
        projetModalContent.appendChild(figure)
      
    });
    deleteProjet()
  
}
displayGaleryModal()






// async function deleteProjet() {
//     try {
//         const token = window.sessionStorage.getItem('token'); 

//         const trashAll = document.querySelectorAll(".fa-trash-can");
//         trashAll.forEach(trash => {
//             trash.addEventListener("click", async (e) => {
//                 const id = trash.id;
//                 const init = {
//                     method: "DELETE",
//                     headers: new Headers({
//                         "content-type": "application/json",
//                         "Authorization": "Bearer " + token 
//                     }),
//                 };
//                 try {
//                     const response = await fetch("http://localhost:5678/api/works/" + id, init);
//                     if (!response.ok) {
//                         throw new Error("Le delete n'a pas marché");
//                     }
//                     console.log("Le delete a réussi");
//                     displayGaleryModal(); // Actualiser la galerie après la suppression du projet
//                     deletePhotoFromUI(id)
//                 } catch (error) {
//                     console.error("Une erreur s'est produite lors de la suppression du projet:", error);
//                 }
//             });
//         });
//     } catch (error) {
//         console.error("Une erreur s'est produite lors de la suppression du projet:", error);
//     }
// }


// faire apparaitre la deuxième modale une fois le html terminé

const btnAddModal = document.querySelector(".modalProjet button")
const projetAddModal = document.querySelector(".projetAddModal")
const modalProjet = document.querySelector(".modalProjet")
const arrowLeft =  document.querySelector(".fa-arrow-left")
const xMark =  document.querySelector(".projetAddModal .fa-xmark")



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

// faire la prévisualition de l'image

const prewiewImg = document.querySelector(".containerFile img")
const inputFile = document.querySelector (".containerFile input")
const labelFile = document.querySelector(".containerFile label")
const iconFile = document.querySelector(".containerFile .fa-image")
const pFile = document.querySelector(".containerFile p")

// ecouter les changements sur input file

inputFile.addEventListener("change",()=>{
    const file = inputFile.files[0]
    // console.log(file);
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            prewiewImg.src = e.target.result
            prewiewImg.style.display = "flex"
            prewiewImg.style.maxWidth = "100%"; 
            prewiewImg.style.maxHeight = "100%"; 
            labelFile.style.display = "none"
            iconFile.style.display = "none"
            pFile.style.display = "none"
        };
    reader.readAsDataURL(file);
    }
})

// Creer une liste de catégorie dans l'input select

async function displayCategoryModale() {
    const select = document.querySelector(".projetAddModal select")
    const category = await getCategory()

    category.forEach(category => {
    const option = document.createElement("option")
    option.value = category.id
    option.textContent = category.name
    select.appendChild(option)
    });
}

displayCategoryModale()

const form = document.querySelector(".projetAddModal form");
const title = document.querySelector("#title");
const category = document.querySelector("#category");
const imageFileInput = document.querySelector("#imageFile"); // Ajout de cette référence pour le champ de fichier image

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const titleValue = title.value;
    const categoryValue = category.value;
    const imageFile = formData.get('image'); // Récupération du fichier image à partir du FormData

    try {
        const token = window.sessionStorage.getItem('token'); // Récupération du token depuis la session
        if (!token) {
            throw new Error('Utilisateur non connecté. Veuillez vous connecter pour ajouter un projet.');
        }

        // Appel de la fonction pour ajouter un projet
        const response = await addProject(token, titleValue, categoryValue, imageFile);
        // console.log('Projet ajouté avec succès:', response);

        // Actualiser la galerie après l'ajout du projet
        displayGaleryModal();
    } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'ajout du projet :', error);
    }
});


// Fonction pour ajouter un projet


// async function addProject(token, title, category, imageFile) {
//     try {
//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('category', category);
//         formData.append('image', imageFile);

//         const response = await fetch('http://localhost:5678/api/works/', {
//             method: 'POST',
//             headers: {
//                 'Authorization': 'Bearer ' + token
//             },
//             body: formData
//         });

//         if (!response.ok) {
//             throw new Error('Erreur lors de l\'ajout du projet : ' + response.status);
//         }

//         const data = await response.json();
//         console.log('Projet ajouté avec succès:', data);

//         // Actualiser la galerie après l'ajout du projet
//         displayGaleryModal();

//         return data; // Renvoyer les données du projet ajouté
//     } catch (error) {
//         console.error('Erreur lors de l\'ajout du projet :', error);
//         throw error; // Re-lancer l'erreur pour la gérer à un niveau supérieur si nécessaire
//     }
// }

const inputTitle = document.querySelector('#title');
const inputCategory = document.querySelector('#category');
const inputImage = document.querySelector('#file'); // Modifié pour sélectionner le champ de fichier
const btnValider = document.querySelector('.button'); // Sélectionnez le bouton "valider"

// Fonction pour vérifier si tous les champs sont remplis
function checkFields() {
    const title = inputTitle.value.trim();
    const category = inputCategory.value.trim();
    const image = inputImage.files[0]; // Récupérez le fichier image à partir de l'élément input

    // Vérifiez si tous les champs sont remplis
    if (title && category && image) {
        btnValider.disabled = false; // Activer le bouton "valider" si tous les champs sont remplis
        btnValider.classList.add('validated');
    } else {
        btnValider.disabled = true; // Désactiver le bouton "valider" si un champ est vide
        btnValider.classList.remove('validated');
    }
}

// Ajoutez un écouteur d'événements sur les champs de l'input pour vérifier leur contenu
inputTitle.addEventListener('input', checkFields);
inputCategory.addEventListener('input', checkFields);
inputImage.addEventListener('change', checkFields);



// **********************************************************
// **********************************************************

// Supprimer une photo du DOM

function deletePhotoFromUI(photoId) {
    const photoElement = document.getElementById(photoId);
    if (photoElement) {
        photoElement.remove(); // Supprimer l'élément du DOM
    }
}

async function deleteProjet() {
    try {
        const token = window.sessionStorage.getItem('token'); 

        const trashAll = document.querySelectorAll(".fa-trash-can");
        trashAll.forEach(trash => {
            trash.addEventListener("click", async (e) => {
                const id = trash.id;
                const init = {
                    method: "DELETE",
                    headers: new Headers({
                        "content-type": "application/json",
                        "Authorization": "Bearer " + token 
                    }),
                };
                try {
                    // const response = await fetch("http://localhost:5678/api/works/" + id, init);
                    const response = await fetch(`http://localhost:5678/api/works/${id}`, init);

                    if (!response.ok) {
                        throw new Error("Le delete n'a pas marché");
                    }
                    console.log("Le delete a réussi");
                    
                    // Vérifier si la réponse est vide
                    if (response.status === 204) {
                        console.log("Aucune donnée de réponse après la suppression.");
                    } else {
                        const deletedProject = await response.json(); // Obtenir les détails du projet supprimé
                        console.log("Projet supprimé :", deletedProject); // Afficher les détails du projet supprimé dans la console

                        // Après avoir obtenu les détails du projet supprimé, supprimer son élément du DOM
                        deletePhotoFromUI(id);
                        
                        // Actualiser la galerie après la suppression du projet
                        displayGaleryModal(); 
                   
                        console.log("Projet supprimé avec succès.");
                    }
                } catch (error) {
                    console.error("Une erreur s'est produite lors de la suppression du projet:", error);
                }
            });
        });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression du projet:", error);
    }
}

// async function deleteProjet() {
//     try {
//         const token = window.sessionStorage.getItem('token'); 

//         const trashAll = document.querySelectorAll(".fa-trash-can");
//         trashAll.forEach(trash => {
//             trash.addEventListener("click", async (e) => {
//                 const id = trash.id;
//                 const init = {
//                     method: "DELETE",
//                     headers: new Headers({
//                         "content-type": "application/json",
//                         "Authorization": "Bearer " + token 
//                     }),
//                 };
//                 try {
//                     const response = await fetch("http://localhost:5678/api/works/" + id, init);
//                     if (!response.ok) {
//                         throw new Error("Le delete n'a pas marché");
//                     }
//                     console.log("Le delete a réussi");
                    
//                     const deletedProject = await response.json(); // Obtenir les détails du projet supprimé
//                     console.log("Projet supprimé :", deletedProject); // Afficher les détails du projet supprimé dans la console

//                     // Après avoir obtenu les détails du projet supprimé, supprimer son élément du DOM
//                     deletePhotoFromUI(id);
                    
//                     // Actualiser la galerie après la suppression du projet
//                     displayGaleryModal(); 
//                 } catch (error) {
//                     console.error("Une erreur s'est produite lors de la suppression du projet:", error);
//                 }
//             });
//         });
//     } catch (error) {
//         console.error("Une erreur s'est produite lors de la suppression du projet:", error);
//     }
// }

// async function deleteProjet() {
//     try {
//         const token = window.sessionStorage.getItem('token'); 

//         const trashAll = document.querySelectorAll(".fa-trash-can");
//         trashAll.forEach(trash => {
//             trash.addEventListener("click", async (e) => {
//                 const id = trash.id;
//                 const init = {
//                     method: "DELETE",
//                     headers: new Headers({
//                         "content-type": "application/json",
//                         "Authorization": "Bearer " + token 
//                     }),
//                 };
//                 try {
//                     const response = await fetch("http://localhost:5678/api/works/" + id, init);
//                     if (!response.ok) {
//                         throw new Error("Le delete n'a pas marché");
//                     }
//                     console.log("Le delete a réussi");
//                     displayGaleryModal(); // Actualiser la galerie après la suppression du projet
//                     deletePhotoFromUI(id);
                   
//                     const deletedProject = await response.json(); // Obtenir les détails du projet supprimé
//                     console.log("Projet supprimé :", deletedProject); // Afficher les détails du projet supprimé dans la console
//                 } catch (error) {
//                     console.error("Une erreur s'est produite lors de la suppression du projet:", error);
//                 }
//             });
//         });
//     } catch (error) {
//         console.error("Une erreur s'est produite lors de la suppression du projet:", error);
//     }
// }
// Supprimer un projet (photo) du serveur et du DOM
// async function deleteProjet(id) {
//     try {
//         const token = window.sessionStorage.getItem('token');
//         const init = {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + token
//             }
//         };
//         const response = await fetch(`http://localhost:5678/api/works/${id}`, init);
//         if (!response.ok) {
//             throw new Error('Le delete n\'a pas marché');
//         }
//         console.log('Le delete a réussi');
//         deletePhotoFromUI(id); // Supprimer la photo du DOM
//     } catch (error) {
//         console.error('Une erreur s\'est produite lors de la suppression du projet:', error);
//     }
// }

// Ajouter une photo au DOM
function addPhotoToUI(photo) {
    const figure = document.createElement('figure');
    figure.id = photo.id;
    const img = document.createElement('img');
    img.src = photo.imageUrl;
    const span = document.createElement('span');
    const trash = document.createElement('i');
    trash.classList.add('fa-regular', 'fa-trash-can');
    trash.addEventListener('click', () => deleteProjet(photo.id)); // Supprimer le projet lorsqu'on clique sur la corbeille
    span.appendChild(trash);
    figure.appendChild(span);
    figure.appendChild(img);
    projetModalContent.appendChild(figure); // Ajouter la photo au conteneur dans la modal
}

// Ajouter un projet (photo) au serveur et au DOM
async function addProject(token, title, category, imageFile) {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('image', imageFile);

        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout du projet : ' + response.status);
        }

        const data = await response.json();
        console.log('Projet ajouté avec succès:', data);

        addPhotoToUI(data); // Ajouter la nouvelle photo au DOM
        return data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du projet :', error);
        throw error;
    }
}
