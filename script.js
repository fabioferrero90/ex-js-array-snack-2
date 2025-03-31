// Hai un array di oggetti rappresentanti libri:
const books = [
  {
    title: "React Billionaire",
    pages: 250,
    author: {
      name: 'Alice',
      age: 35
    },
    available: false,
    price: '101€',
    tags: ['advanced', 'js', 'react', 'senior']
  },
  {
    title: "Advanced JS",
    pages: 500,
    author: {
      name: 'Bob',
      age: 20
    },
    available: true,
    price: '25€',
    tags: ['advanced', 'js', 'mid-senior']
  },
  {
    title: "CSS Secrets",
    pages: 320,
    author: {
      name: 'Alice',
      age: 17
    },
    available: true,
    price: '8€',
    tags: ['html', 'css', 'junior']
  },
  {
    title: "HTML Mastery",
    pages: 200,
    author: {
      name: 'Charlie',
      age: 50
    },
    available: false,
    price: '48€',
    tags: ['html', 'advanced', 'junior', 'mid-senior']
  },
];

// Snack 1 - Filtra e Modifica
// Crea una funzione che somma due numeri.
// Crea un array (longBooks) con i libri che hanno più di 300 pagine;
// Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
// Stampa in console ogni titolo nella console.
console.log("  ")
console.log("*****************")
console.log("**** SNACK 1 ****")
console.log("*****************")
console.log("  ")

const longBooks = books.filter((book) => book.pages > 300);
console.log(longBooks);

const longBooksTitles = longBooks.map((book) => book.title);
console.log(longBooksTitles);


// Snack 2 - Il primo libro scontato
// Creare un array (availableBooks) che contiene tutti i libri disponibili.
// Crea un array (discountedBooks) con gli availableBooks, ciascuno con il prezzo scontato del 20% (mantieni lo stesso formato e arrotonda al centesimo)
// Salva in una variabile (fullPricedBook) il primo elemento di discountedBooks che ha un prezzo intero (senza centesimi).
console.log("  ")
console.log("*****************")
console.log("**** SNACK 2 ****")
console.log("*****************")
console.log("  ")


const availableBooks = books.filter((book) => book.available === true);
console.log(availableBooks);

const discountedBooks = availableBooks.map((book) => {
  return { ...book, price: (parseInt(book.price) * 0.8).toFixed(2) + "€" };
});
console.log(discountedBooks);

const fullPricedBook = discountedBooks.find((book) => book.price.includes('.00'));
console.log(fullPricedBook);

// Snack 3 - Ordinare gli Autori
// Creare un array (authors) che contiene gli autori dei libri.
// Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
// Ordina l’array authors in base all’età, senza creare un nuovo array.
// (se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)
console.log("  ")
console.log("*****************")
console.log("**** SNACK 3 ****")
console.log("*****************")
console.log("  ")

const authors = books.map(book => book.author);
const areAuthorsAdults = authors.every(author => author.age >= 18);
authors.sort((a, b) => areAuthorsAdults ? a.age - b.age : b.age - a.age);

console.log("Array degli autori ordinati per età:", authors);


// Snack 4 - Calcola l’età media
// Creare un array (ages) che contiene le età degli autori dei libri.
// Calcola la somma delle età (agesSum) usando reduce.
// Stampa in console l’età media degli autori dei libri.

console.log("  ")
console.log("*****************")
console.log("**** SNACK 4 ****")
console.log("*****************")
console.log("  ")

const ages = authors.map((author) => author.age);
const agesSum = ages.reduce((acc, age) => acc + age, 0);
const averageAge = agesSum / authors.length;

console.log("Eta media degli autori:", averageAge);



// Snack 5 (Bonus) - Raccogli i libri
// Usando la l'API https://boolean-spec-frontend.vercel.app/freetestapi/books/{id} usa la combinazione di .map() e Promise.all(), per creare una funzione (getBooks) che a partire da un array di id (ids), ritorna una promise che risolve un array di libri (books).
// Testala con l’array [2, 13, 7, 21, 19] .
console.log("  ")
console.log("*****************")
console.log("**** SNACK 5 ****")
console.log("*****************")
console.log("  ")

async function fetchJson(url) {
  const response = (await fetch(url));
  return await response.json();
}

async function getBooks(ids) {
  try {
    const bookFetch = await Promise.all(ids.map(id => fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/books/${id}`)));
    return bookFetch;

  }
  catch (error) {
    console.error(error);
  }
}

const booksArray2 = await getBooks([2, 13, 7, 21, 19]);
console.log("Array di libri:", booksArray2)

// Snack 6 (Bonus) - Ordina i libri
// Crea una variabile booleana (areThereAvailableBooks) per verificare se c’è almeno un libro disponibile.
// Crea un array (booksByPrice) con gli elementi di books ordinati in base al prezzo (crescente).
// Ordina l’array booksByPricein base alla disponibilità (prima quelli disponibili), senza creare un nuovo array.
console.log("  ")
console.log("*****************")
console.log("**** SNACK 6 ****")
console.log("*****************")
console.log("  ")

const areThereAvailableBooks = books.some(book => book.available === true);
const booksByPrice = books.sort((a, b) => a.price.split("€")[0] - b.price.split("€")[0]);
booksByPrice.sort((a, b) => b.available - a.available);
console.log(booksByPrice)


// Snack 7 (Bonus) - Analizza i tag
// Usa reduce per creare un oggetto (tagCounts) che conta quante volte ogni tag viene usato tra i libri.

console.log("  ")
console.log("*****************")
console.log("**** SNACK 7 ****")
console.log("*****************")
console.log("  ")

const tagCounts = books.reduce((acc, book) => {
  book.tags.forEach(tag => {
    acc[tag] = (acc[tag] || 0) + 1;
  });
  return acc;
}, {});

console.log(tagCounts);