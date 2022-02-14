import axios, { AxiosError, AxiosResponse } from "axios";

const url = process.env.url;

export const inputBoxesEmpty = (
  inputBoxes: HTMLCollectionOf<Element>
): boolean => {
  let empty = false;
  for (let i = 0; i < inputBoxes.length; i++) {
    const inputBox = inputBoxes[i]! as HTMLInputElement;
    const elementName = inputBox.name + "NotFound";
    if (inputBox.value.length == 0) {
      (
        document.getElementById(elementName)! as HTMLLabelElement
      ).style.display = "block";
      empty = true;
    } else {
      (
        document.getElementById(elementName)! as HTMLLabelElement
      ).style.display = "none";
    }
  }
  return empty;
};

export const checkPasswords = (
  password1: string,
  password2: string,
  passwordIsDifferent: HTMLLabelElement
): boolean => {
  if (password1 == password2) {
    passwordIsDifferent.style.display = "none";
    return true;
  }
  passwordIsDifferent.style.display = "block";
  return false;
};

export const checkUserName = async (
  username: string,
  usernameExists: HTMLLabelElement
): Promise<boolean> => {
  let usernameValid = false;
  if (username.length > 0) {
    await axios
      .get(`${url}/auth/users/${username}`)
      .then((res: AxiosResponse) => {
        if (res.data.length > 0) {
          usernameExists.style.display = "block";
        } else {
          usernameExists.style.display = "none";
          usernameValid = true;
        }
      })
      .catch((err: AxiosError) => {
        console.error(err);
      });
  }
  return usernameValid;
};

export const checkEmail = async (
  email: string,
  emailExists: HTMLLabelElement
): Promise<boolean> => {
  let emailValid = false;
  if (email.length > 0) {
    await axios
      .get(`${url}/auth/users/email/${email}`)
      .then((res: AxiosResponse) => {
        if (res.data.length > 0) {
          emailExists.style.display = "block";
        } else {
          emailExists.style.display = "none";
          emailValid = true;
        }
      })
      .catch((err: AxiosError) => {
        console.error(err);
      });
  }
  return emailValid;
};

export const checkEmailValidity = (
  email: string,
  emailIncorrect: HTMLLabelElement
): boolean => {
  if (email.length > 0) {
    if (!email.includes("@") || !email.includes(".") || email.includes(" ")) {
      emailIncorrect.style.display = "block";
      return false;
    } else {
      emailIncorrect.style.display = "none";
      return true;
    }
  }
  emailIncorrect.style.display = "none";
  return false;
};

export const checkDate = (
  dateElement: HTMLInputElement,
  invalidLabel: HTMLLabelElement
): boolean => {
  const date = new Date(dateElement.value);
  const today = new Date();
  if (dateElement.value.length > 0) {
    if (today >= date) {
      invalidLabel.style.display = "none";
      return true;
    } else {
      invalidLabel.style.display = "block";
      return false;
    }
  }
  invalidLabel.style.display = "none";
  return false;
};

export const checkInputBox = (inputBoxId: string) => {
  const inputBoxValue = (
    document.getElementById(inputBoxId)! as HTMLInputElement
  ).value;
  const elementNotFound = document.getElementById(
    inputBoxId + "NotFound"
  )! as HTMLLabelElement;
  if (inputBoxValue.length > 0) {
    elementNotFound.style.display = "none";
  } else {
    elementNotFound.style.display = "block";
  }
};
