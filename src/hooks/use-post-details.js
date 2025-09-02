import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../store/postSlice";
import { useParams } from "react-router-dom";

const usePostDetails = () => {
  const { id } = useParams();
console.log(id);
  const dispatch = useDispatch();
  const { loading, error, record } = useSelector((state) => state.posts);

useEffect(() => {
  if (id) {
    dispatch(fetchPost(id));
  }
}, [dispatch, id]);

  return { loading, error, record };
};

export default usePostDetails;
