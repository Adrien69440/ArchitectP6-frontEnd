
async function getWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const dataJson = await response.json();
        const worksContainer = document.getElementById("works-container");

        // Permet de parcourir les éléments html et de les creer
        for (let i = 0; i < dataJson.length; i++) {
            const work = dataJson[i];

            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");

            img.src = work.imageUrl;
            img.alt = work.title;

            figcaption.textContent = work.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            worksContainer.appendChild(figure);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des travaux:", error);
    }
}
console.log(getWorks);

 getWorks();