import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Search, ShoppingCart, StoreIcon, User2 } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store: any) => store.user);

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
        <div className="flex gap-3">
          {user.storeOwner && (
            <Link
              to={"/admin/store"}
              className="flex gap-1 hover:text-gray-700 dark:text-gray-300"
            >
              <StoreIcon />
              My Store
            </Link>
          )}
          <Link
            to={"/cart"}
            className="flex gap-1 hover:text-gray-700 dark:text-gray-300"
          >
            <ShoppingCart />
            <p>Cart</p>
          </Link>
          <Link
            to={"/profile"}
            className="flex gap-1 hover:text-gray-700 dark:text-gray-300"
          >
            <User2 />
            <p>{user.fullName}</p>
          </Link>
        </div>
      </div>
      <Separator className="mt-2" />
    </nav>
  );
};

export default Navbar;
