import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updatePost, getPosts } from "../services/posts";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const EditForm = ({ navigate }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.find((p) => p._id === id));

  const [postData, setPostData] = useState({
    brand: "",
    model: "",
    year: 0,
    color: "",
  });

  useEffect(() => {
    if (post) {
      setPostData({
        brand: post.brand,
        model: post.model,
        year: post.year,
        color: post.color,
      });
    } else {
      dispatch(getPosts(id));
    }
  }, [dispatch, id, post]);

  const handleInputChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePost(id, postData));
    navigate("/");
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "600px", margin: "20px auto" }}>
      <form autoComplete="off" noValidate onSubmit={handleUpdate}>
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          Editing Car Details
        </Typography>
        <TextField
          name="brand"
          variant="outlined"
          label="Brand"
          fullWidth
          value={postData.brand}
          onChange={handleInputChange}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          name="model"
          variant="outlined"
          label="Model"
          fullWidth
          value={postData.model}
          onChange={handleInputChange}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          name="year"
          variant="outlined"
          label="Year"
          fullWidth
          type="number"
          value={postData.year}
          onChange={handleInputChange}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          name="color"
          variant="outlined"
          label="Color"
          fullWidth
          value={postData.color}
          onChange={handleInputChange}
          style={{ marginBottom: "20px" }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Update Car Details
        </Button>
      </form>
    </Paper>
  );
};

export default EditForm;
