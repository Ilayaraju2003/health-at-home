export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    res.send("Login successful");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    res.send("Register successful");
  } catch (error) {
    res.status(500).send(error.message);
  }
};