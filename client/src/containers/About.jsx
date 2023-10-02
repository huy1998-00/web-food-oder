import React, { useRef } from "react";
import { Header } from "../components";
import {
  AppleImg,
  CopyRight,
  FastDelevery,
  GoogleImg,
  LiveOder,
  MobileScreen,
  NoMinOrder,
  foodtable,
} from "../assets";
import { motion } from "framer-motion";
import { ButtonClick } from "../animations/index";
import Typewriter from "typewriter-effect";
import { subcribleUser } from "../API/index";
import { sendEmailVerification } from "firebase/auth";
const About = () => {
  const inputEmail = useRef();

  //VALIDATE
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  //function handle user subcrible

  const postSubcribleUser = () => {
    const data = {
      email: inputEmail.current.value,
    };

    if (isValidEmail(data.email)) {
      subcribleUser(data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <main className="flex w-screen min-h-screen flex-col items-center justify-start bg-primary overflow-y-hidden">
      <Header></Header>
      <div className="w-full flex flex-col items-start justify mt-40 px-6  md:px-24 2xl:px-96 ">
        <div className="h-420 w-full   grid grid-cols-5  ">
          <div className="col-span-3 ">
            <div className="flex flex-col w-[90%] ">
              <div className="flex flex-col mt-12">
                <p className="text-headingColor md:text-4xl  lg:text-6xl font-semibold sm:text-2xl h-24">
                  <Typewriter
                    options={{
                      skipAddStyles: false,
                      loop: true,
                    }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("Hungry ?")
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("Unexpected guest ?")
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("Late night at office ?")
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("Cooking gone wrong ?")
                        .pauseFor(1000)
                        .deleteAll()

                        .start();
                    }}
                  />
                </p>
                <div className="flex flex-col gap-2 mt-6">
                  <p className="text-textColor md:text-2xl sm:text-sm">
                    Order food from favourite restaurants near you.
                  </p>
                  <p className="text-textColor md:text-2xl sm:text-sm">
                    Become our member for many discount{" "}
                  </p>
                </div>
                <div className="flex mt-6 w-full shadow-md">
                  <input
                    type="text"
                    className="w-[80%]   border-gray-400 border focus:border-orange-400 p-4  font-semibold  "
                    placeholder="Enter your email here..."
                    ref={inputEmail}
                  />
                  <motion.button
                    {...ButtonClick}
                    onClick={postSubcribleUser}
                    className="flex items-center justify-center bg-orange-500 text-white  font-bold p-4  flex-1 max-sm:text-sm  "
                  >
                    SUBSCRIBLE
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 h-full">
            <img src={foodtable} className="object-fit h-full  w-full" alt="" />
          </div>
        </div>
        <div className=" h-420 w-full bg-brownbg flex justify-around items-center">
          <div className="w-[20%] flex flex-col items-start justify-center gap-12">
            <div className="flex items-end justify-center lg:h-[250px] md:h-[200px] sm:h-[150px] w-full">
              <img src={NoMinOrder} className="h-full" alt="" />
            </div>
            <div className="flex flex-col items-center justify-center w-full text-white gap-4">
              <h1 className="lg:text-2xl md:text-lg sm:text-sm font-semibold text-center">
                No minium order
              </h1>
              <p className="text-center sm:text-[8px] md:text-sm lg:text-sm">
                Order in for yourself or for the group, with no restrictions on
                order value
              </p>
            </div>
          </div>
          <div className="w-[20%] flex flex-col items-start justify-center gap-12">
            <div className="flex items-end justify-center lg:h-[250px] md:h-[200px] sm:h-[150px] w-full">
              <img src={LiveOder} className="h-full" alt="" />
            </div>
            <div className="flex flex-col items-center justify-center w-full text-white gap-4">
              <h1 className="lg:text-2xl md:text-lg sm:text-sm font-semibold text-center">
                Live Order Tracking
              </h1>
              <p className="text-center sm:text-[8px] md:text-sm lg:text-sm">
                Know where your order is at all times, from the restaurant to
                your doorstep
              </p>
            </div>
          </div>
          <div className="w-[20%] flex flex-col items-start justify-center gap-12">
            <div className="flex items-end justify-center lg:h-[250px] md:h-[200px] sm:h-[150px] w-full">
              <img src={FastDelevery} className="h-full" alt="" />
            </div>
            <div className="flex flex-col items-center justify-center w-full text-white gap-4">
              <h1 className="lg:text-2xl md:text-lg sm:text-sm font-semibold text-center">
                Fast Delivery
              </h1>
              <p className="text-center sm:text-[8px] md:text-sm lg:text-sm ">
                Experience HFood's superfast delivery for food delivered fresh &
                on time
              </p>
            </div>
          </div>
        </div>
        <div className="h-300 w-full grid grid-cols-2">
          <div className="col-span-1 h-full  w-full">
            <div className="flex items-center justify-center h-full w-full">
              <img
                src={MobileScreen}
                className="max-w-[70%] max-h-[250px] "
                alt=""
              />
            </div>
          </div>
          <div className="col-span-1 h-full w-full">
            <div className=" w-full mt-14">
              <h1 className="text-headingColor font-bold lg:text-3xl md:text-2xl sm:text-lg">
                Restaurants in your pocket
              </h1>
              <p className="sm:text-xs md:text-xl lg:text-2xl mt-6 text-textColor">
                Order from your favorite restaurants & track on the go, with the
                all-new HFood app.
              </p>
            </div>
            <div className="flex items-start justify-start w-full sm:gap-1 md:gap-2 lg:gap-3 mt-4">
              <img
                src={AppleImg}
                className="md:h-12 md:w-40 sm:h-6 sm:w-20 lg:h-20 lg:w-48 hover:scale-110 cursor-pointer"
                alt=""
              />
              <img
                src={GoogleImg}
                className="md:h-12 md:w-40 sm:h-6 sm:w-20 lg:h-20 lg:w-48 hover:scale-110 cursor-pointer "
                alt=""
              />
            </div>
          </div>
        </div>
        <div className=" w-full bg-black">
          <div className="flex w-full items-center justify-around flex-wrap  ">
            <div className="flex flex-col md:w-3/12 sm:w-full lg:w-3/12 text-white">
              <p className="mt-20 mb-6 text-textColor text-lg font-bold">
                COMPANY
              </p>
              <p>Team</p>
              <p>Careers</p>
              <p>Blog</p>
            </div>
            <div className="flex flex-col md:w-3/12 sm:w-full lg:w-3/12 text-white">
              <p className="mt-20 mb-6 text-textColor text-lg font-bold">
                CONTACT
              </p>
              <p>Help & Support</p>
              <p>Partner with us</p>
              <p>Ride with us</p>
            </div>
            <div className="flex flex-col md:w-3/12 sm:w-full lg:w-3/12 text-white">
              <p className="mt-20 mb-6 text-textColor text-lg font-bold">
                LEGAL
              </p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>Cookie Policy</p>
            </div>
          </div>
          <div className="h-[1px] bg-gray-500 w-full mt-6"></div>
          <div className="h-[100px] w-full flex justify-center items-center">
            <span>
              <img className="h-4 w-4" src={CopyRight} alt="" />
            </span>
            <p className="text-white ml-2">2023 HFood</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
