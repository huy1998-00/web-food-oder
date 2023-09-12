import React from "react";
import { useState } from "react";
import { statuses } from "../ultis/styles";
import { Spinner } from "../components/index";
import { FaCloudUploadAlt } from "../assets/icons/index";
import {
  alertDanger,
  alertNull,
  alertSucess,
} from "../context/actions/alertAcions";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/filebase.config";
import { useSelector, useDispatch } from "react-redux";
const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setcategory] = useState(null);
  const [isLoadding, setIsLoadding] = useState(false);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);
  const [progess, setProgess] = useState(null);
  const alert = useSelector((state) => state.alert);
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
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        //handle task when fail upload
        dispatch(alertDanger(error));
        //remove alert

        setInterval(() => {
          dispatch(alertNull());
        }, 3000);
      },
      () => {
        //handletask when succes upload
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          //remove loadding state
          setIsLoadding(false);
          setProgess(null);

          //alert succces
          dispatch(alertSucess("Upload image success"));
          setInterval(() => {
            dispatch(alertNull());
          }, 3000);
        });
      }
    );
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

        {/* category section */}
        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses &&
            statuses?.map((data) => {
              return (
                <p
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
        <InputValueField
          type={"number"}
          placeHolder={"Price here...."}
          stateValue={price}
          stateFunction={setPrice}
        ></InputValueField>
        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {/* Upload image section */}
          {isLoadding ? (
            <div className="h-full w-full flex flex-col items-center justify-evenly px-24">
              <Spinner></Spinner>
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
                <></>
              )}
            </>
          )}
        </div>
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
