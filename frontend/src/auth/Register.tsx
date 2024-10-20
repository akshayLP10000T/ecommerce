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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { RegisterFormType } from "./types";
import { Link } from "react-router-dom";

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

  //Form value change handler
  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
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
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); //Setting loadin false whether code works or come error
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
              <Label htmlFor="email">Email</Label>
              <Input
                type="name"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => valueChangeHandler(e)}
                placeholder="Your FullName"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => valueChangeHandler(e)}
                placeholder="Enter your Email"
              />
            </div>
            <div>
              <Label htmlFor="email">Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => valueChangeHandler(e)}
                placeholder="Enter your Password"
              />
            </div>
            <div>
              <Label htmlFor="email">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => valueChangeHandler(e)}
                placeholder="Confirm Password"
              />
            </div>
            <div>
              <Label htmlFor="email">Age</Label>
              <Input
                type="number"
                name="age"
                value={formData.age}
                onChange={(e) => valueChangeHandler(e)}
                placeholder="Your age"
              />
            </div>
            <div>
              <Label htmlFor="email">Contact Number</Label>
              <Input
                type="number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => valueChangeHandler(e)}
                placeholder="Confirm Password"
              />
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
            <Link to={"/login"} replace className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
