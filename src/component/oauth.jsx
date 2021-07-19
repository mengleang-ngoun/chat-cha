import React from "react";
import "./../style/index.scss";
import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import config from "./../config.json";
import { useDispatch, useSelector } from "react-redux";

export default function Oauth() {
  let { token } = useParams();
  let [tokenIsValid, setTokenIsValid] = useState(false);
  let [ischecking, setIschecking] = useState(false);
  const storeDispatch = useDispatch();
  const store_user = useSelector((state) => state.userCredential);


  useEffect(() => {
    axios
      .get(config.url + "api/check-token", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((r) => {
        console.log(r.data);
        storeDispatch({
          type: "setUserCredential",
          payload: {
            token,
            isVerify: true
          }
        });
        setTokenIsValid(true);
      })
      .catch((e) => {
        setTokenIsValid(false);
        console.log(e);
      });
  }, []);

  return (
    <div>
      {tokenIsValid && <h3>token: {token}</h3>}
      {tokenIsValid || <h3>token: Invalid</h3>}
    </div>
  );
}
