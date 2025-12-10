import { useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="navbar">
      <div className="navbar-left">
        <span className="logo">Diet Chat</span>
      </div>

      <div className="navbar-right">
        {user && (
          <>
            {/* <img
              src={user.imageUrl}
              alt="profile"
              className="avatar"
            /> */}
            <span className="username">
              {user.firstName || user.fullName || "User"}
            </span>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
