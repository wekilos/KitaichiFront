import React, { useState, useEffect, createContext } from "react";
import { isLogin } from "../utils";
import { axiosInstance } from "../utils/axiosIntance";

export const Context = createContext();

const ContextProvider = (props) => {
  let localFav;
  let localPro;
  let localProFood;
  const favHarytlar = localStorage.getItem("FavHarytlar");
  const localProduct = localStorage.getItem("BasketProducts");
  const localProductFood = localStorage.getItem("BasketProductsFood");

  //-----------------------------------------------------------------
  const [is_logged, set_is_logged] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [favoriteProductsFood, setFavoriteProductsFood] = useState([]);
  //-----------------------------------------------------------------

  if (localProduct) {
    localPro = JSON.parse(localProduct);
  } else {
    localPro = [];
  }
  if (localProductFood) {
    localProFood = JSON.parse(localProductFood);
  } else {
    localProFood = [];
  }
  if (favHarytlar) {
    localFav = JSON.parse(favHarytlar);
  } else {
    localFav = [];
  }

  const [favorites, setFavorites] = useState(localFav);
  const [basket, setBasket] = useState(localPro);
  const [basketFood, setBasketFood] = useState(localProFood);

  const AddToFav = async (product) => {
    console.log("addtoo", product);
    let id = product.id;
    let barmy = false;
    favorites.map((haryt) => {
      if (haryt.id === product.id) {
        barmy = true;
      }
    });
    if (!barmy) {
      let harytlar = favorites;
      harytlar.push();
      setFavorites([...favorites, product]);
    } else {
      let harytlar = favorites.filter((haryt, i) => {
        return product.id !== haryt.id;
      });
      setFavorites(harytlar);
    }
  };

  const checkLogin = () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data?.id !== undefined) set_is_logged(true);
    else set_is_logged(false);
  };
  useEffect(() => {
    localStorage.setItem("FavHarytlar", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    checkLogin();
    getFavProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("BasketProducts", JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    localStorage.setItem("BasketProductsFood", JSON.stringify(basketFood));
  }, [basketFood]);

  let [dil, setDil] = useState("TM");
  useEffect(() => {
    let dilData = localStorage.getItem("OnlineDil");
    if (dilData) {
      setDil(JSON.parse(dilData));
    } else {
      setDil("TM");
    }
  }, []);

  const ChangeDil = (event) => {
    setDil(event);
    localStorage.setItem("OnlineDil", JSON.stringify(event));
  };

  const addPro = (pro) => {
    console.log(pro);
    let marketHave = false;
    let marketIndex = -1;
    let proHave = false;
    let proIndex = -1;
    let gobasket = [];
    let basketCopy = basket;
    if (basket.length > 0) {
      console.log("map bashlady:", basket);
      basket?.map((item, i) => {
        if (item.id == pro?.market.id) {
          console.log("market bar");
          marketHave = true;
          proHave = true;
          marketIndex = i;
          item.products?.map((item, index) => {
            if (item.pro.id == pro.id) {
              console.log("haryt bar:", item.pro.id);
              proHave = true;
              proIndex = index;
              let array = basket;
              incPro(pro.id);
              // array[marketIndex].products[index].quantity++;
              // setBasket([...array]);
            } else {
              proHave = false;
            }
          });
          let array = basket;
          marketHave &&
            !proHave &&
            array[i].products.push({
              quantity: 1,
              product_id: pro.id,
              pro: pro,
            });
          setBasket([...array]);
        } else {
        }
      });
      if (!marketHave && !proHave) {
        console.log("market yok : haryt bar:");
        let array = basket;
        let market = {
          id: pro.market.id,
          img: pro.market.img,
          name: pro.market.name,
          products: [{ quantity: 1, product_id: pro.id, pro: pro }],
        };
        array.push(market);
        setBasket([...array]);
      }

      // setBasket([...gobasket]);
    } else {
      console.log("market yok : haryt yok:");
      let array = [];
      let market = {
        id: pro.market.id,
        img: pro.market.img,
        name: pro.market.name,
        products: [{ quantity: 1, product_id: pro.id, pro: pro }],
      };
      array.push(market);
      setBasket([...array]);
    }

    console.log("gobasket", basket);
    // localStorage.setItem("BasketProducts", JSON.stringify(gobasket));
    // setBasket([...gobasket]);
  };
  const removePro = (proId) => {
    console.log(proId);
    let marketIndex;
    let proIndex;
    basket?.map((market, i) => {
      market?.products?.map((item, index) => {
        if (item.pro.id == proId) {
          proIndex = index;
          marketIndex = i;
          let array = basket;
          if (array[marketIndex].products.length == 1) {
            array.splice(marketIndex, 1);
          } else {
            array[marketIndex].products.splice(proIndex, 1);
          }
          setBasket([...array]);
        }
      });
    });
  };

  const incPro = (proId) => {
    console.log("inc", proId);
    let marketIndex;
    let proIndex;
    basket?.map((market, i) => {
      market?.products?.map((item, index) => {
        if (item.pro.id == proId) {
          console.log("pro inc id", item.pro.id, index);
          proIndex = index;
          marketIndex = i;

          console.log("proIndex", proIndex, "marketIndex", marketIndex);
          let array = basket;

          array[marketIndex].products[proIndex].quantity++;
          // array[marketIndex].products[proIndex].quantity + 1;
          setBasket([...array]);
        }
      });
    });
  };
  const decPro = (proId) => {
    let marketIndex;
    let proIndex;
    basket?.map((market, i) => {
      market?.products?.map((item, index) => {
        if (item.pro.id == proId) {
          proIndex = index;
          marketIndex = i;
          let array = basket;
          if (array[marketIndex].products[proIndex].quantity > 1) {
            array[marketIndex].products[proIndex].quantity--;
          } else {
            removePro(proId);
          }
          setBasket([...array]);
        }
      });
    });
  };

  const removeAll = () => {
    setBasket([]);
  };

  const addProFood = (pro) => {
    console.log(pro);
    let marketHave = false;
    let marketIndex = -1;
    let proHave = false;
    let proIndex = -1;
    let gobasket = [];
    let basketCopy = basketFood;
    if (basketFood.length > 0) {
      console.log("map bashlady:", basketFood);
      basketFood?.map((item, i) => {
        if (item.id == pro?.market.id) {
          console.log("market bar");
          marketHave = true;
          proHave = true;
          marketIndex = i;
          item.products?.map((item, index) => {
            if (item.pro.id == pro.id) {
              console.log("haryt bar:", item.pro.id);
              proHave = true;
              proIndex = index;
              let array = basketFood;
              incPro(pro.id);
              // array[marketIndex].products[index].quantity++;
              // setBasket([...array]);
            } else {
              proHave = false;
            }
          });
          let array = basketFood;
          marketHave &&
            !proHave &&
            array[i].products.push({
              quantity: 1,
              product_id: pro.id,
              pro: pro,
            });
          setBasketFood([...array]);
        } else {
        }
      });
      if (!marketHave && !proHave) {
        console.log("market yok : haryt bar:");
        let array = basketFood;
        let market = {
          id: pro.market.id,
          img: pro.market.img,
          name: pro.market.name,
          products: [{ quantity: 1, product_id: pro.id, pro: pro }],
        };
        array.push(market);
        setBasketFood([...array]);
      }

      // setBasket([...gobasket]);
    } else {
      console.log("market yok : haryt yok:");
      let array = [];
      let market = {
        id: pro.market.id,
        img: pro.market.img,
        name: pro.market.name,
        products: [{ quantity: 1, product_id: pro.id, pro: pro }],
      };
      array.push(market);
      setBasketFood([...array]);
    }

    console.log("gobasket", basketFood);
    // localStorage.setItem("BasketProducts", JSON.stringify(gobasket));
    // setBasket([...gobasket]);
  };
  const removeProFood = (proId) => {
    console.log(proId);
    let marketIndex;
    let proIndex;
    basketFood?.map((market, i) => {
      market?.products?.map((item, index) => {
        if (item.pro.id == proId) {
          proIndex = index;
          marketIndex = i;
          let array = basketFood;
          if (array[marketIndex].products.length == 1) {
            array.splice(marketIndex, 1);
          } else {
            array[marketIndex].products.splice(proIndex, 1);
          }
          setBasketFood([...array]);
        }
      });
    });
  };

  const incProFood = (proId) => {
    console.log("inc", proId);
    let marketIndex;
    let proIndex;
    basketFood?.map((market, i) => {
      market?.products?.map((item, index) => {
        if (item.pro.id == proId) {
          console.log("pro inc id", item.pro.id, index);
          proIndex = index;
          marketIndex = i;

          console.log("proIndex", proIndex, "marketIndex", marketIndex);
          let array = basketFood;

          array[marketIndex].products[proIndex].quantity++;
          // array[marketIndex].products[proIndex].quantity + 1;
          setBasketFood([...array]);
        }
      });
    });
  };
  const decProFood = (proId) => {
    let marketIndex;
    let proIndex;
    basketFood?.map((market, i) => {
      market?.products?.map((item, index) => {
        if (item.product_id == proId) {
          proIndex = index;
          marketIndex = i;
          let array = basketFood;
          if (array[marketIndex].products[proIndex].quantity > 1) {
            array[marketIndex].products[proIndex].quantity--;
          } else {
            removeProFood(proId);
          }
          setBasketFood([...array]);
        }
      });
    });
  };

  const removeAllFood = () => {
    setBasketFood([]);
  };

  //---------------------------------------------------------------------------------------------
  const logout = () => {
    localStorage.removeItem("FavHarytlar");
    localStorage.removeItem("BasketProducts");
    localStorage.removeItem("OnlineDil");
    localStorage.removeItem("userData");
    checkLogin();
  };
  const getFavProducts = () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data?.id !== undefined) {
      axiosInstance
        .get("/api/grocery_favourite_products", {
          params: {
            lang: dil,
            user_id: data.id,
          },
        })
        .then((data) => {
          console.log(data);
          setFavoriteProducts(data.data.body);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getFavProductsFood = () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data?.id !== undefined) {
      axiosInstance
        .get("/api/food_favourite_meals", {
          params: {
            lang: dil,
            user_id: data.id,
          },
        })
        .then((data) => {
          console.log(data);
          setFavoriteProductsFood(data.data.body);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const is_liked = (id) => {
    if (favoriteProducts?.length > 0) {
      for (let product of favoriteProducts) {
        if (id === product.id) {
          return true;
        }
      }
      return false;
    }
  };
  //---------------------------------------------------------------------------------------------

  return (
    <Context.Provider
      value={{
        is_logged,
        favoriteProducts,
        favoriteProductsFood,
        checkLogin,
        logout,
        is_liked,
        getFavProducts,
        getFavProductsFood,

        dil,
        favorites,
        ChangeDil,
        AddToFav,
        addPro,
        removePro,
        incPro,
        decPro,
        addProFood,
        removeProFood,
        incProFood,
        decProFood,
        basket,
        basketFood,
        removeAll,
        removeAllFood,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
