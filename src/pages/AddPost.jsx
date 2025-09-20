import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { insertPost } from "../store/postSlice";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const { access } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.posts);
  const formik = useFormik({
    initialValues: { title: "", description: "" },
    validationSchema: Yup.object({
      title: Yup.string().required("title is required"),
    }),
    onSubmit: async (values) => {
      try {

          await dispatch(
            insertPost({
              title: values.title,
              description: values.description,
            })
          );
          
          navigate("/");
        


      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      {access ? (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              isInvalid={!!formik.errors.title && formik.touched.title}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.title}
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
    </>
  );
};

export default AddPost;
