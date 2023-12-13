import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from './Button'
import Modal from '../UI/Modal.jsx'
import './Modalogin.css'
import { useMutation } from '@tanstack/react-query'
import { Login, createNewUser } from '../../utils/httpUser.js'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthModalTrue, setToggleModal, setUserInfo } from '../../store/slice/AuthSlice.js'
const ModalLogin = () => {
    const dispatch = useDispatch()
    const toggleAuthenticated = useSelector((state) => state.auth.toggleAuthenticated)
    const [isActive, setIsActive] = useState(false);

    const [emailLogin, setEmailLogin] = useState()
    const [passwordLogin, setPasswordLogin] = useState()
    const [emailRegister, setEmailRegister] = useState()
    const [usernameRegister, setUserNameRegister] = useState()
    const [passwordRegister, setPasswordRegister] = useState()


    const { mutate: mutateRegister, errorRegister, isLoadingRegiser, isErrorRegiser } = useMutation({
        mutationFn: createNewUser,
    });
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const result = await Login({ user: { email: emailLogin, password: passwordLogin } })
        console.log(result)
        if (result) {
            localStorage.setItem("UserInfo", JSON.stringify(result))
            dispatch(setAuthModalTrue())
            dispatch(setToggleModal(false))
            dispatch(setUserInfo(result))
        }
    }

    function handleSubmitRegister() {
        mutateRegister({ user: { email: emailRegister, password: passwordRegister, userName: usernameRegister } })
    }
    // Event handler for Register link click
    const handleRegisterClick = () => {
        setIsActive(true);
    };

    // Event handler for Login link click
    const handleLoginClick = () => {
        setIsActive(false);
    };

    if (!toggleAuthenticated) {
        return
    }

    return (
        <>
            <Modal>
                <div class={`wrraper ${isActive ? "active" : ""}`}>
                    <div onClick={(e) => dispatch(setToggleModal(false))}>
                        <span class="icon-close">
                            x
                        </span>
                    </div>
                    <div class="form-box login">
                        <h2> Login</h2>
                        <form >
                            <div class="input-box">
                                <span class="icon"><ion-icon name="mail-unread-sharp"></ion-icon></span>
                                <input type="text" id="email" required style={{ backgroundColor: "transparent" }} onChange={(e) => setEmailLogin(e.target.value)} />
                                <label for="email">Email</label>
                            </div>
                            <div class="input-box">
                                <span class="icon"><ion-icon name="lock-closed-sharp"></ion-icon></span>
                                <input type="password" id="password" required onChange={(e) => setPasswordLogin(e.target.value)} />
                                <label for="password">Password</label>
                            </div>
                            <div class="remember-forgot">
                                <label>
                                    <input type="checkbox" />
                                    Remember me
                                </label>
                                <a >Forgot Password?</a>
                            </div>
                            <button class="btn" onClick={(e) => handleSubmitLogin(e)}>Login</button>
                            <div class="login-register" onClick={handleRegisterClick}>
                                <p>Don't have an account? <a class="register-link" >
                                    Register
                                </a></p>
                            </div>
                        </form>
                    </div>
                    <div class={`form-box register `}>
                        <h2> Registration</h2>
                        <form onSubmit={handleSubmitRegister}>
                            <div class="input-box">
                                <input type="text" id="Username" required onChange={(e) => setUserNameRegister(e.target.value)} />
                                <label for="Username">Username</label>
                            </div>
                            <div class="input-box">
                                <input type="text" id="email" required onChange={(e) => setEmailRegister(e.target.value)} />
                                <label for="email">Email</label>
                            </div>
                            <div class="input-box">
                                <input type="password" id="password" required onChange={(e) => setPasswordRegister(e.target.value)} />
                                <label for="password">Password</label>
                            </div>
                            <div class="remember-forgot">
                                <label>
                                    <input type="checkbox" />
                                    I agree to the terms & conditions
                                </label>
                            </div>
                            <button class="btn" onClick={handleSubmitRegister}>Register</button>
                            <div class="login-register" onClick={handleLoginClick}>
                                <p>Already have an account? <a class="login-link">
                                    Login
                                </a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default ModalLogin