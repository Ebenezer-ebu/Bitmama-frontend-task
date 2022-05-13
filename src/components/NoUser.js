import { useNavigate } from "react-router-dom";

const NoUser = () => {
  const navigate = useNavigate();

  const logOut = () => {
    navigate("/");
  };
  return (
    <div>
      <h1>No username please signin</h1>
      <button className="logout" onClick={logOut}>
        Log Out / Signin
      </button>
    </div>
  );
};

export default NoUser;
