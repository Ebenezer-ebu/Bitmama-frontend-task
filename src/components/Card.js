import { CgLogOut } from "react-icons/cg";
import { useParams } from "react-router-dom";

const Card = (props) => {
  const params = useParams();
  const { user } = props;

  const logOut = (user) => {
    let arrOfUsers = JSON.parse(localStorage.getItem("user"));
    arrOfUsers = arrOfUsers.filter((el) => el.name !== user);
    localStorage.setItem("user", JSON.stringify(arrOfUsers));
    window.open(`/user/${params.name}`, `${params.name}`);
    let userWindow = window.open(`/user/${user}`, `${user}`);
    userWindow.close();
  };

  return (
    <div className="card">
      <div>
        <h3>{user.name}</h3>
        <CgLogOut onClick={() => logOut(user.name)} />
      </div>
      <p style={{ color: user.state === "idle" ? "#FF160C" : "#66FF00" }}>
        {user.state === "active" ? user.state + " ✅" : user.state + " ⛔️"}
      </p>
    </div>
  );
};

export default Card;
