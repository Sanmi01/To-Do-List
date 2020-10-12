const clear = document.querySelector('.clear');
const dateElement = document.querySelector('#date');
const list = document.querySelector('#list');
const input = document.querySelector('#input');

let options = {weekday:'long', month:'short', day:'numeric'};
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-us", options);

{/* <i class="fas fa-trash"></i> TRASH */}
{/* <i class="fas fa-check-circle"></i> CHECK */}
{/* <i class="far fa-circle"></i> UNCHECK */}
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINEtHROUGH = "lineThrough";

let LIST, id;

let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})



function addToDo(toDo, id, done, trash) {

if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINEtHROUGH : "";

    const item = `
                <li class="item">
                <i class = "fa ${DONE}" job = "complete" id="${id}"></i>
                <p class = "text ${LINE}">${toDo}</p>
                <i class = "fas fa-trash" job = "delete" id="${id}"></i>
                </li>
    `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

document.querySelector(".plus").addEventListener("click", function(event){
        const toDo = input.value;

        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = '';
})

document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = '';
    }
})

function completeToDo(element) {
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(LINEtHROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}


function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete") {
        completeToDo(element)
    } else if (elementJob == "delete") {
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
})