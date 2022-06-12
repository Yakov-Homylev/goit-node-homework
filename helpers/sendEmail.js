const nodemailer = require("nodemailer");
require("dotenv").config();

const {META_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 25,
    secure: false,
    auth: {
        user: "yakov.dev@meta.ua",
        pass: META_PASSWORD
    }
};

const mailWorker = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async(data)=> {
    const email = {...data, from: "yakov.dev@meta.ua"};
    try {
        await mailWorker.sendMail(email);
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = sendEmail