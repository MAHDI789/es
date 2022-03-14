import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../contextApi/contextapi";
import Link from "next/dist/client/link";
import { FiLogIn } from "react-icons/fi";
import { IoMdPersonAdd } from "react-icons/io";
import { BsCartPlusFill } from "react-icons/bs";

function Navbar() {
  const { count } = useGlobalContext();
  const [numberCart, setNumber] = useState([]);
  useEffect(() => {
    setNumber(count.length);
  }, [count]);
  return (
    <div className="shadow-lg bg-white">
      <div className="navbar py-4 flex justify-between container">
        <h1 className="text-3xl font-bold">
          <Link href={"/"}>
            <a>ELMEHDI SHOP</a>
          </Link>
        </h1>
        <nav className="mx-auto">
          <ul className="flex gap-8 text-xl">
            <li>
              <Link href="#home">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="#product">
                <a>Product</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="All-btn flex gap-6">
          <button className="border-2 border-black px-4 py-1 rounded flex items-center gap-2">
            <FiLogIn className="" />
            <span>Login</span>
          </button>
          <button className="border-2 border-black px-4 py-1 rounded flex items-center gap-2">
            <IoMdPersonAdd />
            <span>Register</span>
          </button>
          <button className="border-2 border-black px-4 py-1 rounded flex items-center gap-2">
            <BsCartPlusFill />
            <span>
              <Link href={"/cart"}>
                <a>Cart ({numberCart})</a>
              </Link>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
