import { memo } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { togglePostCompleted, fetchPosts } from "../store/postSlice";
const PostListItem = ({ data, deleteRecord, isLoggedIn, showAlert }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteHandler = (item) => {
    // if (window.confirm(`Do you really want to delete record: ${item.title}?`)) {
    deleteRecord(item.id);
    // }
  };

  const toggleCompleted = (item) => {
    dispatch(togglePostCompleted(item.id));
    dispatch(fetchPosts());

  };

  if (!data || data.length === 0) {
    return (
      <tr>
        <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
          <p style={{ marginBottom: "15px", color: "gray", fontSize: "16px" }}>
            There are no tasks currently
          </p>
          <Button variant="primary" onClick={() => navigate("/post/add")}>
            Add Task
          </Button>
        </td>
      </tr>
    );
  }

  const sortedData = [...data].sort((a, b) => {
    return a.completed - b.completed;
  });

  const records = sortedData.map((el, idx) => (
    <tr style={{ color: "aqua" }} key={el.id}>
      <td style={{ color: "aqua" }}>#{idx + 1}</td>
      <td
        style={{
          color: "aqua",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link
          style={{
            color: "aqua",
            textDecoration: el.completed ? "line-through" : "none",
            fontSize:"22px"
          }}
          to={`post/${el.id}`}
        >
          {el.title}
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
              marginRight: "4px",
            }}
            variant="success"
            onClick={() => toggleCompleted(el)}
          >
            {el.completed ? "Completed✅" : "Uncomplete"}
          </Button>
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderRadius: "6px",
              marginRight: "4px",
            }}
            variant="primary"
            onClick={() => toggleCompleted(el)}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                background: "transparent",
              }}
              to={`post/${el.id}`}
            >
              Review
            </Link>
          </Button>
          <div className="EditDelete">
            <Button
              onClick={() => navigate(`post/${el.id}/edit`)}
              variant="primary"
              style={{ marginRight: "4px" }}
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

  return (
    <>
      {records}
    </>
  );
};

export default memo(PostListItem);
// const PostListItem = ({ data, deleteRecord, isLoggedIn }) => {
//   console.log(data,"glihdkjyrdflkhyf")
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const deleteHandler = (item) => {
//     if (window.confirm(`Do you really want to delete record: ${item.title}?`)) {
//       deleteRecord(item.id);
//     }
//   };
//  const toggleCompleted = (item) => {
//    dispatch(togglePostCompleted(item.id));
//    dispatch(fetchPosts());
//  };

//   if (!data || data.length === 0) {
//     return (
//       <tr>
//         <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
//           <p style={{ marginBottom: "15px", color: "gray", fontSize: "16px" }}>
//             There are no products currently
//           </p>
//           <Button variant="primary" onClick={() => navigate("/post/add")}>
//             Add Task
//           </Button>
//         </td>
//       </tr>
//     );
//   }
//   const records = data?.map((el, idx) => (
//     <tr style={{ color: "aqua" }} key={idx}>
//       <td style={{ color: "aqua" }}>#{++idx}</td>
//       <td
//         style={{
//           color: "aqua",
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         <Link
//           style={{ textDecoration: "none", color: "aqua" }}
//           to={`post/${el.id}`}
//         >
//           {el.title}
//         </Link>
//       </td>
//       <td>
//         <ButtonGroup aria-label="Basic example" className="ButtonGroup">
//           <Button
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               borderRadius: "6px",
//             }}
//             variant="success"
//           >
//             <span
//               onClick={() => toggleCompleted(el)}
//               style={{
//                 background: "transparent",
//                 color: "white",
//                 widows: "auto",
//               }}
//             >
//               {el.completed ? "Completed✅" : "Uncomplete"}
//             </span>
//           </Button>
//           <div className="EditDelete">
//             <Button
//               onClick={() => navigate(`post/${el.id}/edit`)}
//               variant="primary"
//             >
//               Edit
//             </Button>
//             <Button
//               disabled={!isLoggedIn}
//               variant="danger"
//               onClick={() => deleteHandler(el)}
//             >
//               Delete
//             </Button>
//           </div>
//         </ButtonGroup>
//       </td>
//     </tr>
//   ));

//   return <>{records}</>;
// };

// export default memo(PostListItem);
