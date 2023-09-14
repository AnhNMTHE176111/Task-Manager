let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id');

console.log('id: ', id);

axios.get(`/api/v1/tasks/${id}`)
    .then((result) => {
        console.log(result);
        let idTask = document.getElementById('idTask');
        let nameTask = document.getElementById('nameTask');
        let completed = document.querySelector(`input[name="completed"]`);

        idTask.value = result.data.task._id;
        nameTask.value = result.data.task.name;
        completed.checked = result.data.task.completed === true;
    }).catch((err) => {
        console.log(err);
    });



document.querySelector('.back').addEventListener('click', () => {
    window.location.href = 'index.html';
})

document.querySelector('.form').addEventListener('submit', async (e) => {
    e.preventDefault();

    let id = document.querySelector('#idTask').value;
    let newName = document.querySelector('#nameTask').value;
    let completed = document.querySelector('#completed').checked;

    axios.patch(`/api/v1/tasks/${id}`, {
        name: newName,
        completed: completed
    }).then((result) => {
        document.getElementById('result').innerHTML = 'Edit Successfully';

    }).catch((err) => {
        console.log('vcl loi roi ', err);
        document.getElementById('result').innerHTML = 'Something Error';

    });

    setTimeout(() => {
        document.getElementById('result').innerHTML = '';
    }, 3000)
})