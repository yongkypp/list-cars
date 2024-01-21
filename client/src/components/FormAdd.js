import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../services/posts.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const Form = ({ navigate }) => {
  const [postData, setPostData] = useState({
    brand: "",
    model: "",
    year: 0,
    color: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
    clear();
    navigate("/");
  };

  const clear = () => {
    setPostData({
      brand: "",
      model: "",
      year: 0,
      color: "",
    });
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          Add Car Details
        </Typography>
        <TextField
          name="brand"
          variant="outlined"
          label="Brand"
          fullWidth
          value={postData.brand}
          onChange={(e) => setPostData({ ...postData, brand: e.target.value })}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          name="model"
          variant="outlined"
          label="Model"
          fullWidth
          value={postData.model}
          onChange={(e) => setPostData({ ...postData, model: e.target.value })}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          name="year"
          variant="outlined"
          label="Year"
          fullWidth
          type="number"
          value={postData.year}
          onChange={(e) => setPostData({ ...postData, year: e.target.value })}
          style={{ marginBottom: "15px" }}
        />
        <TextField
          name="color"
          variant="outlined"
          label="Color"
          fullWidth
          value={postData.color}
          onChange={(e) => setPostData({ ...postData, color: e.target.value })}
          style={{ marginBottom: "15px" }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
