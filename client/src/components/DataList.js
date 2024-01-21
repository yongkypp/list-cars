import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { deletePost, getPosts } from "../services/posts";
import DeleteConfirmationModal from "./DeleteModal";

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setPostToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      dispatch(deletePost(postToDelete));
      setPostToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setPostToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    return (
      post.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.year.toString().includes(searchTerm) ||
      post.color.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div style={{ margin: "20px", padding: "20px", backgroundColor: "#f5f5f5" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <Typography
          variant="h4"
          style={{
            paddingTop: "20px",
            marginBottom: "20px",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            color: "#333",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            marginRight: "auto",
          }}
        >
          List Car
        </Typography>

        <TextField
          label="Search by Brand, Model, Year, or Color"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginRight: "10px" }}
        />
        <Button
          component={Link}
          variant="contained"
          color="primary"
          to="/form"
          style={{ marginLeft: "10px" }}
        >
          Add Car
        </Button>
      </div>

      {isLoading ? (
        <CircularProgress />
      ) : !filteredPosts.length ? (
        <Typography variant="body1">No car data found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPosts
                .slice()
                .reverse()
                .map((car) => (
                  <TableRow key={car._id}>
                    <TableCell>{car.brand}</TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell>{car.color}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => handleDeleteClick(car._id)}
                        style={{ marginRight: "10px" }}
                      >
                        <DeleteIcon fontSize="small" /> Delete
                      </Button>
                      <Button
                        size="small"
                        color="default"
                        component={Link}
                        to={`/edit/${car._id}`}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        handleClose={handleDeleteCancel}
        handleDelete={handleDeleteConfirm}
      />
    </div>
  );
};

export default Posts;
