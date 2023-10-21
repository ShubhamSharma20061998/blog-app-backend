require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3030;
const configureDB = require("./config/db");
const routes = require("./config/routes");
const {
  authenticateUser,
  authorizeUser,
} = require("./app/middlewares/authentication");
const usersCltr = require("./app/controllers/users-cltr");
const blogctrl = require("./app/controllers/blog-cltr");
const commentsCtrl = require("./app/controllers/comments-cltr");

configureDB();
app.use(express.json());
app.use(cors());
app.use("/", routes);

app.post("/api/signup", usersCltr.signup);
app.post("/api/login", usersCltr.login);
app.get("/api/users/profile", authenticateUser, usersCltr.getProfile);
app.get(
  "/api/users/list",
  authenticateUser,
  authorizeUser(["admin"]),
  usersCltr.list
);
app.put(
  "/api/users/:id/change-role",
  authenticateUser,
  authorizeUser(["admin"]),
  usersCltr.updateRole
);
app.delete(
  "/api/users/:id",
  authenticateUser,
  authorizeUser(["admin"]),
  usersCltr.remove
);

//blog
app.get("/api/blogs", blogctrl.list);
app.post(
  "/api/author/blog",
  authenticateUser,
  authorizeUser(["author"]),
  blogctrl.create
);
app.put(
  "/api/author/updateBlog/:id",
  authenticateUser,
  authorizeUser(["admin", "author"]),
  blogctrl.updateBlog
);
app.delete(
  "/api/author/deleteBlog/:id",
  authenticateUser,
  authorizeUser(["admin", "author"]),
  blogctrl.deleteBlog
);
app.get(
  "/api/blogs/unpublished",
  authenticateUser,
  authorizeUser("moderator"),
  blogctrl.unpublished
);

app.put(
  "/api/blogs/:id/change-status",
  authenticateUser,
  authorizeUser("moderator"),
  blogctrl.changeStatus
);

//create comments
app.get(
  "/api/comments",
  authenticateUser,
  authorizeUser(["moderator"]),
  commentsCtrl.list
);
app.post("/api/blogs/:bId/comments", authenticateUser, commentsCtrl.create);
app.put(
  "/api/comments/:cId/approve",
  authenticateUser,
  authorizeUser(["moderator"]),
  commentsCtrl.approve
);
app.put(
  "/api/blogs/:bId/comments/:cId",
  authenticateUser,
  authorizeUser(["moderator", "user"]),
  commentsCtrl.update
);
app.delete(
  "/api/blogs/:bId/comments/:cId",
  authenticateUser,
  authorizeUser(["moderator", "user"]),
  commentsCtrl.remove
);

app.listen(port, () => {
  console.log("server running on port", port);
});
