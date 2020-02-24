
const taskTemp= document.querySelector('.tasks');
//delete the task

document.body.addEventListener('click',onClick);
function onClick(e)
{
    if(e.target.classList.contains("delete") )
        {
            const delValue =confirm("Are you sure to delete");
            if (delValue==1)
            {
                e.target.parentElement.parentElement.remove();
                deleteLS(e.target.parentElement.previousElementSibling);
            }
        }
}
//delete from Local Storage
function deleteLS(delItem){
    console.log("delete activated");
    let task;
    if(localStorage.getItem('task') === null)
    {
        task=[];
    }
    else
    {
        task=JSON.parse(localStorage.getItem('task'));


    }

    
    task.forEach(function(tasks,index){
       
        if(delItem.innerHTML === tasks){
            

            
            
            task.splice(index,1);
        }
    })
    localStorage.setItem('task',JSON.stringify(task));
}
//completed function
document.body.addEventListener('click',onClickCom);
function onClickCom(e)
{
    if(e.target.classList.contains("com") )
       {
            const comValue =confirm("have you completed the project ?");
            if (comValue==1)
            {
                let comPa=e.target.parentElement;
                let badge= document.createElement('span');
                badge.appendChild(document.createTextNode("completed"));
                let inxt= document.querySelector('.btng');
                comPa.parentElement.insertBefore(badge,inxt);
                badge.className="badge badge-pill badge-success";
               
                const va = e.target.parentElement.previousElementSibling.innerHTML;
                console.log(va);
                let task;
                if(localStorage.getItem('task') === null)
                 {
                    task=[];
                  }
                else
                {
                    task=JSON.parse(localStorage.getItem('task'));


                }   

                task.forEach(function(tasks){
       
                  if(va === tasks){
                    tasks += `<span class="badge badge-pill badge-success">completed</span>`;
                 }
                
                })
                localStorage.setItem('task',JSON.stringify(task));
                e.target.remove();
            }
         
        }

}
//add tasks to the to-do
const submit= document.querySelector('.submit');
submit.addEventListener('click',onClickSub);

function onClickSub(e)
{
    const inputText = document.getElementById("textTask").value;
    if (inputText=== ""){
        alert("No task enterd");
        return ;
    }
    let task;
    if(localStorage.getItem('task') === null)
    {
        task=[];
    }
    else
    {
        task=JSON.parse(localStorage.getItem('task'));


    }
    task.push(inputText);
    localStorage.setItem('task',JSON.stringify(task));
    e.target.previousElementSibling.previousElementSibling.value=" ";
    
    displayContent();
    
}
displayContent();
//display content



function displayContent(){
    
    let task;
    if(localStorage.getItem('task') === null)
    {
        task=[];
    }
    else
    {
        task=JSON.parse(localStorage.getItem('task'));


    }
    taskTemp.innerHTML="";
    task.forEach(function(tasks){
        let proto=`
   
        <li class="list-group-item">
      
              <span  class="taskText">${tasks}</span>
                  <div class="btn-group float-right">
                      <button type="button" class="btn btn-sm btn-outline-success com">Completed</button>
                      <button type="button" class="btn btn-sm btn-outline-danger delete">Delete</button>
                  </div>
              
        </li>
      `
      taskTemp.innerHTML+=proto;
        
    })

}


//filter
document.body.addEventListener('keyup',filterTask);
function filterTask(e)
{
    if(e.target.classList.contains("filter") )
    {
        const filterValue = e.target.value;
        console.log(filterValue);
        
        const check= document.querySelectorAll(".taskText").forEach(
            function(task)
            {   
                const item = task.firstChild.textContent;
                console.log(item);
                console.log(task.parentElement);
                if (item.toLowerCase().indexOf(filterValue )!=-1){

                    task.parentElement.style.display="block";
                }
                else{
                    task.parentElement.style.display="none";
                }

            })
    }

}
