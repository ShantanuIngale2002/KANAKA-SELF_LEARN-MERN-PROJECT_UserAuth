import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../firebase";
import { useDispatch } from "react-redux";
import userSlice, {
    signInStart,
    signInSuccess,
    signInFailure,
} from "../redux/user/userSlice";

const OAuth = () => {
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider(); // gmail provider
            const auth = getAuth(firebaseApp); // get firebase
            const result = await signInWithPopup(auth, provider); // pop-up
            //console.log(result); // here result will return all the user-info inc. display-name, email, photoUrl
            //console.log({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL, });
            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            //console.log(res);
            const data = await res.json();
            dispatch(signInSuccess(data));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button
            className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
            type="button"
            onClick={handleGoogleClick}
        >
            Continue with google
        </button>
    );
};

export default OAuth;
