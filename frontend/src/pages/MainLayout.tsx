import Navbar from "@/components/MainLayout/Navbar"
import { setUser } from "@/redux/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom"
import { toast } from "sonner";

const Main = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(()=>{
    try {

      const getUserData = async ()=>{
        const res = await axios.get("http://localhost:8080/api/v1/user/getUserData", {
          withCredentials: true,
        });

        if(res.data.success){
          dispatch(setUser(res.data.user));
        }
      }

      getUserData();
      
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }, [location]);
  
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Main