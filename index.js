
const url = 'https://jsonplaceholder.typicode.com/todos';
const list = document.querySelector('#list');
const form = document.querySelector('#form');

const getAllUsers = () =>{
fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
 
 creatcontainer(data);

 
})
}



const creatcontainer = (data) => {
  for(let i = 0; i< data.length; i++){
    const container = document.createElement('div');
        container.classList = 'list__item';
  const containerforInpitId = document.createElement('div');
  containerforInpitId.classList = 'containerflex';
        const inputtoDo = document.createElement('input');
        inputtoDo.classList ='inputtodo';
        inputtoDo.type = 'checkbox';
        inputtoDo.checked = data[i].completed && false;
        
        inputtoDo.addEventListener('click', function(){
        data[i].completed===true;
        container.classList.toggle('list__item_checked');
     
  
  })
        const idtoDo = document.createElement('div');
        idtoDo.classList = 'idtodo';
        
        idtoDo.textContent = data[i].id;
        containerforInpitId.prepend(inputtoDo, idtoDo)
        const textTodo = document.createElement('div');
        textTodo.textContent = data[i].title;
  
        const removetoDo = document.createElement('button');
        removetoDo.textContent = '❌';
  
        list.append(container);
        container.prepend(containerforInpitId, textTodo, removetoDo);
  
        removetoDo.addEventListener('click', function(){
           deleteUser(idtoDo, container);
        })
        
  
  
  }
}
const deleteUser = (id, node) => {
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("error");
      }
      return node.remove();
    })
    .catch((error) => {
      const count = document.querySelector('#count');
      const table = document.querySelector('table');
      const errorMessageContainer = document.createElement('div');
      count.textContent = 'неизвестно';
      errorMessageContainer.classList.add('error');
      errorMessageContainer.textContent = 'Произошла ошибка при получении данных'
      table.replaceWith(errorMessageContainer);
      })


    }
    



form.addEventListener('submit', function(){
  const input = document.getElementById('form__input');
  

  
    const getPost =  {
    method: 'POST', 
    body: JSON.stringify({ title: input.value, completed: false }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }
  fetch(url, getPost)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const container = document.createElement('div');
    container.classList = 'list__item';
const containerforInpitId = document.createElement('div');
containerforInpitId.classList = 'containerflex';
    const inputtoDo = document.createElement('input');
    inputtoDo.classList ='inputtodo';
    inputtoDo.type = 'checkbox';
    inputtoDo.checked = data.completed && false;
    
    inputtoDo.addEventListener('click', function(){
    data.completed===true;
    container.classList.toggle('list__item_checked');
 

})
    const idtoDo = document.createElement('div');
    idtoDo.classList = 'idtodo';
    
    idtoDo.textContent = data.id;
    containerforInpitId.prepend(inputtoDo, idtoDo)
    const textTodo = document.createElement('div');
    textTodo.textContent = data.title;

    const removetoDo = document.createElement('button'); 
    removetoDo.textContent = '❌';

    list.append(container);
    container.prepend(containerforInpitId, textTodo, removetoDo);

    removetoDo.addEventListener('click', function(){
       deleteUser(idtoDo, container);
    })
  })
    


  input.value = '';

  });
 



      

  
    getAllUsers();





