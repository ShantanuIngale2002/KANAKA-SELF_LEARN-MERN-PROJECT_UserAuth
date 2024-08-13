import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    const initData = { email: "", password: "" };
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
            const res = await fetch("/api/auth/signin", {
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
            console.log("Signed In : " + data.username);
            navigate("/"); // goto home page
        } catch (err) {
            // does not work here
        } finally {
            // setFormData(initData);
        }
    };

    //console.log(formData);

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
            <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
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
                    {loading ? "Processing..." : "Signup"}
                </button>
            </form>
            <div className="flex gap-2 mt-5 justify-center">
                <p>Don't have an account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-500 hover:cursor-pointer">
                        Sign-up
                    </span>
                </Link>
            </div>
            <p className="text-red-500 mt-5 text-center">
                {error && "Something went wrong!!"}
            </p>
        </div>
    );
};

export default SignIn;
