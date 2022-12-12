import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Logout = ({ redirect }) => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logOut();

    if (redirect) 
      navigate(redirect);
    
  }, []);

  return null;
};

export default Logout;
