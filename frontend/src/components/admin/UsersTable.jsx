const UsersTable = ({ users = [], onToggleBlock }) => {
  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u._id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>
              <span
                className={`badge ${u.isBlocked ? "bg-danger" : "bg-success"}`}
              >
                {u.isBlocked ? "Blocked" : "Active"}
              </span>
            </td>
            <td>
              <button
                className={`btn btn-sm ${
                  u.isBlocked ? "btn-success" : "btn-danger"
                }`}
                onClick={() => onToggleBlock(u._id)}
              >
                {u.isBlocked ? "Unblock" : "Block"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
