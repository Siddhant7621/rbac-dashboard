const Navbar = ({ user, logout }) => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">RBAC Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span>Welcome, {user?.username}</span>
          <span className="bg-blue-500 px-2 py-1 rounded">{user?.role}</span>
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;