import authRoutes from './routes/authRoutes.js';


const login = async (req, res) => {
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

module.exports = { login };