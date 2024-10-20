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
import { Loader2, Mail, PenBoxIcon, PersonStandingIcon, PhoneCall, User2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { RegisterFormType } from "./types";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  //Form data usestate
  const [formData, setFormData] = useState<RegisterFormType>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: 0,
    contactNumber: 0,
  });

  const [loading, setLoading] = useState<boolean>(false); //Loading to show the user on API implementation

  const navigate = useNavigate(); // Navigator to navigate from one page to different

  //Form value change handler
  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //Preventing page to reload

    if (
      formData.fullName.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.confirmPassword.trim() === "" ||
      formData.age === 0 ||
      formData.contactNumber === 0
    ) {
      //Checking data coming from form
      toast.error("Fill all fields");
    } else if (formData.password.trim() !== formData.confirmPassword.trim()) {
      toast.error("Both password doesn't match");
    } else if (formData.age < 0 || formData.contactNumber < 0) {
      toast.error("Age or contact number cannot be negative");
    } else {
      //For API implementation
      try {
        setLoading(true); //Setting loading true on API calling
        const res = await axios.post(
          "http://localhost:8080/api/v1/user/register",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          toast.success(res.data.message + " Please login to continue...");
          navigate("/login", {
            replace: true,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); //Setting loading false whether code works or come error
      }
    }
  };
  return (
    <div className="bg-background flex items-center justify-center w-full h-screen">
      <Card className="relative max-w-[70vw] lg:max-w-[50vw] h-fit flex overflow-hidden flex-col shadow-sm hover:shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-bold uppercase text-3xl">
            Register
          </CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt,
            consequatur labore consequuntur minima quae commodi Lorem ipsum
            dolor sit amet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Register form */}
          <form className="space-y-1" onSubmit={(e) => formSubmitHandler(e)}>
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <Input
                  type="name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => valueChangeHandler(e)}
                  placeholder="Your FullName"
                  className="pl-10"
                />
                <PersonStandingIcon className="text-gray-600 dark:text-gray-400 absolute top-1/2 -translate-y-1/2 left-0 ml-2" />
              </div>
            </div>
            <div className="relative">
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
              <Label htmlFor="password">Password</Label>
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
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => valueChangeHandler(e)}
                  placeholder="Confirm Password"
                  className="pl-10"
                />
                <PenBoxIcon className="text-gray-600 dark:text-gray-400 absolute top-1/2 -translate-y-1/2 left-0 ml-2" />
              </div>
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <div className="relative">
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={(e) => valueChangeHandler(e)}
                  placeholder="Your age"
                  className="pl-10"
                />
                <User2 className="text-gray-600 dark:text-gray-400 absolute top-1/2 -translate-y-1/2 left-0 ml-2" />
              </div>
            </div>
            <div>
              <Label htmlFor="contactNumber">Contact Number</Label>
              <div className="relative">
                <Input
                  type="number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) => valueChangeHandler(e)}
                  placeholder="Confirm Password"
                  className="pl-10"
                />
                <PhoneCall className="text-gray-600 dark:text-gray-400 absolute top-1/2 -translate-y-1/2 left-0 ml-2" />
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
            Already a user?{" "}
            <Link
              to={"/login"}
              replace
              className="text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
