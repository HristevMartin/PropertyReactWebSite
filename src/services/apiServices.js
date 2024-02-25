async function fetchWithToken(
  url,
  accessToken,
  refreshTokenFunction,
  logoutFunction,
  options = {},
  method
) {
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  if (method) {
    options.method = method;
  }

  let response = await fetch(url, options);

  if (response.status === 401) {
    const newAccessToken = await refreshTokenFunction();
    console.log("newAccessToken", newAccessToken);
    if (newAccessToken) {
      options.headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(url, options);
    } else {
      // logoutFunction();
    }
  }

  return response;
}

export default fetchWithToken;
