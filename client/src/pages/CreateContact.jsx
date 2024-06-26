import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllUsersQuery } from '../rtk/services';

export const CreateContact = () => {
  const navigate = useNavigate();
  
  const { data: users, error, isLoading } = useGetAllUsersQuery(); // Renamed data property to users
  const [cachedUsers, setCachedUsers] = useState([]); // Used cachedUsers instead of users

  if (error) {
    console.error("Error:", error);
  }
  if (isLoading) {
    console.log("Loading...");
  }

  // Update cachedUsers when data changes
  React.useEffect(() => {
    if (users) {
      setCachedUsers(users);
      localStorage.setItem("users", JSON.stringify(users)); // Moved inside useEffect to ensure it's called after the state update
    }
  }, [users]);

  const handleEdit = (userId) => {
    const c_user = cachedUsers.find(user => user._id === userId);
    console.log("from ecs", c_user);
    localStorage.setItem("c_user", JSON.stringify(c_user));   
    navigate("/ecs");
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:7000/api/delete/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCachedUsers(cachedUsers.filter(user => user._id !== userId)); // Updated cachedUsers instead of users
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="contact-page bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="contact-box p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-blue-500">Create Contact</h1>
        <div className="content-wrapper max-w-screen-lg flex">
          <div className="left w-1/2 p-4">
            <div className="topics">
              <ul>
                <li><a href="#" className="text-blue-500 hover:underline">Contact</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Charts</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Map</a></li>
                <li><a href="#" className="text-blue-500 hover:underline">Sidebar</a></li>
              </ul>
            </div>
          </div>
          <div className="right w-1/2 p-4">
            <div className="create-contact-btn mb-4">
              <button onClick={() => navigate("/ccs")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create Contact
              </button>
            </div>
            {cachedUsers.length > 0 ? (
              <div className="users">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                <div className="grid grid-cols-3 gap-4">
                  {cachedUsers.map((user) => (
                    <div key={user._id} id={user._id} className="user-box bg-gray-200 p-4 rounded">
                      <p>{user.fname} {user.lname}</p>
                      <p>{user.status ? 'Active' : 'Inactive'}</p>
                      <div className="flex-column justify-between mt-2">
                        <button onClick={() => handleEdit(user._id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>No user present. Please click on "Create Contact" to add users</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
