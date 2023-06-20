import React from "react";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("https://ventus.up.railway.app/api/users");
    setUsers(response.data);
  };

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Anda yakin ingin menghapus akun ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    });
    if (result.isConfirmed) {
      await axios.delete(`https://ventus.up.railway.app/api/users/${id}`);
      getUsers();
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1> Users</h1>
      <p className="fs-4">List of user</p>
      <Table responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id_user}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link
                  to={`/dashboard/users/edit/${user.id_user}`}
                  className="btn"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.id_user)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ul className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            key={i}
            className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
