import { useEffect } from "react";
import Loading from "../components/Loading";
import usePostDetails from "../hooks/use-post-details";
import { useDispatch } from "react-redux";

const Details = () => {
  const { loading, error, record } = usePostDetails();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: "posts/cleanRecord" });
    };
  }, [dispatch]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Loading loading={loading} error={error}>
        <p
          style={{
            width: "100%",
            backgroundColor: "#ffdddd17",
            height: "40%",
            padding: "20px",
            borderRadius: "50px",
          }}
        >
          <span
            style={{
              color: "#fff",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              width: "100%",
              backgroundColor: "transparent",
              marginRight: "30px",
              height: "100%",
            }}
          >
            Title:
          </span>
          {record?.message}
        </p>
        <p
          style={{
            width: "100%",
            backgroundColor: "#ffdddd17",
            height: "40%",
            padding: "20px",
            marginTop: "10px",
            borderRadius: "50px",
          }}
        >
          <span
            style={{
              color: "#fff",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              width: "100%",
              backgroundColor: "transparent",
              marginRight: "30px",
              height: "100%",
            }}
          >
            Description:
          </span>
          {record?.description}
        </p>
      </Loading>
    </div>
  );
};

export default Details;
