import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [User, setUser] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...User, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!User.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(User.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!User.password) {
            newErrors.password = "Password is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((user) => user.email === User.email && user.password === User.password);

        if (user) {
            alert("Login successful!");
            navigate("/dashboard");
        } else {
            alert("Invalid User!");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={User.email}
                        onChange={handleChange}
                    />
                    {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={User.password}
                        onChange={handleChange}
                    />
                    {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
