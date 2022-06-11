const Jimp = require('jimp');
const path = require("path");
const fs = require('fs/promises')

const {User} = require('../../models')

const publicDirPath = path.join(__dirname, "../../", "public");

const avatarUpdate = async (req, res, next) => {
    const {path: tmpFilePath, filename} = req.file
    const {_id: id} = req.user
    try {
        const avatarURL = path.join("avatars", `${id}_${filename}`)
        const jimpFile = await Jimp.read(tmpFilePath);
        await jimpFile.resize(250, 250).write(publicDirPath + '/' + avatarURL)
        await fs.unlink(tmpFilePath)
        
        const user = await User.findByIdAndUpdate(id, {avatarURL}, {new: true})
        res.status(200).json({message: 'success', code: '200', data: {
            user: {
                avatarURL: user.avatarURL
            }
        }})
    } catch (error) {
        await fs.unlink(tmpFilePath)
        next(error)
    }
}

module.exports = avatarUpdate
