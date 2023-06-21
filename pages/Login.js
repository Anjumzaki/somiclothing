import Head from 'next/head'
import axios from 'axios';
import styles from '../styles/Signup.module.css'
import { MyInput, MyButton, Navbar, BackToTopButton } from '../Components/MyComponents'
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import {
    faEye,
    faEyeSlash,
  } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
    const router = useRouter();
    const [passwordHide, setpasswordHide] = useState(true);
    const [incorrectPass, setIncorrectpass] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("+92");

    function LoginUser(){
        axios.post(`http://localhost:1000/loginUser`, {
            password: password,
            phone: phoneNumber,
        }).then((response) => {
            if(response.data.incorrectPassword ==  true){
                setIncorrectpass(true);
                setErrorText(response.data.message);
            }
            else{
                console.log(response.data.user);
            }
        });
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Navbar/>
                <BackToTopButton />
                <div className={styles.card}>
                    <h1 className={styles.cardTitle}>Login</h1>
                    <MyInput parentClassName={styles.phonedInput} inputClassName={phoneNumber.length == 13 ? styles.FineInput : null} placeholder="Type Here" value={phoneNumber} label="Phone Number:" onChange={(e) => { setPhoneNumber(e.target.value) }} smallLabel="(Must be 13 digits)" />
                    <MyInput parentClassName={styles.passwordInput} iconOnClick={() => setpasswordHide(!passwordHide)} icon={passwordHide ? faEye : faEyeSlash} eyeClose iconSize={32} inputType={passwordHide ? "password" : "text"} inputClassName={password.length >= 8 ? incorrectPass ? styles.BadInput : styles.FineInput : null} placeholder="Type Here" label="Password:" onChange={(e) => { setPassword(e.target.value) }} smallLabel="(Must be more than 8 leters)" />
                    <MyButton onClick={() => LoginUser()} parentClassName={styles.button} text="Login" />
                    {errorText.length ? <p className={styles.errorText}>{errorText}</p> : null}
                    <p>New Here? <Link href={"/Signup"}><a className={styles.loginBtn}>Sign up</a></Link></p>
                </div>
            </main>

            <style global jsx>{`
            body {
               margin: 0px !important;
               padding: 0px !important;

            }`}</style>

        </div>)

}