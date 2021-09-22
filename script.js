class Libro {
    constructor(titolo, autore, _annoPubb, _genere, _prezzo) {
        this.titolo = titolo;
        this.autore = autore;
        this._annoPubb;
        this._genere;
        this._prezzo = 0;
    }
    titoloCompletoLibro() {
        return this.titolo + ' ' + this.autore + ' ' + this._annoPubb + ' ' + this._genere + ' ' + this._prezzo;
    }
    //setter anno pubblicazione
    set annoPubb(value) {
        this._annoPubb = value;
    }
    get annoPubb() { return this._annoPubb } //getter
    //setter genere 
    set genere(value) {
        this._genere = value;
    }
    get genere() { return this._genere; } //getter
    //setter prezzo libro
    set prezzo(value) {
        this._prezzo = value;
    }
    get prezzo() { return this._prezzo } //getter
}
/* ***********************************
//ESEMPIO STATICO
let libroPreferito = new Libro('Harry Potter e la Pietra filosofale', 'JK Rowling', 1999, 'fantasy', 25);
console.log(libroPreferito);
*********************************** */
//ESEMPIO DINAMICO

//Questo passsaggio mi serve pe recuperare tutte le volte l'array di partenza
if (localStorage.getItem('libri')) { //se questa cosa esiste
    //allora nel listaLibri aggiungo il contenuto di questo 
    var listaLibri = JSON.parse(localStorage.getItem('libri'));
    //listaLibri = JSON.parse(listaLibri);
} else {
    var listaLibri = [];
}
caricaLibri();

const btn = document.querySelector('#btn');
// var listaLibri = [];
const cerca = document.querySelector('#invia');
cerca.addEventListener('click', () => {
    const searchElement = document.querySelector('#search').value;
    console.log(searchElement);
    let risultati = [];
    listaLibri.forEach((singleLibro) => {
        if (singleLibro.titolo.indexOf(searchElement) > -1) {
            risultati.push(singleLibro);
            console.log(risultati);
            console.log(listaLibri);
        };
    });
    let rigaLibro = document.querySelector('.libro');
    rigaLibro.innerHTML = '';
    risultati.forEach((singleLibro) => {
        creaRiga(singleLibro, rigaLibro);
        console.log(risultati);
    })
});
btn.addEventListener('click', () => {
    const titolo = document.querySelector('#titolo').value;
    const autore = document.querySelector('#autore').value;
    const anno = document.querySelector('#anno').value;
    const genere = document.querySelector('#genere').value;
    const prezzo = document.querySelector('#prezzo').value;
    //istanza oggetto
    let libro = new Libro(titolo, autore, anno, genere, prezzo);
    libro._annoPubb = anno;
    libro._genere = genere;
    libro._prezzo = prezzo;
    let libroScelto = libro.titoloCompletoLibro();
    console.log(libroScelto);
    listaLibri.push(libro);
    localStorage.setItem('libri', JSON.stringify(listaLibri));
    let rigaLibro = document.querySelector('.libro');
    rigaLibro.innerHTML = '';
    caricaLibri();
    svuotaCampi();
});

function svuotaCampi() {
    document.querySelector('#titolo').value = '';
    document.querySelector('#autore ').value = '';
    document.querySelector('#anno').value = '';
    document.querySelector('#genere').value = '';
    document.querySelector('#prezzo').value = '';
};

function caricaLibri() {
    let rigaLibro = document.querySelector('.libro');
    console.log(listaLibri);
    listaLibri.forEach((singleLibro) => {
        creaRiga(singleLibro, rigaLibro);
    })
}
function creaRiga(singleLibro, rigaLibro) {
    let tR = document.createElement('tr');
    tR.innerHTML = `<td> ${singleLibro.titolo} </td> 
                        <td> ${singleLibro.autore} </td> 
                        <td> ${singleLibro._annoPubb} </td> 
                        <td> ${singleLibro._genere} </td> 
                        <td> ${singleLibro._prezzo} </td> `;
    rigaLibro.appendChild(tR);
}
