import Cookies from "universal-cookie";


const setToken = (token) => {
    const cookies = new Cookies();
    cookies.set("accessToken", token);
  };
  
  const getToken = () => {
    const cookies = new Cookies();
    return cookies.get("accessToken");
  };
  
  const removeToken = () => {
    const cookies = new Cookies();
    return cookies.remove("accessToken");
  };

export {
    setToken,
    getToken,
    removeToken
}