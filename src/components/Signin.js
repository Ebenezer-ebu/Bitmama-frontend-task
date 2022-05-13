import { useState } from "react";

const Signin = () => {
  const [username, setUserName] = useState("");

  const onChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length === 0) {
      alert("Please provide a username");
      return;
    }
    let obj = { name: username.toLowerCase(), state: "active" };
    let user = localStorage.getItem("user");
    if (user) {
      let userArr = JSON.parse(user);
      const userExist = userArr.findIndex((usr) => usr.name === obj.name);
      if (userExist > -1) {
        window.open(`/user/${obj.name}`, `${obj.name}`);
      } else {
        userArr.push(obj);
        localStorage.setItem("user", JSON.stringify(userArr));
      }
    } else {
      let arr = [obj];
      localStorage.setItem("user", JSON.stringify(arr));
    }
    window.open(`/user/${obj.name}`, `${obj.name}`);
    setUserName("");
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="username"
          value={username}
          onChange={onChangeHandler}
        />
        <input type="submit" value="Register" className="register" />
      </form>
    </div>
  );
};

export default Signin;
