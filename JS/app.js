// If user adds a note, add it to the local storage
showNotes();
let addBtn=document.getElementById('addBtn');
var notesObj=[]; /// In JS there is no need to create an object like this
addBtn.addEventListener('click',  function(e)
{
    let addTxt=document.getElementById("addTxt");
    let addTitle=document.getElementById("addTitle");    
    let notes = localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let myObj={
        title: addTitle.value,
        text:  addTxt.value
    }
    notesObj.push(myObj);       // putting title and text in a dictionary and push it into notesObj.     
    //notesObj is array of object 
    
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value="";
    addTitle.value="";
    console.log(notesObj);
    showNotes();
})

// fuction to show element from localStorage
function showNotes()
{
    let notes= localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index)
    {
        // Appending cards to html
        html+=
        `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>  `;          // Appending cards to your notes i.e inside id='notes'
        // using this.id inside onclick gives the id of that element which is being clicked
 
    });
    // collecting all the notes 
   let notesElm=document.getElementById('notes');
 /*  console.log(notesElm);
   console.log(notesElm.innerHTML);
   console.log("notes",notes);*/

    if(notesObj.length!=0){
        notesElm.innerHTML=html;     
       // console.log("notesElm.innerHTML= ",notesElm.innerHTML);   
   }
   else{
    notesElm.innerHTML=`Nothing to show! add a note section above to add note`;
    
   }
}



// funtion to delete a notes
function deleteNote(index)
{
    console.log("Delete",index);
    // Updating localStorage to delete items
    let notes=localStorage.getItem('notes');
    if(notes==null)
    {
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);  // putting all the notes in notesObj
    }
    //console.log(notesObj)
    notesObj.splice(index,1);   // splice take the first argument start , here starting index is {index} and 1 shows the number of element you want to remove
   // console.log(notesObj)
    localStorage.setItem("notes",JSON.stringify(notesObj));     // updating localstorage after removing an element from notesObj.
    showNotes();
}

let search=document.getElementById("searchTxt");   //taking the input tag of search button
search.addEventListener("input",function(){
    
    
    let inputVal=search.value.toLowerCase();      //putting the value of search into input val
   // console.log('Input event fired ',inputVal);
    let noteCards=document.getElementsByClassName('noteCard');     // collecting all the elements with class noteCards4
    console.log(noteCards)
    Array.from(noteCards).forEach(function(element)     // for every notecard save the content of <p> inside cardTxt 
    { 
        console.log(element)
       // console.log(element.getElementsByTagName("p"))
        let cardTxt=element.getElementsByTagName("p")[0].innerText;  // For every noteCards save the content of <p> inside the cardTxt
       console.log("cardtxt ",cardTxt);
       console.log("inputVal ",inputVal);
        if(cardTxt.includes(inputVal))
        {
            element.style.display="block";
        }
        else
        {
            element.style.display="none";
        }
    })
});








