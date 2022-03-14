import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { useGlobalContext } from "../../contextApi/contextapi";
import useSWR from "swr";
import { AiFillStar } from "react-icons/ai";

function ProductId() {
  const router = useRouter();
  const [product, setProduct] = useState();
  const { count, AddToCart, active, setActive } = useGlobalContext();

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    `https://fakestoreapi.com/products/${router.query.productId}`,
    fetcher
  );
  useEffect(() => {
    const cn = setInterval(() => {
      setActive(false);
    }, 3000);
    return () => clearInterval(cn);
  }, []);
  useEffect(() => {
    setProduct(data);
  }, [data]);
  if (!product) {
    return (
      <>
        <Navbar />
        <h1 className="text-4xl text-center mt-6">Loding...</h1>
      </>
    );
  }
  return (
    <div>
      <Navbar />
      {active && (
        <h1 className="text-4xl text-center mt-6">This Is Product Is Added</h1>
      )}
      <div className="container pt-16 grid grid-cols-2 gap-2">
        <div className="p-6 shadow-xl	mx-auto">
          <img
            src={product.image}
            alt={product.title}
            style={{ height: "400px" }}
          />
        </div>
        <div>
          <span className="text-2xl text-slate-500 uppercase mb-2 inline-block">
            {product.category}
          </span>
          <h1
            className="text-3xl mb-2 font-normal leading-relaxed
"
          >
            {product.title}
          </h1>
          <p className="font-bold text-md flex items-center mb-6">
            Rating {product.rating.rate}
            <AiFillStar />
          </p>
          <p className="price font-bold text-4xl mb-4">${product.price}</p>

          <button
            className="rounded border-2 mr-4 border-black p-2 inline-block"
            onClick={() => AddToCart(product.id, product, "first")}
          >
            Add to Cart
          </button>

          <button className="rounded border-2 bg-black text-white border-black p-2 inline-block">
            <Link href={"/cart"}>
              <a>Go To Cart</a>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductId;
