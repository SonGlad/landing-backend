const {ctrlWrapper} = require("../../helpers/index");
const { User } = require("../../models/user");
// const path = require("path");
// const fs = require("node:fs/promises");
// const Jimp = require('jimp');


// const avatarsDir = path.join(__dirname, "../../", "public", "avatar");


// const updateAvatar = async (req, res) => {
//     const {_id, role} = req.user;
//     const {path: tempUpload, originalname} = req.file;
//     const filename = `${_id}_${originalname}`
//     const resultUpload = path.join(avatarsDir, filename);

//     if (role === 'guest') {
//         return res.status(403).send({ message: 'Forbidden: Access denied' });
//     }

//     const avatar = await Jimp.read(tempUpload);
//     await avatar.resize(250, 250).write(resultUpload);


//     await fs.unlink(tempUpload);

//     const avatarURL = path.join("avatars", filename);

//     await User.findByIdAndUpdate(_id, {avatarURL});

//     res.status(200).send({avatarURL});
// };

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