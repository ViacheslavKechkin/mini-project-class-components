import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";

import Footer from "./components/Footer";
import Search from "./components/Search";
import Products from "./components/Products";
import DeletionNotification from "./components/DeletionNotification";

import productData from "./const/products.json";

import "./App.scss";

class App extends Component {
  state = {
    products: productData,
    cartSum: 0,
    searchString: "",
    isOpenDeleteWindow: false,
    deletedProduct: {},
  };

  handleDeletedWindow = (isOpen, element) => {
    this.setState({
      isOpenDeleteWindow: isOpen,
      deletedProduct: element,
    });
  };

  handleChangeQuantity = (element, flag) => {
    const { id, title, price, quantity, count } = element;

    if (!count) {
      this.handleAddProduct(element);
    } else {
      const newProducts = [...this.state.products];

      const productIndex = this.state.products.findIndex((el) => el.id === id);

      if (quantity && count && !flag) {
        newProducts.splice(productIndex, 1, {
          id,
          title,
          price,
          quantity: quantity - 1,
          count: count + 1,
        });

        this.setState((prev) => ({
          cartSum: prev.cartSum + price,
        }));
      }
      if (count && flag) {
        newProducts.splice(productIndex, 1, {
          id,
          title,
          price,
          quantity: quantity + 1,
          count: count - 1,
        });

        this.setState((prev) => ({ cartSum: prev.cartSum - price }));
      }
      this.setState({ products: newProducts });
    }
  };

  handleAddProduct = (product) => {
    const { price, quantity, count, id, title } = product;

    const newProducts = [...this.state.products];

    const productIndex = this.state.products.findIndex((el) => el.id === id);

    newProducts.splice(productIndex, 1, {
      id,
      title,
      price,
      quantity: quantity - 1,
      count: count + 1,
    });

    this.setState((prev) => ({
      cartSum: prev.cartSum + price,
      products: newProducts,
    }));
  };

  handleDeleteProduct = (deletedProduct) => {
    this.handleDeletedWindow(!this.state.isOpenDeleteWindow);

    const newProducts = [...this.state.products];

    if (deletedProduct.count >= 1) {
      const product = productData.find((item) => item.id === deletedProduct.id);

      if (product) {
        const { quantity, count, id, title, price } = product;

        const productIndex = this.state.products.findIndex(
          (el) => el.id === id
        );

        productIndex >= 0
          ? newProducts.splice(productIndex, 1, {
              id,
              title,
              price,
              quantity,
              count,
            })
          : toast.error("Продукт не найден !", {
              position: "bottom-right",
              autoClose: 2000,
            });

        this.setState((prev) => ({
          products: newProducts,
          cartSum: prev.cartSum - deletedProduct.count * deletedProduct.price,
        }));
      } else {
        toast.error("Продукт не найден !", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    }
  };

  handleSearchChange = (event) => {
    this.setState(
      event.target.value || ""
        ? { searchString: event.target.value }
        : {
            searchString: "",
          }
    );
  };

  render() {
    return (
      <>
        <Search
          searchString={this.state.searchString}
          onSearchChange={this.handleSearchChange}
          cartSum={this.state.cartSum}
        />
        <Products
          onDeletedWindow={this.handleDeletedWindow}
          products={this.state.products}
          onChangeQuantity={this.handleChangeQuantity}
          onAddProduct={this.handleAddProduct}
          searchString={this.state.searchString}
        />
        <Footer />
        <DeletionNotification
          isOpenDeleteWindow={this.state.isOpenDeleteWindow}
          deletedProduct={this.state.deletedProduct}
          onDeletedWindow={this.handleDeletedWindow}
          onDeleteProduct={this.handleDeleteProduct}
        />

        <ToastContainer />
      </>
    );
  }
}

export default App;
