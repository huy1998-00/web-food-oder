import React from "react";
import { useState } from "react";
import { statuses } from "../ultis/styles";
import { Spinner } from "../components/index";
import { FaCloudUploadAlt, MdDelete } from "../assets/icons/index";
import {
  alertDanger,
  alertNull,
  alertSucess,
  alertInfor,
} from "../context/actions/alertAcions";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/filebase.config";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { ButtonClick } from "../animations/index";
import { addNewProduct, getAllProduct } from "../API";
import { setAllProducts } from "../context/actions/productActions";

const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState(null);
  const [isLoadding, setIsLoadding] = useState(false);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);
  const [progress, setProgress] = useState(null);

  const dispatch = useDispatch();

  // function handle upload message
  const uploadImage = (e) => {
    setIsLoadding(true);
    const imageFile = e.target.files[0];
    //upload file to firebase
    //doc/web/uploadfile

    //tạo Ref storage
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);

    // tạo task đẩy file lên firebase
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_chaged",
      (snapshot) => {
        //handle task when still on progress
        setProgress(
          Math.trunc((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (error) => {
        //handle task when fail upload
        dispatch(alertDanger(error));
        //remove alert

        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      },
      () => {
        //handletask when succes upload
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          //remove loadding state
          setIsLoadding(false);
          setProgress(null);

          //alert succces
          dispatch(alertSucess("Upload image success"));
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        });
      }
    );
  };

  //func handle delete img from firebase
  const deleteImageFromFirebase = (imageDownloadURL) => {
    setIsLoadding(true);
    // tạo ref file cần xóa
    const deleteRef = ref(storage, imageDownloadURL);
    //xóa file
    deleteObject(deleteRef).then(() => {
      //popup message
      dispatch(alertSucess("Removed image"));
      setImageDownloadURL(null);
      setIsLoadding(false);
    });

    // remove popup

    setTimeout(() => {
      dispatch(alertNull());
    }, 3000);
  };

  // function handle submit new data

  const submitNewData = async () => {
    const data = {
      product_name: itemName,
      product_Category: category,
      product_price: price,
      product_description: description,
      imageURL: imageDownloadURL,
    };
    // call API

    try {
      await addNewProduct(data).then((res) => {
        //allert message if success
        console.log(res);
        if (res.response?.status !== 422) {
          console.log("running");
          setItemName("");
          setImageDownloadURL("");
          setPrice("");
          setdescription("");
          setcategory(null);
          dispatch(alertSucess("Succes add product"));
          // update redux
          getAllProduct().then((data) => {
            dispatch(setAllProducts(data));
          });
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        } else {
          dispatch(alertInfor("Required field should not emty"));
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-12 w-full">
      {/* new item form */}
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField
          type={"text"}
          placeHolder={"Item name here...."}
          stateValue={itemName}
          stateFunction={setItemName}
        ></InputValueField>
        <InputValueField
          type={"number"}
          placeHolder={"Price here...."}
          stateValue={price}
          stateFunction={setPrice}
        ></InputValueField>
        <InputValueField
          type={"text"}
          placeHolder={"Description here...."}
          stateValue={description}
          stateFunction={setdescription}
        ></InputValueField>

        {/* category section */}
        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses &&
            statuses?.map((data) => {
              return (
                <p
                  //update category
                  onClick={() => setcategory(data.category)}
                  className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold  cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                    data.category === category
                      ? " text-primary bg-red-400"
                      : "bg-transparent"
                  }`}
                  key={data.id}
                >
                  {data.title}
                </p>
              );
            })}
        </div>

        <div className="w-full bg-card backdrop-blur-md h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {/* Upload image section */}
          {isLoadding ? (
            <div className="h-full w-full flex flex-col items-center justify-evenly px-24">
              <Spinner></Spinner>
              {Math.round(progress > 0) && (
                <div className=" w-full flex flex-col items-center justify-center gap-2">
                  <div className="flex justify-between w-full">
                    <span className="text-base font-medium text-textColor">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-textColor">
                      {Math.round(progress) > 0 && (
                        <>{`${Math.round(progress)}%`}</>
                      )}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: `${Math.round(progress)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imageDownloadURL ? (
                <>
                  <label>
                    <div className=" flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <p className="font-bold text-4xl">
                          <FaCloudUploadAlt className="-rotate-0" />
                        </p>
                        <p className="text-lg text-textColor">
                          Click to upload an image
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className=" w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  {/* display image when succes upload */}
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      src={imageDownloadURL}
                      className="w-full h-full object-cover"
                    />

                    <motion.button
                      {...ButtonClick}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={() => deleteImageFromFirebase(imageDownloadURL)}
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <motion.button
          {...ButtonClick}
          className="w-full  py-2 bg-red-300 cursor-pointer rounded-md text-primary hover:bg-red-500"
          onClick={submitNewData}
        >
          {" "}
          Save
        </motion.button>
      </div>
    </div>
  );
};

// reuse Input field
export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFunction,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        value={stateValue}
        onChange={(e) => stateFunction(e.target.value)}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400 "
      ></input>
    </>
  );
};

export default DBNewItem;
