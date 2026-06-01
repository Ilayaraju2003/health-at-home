export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    res.json({
      success: true,
      message: "Login successful",
      user: {
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    res.json({
      success: true,
      message: "Register successful",
      user: {
        name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};