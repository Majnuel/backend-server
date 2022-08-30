import express from "express";

const validateFields = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { username, password, name, address, age, phone } = req.body;
  console.log(req.body);

  if (!username || !password || !name || !address || !age || !phone) {
    res.status(400).json({ msg: "missing fields" });
  }
  next();
};

export default validateFields;
