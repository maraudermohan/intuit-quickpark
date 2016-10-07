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
export const googleScriptLoaded = (bool) => {
  return {
    type: 'GOOGLE_SCRIPT',
    bool
  };
}

export const googleMapLoaded = (bool) => {
  return {
    type: 'GOOGLE_MAP',
    bool
  };
}

export const desiredSpot = (content) => {
  return {
    type: 'DESIRED_SPOT',
    content
  };
}

export const log_out = () => {
  return {
    type: 'LOG_OUT'
  };
}

