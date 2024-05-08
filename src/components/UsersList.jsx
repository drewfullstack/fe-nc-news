import { useEffect, useState } from "react";
import { getUsers } from "../../api";
import "../styles/UsersList.css";

import UserCard from "./UserCard";

function UsersList({ setUser }) {
  const [users, setUsers] = useState([]);

  function handleSelectUser(user) {
    setUser(user);
  }

  useEffect(() => {
    getUsers().then((userData) => {
      setUsers(userData.data.users);
    });
  }, []);

  return (
    <div className="users-list">
      <h2>Select a User:</h2>
      <ul>
        {users.map((user) => {
          return (
            <UserCard
              key={user.username}
              user={user}
              handleSelectUser={handleSelectUser}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default UsersList;
