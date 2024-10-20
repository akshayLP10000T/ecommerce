import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import { LoginFormType } from "./types";
import { toast } from "sonner";
import { Loader2, Mail, PenBoxIcon } from "lucide-react";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  //Form data usestate
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false); //Loading to show the user on API implementation

  const navigate = useNavigate(); //Navigator to different pages

  const dispatch = useDispatch(); // For dispatching the data into redux store

  //Form value change handler
  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //Preventing page to reload

    if (formData.email.trim() === "" || formData.password.trim() === "") {
      //Checking data coming from form
      toast.error("Fill all fields");
    } else {
      //For API implementation

      try {
        setLoading(true); //Setting loading true on API calling

        const res = await axios.post(
          "http://localhost:8080/api/v1/user/login",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setUser(res.data.user)); // Dispatching the user into redux store
          toast.success(res.data.message); // Showing toast to tell user
          navigate("/", {
            // Navigating to home page
            replace: true,
          });
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false); //Setting loading false whether code works or come error
      }
    }
  };

  return (
    <div className="bg-background flex items-center justify-center w-full h-screen">
      <Card className="relative max-w-[70vw] lg:max-w-[50vw] h-fit flex overflow-hidden flex-col shadow-sm hover:shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-bold uppercase text-3xl">Login</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt,
            consequatur labore consequuntur minima quae commodi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Login form */}
          <form className="space-y-2" onSubmit={(e) => formSubmitHandler(e)}>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => valueChangeHandler(e)}
                  placeholder="Enter your Email"
                  className="pl-10"
                />
                <Mail className="text-gray-600 dark:text-gray-400 absolute top-1/2 -translate-y-1/2 left-0 ml-2" />
              </div>
            </div>
            <div>
                <Label htmlFor="email">Password</Label>
              <div className="relative">
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => valueChangeHandler(e)}
                  placeholder="Enter your Password"
                  className="pl-10"
                />
              <PenBoxIcon className="text-gray-600 dark:text-gray-400 absolute top-1/2 -translate-y-1/2 left-0 ml-2" />
              </div>
            </div>
            <div>
              {loading ? (
                <Button disabled className="text-white bg-primary mt-3 w-full">
                  <Loader2 className="animate-spin" /> Please Wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="text-white bg-primary mt-3 w-full"
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="-mt-5 w-full">
          <p className="text-end w-full">
            Not a user?{" "}
            <Link
              to={"/register"}
              replace
              className="text-primary hover:underline"
            >
              SignUp
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
