const User = require('../models/user');
const jwt = require('jsonwebtoken');

const tokenAge = 60 * 5;

const generateToken = (id)=> {
    return jwt.sign({id}, 'super secret phrase', {expiresIn: tokenAge});
}

const identifyErrors = (error) => {
    console.log(error.message);
    //handle errors on login

    let errors = {
        email: '',
        password: ''
    }
    
    if(error.message === 'invalid email') {
        errors.email = 'email not found';
    }

    if(error.message === 'invalid password') {
        errors.password = 'oops, invalid password';
    }

    return errors;
}

module.exports.getMainPage = (req, res) => {
    res.render('index');
}

module.exports.postRegisterUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({email, password});
        const token = generateToken(user._id);
        res.cookie('userToken', token, {httpOnly: true});
        res.status(201).json({/*user: user._id*/ token});
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports.getLoginPage = (req, res) => {
    res.render('login');
}

module.exports.postLoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.userLogin(email, password);
        const token = generateToken(user._id);
        res.cookie('userToken', token, {httpOnly: true});
        res.status(200).json({/*user: user._id*/ user: user._id});
    } catch (error) {
        console.log(error);
        const errors = identifyErrors(error);
        res.status(400).json({errors});
    }
}

module.exports.getLogoutUser = (req, res) => {
    res.cookie('userToken', '', {httpOnly: true, maxAge: 1});
    res.redirect('/')
}