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
import { Link } from "react-router-dom";
import { LoginFormType } from "./types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Login = () => {
  //Form data usestate
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false); //Loading to show the user on API implementation

  //Form value change handler
  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //Preventing page to reload

    if (formData.email.trim() === "" || formData.password.trim() === "") {
      //Checking data coming from form
      toast.error("Fill all fields");
    } else {
      //For API implementation

      try {

        setLoading(true); //Setting loading true on API calling

      } catch (error) {

        console.log(error);

      }
      finally{
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
              {loading ? (
                <Button
                  disabled
                  className="text-white bg-primary mt-3 w-full"
                >
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
            <Link to={"/register"} replace className="text-primary hover:underline">
              SignUp
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;