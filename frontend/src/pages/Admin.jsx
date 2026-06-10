import { useEffect, useState } from 'react';
import { getAllUsersAPI, updateUserRoleAPI, deleteUserAPI } from '../services/auth.service.js';
import toast from 'react-hot-toast';
import { IoTrash, IoShieldCheckmark } from 'react-icons/io5';
import './Admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchUsers = async (p = 1) => {
    setLoading(true);
    try {
      const res = await getAllUsersAPI(p);
      setUsers(res.data.users);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(page); }, [page]);

  const handleRoleToggle = async (user) => {
    const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
    try {
      await updateUserRoleAPI(user._id, newRole);
      setUsers((prev) => prev.map((u) => u._id === user._id ? { ...u, role: newRole } : u));
      toast.success(`Role updated to ${newRole}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update role');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user permanently?')) return;
    try {
      await deleteUserAPI(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setTotal((prev) => prev - 1);
      toast.success('User deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-header">
          <div>
            <h1 className="page-title">User Management</h1>
            <p className="page-subtitle">{total} registered user{total !== 1 ? 's' : ''}</p>
          </div>
        </div>

        <div className="card animate-fade" style={{ padding: 0, overflow: 'hidden' }}>
          {loading ? (
            <div className="empty-state"><span className="spinner" /></div>
          ) : (
            <div className="users-table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="animate-fade">
                      <td>
                        <div className="user-row">
                          <div className="user-avatar-sm">{user.fullName.charAt(0).toUpperCase()}</div>
                          <span className="user-full-name">{user.fullName}</span>
                        </div>
                      </td>
                      <td className="user-email">{user.email}</td>
                      <td>
                        <span className={`badge badge-${user.role.toLowerCase()}`}>{user.role}</span>
                      </td>
                      <td className="user-date">
                        {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td>
                        <div className="action-btns">
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleRoleToggle(user)}
                            title={`Switch to ${user.role === 'ADMIN' ? 'USER' : 'ADMIN'}`}
                          >
                            <IoShieldCheckmark size={14} />
                            {user.role === 'ADMIN' ? 'Make User' : 'Make Admin'}
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user._id)}
                            title="Delete user"
                          >
                            <IoTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {pages > 1 && (
            <div className="table-pagination">
              <button className="btn btn-secondary btn-sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>← Prev</button>
              <span className="page-info">Page {page} of {pages}</span>
              <button className="btn btn-secondary btn-sm" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
