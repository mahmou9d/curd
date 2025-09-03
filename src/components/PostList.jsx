import { Table } from "react-bootstrap";
import PostListItem from "./PostListItem";

const PostList = ({ data, deleteRecord, isLoggedIn }) => {
   const item = JSON.parse(localStorage.getItem("user"));
  //  console.log(item)
  return (
    <div>
      {item?.user?.id || item?.user_id ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th style={{ width: "70%" }}>Title</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            <PostListItem
              data={data}
              deleteRecord={deleteRecord}
              isLoggedIn={isLoggedIn}
            />
          </tbody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-black">
          <div className="bg-black shadow-lg rounded-2xl p-8 text-center max-w-sm">
            <p className="text-gray-600 mb-6">
              You need to login first to continue.
            </p>
            <a
              href="/login"
              className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition duration-200"
            >
              Login Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
