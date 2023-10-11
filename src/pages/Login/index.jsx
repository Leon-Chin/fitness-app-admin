import React, { useState, useEffect } from 'react'
import pngurl1 from '@/assets/pic/monitorProcess.webp'
import pngurl2 from '@/assets/pic/contact.webp'
import pngurl3 from '@/assets/pic/tutorial.webp'
import pngurl4 from '@/assets/pic/game.webp'
import pngurl5 from '@/assets/pic/workoutPlan.jpg'
import { useNavigate } from 'react-router-dom'
import { apiLogin } from '@/api/admin.api.js'
import './index.less'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'
import { setLocale, setLogged } from '@/store/account.store'
import { checkToken } from '../../api/admin.api'
export default function Login() {
    const logged = useSelector(state => state.account.logged)
    const navigateTo = useNavigate()
    const dispatch = useDispatch()
    const [focusedname, setFocusedname] = useState(false)
    const [focusedpassword, setFocusedpassword] = useState(false)
    const [selectedPic, setSelectedPic] = useState(1)
    const [sigInInfo, setSignInInfo] = useState({})
    const activename = focusedname ? 'active' : ''
    const activepassword = focusedpassword ? 'active' : ''
    const checkLogged = async (token) => {
        console.log('daioyongle');
        const res = await checkToken({ token })
        if (res.logged === true) {
            dispatch(setLogged(true))
            navigateTo('/')
        } else {
            dispatch(setLogged(false))
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (logged !== true && token) {
            console.log('daozhele');
            checkLogged(token)
        }
        const timer = window.setInterval(() => {
            setSelectedPic((prev) => {
                return prev !== 5 ? prev + 1 : 1
            })
        }, 3000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    useEffect(() => {
        logged && navigateTo('/')
    }, [logged])

    const UserSignIn = async () => {
        const res = await apiLogin(sigInInfo)
        if (res?.status !== false) {
            console.log("login", res);
            dispatch(setLocale(res.admin.locale))
            localStorage.setItem('token', res.token)
            dispatch(setLogged(true))
            navigateTo('/')
        } else {
            message.error('Error happen, try again please')
        }
    }

    return (
        <div className='loginFrame'>
            <div className='box'>
                <div className='inner-box'>
                    <div className='forms-wrap'>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            UserSignIn()
                        }} autoComplete="off" className='sign-in-form'>
                            <div className='logo'>
                                {/* img */}
                                <h4>Medal - FitnessApp</h4>
                            </div>
                            <div className='heading'>
                                <h2>Admin System<br />管理系统</h2>
                                {/* <h3>Welcome Back</h3> */}
                            </div>
                            <div className='actual-form'>
                                <div className='input-wrap'>
                                    <input
                                        type='text'
                                        minLength={4}
                                        className={`input-field ${activename}`}
                                        onFocus={() => setFocusedname(true)}
                                        onBlur={({ target: { value } }) => {
                                            if (value != "") {
                                                return;
                                            }
                                            setFocusedname(false)
                                        }}
                                        onChange={({ target: { value } }) => setSignInInfo({ ...sigInInfo, name: value })}
                                        autoComplete="off"
                                        required
                                    />
                                    <label>Admin Account/管理员账号</label>
                                </div>
                                <div className='input-wrap'>
                                    <input
                                        type='password'
                                        minLength={4}
                                        onFocus={() => setFocusedpassword(true)}
                                        onBlur={({ target: { value } }) => {
                                            if (value != "") {
                                                return;
                                            }
                                            setFocusedpassword(false)
                                        }}
                                        onChange={({ target: { value } }) => setSignInInfo({ ...sigInInfo, password: value })}
                                        className={`input-field ${activepassword}`}
                                        autoComplete="off"
                                        required
                                    />
                                    <label>Password/密码</label>
                                </div>
                                <input type='submit' value="Sign In / 登陆" className='sign-btn' />
                            </div>
                        </form>
                    </div>
                    <div className='carousel'>
                        <div className='images-wrapper'>
                            <img src={pngurl1} className={`image img-1 ${selectedPic === 1 && "show"}`}></img>
                            <img src={pngurl2} className={`image img-2 ${selectedPic === 2 && "show"}`}></img>
                            <img src={pngurl3} className={`image img-3 ${selectedPic === 3 && "show"}`}></img>
                            <img src={pngurl4} className={`image img-4 ${selectedPic === 4 && "show"}`}></img>
                            <img src={pngurl5} className={`image img-5 ${selectedPic === 5 && "show"}`}></img>
                        </div>
                        <div className='text-slider'>
                            <div className='text-wrap'>
                                <div className='text-group' style={{ transform: `translateY(${-(selectedPic - 1) * 2.2}rem)` }}>
                                    <h2>Track your workout prograss</h2>
                                    <h2>Contact with your friends</h2>
                                    <h2>Watch the rich tutorial library</h2>
                                    <h2>Gamification features</h2>
                                    <h2>Personalized Exercise Plan</h2>
                                </div>
                            </div>
                            <div className='bullets'>
                                <span className={selectedPic === 1 ? `active` : ''} onClick={() => setSelectedPic(1)}></span>
                                <span className={selectedPic === 2 ? `active` : ''} onClick={() => setSelectedPic(2)}></span>
                                <span className={selectedPic === 3 ? `active` : ''} onClick={() => setSelectedPic(3)}></span>
                                <span className={selectedPic === 4 ? `active` : ''} onClick={() => setSelectedPic(4)}></span>
                                <span className={selectedPic === 5 ? `active` : ''} onClick={() => setSelectedPic(5)}></span>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
}
