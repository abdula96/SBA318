module.exports = (req, res, next) => {
  const { name, ingredients, steps } = req.body;
  if (!name || !ingredients || !steps) {
    return res
      .status(400)
      .send({ message: "Name, ingredients, and steps are required" });
  }
  next();
};
