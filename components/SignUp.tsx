import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React from "react";
import signUpStyles from "../styles/SignUp.module.scss";
import { User } from "../global/User";
import { Role } from "../global/Role";
import {
  inputBoxesEmpty,
  checkPasswords,
  checkUserName,
  checkEmail,
  checkEmailValidity,
  checkDate,
  checkInputBox,
} from "../utils/SignUpUtils";
import { addUser } from "../utils/AddUser";

const url = process.env.url;

const SignUp: React.FunctionComponent = () => {
  const router = useRouter();

  const handleClick = async () => {
    const empty = inputBoxesEmpty(
      document.getElementsByClassName(signUpStyles.inputBox)
    );
    const passwordIsSame = checkPasswords(
      (document.getElementById("password")! as HTMLInputElement).value,
      (document.getElementById("repeatPassword")! as HTMLInputElement).value,
      document.getElementById("passwordIsDifferent")! as HTMLLabelElement
    );
    let usernameValid = false;
    await checkUserName(
      (document.getElementById("username")! as HTMLInputElement).value,
      document.getElementById("usernameExists")! as HTMLLabelElement
    ).then(() => {
      usernameValid = true;
    });
    let emailValid = checkEmailValidity(
      (document.getElementById("email")! as HTMLInputElement).value,
      document.getElementById("emailIncorrect")! as HTMLLabelElement
    );
    await checkEmail(
      (document.getElementById("email")! as HTMLInputElement).value,
      document.getElementById("emailExists")! as HTMLLabelElement
    ).catch(() => {
      emailValid = false;
    });
    const dateValid = checkDate(
      document.getElementById("dateOfBirth")! as HTMLInputElement,
      document.getElementById("dateOfBirthInvalid")! as HTMLLabelElement
    );
    //remove this
    console.log(!empty);
    console.log(passwordIsSame);
    console.log(usernameValid);
    console.log(emailValid);
    console.log(dateValid);
    if (!empty && passwordIsSame && usernameValid && emailValid && dateValid) {
      const firstName = (
        document.getElementById("firstName")! as HTMLInputElement
      ).value;
      const lastName = (
        document.getElementById("lastName")! as HTMLInputElement
      ).value;
      const password = (
        document.getElementById("password")! as HTMLInputElement
      ).value;
      const date = new Date(
        (document.getElementById("dateOfBirth")! as HTMLInputElement).value
      );
      const email = (document.getElementById("email")! as HTMLInputElement)
        .value;
      const userName = (
        document.getElementById("username")! as HTMLInputElement
      ).value;
      let role: Role = {
        roleId: "role00102",
        name: "USER",
        description: "This role can read the data",
      };
      await axios.get(`${url}/auth/roles/user`).then((res: AxiosResponse) => {
        role = res.data;
      });
      const user: User = {
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
        dateOfBirth: date,
        userName: userName,
        role: role,
        active: true,
      };
      addUser(user);
      // router.push("/products/all");
    }
  };

  return (
    <>
      <h2 className={signUpStyles.heading}>Sign Up</h2>
      <form>
        <div className={signUpStyles.signUpContainer}>
          <input
            className={signUpStyles.inputBox}
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            onChange={() => {
              checkInputBox("firstName");
            }}
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
            onChange={() => {
              checkInputBox("lastName");
            }}
          />
          <label htmlFor="lastName" id="lastNameNotFound">
            *This field is required
          </label>
          <input
            className={signUpStyles.inputBox}
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            onChange={() => {
              checkDate(
                document.getElementById("dateOfBirth")! as HTMLInputElement,
                document.getElementById(
                  "dateOfBirthInvalid"
                )! as HTMLLabelElement
              );
              checkInputBox("dateOfBirth");
            }}
          />
          <label htmlFor="dateOfBirth" id="dateOfBirthNotFound">
            *This field is required
          </label>
          <label htmlFor="dateOfBirth" id="dateOfBirthInvalid">
            *This date is invalid
          </label>
          <input
            className={signUpStyles.inputBox}
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            onChange={() => {
              checkEmailValidity(
                (document.getElementById("email")! as HTMLInputElement).value,
                document.getElementById("emailIncorrect")! as HTMLLabelElement
              );
              checkInputBox("email");
              checkEmail(
                (document.getElementById("email")! as HTMLInputElement).value,
                document.getElementById("emailExists")! as HTMLLabelElement
              );
            }}
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
            onChange={() => {
              checkInputBox("username");
              checkUserName(
                (document.getElementById("username")! as HTMLInputElement)
                  .value,
                document.getElementById("usernameExists")! as HTMLLabelElement
              );
            }}
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
            onChange={() => {
              checkPasswords(
                (document.getElementById("password")! as HTMLInputElement)
                  .value,
                (document.getElementById("repeatPassword")! as HTMLInputElement)
                  .value,
                document.getElementById(
                  "passwordIsDifferent"
                )! as HTMLLabelElement
              );
              checkInputBox("password");
            }}
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
              checkPasswords(
                (document.getElementById("password")! as HTMLInputElement)
                  .value,
                (document.getElementById("repeatPassword")! as HTMLInputElement)
                  .value,
                document.getElementById(
                  "passwordIsDifferent"
                )! as HTMLLabelElement
              );
              checkInputBox("password");
              checkInputBox("repeatPassword");
            }}
          />
          <label htmlFor="repeatPassword" id="repeatPasswordNotFound">
            *This field is required
          </label>
          <label htmlFor="repeatPassword" id="passwordIsDifferent">
            *Passwords do not match
          </label>
          <input
            type="button"
            value="Sign Up"
            className={signUpStyles.btnSubmit}
            onClick={handleClick}
          />
        </div>
      </form>
    </>
  );
};

export default SignUp;
