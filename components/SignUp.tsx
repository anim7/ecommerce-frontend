import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React from "react";
import signUpStyles from "../styles/SignUp.module.scss";

const { useState } = React;

const url = process.env.url;

const SignUp: React.FunctionComponent = () => {
  const router = useRouter();
  const inputBoxesEmpty = (): boolean => {
    const inputBoxes: HTMLCollectionOf<Element> =
      document.getElementsByClassName(signUpStyles.inputBox);
    let empty = false;
    for (let i = 0; i < inputBoxes.length; i++) {
      const inputBox = inputBoxes[i]! as HTMLInputElement;
      const elementName = inputBox.name + "NotFound";
      if (inputBox.value.length == 0) {
        document.getElementById(elementName)!.style.display = "block";
        empty = true;
      } else {
        document.getElementById(elementName)!.style.display = "none";
      }
    }
    return empty;
  };
  const checkPasswords = (): boolean => {
    const password1 = (document.getElementById("password")! as HTMLInputElement)
      .value;
    const password2 = (
      document.getElementById("repeatPassword")! as HTMLInputElement
    ).value;
    const passwordIsDifferent = document.getElementById("passwordIsDifferent")!;
    if (password1 == password2) {
      passwordIsDifferent.style.display = "none";
      return true;
    }
    passwordIsDifferent.style.display = "block";
    return false;
  };
  const checkUserName = (username: string): boolean | void => {
    axios
      .get(`${url}/auth/users/${username}`)
      .then((res: AxiosResponse) => {
        const usernameExists = document.getElementById("usernameExists")!;
        if (res.data.length > 0) {
          usernameExists.style.display = "block";
          return false;
        } else {
          usernameExists.style.display = "none";
          return true;
        }
      })
      .catch((err: AxiosError) => {
        console.error(err);
      });
  };
  const checkEmail = (email: string): boolean | void => {
    axios
      .get(`${url}/auth/users/email/${email}`)
      .then((res: AxiosResponse) => {
        const emailExists = document.getElementById("emailExists")!;
        if (res.data.length > 0) {
          emailExists.style.display = "block";
          return false;
        } else {
          emailExists.style.display = "none";
          return true;
        }
      })
      .catch((err: AxiosError) => {
        console.error(err);
      });
  };
  const checkEmailValidity = (): boolean => {
    const email = (document.getElementById("email")! as HTMLInputElement).value;
    const emailIncorrect = document.getElementById("emailIncorrect")!;

    if (!email.includes("@") || !email.includes(".") || email.includes(" ")) {
      emailIncorrect.style.display = "block";
      return false;
    } else {
      emailIncorrect.style.display = "none";
      return true;
    }
  };
  const checkAge = (): boolean => {
    const ageInvalid = document.getElementById("ageInvalid")!;
    try {
      const age = parseFloat(
        (document.getElementById("age")! as HTMLInputElement).value
      );
      if (age > 0 && Number.isInteger(age)) {
        ageInvalid.style.display = "none";
        return true;
      } else {
        ageInvalid.style.display = "block";
        return false;
      }
    } catch (error) {
      ageInvalid.style.display = "block";
      return false;
    }
  };

  const handleClick = (): void => {
    const empty = inputBoxesEmpty();
    const passwordIsSame = checkPasswords();
    const usernameValid = checkUserName(
      (document.getElementById("username")! as HTMLInputElement).value
    );
    const emailValid =
      checkEmail(
        (document.getElementById("email")! as HTMLInputElement).value
      ) && checkEmailValidity();
    const ageValid = checkAge();
    if (!empty && passwordIsSame && usernameValid && emailValid && ageValid) {
      router.push("/auth/signup/verification");
    }
  };
  return (
    <>
      <h2 className={signUpStyles.heading}>Sign Up</h2>
      <div className={signUpStyles.signUpContainer}>
        <input
          className={signUpStyles.inputBox}
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
        />
        <label htmlFor="firstName" id="firstNameNotFound">
          *This field is required
        </label>
        <input
          className={signUpStyles.inputBox}
          type="text"
          name="lastName"
          placeholder="Last Name"
          id="lastName"
        />
        <label htmlFor="lastName" id="lastNameNotFound">
          *This field is required
        </label>
        <input
          className={signUpStyles.inputBox}
          type="number"
          name="age"
          placeholder="Age"
          id="age"
          onChange={checkAge}
        />
        <label htmlFor="age" id="ageNotFound">
          *This field is required
        </label>
        <label htmlFor="age" id="ageInvalid">
          *This field is not valid
        </label>
        <input
          className={signUpStyles.inputBox}
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          onChange={checkEmailValidity}
        />
        <label htmlFor="email" id="emailNotFound">
          *This field is required
        </label>
        <label htmlFor="email" id="emailExists">
          *This email is already registered
        </label>
        <label htmlFor="email" id="emailIncorrect">
          *This email address is incorrect
        </label>
        <input
          className={signUpStyles.inputBox}
          type="text"
          name="username"
          placeholder="Username"
          id="username"
        />
        <label htmlFor="username" id="usernameNotFound">
          *This field is required
        </label>
        <label htmlFor="username" id="usernameExists">
          *This username already exists
        </label>
        <input
          className={signUpStyles.inputBox}
          type="password"
          name="password"
          placeholder="Password"
          id="password"
        />
        <label htmlFor="password" id="passwordNotFound">
          *This field is required
        </label>
        <input
          className={signUpStyles.inputBox}
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          placeholder="Repeat your password"
          onChange={() => {
            if (
              (document.getElementById("repeatPassword")! as HTMLInputElement)
                .value.length > 0
            ) {
              document.getElementById("repeatPasswordNotFound")!.style.display =
                "none";
            }
            if (
              (document.getElementById("password")! as HTMLInputElement).value
                .length > 0
            ) {
              document.getElementById("passwordNotFound")!.style.display =
                "none";
            }
            checkPasswords();
          }}
        />
        <label htmlFor="repeatPassword" id="repeatPasswordNotFound">
          *This field is required
        </label>
        <label htmlFor="repeatPassword" id="passwordIsDifferent">
          *Passwords do not match
        </label>
        <input
          type="submit"
          value="Sign Up"
          className={signUpStyles.btnSubmit}
          onClick={handleClick}
        />
      </div>
    </>
  );
};

export default SignUp;
