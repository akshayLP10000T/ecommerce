import { useDispatch, useSelector } from "react-redux";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { User } from "@/types/user";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { setUser } from "@/redux/userSlice";

const Profile = () => {
  //Get user data from redux store
  const { user } = useSelector((store: any) => store.user);

  //For dispatching the data to redux
  const dispatch = useDispatch();

  //getting data of user to show in inputs
  const [formData, setFormData] = useState<Partial<User>>({
    fullName: user.fullName,
    email: user.email,
    age: user.age,
    contactNumber: user.contactNumber,
    city: user.city,
    address: user.address,
    storeOwner: user.storeOwner,
    appliedForStore: user.appliedForStore,
  });

  // For loading to be seen by user
  const [loading, setLoading] = useState<boolean>(false);

  //Changes doing in form data on changing value by user
  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  //Updating User
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.put(
        "http://localhost:8080/api/v1/user/update",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //For applying the user to open a store
  const applyForStore = async () => {
    try {
      setLoading(true);

      const res = await axios.put(
        "http://localhost:8080/api/v1/user/store-apply",
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setFormData({...formData, appliedForStore: true});
        toast.success(res.data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative px-3 md:px-10">
      <div>
        <h2 className="text-3xl font-semibold">
          Edit your personal information
        </h2>
        <form className="space-y-2 mt-6" onSubmit={(e) => submitHandler(e)}>
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              placeholder="FullName"
              value={formData.fullName}
              name="fullName"
              type="name"
              onChange={(e) => valueChangeHandler(e)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              disabled
              placeholder="Email"
              value={formData.email}
              name="email"
              type="email"
              onChange={(e) => valueChangeHandler(e)}
            />
          </div>
          <div>
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              disabled
              placeholder="Contact Number"
              value={formData.contactNumber}
              name="contactNumber"
              type="number"
              onChange={(e) => valueChangeHandler(e)}
            />
          </div>
          <div>
            <Label htmlFor="age">age</Label>
            <Input
              placeholder="Age"
              value={formData.age}
              name="age"
              type="number"
              onChange={(e) => valueChangeHandler(e)}
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              placeholder="City"
              value={formData.city}
              name="city"
              type="city"
              onChange={(e) => valueChangeHandler(e)}
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              placeholder="Address"
              value={formData.address}
              name="address"
              type="address"
              onChange={(e) => valueChangeHandler(e)}
            />
          </div>
          {loading ? (
            <Button disabled className="text-white">
              <Loader2 className="animate-spin" /> Please Wait...
            </Button>
          ) : (
            <Button type="submit" className="text-white">
              Update
            </Button>
          )}
        </form>
      </div>
      <div className="mt-6">
        {formData.storeOwner ? (
          <h2 className="text-3xl font-semibold">Edit your store</h2>
        ) : (
          <>
            <h2 className="text-3xl font-semibold">Want to open your store?</h2>
            {formData.appliedForStore ? (
              <div className="mt-5">
                You already applied to open a store please wait while we are
                getting things ready for you
              </div>
            ) : !loading ? (
              <Button
                onClick={applyForStore}
                className="text-white w-full mt-5"
              >
                Apply For Store
              </Button>
            ) : (
              <Button className="text-white w-full mt-5" disabled>
                <Loader2 className="animate-spin" />
                Please Wait...
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
