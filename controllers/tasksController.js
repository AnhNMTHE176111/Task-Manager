import Task from "../models/Task.js"
const getAllTask = async (req, res) => {
    Task.find()
        .then((result) => {
            res.status(200).send({ task: result })
        }).catch((err) => {
            res.status(500).send({ err })
        });
}
const createTask = (req, res) => {
    Task.create(req.body)
        .then((result) => {
            res.status(200).json({ result })
        }).catch((err) => {
            res.status(500).json({ err })
        });;
}

const getTask = async (req, res) => {

    // Task.findById(id)
    //     .then((result) => {
    //         res.status(200).json({ result })
    //     }).catch((err) => {
    //         res.status(404).json({ message: `No task with id ${id}` })
    //     }); 
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: `No task with id ${id}` })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOneAndDelete({ _id: id });
        if (!task) {
            return res.status(404).json({ message: `No task with id ${id}` })
        }
        res.status(200).json({ message: `Delete successfully with id ${id}`, task: task })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const updateTask = async (req, res) => {

    try {
        const id = req.params.id;

        const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        })

        if (!task) {
            return res.status(404).json({ message: `No task with id ${id}` })
        }

        res.status(200).json({
            task: task
        })
    } catch (error) {

    }
}

export {
    getAllTask,
    createTask,
    updateTask,
    deleteTask,
    getTask
}