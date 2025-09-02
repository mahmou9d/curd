import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { insertPost } from "../store/postSlice";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const item =JSON.parse(localStorage.getItem("user"))
console.log(item?.user?.id)
  const { loading, error } = useSelector((state) => state.posts);
  const formik = useFormik({
    initialValues: { message: "", description: "" },
    validationSchema: Yup.object({
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values) => {
      try {

          await dispatch(
            insertPost({
              title: values.message,
              description: values.description,
              user_id: item?.user?.id,
            })
          );
          navigate("/");
        


      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="message"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          isInvalid={!!formik.errors.message && formik.touched.message}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
      </Form.Group>

      {error && <Alert variant="danger">{error.detail || error}</Alert>}

      <Button type="submit" disabled={loading}>
        {loading ? (
          <>
            <Spinner animation="border" size="sm" /> Submitting...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </Form>
  );
};

export default AddPost;
