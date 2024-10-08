import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { firebaseApp } from "../firebase";

const Profile = () => {
    const fileRef = useRef(null);
    const { currentUser } = useSelector((state) => state.user);

    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});

    // useEffect(() => {
    //     handleImageUpdate(image);
    // }, [image]);

    const handleImageUpdate = (image) => {
        const storage = getStorage(firebaseApp); // firebase storage service at config firebase.js's firebaseApp
        const fileName = new Date().getTime() + image?.name; // always unique
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        // uploading
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(Math.round(progress)); // set := progress of image uploading
            },
            (error) => setImageError(true),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, profilePicture: downloadURL });
                });
            }
        );
    };

    //console.log(formData);

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className="flex flex-col gap-4">
                <input
                    type="file"
                    ref={fileRef}
                    accept="image/*"
                    hidden
                    onChange={(e) => handleImageUpdate(e.target.files[0])}
                />
                <img
                    src={formData.profilePicture || currentUser.profilePicture} // temporary for now
                    alt="PP"
                    className="h-24 w-24 self-center rounded-full cursor-pointer object-cover mt-2"
                    onClick={() => fileRef.current.click()}
                />
                <p className="text-sm self-center">
                    {imageError ? ( // if error
                        <span className="text-red-700">
                            Error Uploading Image | Please check file format and
                            size less than 2mb.
                        </span>
                    ) : imagePercent > 0 && imagePercent < 100 ? ( // else if !error and percent > 0 and < 100
                        <span className="text-slate-700">
                            {`Uploading : ${imagePercent}%`}
                        </span>
                    ) : imagePercent === 100 ? ( // else if percent is 100
                        <span className="text-green-700">
                            Image uploaded successfully
                        </span>
                    ) : (
                        // else nothing
                        ""
                    )}
                </p>
                <input
                    defaultValue={currentUser.username}
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="bg-slate-100 rounded-lg p-3"
                />
                <input
                    defaultValue={currentUser.email}
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="bg-slate-100 rounded-lg p-3"
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Update Password"
                    className="bg-slate-100 rounded-lg p-3"
                />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    Update
                </button>
            </form>
            <div className="flex justify-between my-5 mx-2">
                <span className="text-red-700 cursor-pointer">
                    Delete Account
                </span>
                <span className="text-red-700 cursor-pointer">Sign-out</span>
            </div>
        </div>
    );
};

export default Profile;
