import React from "react";
import { LoginBg, Logo } from "../assets/index";
import { LoginInput } from "../components";
import { useState } from "react";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { ButtonClick } from "../animations";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/filebase.config";
import { validateUserJWT } from "../API";
const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirm_Password, setConfirm_Password] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  //func handle login with google
  const loginwithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      ///khi người dùng đăng đặng nhập qua mail có thể lấy được thông tin người dung trả về từ google Auth( caanf validate access token)
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            //lấy token người dùng gửi về backend qua API và nhận phản hồi
            validateUserJWT(token).then((data) => {
              console.log(data);
            });
          });
        }
        // chuyển hướng
        navigate("/", { replace: true });
      });
    });
  };
  // func handle sginup với emaill and password

  const signUpWithEmailPass = async () => {
    if (userEmail === "" || userPassword === "" || confirm_Password === "") {
      //xuw ly bo trong
    } else {
      if (userPassword === confirm_Password) {
        setUserEmail("");
        setUserPassword("");
        setConfirm_Password("");

        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          userPassword
        ).then((Usercred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                //lấy token người dùng gửi về backend qua API và nhận phản hồi
                validateUserJWT(token).then((data) => {
                  setUserEmail("");
                  setUserPassword("");
                  setConfirm_Password("");
                  setIsSignUp(false);

                  /// cần xử lý popup message phản hổi từ backend (nêu tạo thành công)
                });
              });
            } else {
              //alert message
              /// cần xử lý popup message phản hổi từ backend (nêu tạo thất bại)
            }
          });
        });
      }
    }
  };
  /// func login with email and passs

  const signInWithEmailPass = async () => {
    if (userEmail !== "" || userPassword !== "") {
      await signInWithEmailAndPassword(
        firebaseAuth,
        userEmail,
        userPassword
      ).then((userCred) => {
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              //lấy token người dùng gửi về backend qua API và nhận phản hồi
              validateUserJWT(token).then((data) => {
                console.log(data);
              });
            });
            // chuyển hướng
            navigate("/", { replace: true });
          } else {
            //alert message
          }
        });
      });
    }
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden relative">
      {/* setup background có thể thay đổi sau*/}
      <img
        src={LoginBg}
        className="h-full w-full absolute object-cover top-0 left-0"
        alt=""
      />
      {/*content box ( login form)*/}
      <div className="flex flex-col bg-lightOverlay items-center w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
        {/* {logo} can fix */}
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-8" alt="" />
          <p className="text-headingColor font-semibold text-2xl">Food</p>
        </div>
        {/* wellcome text */}
        <p className="text-3xl text-headingColor font-semibold">
          Wellcome back!!
        </p>
        <p className="text-textColor text-xl -m-6">
          {!isSignUp ? "Sign-In" : "Sign-Up"} with following
        </p>

        {/* user input*/}
        <div className="w-full flex flex-col md:px-12 items-center justify-center gap-6 py-4">
          <LoginInput
            placeholder={"Email here"}
            icon={<FaEnvelope className="text-xl text-textColor"></FaEnvelope>}
            inputState={userEmail}
            inputStateFunc={setUserEmail}
            isSignup={isSignUp}
            type={"email"}
          ></LoginInput>
          <LoginInput
            placeholder={"Password here"}
            icon={<FaLock className="text-xl text-textColor"></FaLock>}
            inputState={userPassword}
            inputStateFunc={setUserPassword}
            isSignup={isSignUp}
            type={"password"}
          ></LoginInput>
          {isSignUp && (
            <LoginInput
              placeholder={"Confirm password here"}
              icon={<FaLock className="text-xl text-textColor"></FaLock>}
              inputState={confirm_Password}
              inputStateFunc={setConfirm_Password}
              isSignup={isSignUp}
              type={"password"}
            ></LoginInput>
          )}
          {!isSignUp ? (
            <p>
              Doesn't have an acount ?{" "}
              <motion.button
                {...ButtonClick}
                className="text-red-400 underline  cursor-pointer bg-transparent"
                onClick={() => {
                  setIsSignUp(true);
                }}
              >
                Create one{" "}
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account ?{" "}
              <motion.button
                {...ButtonClick}
                className="text-red-400 underline  cursor-pointer bg-transparent"
                onClick={() => {
                  setIsSignUp(false);
                }}
              >
                Sign-in here{" "}
              </motion.button>
            </p>
          )}
          {/* SignIN/ Sign Up button */}
          {isSignUp ? (
            <motion.button
              {...ButtonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 hover:bg-red-500 transition-all duration-150"
              onClick={signUpWithEmailPass}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...ButtonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 hover:bg-red-500 transition-all duration-150"
              onClick={signInWithEmailPass}
            >
              Sign In
            </motion.button>
          )}
          {/* separte line với form */}
          <div className="flex items-center justify-between gap-16">
            <div className="w-24 h-[1px] rounded-md bg-white"></div>
            <p className="text-white">or</p>
            <div className="w-24 h-[1px] rounded-md bg-white"></div>
          </div>

          <motion.div
            {...ButtonClick}
            className="flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
            onClick={loginwithGoogle}
          >
            <FcGoogle className="text-3xl"></FcGoogle>
            <p className="capitalize text-base text-headingColor">
              Sign In with Google
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
