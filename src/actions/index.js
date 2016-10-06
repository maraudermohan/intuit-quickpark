export const login_user = (username,isAccessible, parkedSpot) => {
  return {
    type: 'LOGIN_USER',
    username,isAccessible, parkedSpot
  };
}
export const updateloc = (content) => {
  return {
    type: 'UPDATE_LOCATION',
    content
  };
}

export const log_out = () => {
  return {
    type: 'LOG_OUT'
  };
}

