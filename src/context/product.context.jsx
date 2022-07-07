import { createContext, useState, useEffect } from 'react';
import PRODUCTS from '../components/shop/shop-data.json';

// Actual value you want to access
export const ProductsContext = createContext({
  products: [],
  setProducts: () => null,
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const response = await fetch('./shop-data.json');
  //     const data = await response.json();
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
