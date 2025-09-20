import { schemalogin } from "../util/validationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";
const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemalogin),
  });
    const onSubmit = async (data) => {
    setErrorMsg("");

    try {
      const resultAction = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(resultAction)) {
        nav("/");
      } else {
        setErrorMsg(resultAction.payload || "Login failed");
      }
    } catch (err) {
      setErrorMsg("Unexpected error occurred");
    }
  };


  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          border: "1px solid aqua",
          textAlign: "center",
          borderRadius: "20px",
          padding: "25px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 style={{ margin: "50px" }}>Log in</h2>

        <div>
          <label>Email</label>
          <input className="input" type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input className="input" type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "80%",
            background: "aqua",
            color: "black",
            padding: "10px 20px",
            marginTop: "30px",
            border: "none",
            borderRadius: "10px",
          }}
        >
          {isSubmitting ? "Loading...⏳" : "Log in"}
        </button>

        <p style={{ marginTop: "15px", fontSize: "12px" }}>
          Not registered?{" "}
          <NavLink to="/SignUp" end>
            Create an account
          </NavLink>
        </p>

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </form>
    </div>
  );
};

export default Login;
