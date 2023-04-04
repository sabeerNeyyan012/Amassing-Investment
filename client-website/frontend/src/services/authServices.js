import { auth } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export const emailSignUp = async (userData) => {
  var user;
  var error;

  try {
    user = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
  } catch (err) {
    error = err;
  }

  return { user, error };
};

export const emailLogIn = async (userData) => {
  var user;
  var error;
  try {
    user = await signInWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
  } catch (err) {
    error = err;
  }

  return { user, error };
};

export const socialMediaAuth = async (provider) => {
  var user;
  var error;
  try {
    user = await signInWithPopup(auth, provider);
  } catch (err) {
    error = err;
  }

  return { user, error };
};
