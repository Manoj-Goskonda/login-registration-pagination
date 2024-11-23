import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!user.name) {
            newErrors.name = "Name is required.";
        }
        if (!user.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!user.password) {
            newErrors.password = "Password is required.";
        } else if (user.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some((existingUser) => existingUser.email === user.email)) {
            alert("Email already registered");
            return;
        }

        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful");
        navigate("/Login");
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={user.name}
                        onChange={handleChange}
                    />
                    {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registration;
