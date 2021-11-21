/* eslint-disable @typescript-eslint/no-explicit-any */
// import * as yup from "yup"
import {string} from "yup"

const validateName = (): any => string().required()

const validateEmail = (): any =>
    string()
        .email()
        .required()

const validatePassword = (): any =>
    string()
        .min(3)
        .required()

       
export {validateName, validateEmail, validatePassword}
