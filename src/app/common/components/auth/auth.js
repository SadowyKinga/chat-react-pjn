import React, { useState } from 'react'
import { auth, google, facebook, db } from "../../../../firebase";
// import { FaGoogle } from "react-icons/fa";
// import FacebookIcon from '@material-ui/icons/Facebook';
import { BiLogOut } from "react-icons/bi";
import { IoPersonAddSharp } from "react-icons/io5";
import "./auth.css";
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, map, filter } from 'rxjs/operators';

function Auth() {
    const [authorize, setAuthorize] = useState(false);
    const [active, setActive] = useState(false);

    const loginWithGoogle = () => {
        auth.signInWithPopup(google)
            .then((result) => {
                if (result) {
                    setAuthorize({
                        authorize: true,
                        picture: result.additionalUserInfo.profile.picture,
                        email: result.additionalUserInfo.profile.email,
                        idToken: result.credential.idToken
                    })

                    if (result.additionalUserInfo.isNewUser === true) {
                        console.log(result);
                        db.ref("user/google").push({
                            name: result.additionalUserInfo.profile.name,
                            email: result.additionalUserInfo.profile.email,
                        }).catch(alert);
                    }
                }
            });
    };

    // const loginWithFacebook = () => {
    //     auth.signInWithPopup(facebook)
    //         .then((result) => {
    //             if (result) {
    //                 setAuthorize({
    //                     authorize: true,
    //                     picture: result.additionalUserInfo.profile.picture.data.url,
    //                     email: result.additionalUserInfo.profile.email,
    //                     idToken: result.credential.accessToken
    //                 })
    //                 if (result.additionalUserInfo.isNewUser === true) {
    //                     db.ref("user/facebook").push({
    //                         name: result.additionalUserInfo.profile.name,
    //                         email: result.additionalUserInfo.profile.email,
    //                     }).catch(alert);
    //                 }
    //             }
    //         });
    // };

    const signOut = () => {
        auth.signOut()
            .then((result) => {
                console.log(result);
                setAuthorize(false)
            });
    }

    const authLoginURL = 'https://sso-dev.betasi.pl/auth/login?continueUrl=http://localhost:4200/';
    const LOGIN_WINDOW_PARAMS = 'toolbar=no menubar=no width=600, height=750, top=100, left=100';
    let _loginWindowRef = Window;
    let _loginWindowOpened$ = Subject;

    const signInWithPopup = (continueURL) => {
        if (_loginWindowRef || _loginWindowRef.closed === false) {
        }
        openLoginWindow();

        const message$ = fromEvent(window, 'message');
        message$
            .pipe(map(event => event.data), filter(data => data.token), map(data => data.token), takeUntil(_loginWindowOpened$))
            .subscribe(token => {
                console.log(token)
                auth.signInWithCustomToken(token)
                    .then(({ token }) => []
                    );
            });
    }

    const openLoginWindow = () => {
        _loginWindowRef = window.open(authLoginURL, 'blank', LOGIN_WINDOW_PARAMS);
        _loginWindowOpened$ = new Subject();
    }

    const showDetails = (event) => {
        event.preventDefault();
        setActive(!active)
    }

    let glContent;
    let fbContent;
    let loginContent;
    if (authorize) {
        return (
            <button className="icon-button" onClick={showDetails}>
                <div className="p-0">
                    <div className="avatar-min d-flex align-items-center justify-content-center text-uppercase context-colors rounded-circle fw-bold w-100 h-100 fs-4">
                        <img src={authorize.picture} alt={authorize.name} />
                    </div>
                    {active ?
                        <div className="user-menu">
                            <div className="d-flex flex-column justify-content-center align-items-center p-3">
                                <div className="avatar d-flex justify-content-center align-items-center overflow-hidden rounded-circle mb-2">
                                    <img className="d-flex align-items-center justify-content-center" src={authorize.picture} alt={authorize.name} />
                                </div>
                                <div className="d-flex align-items-center flex-column mw-100 ms-3 ms-0">
                                    <div className="text-truncate fw-bold" style={{ fontSize: '1.1rem' }}>{authorize.email}</div>
                                </div>
                            </div>
                            <div className="icon-button-hover button-justify-content-start border-top border-radius-0">
                                <button
                                    className="login-button border-radius-0"
                                    onClick={signOut}
                                >
                                    <div className="icon">
                                        <BiLogOut />
                                    </div>
                                    <div> Wyloguj się </div>
                                </button>
                            </div>
                        </div>
                        : null}
                </div>
            </button>
            // <div>
            //     {
            //         authorize.picture
            //             ? <div>
            //                 <div className="d-flex flex-md-column justify-content-md-center align-items-center p-3">
            //                     <div className="avatar d-flex justify-content-center align-items-center overflow-hidden rounded-circle mb-md-2">
            //                         <img className="d-flex align-items-center justify-content-center" src={authorize.picture} alt={authorize.name} />
            //                     </div>
            //                     <div className="d-flex align-items-md-center flex-column mw-100 ms-3 ms-md-0">
            //                         <div className="text-truncate fw-bold" style={{ fontSize: '1.1rem' }}>{authorize.email}</div>
            //                     </div>
            //                 </div>
            //                 <div className="d-flex flex-grow-1 flex-column align-items-end border-top py-2">
            //                     <button 
            //                         className="button border-radius-0" 
            //                         onClick={signOut}
            //                     >
            //                         <div className="icon">
            //                             <BiLogOut />
            //                         </div>
            //                         Wyloguj się
            //                     </button>
            //                 </div>
            //             </div>
            //             : null
            //     }
            // </div>
        )

    } else {
        // glContent = (
        //     <button className="button" onClick={loginWithGoogle} style={{ marginLeft: '-4.5px' }}>
        //         <div className="icon">
        //             <FaGoogle />
        //         </div>
        //         Google
        //     </button>
        // );
        // fbContent = (
        //     <button className="button" onClick={loginWithFacebook}>
        //         <div className="facebook-icon">
        //             <FacebookIcon />
        //         </div>
        //         Facebook
        //     </button>
        // );
        loginContent = (
            <button className="login-button" onClick={loginWithGoogle}>
                <div className="d-flex align-items-center">
                    <IoPersonAddSharp />
                    <div className="d-block text-nowrap ps-2"> Zaloguj się</div>
                </div>
            </button>
        )
    }
    return (
        <div>
            {glContent}
            {fbContent}
            {loginContent}
        </div>
    )
}

export default Auth;



