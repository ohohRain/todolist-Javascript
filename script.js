const list = document.getElementById("js-list");
var input = document.getElementById("js-input");
const item = document.getElementById("js-item");
const add_button = document.getElementById("js-add-button");

const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const line_through = "lineThrough";
array = [];
const emptyarray = [];

function gettodo() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            
            console.log(JSON.parse(this.responseText));
            console.log("this is gettodo")
            array = JSON.parse(this.responseText);
            add_todo(array);
            //compelte_status_updates(array);
                  
        }
        
    }
    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key", "ffae54-13e896-b81c6e-0ebfde-e2445f")
    xhttp.send();
}

function Create_todo(toDo){ //send data to server and pull data from server to content section
    //Event.preventDefault(); // This prevents the form from reloading the page!
    
    var xhttp = new XMLHttpRequest();
    var data = {
        
        "text": toDo,
        "completed": false,
    }
    
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
        
        // parse JSON response
        //var todo = JSON.parse(this.responseText);
        //console.log(todo);
        gettodo();

        }

     else if (this.readyState == 4) {

        // this.status !== 200, error from server
        console.log("this is create to do");
        console.log(this.responseText);

    }

    
    

    }
    xhttp.open("POST", "https://cse204.work/todos", true);

    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("x-api-key", "ffae54-13e896-b81c6e-0ebfde-e2445f");
    
    console.log(JSON.stringify(data));
    xhttp.send(JSON.stringify(data));
    
}

function add_todo(array){
    
    //console.log(array);
    for (var i=0; i<array.length; i++){
        if(array[i].completed == false){
            console.log(array[i].completed);
            const text = `
                  <li class="todos" id="js-item">
                    <i class="complete fa fa-circle-thin" job="complete"></i>
                    <p class="text">${array[i].text}</p>
                    <i class="delete far fa-calendar-times" job="delete"></i>
                  </li>
                 `
            const position = "beforeend";

            list.insertAdjacentHTML(position,text);
        }

        else{
            console.log(array[i].completed);
            const text = `
                  <li class="todos" id="js-item">
                    <i class="complete fa fa-check-circle" job="complete"></i>
                    <p class="text lineThrough">${array[i].text}</p>
                    <i class="delete far fa-calendar-times" job="delete"></i>
                  </li>
                 `
            const position = "beforeend";

            list.insertAdjacentHTML(position,text);
        }
        
   }
    
        
    }

function empty(){
    
    
    var n = document.getElementById("js-list").childElementCount;
    
    for(var i =0; i<n*3;i++){

    list.removeChild(list.childNodes[0]);
    
    }
}
        
          

    


document.addEventListener("keypress",function(event){//when user input a todo item and press enter will call this function
    if(event.key==='Enter'){
        const toDo = input.value;
        if(toDo){
            
            empty();
            
            Create_todo(toDo);
            
        }
        input.value = "";
    }
});

document.getElementById("js-add-button").addEventListener("click",function(){
    console.log("add button is clicked");
    const toDo = input.value;
    if(toDo){
            
        empty();
        
        Create_todo(toDo);
        
    }
    input.value = "";
    
});


//function clear(){
//array = emptyarray;
//}

gettodo();

//----------------------------------------------------------------------event listener for delete and completeTODO
list.addEventListener("click",function(event){
    let element = event.target;
    const elementJOB = event.target.attributes.job.value;
    if(elementJOB == "complete"){
        completeTODO(element);
    }
    else if(elementJOB == "delete"){
        removeToDo(element);
    }
    

});

//------------------------------------------------------------------------delete
function removeToDo(element){ 
    
    removeByAPI(element.parentNode.innerText);
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    //removeByAPI(element);
    //call another funciton to remove it from server
} 
function removeByAPI(element){
    var todoID;
    for (var i =0; i <array.length; i++) {
        if (array[i].text == element) {
            todoID = array[i].id;
        }
    }
    
    
    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
           
        }
    };

    xhttp1.open("DELETE", "https://cse204.work/todos/" + todoID, true);
    xhttp1.setRequestHeader("Content-type","application/json");
    xhttp1.setRequestHeader("x-api-key", "ffae54-13e896-b81c6e-0ebfde-e2445f")
    xhttp1.send();

    
}
//------------------------------------------------------------------------------completeTODO

function completeTODO(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);
    //call another function to update the complete in server
    compelte_status_updates(element.parentNode.innerText)


}

function compelte_status_updates(element){
    
    
    var todoID;
    for (var i =0; i <array.length; i++) {
        if (array[i].text == element) {
            todoID = array[i].id;
            if(array[i].completed == false){
                var data = {
        
                    "text": array[i].text,
                    "completed": true,
                }
                array[i].completed = true;
            }
            else{
                var data = {
        
                    "text": array[i].text,
                    "completed": false,
                }
                array[i].completed = false;
            }
            console.log(array[i].text);
            console.log(array[i].completed);
        }
    }
    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            
        }
    };

    xhttp1.open("PUT", "https://cse204.work/todos/" + todoID, true);
    xhttp1.setRequestHeader("Content-type","application/json");
    xhttp1.setRequestHeader("x-api-key", "ffae54-13e896-b81c6e-0ebfde-e2445f")
    xhttp1.send(JSON.stringify(data));

    
}


