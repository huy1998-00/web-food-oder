export const alertSucess = (message) => {
  return {
    type: "SET_SUCCESS",
    alert: {
      type: "succes",
      message: message,
    },
  };
};
export const alertDanger = (message) => {
  return {
    type: "SET_DANGER",
    alert: {
      type: "danger",
      message: message,
    },
  };
};
export const alertInfor = (message) => {
  return {
    type: "SET_INFO",
    alert: {
      type: "info ",
      message: message,
    },
  };
};
export const alertWarning = (message) => {
  return {
    type: "SET_WARNING",
    alert: {
      type: "warning",
      message: message,
    },
  };
};

export const alertNull = (message) => {
  return {
    type: "SET_ALERT_NULL",
    alert: {
      type: "null",
      message: message,
    },
  };
};
