const {ctrlWrapper} = require("../../helpers/index");
const { User } = require("../../models/user");


const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const avatarURL = req.file.path;
  
    const updatedUser = await User.findOneAndUpdate(
      { _id },
      { avatarURL },
      { new: true }
    );
  
    res.json({ avatarURL: updatedUser.avatarURL });
  };


module.exports = {
    updateAvatar: ctrlWrapper(updateAvatar)
};