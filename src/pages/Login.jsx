import { schemalogin } from "../util/validationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
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
      const res = await axios.post(
        "https://projects-production-be11.up.railway.app/api/login/?format=json",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      );
      // console.log("Login Response:", res.data);
      dispatch(loginSuccess(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
      nav("/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setErrorMsg(error.response?.data?.error || "Invalid email or password");
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
