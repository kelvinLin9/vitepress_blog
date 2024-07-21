import axios from 'axios';
import { Toast } from "../mixins/sweetAlert"

const handleImg = (val) => {
  const imgUrl = new URL(`../assets/images/${val}`, import.meta.url);
  return imgUrl;
}
const copyText = async (msg) => {
  if (!msg) {
    return;
  }
  try {
    await navigator.clipboard.writeText(msg);
    Toast.fire({
      title: 'Copied!',
      icon: 'success',
    })
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

// error handling
const showErrorToast = (message, code) => {
  Toast.fire({
    title: message || 'An unknown error occurred',
    Text: code || '',
    icon: 'error',
  });
};
const withAsyncErrorHandling = (targetFunction, finallyCallback) => {
  return async (...args) => {
    try {
      return await targetFunction(...args);
    } catch (error) {
      console.error('Error occurred:', error);
      showErrorToast(error);
      return false;
    } finally {
      if (finallyCallback) {
        finallyCallback();
      }
    }
  };
}

// web API




export default {
  handleImg,
  copyText,

  showErrorToast,
  withAsyncErrorHandling,
}
