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
import Alert from "@mui/material/Alert";
import { useState } from "react";

const EditPost = () => {
  const { loading, error, record } = usePostDetails();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch({ type: "posts/cleanRecord" });
    };
  }, [dispatch]);




  const formik = useFormik({
    initialValues: {
      title: record?.task?.title || "",
      description: record?.task?.description || "",
    },
    enableReinitialize: true,
    validationSchema: postSchema,

    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      dispatch(
        editPost({
          id: record.task.id,
          title: values.title,
          description: values.description,
        })
      )
        .unwrap()
        .then(() => {
  setShowAlert(true);
  setTimeout(() => navigate("/"), 1500);
        })
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
          name="title"
          onChange={(e) => {
            console.log("Input changed:", e.target.value);
            formik.handleChange(e);
          }}
          value={formik.values.title}
          isInvalid={!!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
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
      {showAlert && (
        <Alert style={{marginTop:"30px"}} variant="outlined" severity="success">
          This is an outlined success Alert.
        </Alert>
      )}
    </Form>
  );
};

export default withGuard(EditPost);
