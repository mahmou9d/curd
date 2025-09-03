import { memo } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { togglePostCompleted } from "../store/postSlice";
const PostListItem = ({ data, deleteRecord, isLoggedIn }) => {
  console.log(data,"glihdkjyrdflkhyf")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteHandler = (item) => {
    if (window.confirm(`Do you really want to delete record: ${item.message}?`)) {
      deleteRecord(item.id);
    }
  };
 const toggleCompleted = (item) => {
   dispatch(togglePostCompleted(item.id));
 };

  if (!data || data.length === 0) {
    return (
      <tr>
        <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
          <p style={{ marginBottom: "15px", color: "gray", fontSize: "16px" }}>
            There are no products currently
          </p>
          <Button variant="primary" onClick={() => navigate("/post/add")}>
            Add Task
          </Button>
        </td>
      </tr>
    );
  }
  const records = data?.map((el, idx) => (
    <tr style={{ color: "aqua" }} key={idx}>
      <td style={{ color: "aqua" }}>#{++idx}</td>
      <td
        style={{
          color: "aqua",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link
          style={{ textDecoration: "none", color: "aqua" }}
          to={`post/${el.id}`}
        >
          {el.message}
        </Link>
      </td>
      <td>
        <ButtonGroup aria-label="Basic example" className="ButtonGroup">
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderRadius: "6px",
            }}
            variant="success"
          >
            <span
              onClick={() => toggleCompleted(el)}
              style={{
                background: "transparent",
                color: "white",
                widows: "auto",
              }}
            >
              {el.completed ? "Completed✅" : "Uncomplete"}
            </span>
          </Button>
          <div className="EditDelete">
            <Button
              onClick={() => navigate(`post/${el.id}/edit`)}
              variant="primary"
            >
              Edit
            </Button>
            <Button
              disabled={!isLoggedIn}
              variant="danger"
              onClick={() => deleteHandler(el)}
            >
              Delete
            </Button>
          </div>
        </ButtonGroup>
      </td>
    </tr>
  ));


  return <>{records}</>;
};

export default memo(PostListItem);
