import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { AiFillPlusCircle, AiFillMinusSquare } from "react-icons/ai";
import { useGlobalContext } from "../contextApi/contextapi";

const URL = "https://fakestoreapi.com/products";

function Cart() {
  const [cartItem, setCartItem] = useState([]);
  const { count, AddToCart, setcount } = useGlobalContext();

  const remove = (id) => {
    const items = JSON.parse(localStorage.getItem("item"));
    const newItems = items.filter((item) => {
      return item.id != id;
    });
    setcount(newItems);
  };

  useEffect(() => {
    setCartItem(count);
    console.log("upadte");
  }, [count]);
  if (cartItem.length == 0) {
    return (
      <>
        <Navbar />
        <h1 className="text-4xl text-center mt-6">Your Cart Item is Empty</h1>
      </>
    );
  }
  return (
    <>
      <Navbar />
      {cartItem.map((item) => {
        return (
          <>
            <div key={item.id} className="singleItem mt-6 bg-slate-200 mb-4">
              <div className="container p-6 h-full grid grid-cols-2 gap-8">
                <div className="bg-black mx-auto">
                  <img
                    src={item.item.image}
                    alt={item.item.title}
                    style={{ height: "400px" }}
                  />
                </div>
                <div className="flex flex-cols place-items-center">
                  <div>
                    <p className="text-2xl font-bold pb-2">{item.item.title}</p>
                    <span className="text-xl font-medium">
                      {item.counter} * ${item.item.price} =$
                      {item.counter * item.item.price}
                    </span>
                    <br />
                    {item.counter < 1 && remove(item.id)}
                    <div className="flex gap-4 text-3xl mt-4">
                      <button onClick={() => AddToCart(item.id, item, "add")}>
                        <AiFillPlusCircle />
                      </button>
                      <button>
                        <AiFillMinusSquare
                          onClick={() => AddToCart(item.id, item, "minus")}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Cart;
