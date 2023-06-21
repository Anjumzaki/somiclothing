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
    const [errorText, setErrorText] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("+92");
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [phoneNumberTaken, setPhoneNumberTaken] = useState(false);
    const [makingUser, setMakingUser] = useState(false);


    function CheckUserName() {
        axios.post(`http://localhost:1000/checkUsername`, {
            username: username,
        }).then((response) => {
            setUsernameTaken(!response.data.unique);
            if(!response.data.unique == true)
            setErrorText("Username Taken!");
            else
            setErrorText("");
        });
    }

    function CheckPhoneNumber() {
        axios.post(`http://localhost:1000/checkPhone`, {
            phone: phoneNumber,
        }).then((response) => {
            setPhoneNumberTaken(!response.data.unique);
            if(!response.data.unique == true)
            setErrorText("An account with this phone number already exists!\nLog in?");
            else
            setErrorText("");
        });
    }


    function CreateNewUser(){
        axios.post(`http://localhost:1000/addNewUser`, {
            username: username,
            password: password,
            phone: phoneNumber,
        }).then((response) => {
            console.log(response.data);
            console.log(response.data.message);
            if(response.data.message){
                setMakingUser(false);
                router.push('/')
            }
            else{
                setErrorText("Couldn't make user, try again later.");
                setMakingUser(false);
            }
        });
    }

    function MakeUser(){
        if(makingUser == false){
        setMakingUser(true);
        if(username.length >= 3 && password.length >= 8 && phoneNumber.length == 13){
            CheckUserName()
            CheckPhoneNumber();
            if(!usernameTaken && !phoneNumberTaken)
            CreateNewUser();
        }
        else{
            setMakingUser(false);
            setErrorText("Please Fill Inputs!");
        }
    }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Signup</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Navbar/>
                <BackToTopButton />
                <div className={styles.card}>
                    <h1 className={styles.cardTitle}>Signup</h1>
                    <MyInput placeholder="Type Here" inputClassName={username.length >= 3 ? usernameTaken==true ? styles.BadInput : styles.FineInput : null} label="Username:" onChange={(e) => { setUsername(e.target.value) }} smallLabel="(Must be more than 3 leters)" />
                    <MyInput parentClassName={styles.passwordInput} iconOnClick={() => setpasswordHide(!passwordHide)} icon={passwordHide ? faEye : faEyeSlash} eyeClose iconSize={32} inputType={passwordHide ? "password" : "text"} inputClassName={password.length >= 8 ? styles.FineInput : null} placeholder="Type Here" label="Password:" onChange={(e) => { setPassword(e.target.value) }} smallLabel="(Must be more than 8 leters)" />
                    <MyInput parentClassName={styles.phonedInput} inputClassName={phoneNumber.length == 13 ? phoneNumberTaken==true ? styles.BadInput : styles.FineInput : null} placeholder="Type Here" value={phoneNumber} label="Phone Number:" onChange={(e) => { setPhoneNumber(e.target.value) }} smallLabel="(Must be 13 digits)" />
                    <MyButton onClick={() => MakeUser()} parentClassName={styles.button} text="Sign Up" />
                    {errorText.length ? <p className={styles.errorText}>{errorText}</p> : null}
                    <p>Already a member? <Link href={"/Login"}><a className={styles.loginBtn}>Login</a></Link></p>
                </div>
            </main>

            <style global jsx>{`
            body {
               margin: 0px !important;
               padding: 0px !important;

            }`}</style>

        </div>)

}
