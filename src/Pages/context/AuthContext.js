import axios from "axios";
import { useEffect, useState, createContext } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  contextData: {
    user: null,
    loginUser: () => {},
    logOutUser: () => {},
    authTokens: null,
  },
});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const authTokensString = localStorage.getItem("authTokens");
  const savedAuthTokens = authTokensString ? JSON.parse(authTokensString) : null;
  const savedUsers = authTokensString ? jwtDecode(authTokensString) : null;
  const [authTokens, setAuthTokens] = useState(savedAuthTokens);
  const [user, setUser] = useState(savedUsers);
  const [id , setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();



  const loginUser = (data) => {
    axios
      .post("http://127.0.0.1:8000/user/token", data)
      .then((response) => {
        if (response.status === 200) {
          setAuthTokens(response.data);
          setUser(jwtDecode(response.data.access));
          console.log("success");
          console.log(authTokens);
          localStorage.setItem("authTokens", JSON.stringify(response.data));
        } else {
          console.log("error");
        }
      })
      .catch((error) => {
        // Handle login error
        console.error("Login failed:", error);
      });
  };

  const logOutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    Navigate("/");
  };

  const updateToken = async () => {
    axios
      .post("http://127.0.0.1:8000/user/token/refresh", { refresh: authTokens?.refresh })
      .then((response) => {
        if (response.status === 200) {
          setAuthTokens(response.data);
          setUser(jwtDecode(response.data.access));
          localStorage.setItem("authTokens", JSON.stringify(response.data));
        } else {
          logOutUser();
          console.error("error", response.status);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  useEffect(() => {
    // Function to handle navigation based on user type
    const handleNavigation = () => {
      if (user && user.usertype === 'planter') {
        Navigate("/planterdashboard");
      } else if (user && user.usertype === 'collector') {
        Navigate("/collectordashboard");
      } else {
        Navigate("/");
      }
    };

    // Call the navigation function whenever the user state changes
    if (user) {
      handleNavigation();
    }
  }, [user]);
  
  useEffect(() => {
    const fourMinutes = 4 * 60 * 1000;
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);

    return () => clearInterval(interval);
  }, [authTokens, loading]);

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logOutUser: logOutUser,
    id: id,
  };

  return (
    <AuthContext.Provider value={{ contextData }}>
      {children}
    </AuthContext.Provider>
  );
};
