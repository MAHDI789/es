import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobalContext } from "../contextApi/contextapi";
import useSWR from "swr";

function Products() {
  const { AddToCart } = useGlobalContext();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("https://fakestoreapi.com/products", fetcher);
  const [catg, setCatg] = useState([]);
  const [ListProducts, setProducts] = useState([] || data);

  useEffect(() => {
    const dt = data || [];
    if (dt.length) {
      const catg = [
        ...new Set([
          "All",
          ...dt.map((item) => {
            return item.category;
          }),
        ]),
      ];

      setCatg(catg);
      setProducts(data);
    }
  }, [data]);

  const FilteCatg = (e) => {
    const newProduct = data.filter((product) => {
      return product.category == e.target.textContent;
    });
    if (newProduct.length == 0) {
      setProducts(data);
    } else {
      setProducts(newProduct);
    }
  };

  if (!data) {
    return <h1 className="text-4xl text-center mt-6">Loding...</h1>;
  }
  return (
    <div className="container" id="product">
      <h2 className="text-center text-3xl mt-10 font-bold pb-4">
        Latset Products
      </h2>
      <hr className="border-black-400" />
      <nav className="mt-14">
        <ul className="flex gap-10 justify-center">
          {catg.map((item, index) => {
            return (
              <li
                key={index}
                className="rounded border-2 border-black px-2 py-1 cursor-pointer"
                onClick={FilteCatg}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="products mt-14 grid grid-cols-4 gap-10">
        {ListProducts.map((singleItem) => {
          const { id, image, title, price } = singleItem;
          return (
            <div
              key={id}
              className="bg-white shadow-lg rounded"
              style={{ height: "400px" }}
            >
              <img
                src={image}
                alt={title}
                className="mx-auto"
                style={{ height: "65%" }}
              />
              <div className="info text-center p-6">
                <p className="mb-1">{title.split(" ").slice(0, 2).join(" ")}</p>
                <p className="font-bold mb-4">${price}</p>
                <Link
                  href={{
                    pathname: "/product/[slug]",
                    query: { slug: id },
                  }}
                >
                  <button className="rounded border-2 border-black p-2">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
