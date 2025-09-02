import { schema } from "../util/validationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
const SignUp = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        username: data.username,
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password1: data.password1,
        password2: data.password2,
      };

      const res = await axios.post(
        "https://projects-production-be11.up.railway.app/api/SignUp/",
        payload
      );
      nav("/");
      alert("✅ تم التسجيل بنجاح");

      dispatch(loginSuccess(res.data));
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("❌ حصل خطأ أثناء التسجيل");
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "25px",
          }}
        >
          {" "}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label>Username</label>
            <input className="input" type="text" {...register("username")} />
            {errors.username && <p>{errors.username.message}</p>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label>First Name</label>
            <input className="input" type="text" {...register("fname")} />
            {errors.fname && <p>{errors.fname.message}</p>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label>Last Name</label>
            <input className="input" type="text" {...register("lname")} />
            {errors.lname && <p>{errors.lname.message}</p>}
          </div>
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
            <p className="text-red-500 text-sm">{errors.password2.message}</p>
          )}
        </div>

        {/* Submit */}
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
          {isSubmitting ? "loading...⏳ " : "Sign up"}
        </button>
        <p style={{ marginTop: "15px", fontSize: "12px" }}>
          Already have an account?
          <span>
            <NavLink style={{ marginLeft: "5px" }} to="/login" end>
              Log in
            </NavLink>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
