import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import withLoading from "./withLoading";

const UserListWithLoading = withLoading(UserList);

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(["Akshat", "Priya", "Rohit"]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <h1>Team Members</h1>
      <UserListWithLoading isLoading={loading} users={users} />
    </div>
  );
}

export default App;
