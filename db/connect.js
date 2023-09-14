import mongoose from "mongoose"

export const connectDB = (url) => (
    mongoose
        .connect(url)
        .then((result) => {
            console.log('Connected to DB...');
        }).catch((err) => {
            console.log(err);
        })
)


