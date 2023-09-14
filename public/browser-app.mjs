
const root = document.getElementById('root');

document.addEventListener('DOMContentLoaded', () => {
    loadData({
        msg: '',
        color: ''
    })
})


console.log('reload');

function loadData(moreDetail) {
    axios.get('/api/v1/tasks')
        .then((result) => {
            const tasks = result.data;
            showMessage(moreDetail)

            showListTask(tasks.task);
        }).catch((err) => {
            console.log(err);
            showMessage(moreDetail)

            showListTask(tasks.task);
        });
}

function showMessage(moreDetail) {
    document.getElementById('result').innerHTML = moreDetail.msg;
    document.getElementById('result').style.color = moreDetail.color;
    setTimeout(() => {
        document.getElementById('result').innerHTML = '';
        document.getElementById('result').style.color = '';
    }, 3000)
}

function showListTask(data) {
    const container = document.createElement('div');
    container.id = 'list-task-container';
    const ul = document.createElement('ul');
    Array.from(data).forEach(item => {
        const la = `<li id="${item._id}" > 
            
            <span name="left-span"> 
                ${item.completed == true ? `<img src="./images/check.png" name="check" alt=""> <p style=" text-decoration: line-through;"> ${item.name} </p>` : `<p>${item.name}</p>`
            }
                 
            </span>
            <span name="right-span"> 
                <img src="./images/edit.png" name="edit" alt="" onclick="editTask('${item._id}')">
                <img src="./images/recycle-bin.png" name="bin" alt="" onclick="deleteTask('${item._id}')">
            </span>
        
            
        </li>`;
        ul.innerHTML += la;
    })
    setDoneOrNot();
    container.appendChild(ul)
    root.append(container);
}

function deleteTask(id) {

    axios.delete(`/api/v1/tasks/${id}`)
        .then((result) => {
            window.location.href = 'index.html'
        }).catch((err) => {
            console.log(err);
        });
}

function editTask(id) {
    window.location.href = `task.html?id=${id}`
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    let name = document.querySelector('#task').value;
    axios.post('/api/v1/tasks', {
        name: name
    })
        .then((result) => {
            loadData({
                msg: 'Add New Task Successfully',
                color: 'green'
            });

        }).catch((err) => {
            loadData({
                msg: 'Add fail',
                color: 'red'
            })
        });
})

function setDoneOrNot() {
    document.querySelectorAll("li").forEach(item => {
        console.log('click 1');
        item.addEventListener('click', (e) => {
            console.log('click 2');

            axios.patch(`/api/v1/tasks/${item.id}`, {
                name: newName,
                completed: true
            }).then((result) => {
                loadData({
                    msg: 'Done task',
                    color: 'green'
                })

            }).catch((err) => {
                console.log('vcl loi roi ', err);
                loadData({
                    msg: 'Something Wrong',
                    color: 'red'
                })

            });
        })
    })
}

