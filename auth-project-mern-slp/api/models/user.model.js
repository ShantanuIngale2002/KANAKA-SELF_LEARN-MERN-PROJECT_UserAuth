import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    // xtra-info : creation time
    { timestamps: true }
);

const User = mongoose.model("User", userSchema); // mongoose will auto plural-ify ie. "Users" as Collection name in db.

export default User;
