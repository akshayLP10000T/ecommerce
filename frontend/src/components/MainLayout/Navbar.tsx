import { Link, useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Search, ShoppingCart, StoreIcon, User2, UserCircle2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar = () => {
  const { user } = useSelector((store: any) => store.user); // Getting user data from redux store
  const navigate = useNavigate(); // Navigator to send user to different page
  const dispatch = useDispatch(); // To change data in redux

  //To logout the user
  const logoutHandler = async () => {
    const res = await axios.get("http://localhost:8080/api/v1/user/logout", {
      withCredentials: true,
    });

    if (res.data.success) { 
      dispatch(setUser(null));
      navigate("/login", {
        replace: true,
      });
      toast.success(res.data.message);
    }
  };

  return (
    <nav className="w-full h-full py-3 px-9">
      <div className="flex items-center justify-between gap-5">
        <div className="uppercase text-2xl font-extrabold">
          <Link to={"/"}>
            Buy For <span className="text-primary">Hell</span>
          </Link>
        </div>
        <Link
          to={"/search"}
          className="flex flex-1 items-center px-4 py-2 rounded-md gap-3 hover:bg-zinc-200 transition-colors duration-300"
        >
          <Search />
          <div className="border-0 bg-transparent">Search For Products</div>
        </Link>
        <div className="flex gap-3 items-center">
        {!user?.admin && (
            <>
              <UserCircle2 className="-mr-2" />
              <DropdownMenu>
                <DropdownMenuTrigger>Admin Dashboard</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Select</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer focus:bg-gray-200 dark:focus:bg-gray-700">
                    <Link to={"/admin/store-request"}>Store request</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer focus:bg-gray-200 dark:focus:bg-gray-700">
                    <Link to={"/admin/stores"}>Stores</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer focus:bg-gray-200 dark:focus:bg-gray-700">
                    <Link to={"/admin/users"}>Users</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          {user?.storeOwner && (
            <>
              <StoreIcon className="-mr-2" />
              <DropdownMenu>
                <DropdownMenuTrigger>Dashboard</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Select</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer focus:bg-gray-200 dark:focus:bg-gray-700">
                    <Link to={"/store-owner/store/"}>My Store</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer focus:bg-gray-200 dark:focus:bg-gray-700">
                    <Link to={"/store-owner/items/"}>Items</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer focus:bg-gray-200 dark:focus:bg-gray-700">
                    <Link to={"/store-owner/orders/"}>My Orders</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          <Link
            to={"/cart"}
            className="flex gap-1 hover:text-gray-700 dark:text-gray-300"
          >
            <ShoppingCart />
            <p>Cart</p>
          </Link>
          {user ? (
            <Link
              to={"/profile"}
              className="flex gap-1 hover:text-gray-700 dark:text-gray-300"
            >
              <User2 />
              <p>{user?.fullName}</p>
            </Link>
          ) : (
            <Link
              to={"/login"}
              className="flex gap-1 hover:text-gray-700 dark:text-gray-300"
            >
              <User2 />
              <p>Login</p>
            </Link>
          )}

          <Button onClick={logoutHandler} className="text-white">
            Logout
          </Button>
        </div>
      </div>
      <Separator className="mt-2" />
    </nav>
  );
};

export default Navbar;
