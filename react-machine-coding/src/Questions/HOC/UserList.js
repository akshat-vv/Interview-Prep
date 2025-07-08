import React from "react";

function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user}>{user}</li>
      ))}
    </ul>
  );
}

export default UserList;
