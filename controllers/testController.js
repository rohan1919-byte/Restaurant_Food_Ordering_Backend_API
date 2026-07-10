const testUserController = (req, res) => {
  try {
    res.status(200).send({
      message: "test user data api",
      success: true,
    });
  } catch (error) {
    console.log("error in test api", error);
  }
};
module.exports = { testUserController };
