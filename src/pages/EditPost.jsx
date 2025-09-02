import { useEffect } from "react";
import Loading from "../components/Loading";
import usePostDetails from "../hooks/use-post-details";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editPost } from "../store/postSlice";
import withGuard from "../util/withGuard";
import { useFormik } from "formik";
import { postSchema } from "../util/validationSchema";

const EditPost = () => {
  const { loading, error, record } = usePostDetails();
  console.log(record)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch({ type: "posts/cleanRecord" });
    };
  }, [dispatch]);




  const formik = useFormik({
    initialValues: {
      message: record?.message || "",
      description: record?.description || "",
    },
    enableReinitialize: true,
    validationSchema: postSchema,

    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      dispatch(
        editPost({
          id: record.id,
          title: values.message,
          description: values.description,
        })
      )
        .unwrap()
        .then(() => navigate("/"))
        .catch((err) => console.error("Edit error:", err));
    },
  });
  if (loading || !record) {
    return <Loading loading={loading} error={error} />;
  }console.log("Formik errors at render:", formik.errors);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="message"
          onChange={(e) => {
            console.log("Input changed:", e.target.value);
            formik.handleChange(e);
          }}
          value={formik.values.message}
          isInvalid={!!formik.errors.message}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          isInvalid={!!formik.errors.description}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.description}
        </Form.Control.Feedback>
      </Form.Group>
      <Loading loading={loading} error={error}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Loading>
    </Form>
  );
};

export default withGuard(EditPost);
