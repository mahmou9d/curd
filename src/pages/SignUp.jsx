import { schema } from "../util/validationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signupUser, loginUser } from "../store/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const authState = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {

    setErrorMsg("");

    const payload = {
      username: data.username,
      email: data.email,
      password1: data.password1,
      password2: data.password2,
    };

    try {
      const resultAction = await dispatch(signupUser(payload));
      if (signupUser.fulfilled.match(resultAction)) {
        const loginPayload = {
          email: data.email,
          password: data.password1,
        };
// 
        await dispatch(loginUser(loginPayload));
        nav("/"); 
      } else {
        setErrorMsg(resultAction.payload || "Signup failed");
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
        <h2 style={{ margin: "50px" }}>Register</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label>Username</label>
          <input className="input" type="text" {...register("username")} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input className="input" type="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input className="input" type="password" {...register("password1")} />
          {errors.password1 && <p>{errors.password1.message}</p>}
        </div>

        <div>
          <label>Confirm Password</label>
          <input className="input" type="password" {...register("password2")} />
          {errors.password2 && (
            <p style={{ color: "red" }}>{errors.password2.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={authState.loading === "pending"}
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
          {authState.loading === "pending" ? "Loading...⏳" : "Sign up"}
        </button>

        <p style={{ marginTop: "15px", fontSize: "12px" }}>
          Already have an account?
          <NavLink style={{ marginLeft: "5px" }} to="/login" end>
            Log in
          </NavLink>
        </p>

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </form>
    </div>
  );
};

export default SignUp;
