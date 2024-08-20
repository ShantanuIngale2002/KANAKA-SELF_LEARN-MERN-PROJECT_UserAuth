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
        profilePicture: {
            type: String,
            default:
                "https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg", // if user didnt provide
        },
    },
    // xtra-info : creation time
    { timestamps: true }
);

const User = mongoose.model("User", userSchema); // mongoose will auto plural-ify ie. "Users" as Collection name in db.

export default User;
