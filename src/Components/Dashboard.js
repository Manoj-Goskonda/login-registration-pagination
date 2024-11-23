import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <table border="1" style={{ width: "100%", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                        marginRight: "10px",
                        padding: "5px 10px",
                        background: "gray",
                        color: "white",
                        border: "none",
                        cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    }}
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                            margin: "0 5px",
                            padding: "5px 10px",
                            background: currentPage === index + 1 ? "blue" : "gray",
                            color: "white",
                            border: "none",
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                        marginLeft: "10px",
                        padding: "5px 10px",
                        background: "gray",
                        color: "white",
                        border: "none",
                        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    }}
                >
                    Next
                </button>
            </div>

            <div style={{ marginTop: "20px" }}>
                <NavLink to="/">Registration</NavLink>
            </div>
        </div>
    );
};

export default Dashboard;
