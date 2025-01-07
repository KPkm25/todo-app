import LS from './ls.js';

function UI(){}

    const ls=new LS()

    UI.prototype.showAllTasks=function(){

      let tasks=ls.fetchTask()
      let newHTML=''
      tasks.forEach((tak)=>{
        newHTML+=`
        <div class="task ${tak.isComplete ? "completed" :""}" data-createdat="${tak.id}">
        <div class="task__details">
          <input type="checkbox" class="task-check" ${tak.isComplete ? 'checked' :''} />
          <label class="task-title">${tak.title}</label>
        </div>

        <div class="task__op">
          <ion-icon class="task__op_edit" name="create-outline"></ion-icon>
          <ion-icon class="task__op_delete" name="trash-outline"></ion-icon>
        </div>
      </div>`
      });

      document.querySelector('.task-list').innerHTML=newHTML
    }

    UI.prototype.addToUI=function(task){

        ls.storeTask(task);

        let newHTML=`
        <div class="task" data-createdat="${task.id}">
        <div class="task__details">
          <input type="checkbox" class="task-check" />
          <label class="task-title">${task.title}</label>
        </div>

        <div class="task__op">
          <ion-icon class="task__op_edit" name="create-outline"></ion-icon>
          <ion-icon class="task__op_delete" name="trash-outline"></ion-icon>
        </div>
      </div>`

      document.querySelector('.task-list').insertAdjacentHTML('afterbegin',newHTML)

    }

    UI.prototype.resetForm=function(){

        document.querySelector('#newtaskID').value=''

    }
    UI.prototype.deleteTask=function(e){
        const task=e.target.parentElement.parentElement//used to access both delete button parent and the 'task' parents
        //console.log(task.dataset.createdat)
        const id=task.dataset.createdat
        ls.deleteTask(id)
        task.remove()

    }
    
    UI.prototype.completeTask=function(e){
        const task=e.target.parentElement.parentElement
        const id=task.dataset.createdat
        ls.completeTask(id)
        task.classList.toggle('completed')//className permanently changes the class, deleting any previous data while ClassList is used to add/remove a class without affecting any previous data, useful when using multiple classes on an element
        
    }

    UI.prototype.editTask = function (e){
      const task = e.target.parentElement.parentElement
      const id = task.dataset.createdat
      const data = ls.findTask(id)
      
      document.querySelector('#newtaskID').value = data.title;
      document.querySelector('#updateTaskID').value = data.id;

      document.querySelector('.AddTaskBtn').style.display = 'none';
      document.querySelector('.EditTaskBtn').style.display = 'inline';
      document.querySelector('.CancelTaskBtn').style.display = 'inline';


    }

    UI.prototype.updateTask=function(e){
      const taskID=document.querySelector('#updateTaskID').value
      const taskTitle=document.querySelector('#newtaskID').value
      const tasks=document.querySelectorAll('.task-title')//using queryselectorall cuz there are multiple titles to go through

      if(taskTitle.length>0){
        ls.updateTask(taskID,taskTitle)
        tasks.forEach((title)=>{
          if(title.parentElement.parentElement.dataset.createdat===taskID)
          {
            title.innerText=taskTitle
          }
        })
      }
      document.querySelector('#newtaskID').value = '';
      document.querySelector('#updateTaskID').value = '';

      document.querySelector('.AddTaskBtn').style.display = 'inline';
      document.querySelector('.EditTaskBtn').style.display = 'none';
      document.querySelector('.CancelTaskBtn').style.display = 'none';

    }
    UI.prototype.cancelTask=function(e){
      document.querySelector('#newtaskID').value = '';
      document.querySelector('#updateTaskID').value = '';

      document.querySelector('.AddTaskBtn').style.display = 'inline';
      document.querySelector('.EditTaskBtn').style.display = 'none';
      document.querySelector('.CancelTaskBtn').style.display = 'none';

    }

export default UI;