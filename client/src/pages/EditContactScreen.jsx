import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const EditContactScreen= () => {

    const cached = localStorage.getItem('c_user');
    const parsedCached = JSON.parse(cached);
    const parsedId = parsedCached._id;
    const navigate = useNavigate();

    const [user, setUser] = useState({
        fname: parsedCached.fname,
        lname: parsedCached.lname,
        status: parsedCached.status,
    });



    const handleInput = (e) => {
        let { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:7000/api/update/${parsedId}`,{
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "PUT",
                body: JSON.stringify(user),
    });
            const data = await response.json();
            
            if (response.ok) {
                setUser(data);
                alert("Data updated");
                navigate("/");
            } else {
                alert(`${data.message}`);
            }
        } catch (error) {
            console.error("Server error:", error);
            alert("Server error");
        }
    };

    return (
        <div className="contact-page bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="contact-box p-8 shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-blue-500">Create Contact</h1>
                <div className="content-wrapper max-w-screen-lg flex">
                    <div className="left w-1/4 p-4">
                        <div className="topics">
                            <ul>
                                <li><a href="#" className="text-blue-500 hover:underline">Contact</a></li>
                                <li><a href="#" className="text-blue-500 hover:underline">Charts</a></li>
                                <li><a href="#" className="text-blue-500 hover:underline">Map</a></li>
                                <li><a href="#" className="text-blue-500 hover:underline">Sidebar</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="right w-3/4 p-4">
                        <div className="form">
                            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="firstName"
                                    name="fname"
                                    value={user.fname}
                                    onChange={handleInput}
                                    type="text"
                                    placeholder="Enter First Name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="lastName"
                                    name="lname"
                                    value={user.lname}
                                    onChange={handleInput}
                                    type="text"
                                    placeholder="Enter Last Name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                                    Status
                                </label>
                                <div className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        id="active"
                                        name="status"
                                        value={true}
                                        checked={user.status === true}
                                        onChange={handleInput}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor="active" className="text-sm">
                                        Active
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="inactive"
                                        name="status"
                                        value={false}
                                        checked={user.status === false}
                                        onChange={handleInput}
                                        className="mr-2 leading-tight"
                                    />
                                    <label htmlFor="inactive" className="text-sm">
                                        Inactive
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Save Edited Contact
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
