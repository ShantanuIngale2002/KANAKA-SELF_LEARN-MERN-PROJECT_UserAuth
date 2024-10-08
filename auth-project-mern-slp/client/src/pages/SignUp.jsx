import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
    const navigate = useNavigate();
    const initData = { username: "", email: "", password: "" };
    const [formData, setFormData] = useState(initData);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // on-submit dont-refresh
        try {
            setLoading(true);
            setError(false);
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(true);
                return;
            }
            console.log("Signed Up : " + formData.username);
            navigate("/sign-in"); // goto signin page
        } catch (err) {
            /*setLoading(false);
            setError(true);*/
        }
    };

    //console.log(formData);

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
            <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                    value={formData.username}
                />
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                    value={formData.email}
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="bg-slate-100 p-3 rounded-lg"
                    onChange={handleChange}
                    value={formData.password}
                />
                <button
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Sign up"}
                </button>
                <OAuth /> {/* OAuth component */}
            </form>
            <div className="flex gap-2 mt-5 justify-center">
                <p>Have an account?</p>
                <Link to="/sign-in">
                    <span className="text-blue-500 hover:cursor-pointer">
                        Sign-in
                    </span>
                </Link>
            </div>
            <p className="text-red-500 mt-5 text-center">
                {error ? error || "Something went wrong!!" : ""}
            </p>
        </div>
    );
};

export default SignUp;
