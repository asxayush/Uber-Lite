import {body} from "express-validator"

const userRegisterValidator = () => {
    return [
        body("email")
        .trim()
        .isEmail()
        .withMessage("invalid email")
        .notEmpty()
        .withMessage("email is required"),
        body("fullName.firstName")
        .isLength({min: 3})
        .withMessage("first name should be minimum of 3 characters"),
        body("fullName.lastName")
        .isLength({min: 3})
        .withMessage("last name should be minimum of 3 characters"),
        body("password")
        .isLength({min: 6})
        .withMessage("password should be minimum of 6 characters")
    ]
}

export default userRegisterValidator