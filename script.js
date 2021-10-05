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

const salva = document.querySelector('#salva');
salva.addEventListener('click', () => {
    const indice = document.querySelector('#indice').value;
    const titolo = document.querySelector('#titolo').value;
    const autore = document.querySelector('#autore').value;
    const anno = document.querySelector('#anno').value;
    const genere = document.querySelector('#genere').value;
    const prezzo = document.querySelector('#prezzo').value;
    //se l'indice è = -1 allora fai il nuovo oggetto libro
    if (indice == -1) { //all'inizio ho messo === e mi dava errore perchè nel form sono stringhe e non dovevo fare il confronto sul TIPO di dato ma sui valori!
        //istanza oggetto
        let libro = new Libro(titolo, autore, anno, genere, prezzo);
        libro._annoPubb = anno;
        libro._genere = genere;
        libro._prezzo = prezzo;
        let libroScelto = libro.titoloCompletoLibro();
        console.log(libroScelto);
        listaLibri.push(libro);
    } else { //alrimenti : array dei libri[i].titolo  = assegno il value del titolo ecc
        listaLibri[indice].titolo = titolo;
        listaLibri[indice].autore = autore;
        listaLibri[indice]._annoPubb = anno;
        listaLibri[indice]._genere = genere;
        listaLibri[indice]._prezzo = prezzo;
    }
    
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
    rigaLibro.innerHTML = '';
    console.log(listaLibri);
    listaLibri.forEach((singleLibro, index) => {
        creaRiga(singleLibro, rigaLibro, index);
    })
}
function creaRiga(singleLibro, rigaLibro, index) {
    console.log(index);
    let tR = document.createElement('tr');
    tR.innerHTML = `<td> ${singleLibro.titolo} </td> 
                        <td> ${singleLibro.autore} </td> 
                        <td> ${singleLibro._annoPubb} </td> 
                        <td> ${singleLibro._genere} </td> 
                        <td> ${singleLibro._prezzo} </td> 
                        <td><button class="btn btn-warning" onClick="modifica(${index})">Modifica</button></td>
                        <td><button class="btn btn-danger" onClick="elimina(${index})">Elimina</button></td>`

    rigaLibro.appendChild(tR);
}

function modifica(index) {
    console.log(index);
    document.querySelector('#indice').value = index;
    document.querySelector('#titolo').value = listaLibri[index].titolo;
    document.querySelector('#autore ').value = listaLibri[index].autore;
    document.querySelector('#anno').value = listaLibri[index]._annoPubb;
    document.querySelector('#genere').value = listaLibri[index]._genere;
    document.querySelector('#prezzo').value = listaLibri[index]._prezzo;

}

// .splice() per eliminare un elemento dall'array
function elimina(index) {
    //alert(index)
    //1. elimino l'elemento dall'array
    listaLibri.splice(index, 1);
    //2. salvo nel local storage
    localStorage.setItem('libri', JSON.stringify(listaLibri));
    //3. ristampo la lista
    caricaLibri();
}
