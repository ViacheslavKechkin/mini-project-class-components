import React, { Component } from "react";

import { ToastContainer } from "react-toastify";

import Footer from "./components/Footer/index.jsx";
import Search from "./components/Search/index.tsx";
import Products from "./components/Products/index.tsx";
import DeleteProductNotification from "./components/DeleteProductNotification/index.jsx";

import showError from "./utils/index.jsx";

import productData from "./const/products.json";

import IProduct from "../src/types/types"

import "./App.scss";

interface StateApp {
  products: IProduct[],
  cartSum: number,
  searchString: string,
  isOpenDeleteWindow: boolean,
  selectedProduct: {},
}


class App extends Component<{}, StateApp> {
  state = {
    products: productData,
    cartSum: 0,
    searchString: "",
    isOpenDeleteWindow: false,
    selectedProduct: {},
  };

  handleChangeNotification = (isOpen: boolean, product?: IProduct): void => {
    if (isOpen && product) {
      this.setState({
        isOpenDeleteWindow: isOpen,
        selectedProduct: product,
      });
    }
    if (isOpen && !product) {
      this.setState({
        isOpenDeleteWindow: isOpen
      });
    }
  };

  handleChangeQuantity = ({ product, add }: any): void => {
    const { id, title, price, quantity, count } = product;

    if (!count) {
      this.handleAddProduct(product);
    } else {
      const newProducts = [...this.state.products];

      const productIndex = this.state.products.findIndex((el: IProduct) => el.id === id);

      if (quantity && count && !add) {
        newProducts.splice(productIndex, 1, {
          id,
          title,
          price,
          quantity: quantity - 1,
          count: count + 1,
        });

        this.setState(({ cartSum }) => ({
          cartSum: cartSum + price,
        }));
      }
      if (count && add) {
        newProducts.splice(productIndex, 1, {
          id,
          title,
          price,
          quantity: quantity + 1,
          count: count - 1,
        });

        this.setState(({ cartSum }) => ({ cartSum: cartSum - price }));
      }
      this.setState({ products: newProducts });
    }
  };

  handleAddProduct = (product: IProduct): void => {
    const { price, quantity, count, id, title } = product;

    const newProducts = [...this.state.products];

    const productIndex = this.state.products.findIndex((el: IProduct) => el.id === id);

    newProducts.splice(productIndex, 1, {
      id,
      title,
      price,
      quantity: quantity - 1,
      count: count + 1,
    });

    this.setState(({ cartSum }) => ({
      cartSum: cartSum + price,
      products: newProducts,
    }));
  };

  handleDeleteProduct = (selectedProduct: IProduct): void => {
    this.handleChangeNotification(!this.state.isOpenDeleteWindow);

    const newProducts = [...this.state.products];

    if (selectedProduct.count >= 1) {
      const product = productData.find(
        (item: IProduct) => item.id === selectedProduct.id
      );

      if (product) {
        const { quantity, count, id, title, price } = product;

        const productIndex = this.state.products.findIndex(
          (el: IProduct) => el.id === id
        );

        productIndex >= 0
          ? newProducts.splice(productIndex, 1, {
            id,
            title,
            price,
            quantity,
            count,
          })
          : showError("Продукт не найден !");

        this.setState(({ cartSum }) => ({
          products: newProducts,
          cartSum: cartSum - selectedProduct.count * selectedProduct.price,
        }));
      } else {
        showError("Продукт не найден !");
      }
    }
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void =>
    this.setState({ searchString: event.target.value });

  render() {
    return (
      <>
        <Search
          searchString={this.state.searchString}
          onSearchChange={this.handleSearchChange}
          cartSum={this.state.cartSum}
        />
        <Products
          onChangeNotification={this.handleChangeNotification}
          products={this.state.products}
          onChangeQuantity={this.handleChangeQuantity}
          onAddProduct={this.handleAddProduct}
          searchString={this.state.searchString}
        />
        <Footer />
        <DeleteProductNotification
          isOpenDeleteWindow={this.state.isOpenDeleteWindow}
          selectedProduct={this.state.selectedProduct}
          onChangeNotification={this.handleChangeNotification}
          onDeleteProduct={this.handleDeleteProduct}
        />

        <ToastContainer />
      </>
    );
  }
}

export default App;
