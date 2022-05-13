import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoUser from "./NoUser";
import Card from "./Card";

const UserPage = () => {
  let params = useParams();
  const [presentUser, setPresentUser] = useState("");
  const [tabHasFocus, setTabHasFocus] = useState(true);
  const [activeUsers, setActiveUsers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [userSession, setUserSession] = useState("active");

  const navigate = useNavigate();

  const logOut = () => {
    let arrOfUsers = JSON.parse(localStorage.getItem("user"));
    arrOfUsers = arrOfUsers.filter((el) => el.name !== params.name);
    localStorage.setItem("user", JSON.stringify(arrOfUsers));
    window.open("/", "_blank");
    window.close();
  };

  useEffect(() => {
    if (!tabHasFocus) {
      const countDown = setInterval(function () {
        if (timeLeft === 0) {
          setUserSession("inActive");
          let arrOfUsers = JSON.parse(localStorage.getItem("user"));
          arrOfUsers.forEach((el) => {
            if (el.name === params.name) {
              el.state = "idle";
            }
          });
          setActiveUsers(arrOfUsers);
          localStorage.setItem("user", JSON.stringify(arrOfUsers));
          clearInterval(countDown);
        }
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(countDown);
    }
  }, [timeLeft, tabHasFocus, params.name]);

  useEffect(() => {
    const setUser = () => {
      if (localStorage.getItem("user")) {
        let users = JSON.parse(localStorage.getItem("user"));
        setActiveUsers(users);
      }
    };
    window.addEventListener("storage", setUser);
    return () => {
      window.removeEventListener("storage", setUser);
    };
  }, [userSession]);

  useEffect(() => {
    const setUser = () => {
      if (localStorage.getItem("user")) {
        let users = JSON.parse(localStorage.getItem("user"));
        setPresentUser(params.name);
        setActiveUsers(users);
      }
    };
    setUser();
    const handleFocus = () => {
      setTabHasFocus(true);
      setTimeLeft(60);
      setUserSession("active");
      let arrOfUsers = JSON.parse(localStorage.getItem("user"));
      arrOfUsers.forEach((el) => {
        if (el.name === params.name) {
          el.state = "active";
        }
      });
      setActiveUsers(arrOfUsers);
      localStorage.setItem("user", JSON.stringify(arrOfUsers));
    };

    const handleBlur = () => {
      setTabHasFocus(false);
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [tabHasFocus, params.name]);

  if (!localStorage.getItem("user") || activeUsers.length === 0) {
    return <NoUser />;
  }
  const justActiveUsers = activeUsers.filter(
    (user) => user.name !== params.name
  );
  return (
    <div>
      <div className="top">
        <h1>{presentUser.toUpperCase()}</h1>
        <button className="logout" onClick={logOut}>
          Log Out / Signin
        </button>
      </div>
      <h2>Users logged In</h2>
      <div className="grid">
        {justActiveUsers.length > 0 ? (
          justActiveUsers.map((username, id) => (
            <Card user={username} key={id} />
          ))
        ) : (
          <p style={{ fontSize: "20px" }}>You are the only active user 😎</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
