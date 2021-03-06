// const User = require("../modules/users");
const User = require("../modules/users");
const Book = require("../modules/books");
const Cart = require("../modules/cart");
module.exports.getUsers = (req, res, next) => {
  res.status(200).json(User.getUsers());
};

module.exports.save = (req, res, next) => {
  const bookUsers = new User(
    null,
    req.body.username,
    req.body.firstname,
    req.body.lastname,
    req.body.password,
    null
  );
  console.log(req.body);
  let x = User.getUsers();
  const index = x.map((item) => item.username).indexOf(req.body.username);
  if (index === -1) {
    res.json(bookUsers.save());
  } else {
    res.json({ message: "user name is already used. try agin" });
  }
};

module.exports.getByID = (req, res, next) => {
  res.json(User.findById(req.params.id)); // should be the same name with route name :/id
};

module.exports.updateById = (req, res, next) => {
  //req.params.id use this to find the id
  let updateUsers = new User(
    req.params.id,
    req.body.firstname,
    req.body.lastname,
    req.body.password
  ).update();
  res.json(updateUsers);
};

module.exports.addToCart = (req, res, next) => {
  const addBooks = Book.findBookByID(req.body.id);
  console.log(addBooks);
  Cart.save(addBooks);
  console.log(Cart.getCart());
  // res.end("saved");
};

exports.authorizeUsername = (req, res, next) => {
  console.log("----==="+req.user.username)
  if (req.user.username === req.params.username) {
    console.log(req.user.role);

    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
