import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    var st = JSON.parse(localStorage.getItem("item")) || [];
  }

  const [count, setcount] = useState(st);
  const [active, setActive] = useState(false);

  const AddToCart = (id, item, text) => {
    if (count.length == 0) {
      setcount([...count, { id, counter: 1, item, active: false }]);
    }
    let newData = count.filter((item) => {
      return item.id == id;
    });

    if (newData.length == 0) {
      setcount([...count, { id, counter: 1, item, active: true }]);
    } else {
      let newAA = count.map((item) => {
        if (item.id == id) {
          let nu = item.counter || 0;
          setActive(item.active);
          if (text == "first") {
            return { ...item, counter: nu, active: true };
          } else if (text == "add") {
            return { ...item, counter: nu + 1, active: true };
          } else {
            return { ...item, counter: nu - 1, active: true };
          }
        }
        return item;
      });
      setcount(newAA);
    }
  };
  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(count));
  }, [count]);

  return (
    <AppContext.Provider
      value={{ count, AddToCart, setcount, active, setActive }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider, useGlobalContext };

/**
 * else {
        let addCounter = count.map((item) => {
          if (item.id == id) {
            setnumber(number + 1);

            return { ...item, counter: number };
          }
          return item;
        });
        setcount(addCounter);
      }
 */
