/* script.js — shared site logic */
const BOOK_KEY = 'tkw_books_v1';
const SESSION_KEY = 'tkw_session_v1';

function getBooks(){
  try { return JSON.parse(localStorage.getItem(BOOK_KEY) || '[]'); }
  catch(e){ return []; }
}
function saveBooks(arr){ localStorage.setItem(BOOK_KEY, JSON.stringify(arr)); localStorage.setItem('tkw_books_v1_updated', Date.now()); }

function seedIfNeeded(){
  const existing = getBooks();
  if(existing.length === 0){
    const seed = [
      {id:'mr-romeo',title:'Mr. Romeo',author:'Tej Kumar',cover:'assets/mr-romeo-cover.png',pdf:'assets/Mr-Romeo.pdf',desc:'A love story written by blood — sample available.'},
      {id:'river-paper',title:'River of Paper',author:'Tej Kumar',cover:'https://picsum.photos/seed/river/400/600',pdf:'#',desc:'Collected short stories.'},
    ];
    saveBooks(seed);
  }
}

function convertDriveShareToDirect(url){
  if(!url) return url;
  // Examples:
  // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // https://drive.google.com/open?id=FILE_ID
  // https://drive.google.com/uc?export=download&id=FILE_ID
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  if(m) return 'https://drive.google.com/uc?export=download&id=' + m[1];
  return url;
}

function addBook(metadata){
  const books = getBooks();
  books.unshift(metadata);
  saveBooks(books);
}

function findBookById(id){
  const books = getBooks();
  return books.find(b => b.id === id);
}

function requireLogin(redirect=true){
  const s = sessionStorage.getItem(SESSION_KEY);
  if(!s){
    if(redirect) window.location = 'login.html';
    return false;
  }
  return true;
}

document.addEventListener('DOMContentLoaded', ()=>{
  seedIfNeeded();
});
