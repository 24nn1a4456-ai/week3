let books =
JSON.parse(localStorage.getItem("books")) || [];

let members =
JSON.parse(localStorage.getItem("members")) || [];

function saveData(){

localStorage.setItem(
"books",
JSON.stringify(books));

localStorage.setItem(
"members",
JSON.stringify(members));

updateStats();
displayBooks();
displayMembers();
}

function showSection(id){

document
.querySelectorAll(".section")
.forEach(sec=>{
sec.classList.add("hidden");
});

document
.getElementById(id)
.classList.remove("hidden");
}

function addBook(){

let isbn =
document.getElementById("isbn").value;

let title =
document.getElementById("title").value;

let author =
document.getElementById("author").value;

if(!isbn || !title || !author){

alert("Fill all fields");
return;
}

books.push({
isbn,
title,
author,
available:true
});

saveData();
}

function deleteBook(index){

books.splice(index,1);

saveData();
}

function displayBooks(){

let table =
document.getElementById("bookTable");

table.innerHTML="";

books.forEach((book,index)=>{

table.innerHTML += `
<tr>
<td>${book.isbn}</td>
<td>${book.title}</td>
<td>${book.author}</td>
<td>
${book.available ?
"Available" :
"Borrowed"}
</td>

<td>
<button
class="deleteBtn"
onclick="deleteBook(${index})">
Delete
</button>
</td>
</tr>
`;

});
}

function searchBook(){

let keyword =
document.getElementById(
"searchInput").value
.toLowerCase();

let result =
books.filter(book=>
book.title
.toLowerCase()
.includes(keyword)
);

document.getElementById(
"searchResult")
.innerHTML =
JSON.stringify(result,null,2);
}

function registerMember(){

let id =
document.getElementById(
"memberId").value;

let name =
document.getElementById(
"memberName").value;

members.push({
id,
name,
borrowed:[]
});

saveData();
}

function displayMembers(){

let list =
document.getElementById(
"memberList");

list.innerHTML="";

members.forEach(member=>{

list.innerHTML +=
`<li>${member.id} -
${member.name}</li>`;

});
}

function borrowBook(){

let memberId =
document.getElementById(
"borrowMemberId").value;

let isbn =
document.getElementById(
"borrowISBN").value;

let member =
members.find(
m=>m.id===memberId);

let book =
books.find(
b=>b.isbn===isbn);

if(member && book &&
book.available){

book.available=false;

member.borrowed.push(isbn);

alert("Book Borrowed");

saveData();
}
else{
alert("Book unavailable");
}
}

function returnBook(){

let isbn =
document.getElementById(
"returnISBN").value;

let book =
books.find(
b=>b.isbn===isbn);

if(book){

book.available=true;

alert("Book Returned");

saveData();
}
}

function updateStats(){

document.getElementById(
"totalBooks")
.innerText=
books.length;

document.getElementById(
"availableBooks")
.innerText=
books.filter(
b=>b.available
).length;

document.getElementById(
"borrowedBooks")
.innerText=
books.filter(
b=>!b.available
).length;

document.getElementById(
"totalMembers")
.innerText=
members.length;
}

displayBooks();
displayMembers();
updateStats();