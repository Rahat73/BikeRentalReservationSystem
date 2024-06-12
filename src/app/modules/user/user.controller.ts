const createUser = async (req, res) => {
  console.log(req.body);

  res.send({
    message: 'User created successfully',
  });
};

export const UserControllers = {
  createUser,
};
