import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; // for password encrypt/decrypt
import jwt from "jsonwebtoken"; // for session token on user-signin
import { errorHandler } from "../utils/error.js";

// next means middleware
// sign-up
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10); // 10 no-of-rounds
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save(); // wait until process is done (sync)
        res.status(201).json({ message: "User created successfully" }); // success
    } catch (err) {
        // res.status(500).json(err.message); // duplicate error
        next(err);
    }
};

// sign-in
export const singin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email }); // find in db
        if (!validUser) {
            return next(errorHandler(404, "User not found")); // email not in db
        }
        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        ); // compare password and encrpyted-password from db
        if (!validPassword) {
            return next(errorHandler(401, "Invalid credentials")); // wrong pass
        }
        // dont need to send password, _id, __v and udpatedAt hence destructure '_doc' key from valid user
        const {
            password: hashedPassword,
            _id,
            __v,
            updatedAt,
            ...restUserInfo // info other than provided above : destructured
        } = validUser._doc;
        // token : created on unique info (like _id, email) and stored into session/cookie tobe used in later user verfications.
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const expiryTime = new Date(Date.now() + 3600000); // 1 hr expiry for one session and one session = time stayed active+loggedin on site
        // add token.
        res.cookie("access_token", token, {
            httpOnly: true, // httpOnly:true dis-allow its 3rd parties modification
            expires: expiryTime,
        })
            .status(200)
            .json(restUserInfo);
    } catch (err) {
        next(err);
    }
};

// google - oauth
export const google = async (req, res, next) => {
    console.log(req);
    try {
        const user = await User.findOne({ email: req.body.email });
        // exising email to our db
        if (user) {
            console.log("old user");
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const {
                password: hashedPassword,
                _id,
                __v,
                updatedAt,
                ...restUserInfo // info other than provided above : destructured
            } = user._doc;
            const expiryTime = new Date(Date.now() + 3600000);
            res.cookie("access_token", token, {
                httpOnly: true,
                expires: expiryTime,
            })
                .status(200)
                .json(restUserInfo);
        }
        // new user of email to our db
        else {
            console.log("new user");
            const generatePassword =
                Math.random().toString(36).slice(-8) + // 0.123456789 -> base-36 : 0.4frt89p -> slice(-8) ie. from '.' -> 4frt89p
                Math.random().toString(36).slice(-8); // + same ie. 16 digits
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10); // hash password

            const newUser = new User({
                username:
                    req.body.name.split(" ").join("").toLowerCase() + // 'Wx Yz' -> ['Wx','Yz'] -> WxYz -> wxyz
                    Math.floor(Math.random() * 10000).toString(), // any(0, 10000) ex: wxyz3783
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
            });

            await newUser.save(); // save user to db

            // gettin token now
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const {
                password: hashedPassword2,
                _id,
                __v,
                updatedAt,
                ...restUserInfo // info other than provided above : destructured
            } = newUser._doc;

            const expiryTime = new Date(Date.now() + 3600000);
            res.cookie("access_token", token, {
                httpOnly: true,
                expires: expiryTime,
            })
                .status(200)
                .json(restUserInfo);
        }
    } catch (err) {
        console.log(err);
    }
};
