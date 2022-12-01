const motE1 = document.getElementById('mot');
const mauvaisesLettres = document.getElementById('mauvaiselettres');
const rejouerBtn = document.getElementById('play-bouton');
const popup = document.getElementById('popup-content');
const notification = document.getElementById('notification-content');
const messageFinal = document.getElementById('message-final');

const figurePart = document.querySelectorAll('.figure-part');


const mots = ['tonyhawks', 'gtasanandreas', 'ashe', 'grind', 'kickflip', 'ollie', 'carl', 'Sylvanas', 'lossantos', 'vercetti', 'chorizo', 'chocolat', 'pizza'];

// Selectionner un mot pour jouer
let motSelectionne = mots[ Math.floor(Math.random() * mots.length) ];// selectionner un mot random parmi la liste, math.floor arrondi au plus bas

// lettres mauvaises ou dans le mot a trouver

console.log(motSelectionne);

const bonnesLettresArr = [];
const mauvaisesLettresArr = [];

//Afficher le mot caché

function afficherMot() {

    motE1.innerHTML = `
    ${motSelectionne
        .split('')
        .map(
            lettre => `
                <span class="lettre">
                    ${bonnesLettresArr.includes(lettre) ? lettre : '' }
                </span>
            `
        )
        .join('')
    
    }
    `;

    const motInterne = motE1.innerText.replace(/\n/g, '');

    console.log(motE1.innerText, motInterne);

    if(motInterne === motSelectionne) {
        messageFinal.innerText = 'Bravo tu as gagné!';
        popup.style.display = 'flex';
        }

}

//Mauvaises Lettres

function updateMauvaisesLettresE1() {

// Afficher les mauvaise lettres

mauvaisesLettres.innerHTML = `
    ${mauvaisesLettresArr.map (lettre => `<span> ${lettre}</span> `)}
`
// Afficher le bonhomme

figurePart.forEach((part, index) => {
    const erreurs = mauvaisesLettresArr.length;

    if(index < erreurs) {
        part.style.display = 'block';
    } else {
        part.style.display = 'none'
    }
})


//Verifier si ont a perdu

    if(mauvaisesLettresArr.length === figurePart.length) {
        messageFinal.innerText = 'Tu as perdu !'
        popup.style.display = 'flex'
    }


}


//Afficher la notification

function afficherNotification() {
    notification.classList.add('afficher');

    setTimeout(() => {
        notification.classList.remove('afficher')
    }, 2000);

}

// eventlisteners window = n'importe ou sur la fenetre

    window.addEventListener('keydown', e => {
       // console.log(e.keyCode);
       if(e.keyCode >= 65 && e.keyCode <= 90) {

        const lettre = e.key;
        //console.log(lettre);

        if(motSelectionne.includes(lettre)) {

            if(!bonnesLettresArr.includes(lettre)) {
                bonnesLettresArr.push(lettre)

                afficherMot()
            } else {
                afficherNotification();
            }

        } else {
            if(!mauvaisesLettresArr.includes(lettre)) {
                mauvaisesLettresArr.push(lettre);

                updateMauvaisesLettresE1();
            } else {
                afficherNotification();
            }
            }
        }

       });


// Rejouer et redemarrer

       rejouerBtn.addEventListener('click', () => {
            // Vider les arrays
            bonnesLettresArr.splice(0);
            mauvaisesLettresArr.splice(0);

            motSelectionne = mots[ Math.floor(Math.random() * mots.length) ];

            afficherMot();

            updateMauvaisesLettresE1();

            popup.style.display = 'none';
       })



afficherMot();