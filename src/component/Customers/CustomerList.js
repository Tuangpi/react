
export const CustomerList = (users) => {
    return (
      <>
        <table>
          <thead>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
          </thead>
          <tbody>
            {users.map((user) => {
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </>
    );
  };
  