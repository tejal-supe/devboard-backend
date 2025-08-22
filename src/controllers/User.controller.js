const registerUserController = async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName || !emailId || !password) {
      return res.status(400).json({ message: "Enter all the User details" });
    }
  } catch (error) {
    console.log("Error in the register user controller", error);
  }
};
