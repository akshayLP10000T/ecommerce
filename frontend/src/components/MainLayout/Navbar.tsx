import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ShoppingBagIcon } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="relative shadow-sm hover:shadow-lg w-full h-fit flex justify-between items-center transition-shadow duration-300 py-7 px-9">
      <div>
        <h2 className="uppercase font-bold text-3xl">
          Store For <span className="text-primary">Hell</span>
        </h2>
      </div>
      <div className="flex gap-5 text-lg items-center">
        <Link to={"/search/:id"} className="hover:text-primary">
          Search
        </Link>
        <Link to={"/profile"} className="hover:text-primary">
          Profile
        </Link>
        <Link to={"/orders"} className="hover:text-primary">
          My Orders
        </Link>
        <Popover>
          <PopoverTrigger className="border-2 border-gray-400 dark:border-gray-600 px-3 py-1 rounded-md">
            dashboard
          </PopoverTrigger>
          <PopoverContent className="flex flex-col">
            <Link
              to={"/admin/orders"}
              className="hover:bg-gray-200 px-1 py-2 rounded-md"
            >
              Orders
            </Link>
            <Link
              to={"/admin/store"}
              className="hover:bg-gray-200 px-1 py-2 rounded-md"
            >
              Store
            </Link>
            <Link
              to={"/admin/items"}
              className="hover:bg-gray-200 px-1 py-2 rounded-md"
            >
              Items
            </Link>
          </PopoverContent>
        </Popover>
        <Link
          to={"/cart"}
          className="hover:text-primary flex items-center flex-col"
        >
          <ShoppingBagIcon /> Cart
        </Link>

        <Button className="text-white">Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
