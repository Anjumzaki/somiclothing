import Head from 'next/head'
import styles from '../styles/Checkout.module.css'
import Link from 'next/link'
import axios from 'axios';
import cookieCutter from 'cookie-cutter'
import React, { useState, useEffect } from 'react'
import { Divider, Navbar, CartItem, BackToTopButton, MyInput, MyButton } from '../Components/MyComponents'
import { useRouter } from 'next/router'
export default function Checkout() {
    const [dataState, setDataState] = useState([]);
    const [gotData, setGotData] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [total, setTotal] = useState(0);
    const [alertTxt, setAlertTxt] = useState("");
    const [alertTxtShown, setAlertTxtShown] = useState(false);

    //Values
    const [email, setEmail] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [address, setAddress] = useState("");
    const [postal, setPostal] = useState("");
    const [additional, setAdditional] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");



    const router = useRouter()
    var tempTotal = 0;
    useEffect(() => {
        getCookie();
    }, []);


    function getCookie() {
        var cookieVal = cookieCutter.get('Cart');
        var userRememberCookieVal = cookieCutter.get('UserRemember');
        if (cookieVal) {
            setDataState(JSON.parse(cookieVal));
            setGotData(true);
        }
        SetUserData();
    }

    function totalGot(e, i) {
        var current = parseInt(e);
        tempTotal = tempTotal + current;
        if (i == dataState.length - 1) {
            setTotal(tempTotal);
        }
    }

    function ValidateEmail(val) {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (val.match(validRegex)) {
            return true;
        }
        else {
            return false;
        }

    }

    function setAlertForTime(alert) {
        setAlertTxtShown(true);
        setAlertTxt(alert);
        setTimeout(() => {
            setAlertTxtShown(false);
        }, 1000);
    }

    function ValidateNumberOnly(val) {

        var numberRegex = /^\d+$/;

        if (val.match(numberRegex)) {
            return true;
        }
        else {
            return false;
        }
    }

    function SetUserData() {
        var rawUserData = sessionStorage.getItem('UserData');
        if (rawUserData) {
            var userData = JSON.parse(rawUserData);
            setEmail(userData.email);
            setFName(userData.firstName);
            setLName(userData.lastName);
            setAddress(userData.address);
            setAdditional(userData.additional);
            setPostal(userData.postalCode);
            setCity(userData.city);
            setPhone(userData.phoneNumber);
        }
    }

    function setCookieUserData() {
        var rawUserCookie = cookieCutter.get('User');
        if (rawUserCookie) {
            var userCookie = JSON.parse(rawUserCookie);
            setEmail(userCookie.email);
            setFName(userCookie.firstName);
            setLName(userCookie.lastName);
            setAddress(userCookie.address);
            setAdditional(userCookie.additional);
            setPostal(userCookie.postalCode);
            setCity(userCookie.city);
            setPhone(userCookie.phoneNumber);
        }
        else {
            alert("No saved data.");
        }
    }

    function GoForward() {
        if (validateInputs()) {
            var Obj = {
                firstName: fName,
                lastName: lName,
                email: email,
                address: address,
                additional: additional,
                postalCode: postal,
                city: city,
                phoneNumber: phone
            }
            if (rememberMe) {
                cookieCutter.set('User', JSON.stringify(Obj));
            }
            cookieCutter.set('UserRemember', JSON.stringify(rememberMe));
            sessionStorage.setItem('UserData', JSON.stringify(Obj));
            router.push('/ConfirmOrder');
        }
    }

    function validateInputs() {
        var output = false;
        if (email.length > 3 && ValidateEmail(email)) {
            if (fName.length >= 3 && lName.length >= 3) {
                if (address.length >= 6) {
                    if (city.length >= 3) {
                        if (postal.length >= 4 && ValidateNumberOnly(postal)) {
                            if (phone.length >= 11 && ValidateNumberOnly(phone)) {
                                output = true;
                            }
                            else {
                                setAlertForTime("Invalid Number");
                            }
                        }
                        else {
                            setAlertForTime("Invalid Postal Code");
                        }
                    }
                    else {
                        setAlertForTime("Invalid City");
                    }
                }
                else {
                    setAlertForTime("Invalid Address");
                }
            }
            else {
                setAlertForTime("Invalid Name");
            }
        }
        else {
            setAlertForTime("Invalid Email");
        }
        return output;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Checkout</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Navbar />
                <BackToTopButton />
                <Divider title="Checkout" />

                {gotData ?
                    <div className={styles.ConDiv}>
                        <div className={styles.FormCon}>
                            <h1 className={styles.FormConHeader}>Shipping Info</h1>
                            <MyInput placeholder="Email" value={email} inputClassName={styles.myInput} parentClassName={styles.myInputCon} label="Email:" onChange={(e) => { setEmail(e.target.value) }} />
                            <div className={styles.rowDiv}>
                                <div className={styles.rowDivCol}>
                                    <MyInput placeholder="First name" inputClassName={styles.myInput} parentClassName={styles.myInputCon} value={fName} label="First name:" onChange={(e) => { setFName(e.target.value) }} />
                                </div>
                                <div className={styles.rowDivCol}>
                                    <MyInput placeholder="Last name" inputClassName={styles.myInput} parentClassName={styles.myInputCon} value={lName} label="Last name:" onChange={(e) => { setLName(e.target.value) }} />
                                </div>
                            </div>
                            <MyInput placeholder="Address" value={address} inputClassName={styles.myInput} parentClassName={styles.myInputCon} label="Address:" onChange={(e) => { setAddress(e.target.value) }} />
                            <MyInput placeholder="Appartment, suite, etc. (Optional)" value={additional} inputClassName={styles.myInput} parentClassName={styles.myInputCon} label="Additional info:" onChange={(e) => { setAdditional(e.target.value) }} />
                            <div className={styles.rowDiv}>
                                <div className={styles.rowDivCol}>
                                    <MyInput placeholder="City" inputClassName={styles.myInput} parentClassName={styles.myInputCon} value={city} label="City:" onChange={(e) => { setCity(e.target.value) }} />
                                </div>
                                <div className={styles.rowDivCol}>
                                    <MyInput placeholder="Postal Code" inputClassName={styles.myInput} parentClassName={styles.myInputCon} value={postal} label="Postal Code:" onChange={(e) => { setPostal(e.target.value) }} />
                                </div>
                            </div>
                            <MyInput placeholder="Phone Number" value={phone} inputClassName={styles.myInput} parentClassName={styles.myInputCon} label="Phone Number:" onChange={(e) => { setPhone(e.target.value) }} />


                            <div className={styles.rememberCon}><input checked={rememberMe} type="checkbox" name="remember" onChange={() => setRememberMe(!rememberMe)} value={rememberMe} /> Remember this information for later <MyButton onClick={() => setCookieUserData()} parentClassName={styles.retriveBtn} text="Retrive data" /></div>

                            <h3 className={alertTxtShown ? styles.alertTextShown + " " + styles.alertText : styles.alertText}>{alertTxt}</h3>

                            <MyButton onClick={() => GoForward()} parentClassName={styles.button} text="Continue" />
                        </div>
                        <div className={styles.sideCon}>
                            {
                                dataState &&
                                dataState.map((data, i) => {
                                    return (
                                        <CartItem key={i}
                                            onTotalGet={(e) => totalGot(e, i)}
                                            id={data.id}
                                            size={data.size}
                                            color={data.color}
                                            quantity={data.quantity} />
                                    )
                                })}

                            <Divider />

                            <div className={styles.totalDiv}>
                                <h1>
                                    Subtotal
                                </h1>
                                <h1>
                                    {total}Rs
                                </h1>
                            </div>

                            <div className={styles.totalDiv}>
                                <h1>
                                    Shipping
                                </h1>
                                <h1>
                                    200Rs
                                </h1>
                            </div>

                            <Divider />

                            <div className={styles.totalDiv}>
                                <h1>
                                    Total
                                </h1>
                                <h1>
                                    {total + 200}Rs
                                </h1>
                            </div>

                        </div>
                    </div>
                    : <button onClick={() => getCookie()}>Retrive Data</button>}
            </main>

            <style global jsx>{`
            body {
               margin: 0px !important;
               padding: 0px !important;

            }`}</style>
        </div>

    )
}
