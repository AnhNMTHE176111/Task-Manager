import mongoose from "mongoose";

const Task = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide name"],
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters'],
        unique: true,
        minlength: [5, 'name can not be less than 5 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('TaskModel', Task);