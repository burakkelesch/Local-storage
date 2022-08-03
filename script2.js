let missionList = [];
if(localStorage.getItem("BilgeAdam of missionList") !== null)
{
    missionList = JSON.parse(localStorage.getItem("BilgeAdam of missionList"));
} 

let editId;
let isEditTask = false;

const taskInput = document.querySelector("#txtTaskName");
const btnClear = document.querySelector("#btnClear");
const filters = document.querySelectorAll(".filters span");

displayTasks("all");
document.querySelector("#btnAddNewTask").addEventListener("click", newTask);
function newTask(event)
{
    event.preventDefault();
    if(taskInput.value == "")
    {
        hataGoster(taskInput,"En az 3 karakter girilmeli");
    }
    else if(taskInput.value.length <3)
    {
        hataGoster(taskInput,"En az 3 karakter girilmeli");
    }
    else
    {
        //Duzenleden gelen gorev eger isEditTask false ile yeni bir kayit olarak eklenir
        if(!isEditTask)
        {
         missionList.push({"id":missionList.length+1,"missionName":taskInput.value, "Status":"pending"});   
        }
        else
        {
            //true ise listeden secilen
            for(let mission of missionList)
            {
                if(mission.id == editId)
                {
                    mission.missionName = taskInput.value;
                }
                isEditTask = false;
            }
        }
        success(taskInput);
        console.log(missionList);
        taskInput.value = "";
        displayTasks(document.querySelector("span.active").id);
        localStorage.setItem("BilgeAdam of missionList", JSON.stringify(missionList));
    } 
    
}

function hataGoster(input, message)
{
    input.className = 'form-control is-invalid';
    const div = input.nextElementSibling;
    div.innerText = message;
    div.className = 'invalid-feedback';
}

function success(input)
{
    input.className = 'form-control is-valid';
}

function displayTasks(filter)
{
    let ul = document.getElementById("task-list");
    ul.innerHTML ="";
    for(let mission of missionList)
    {
        let completed = mission.durum == "completed" ? "checked": "";
        if(filter == mission.durum || filter == "all")
        {        
        let li = `<li class="task list-group-item">
        <div class="form-check">
        <input type="checkbox" onClick="updateStatus(this)" id="${mission.id}" class="form-check-input" ${completed}>
        <label for="${mission.id}" class="form-check-label" ${completed}> ${mission.missionName} </label>
        </div>
        <div class="dropdown">
            <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-ellipsis"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a onClick='editTask(${mission.id},"${mission.missionName}")' class="dropdown-item" href="#"><i class="fa-solid fa-pen-to-square"></i>Edit</a></li>
                
                <li><a onClick=deleteTask(${mission.id}) class="dropdown-item" href="#"><i class="fa-solid fa-trash"></i>Delete</a></li>
            </ul>
        </div>
        </li>`;
        
        ul.insertAdjacentHTML("beforeend",li); 
        }      
    }
}

for(let span of filters)
{
    span.addEventListener("click",function(){
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");
        displayTasks(span.id);
    })
}

function editTask(id,missionName)
{
    console.log(id + ". id'ye tiklandi" +" "+ missionName + " " + "gorevin adi");
    editId = id;
    isEditTask = true; // Duzenle butonuna basilmis gorevin guncellenip guncellenmedigini belirledigimiz yer 
    taskInput.value= missionName;
    taskInput.focus();
    taskInput.classList.add("active");

}

function updateStatus(selectedTask)
{
    let label = selectedTask.nextElementSibling;
    let durum;

    if(selectedTask.checked)
    {
        label.classList.add("checked");
        durum = "completed";
    }
    else
    {
        label.classList.remove("checked");
        durum = "pending";
    }

    for(let mission of missionList)
    {
        if(mission.id == selectedTask.id)
        {
            mission.durum = durum;
        }
    }
    displayTasks(document.querySelector("span.active").id);
    console.log(missionList);
    localStorage.setItem("BilgeAdam of missionList", JSON.stringify(missionList));
}

function deleteTask(id)
{
    let deleteId;
    
    console.log(id + ". id silindi");
    for(let index in missionList)
    {
        if(missionList[index].id == id)
        {
           deleteId = index;
        }
    }
    missionList.splice(deleteId,1);
    displayTasks(document.querySelector("span.active").id);
    localStorage.setItem("BilgeAdam of missionList", JSON.stringify(missionList));
}

