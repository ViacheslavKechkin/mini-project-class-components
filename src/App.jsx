import React, { Component } from "react";

import { ToastContainer } from "react-toastify";

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
    isConfirmationDelete: false,
    productDelete: {},
  };

  handleDeleteWindow = (value, element, index) => {
    this.setState({
      isConfirmationDelete: value,
      productDelete: element,
    });
  };

  handleQuantity = (element, flag) => {
    const { id, title, price, quantity, count } = element;

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

    this.setState((perv) => ({
      cartSum: perv.cartSum + price,
      products: newProducts,
    }));
  };

  handleDeleteProduct = (isWindowDialog, productDelete) => {
    this.handleDeleteWindow(isWindowDialog);

    const newProducts = [...this.state.products];

    if (productDelete.count >= 1) {
      const product = productData.find(
        ((item) => item.id === productDelete.id) || {}
      );
      const { quantity, count, id, title, price } = product;

      const productIndex = this.state.products.findIndex((el) => el.id === id);

      newProducts.splice(productIndex, 1, {
        id,
        title,
        price,
        quantity,
        count,
      });

      this.setState((prev) => ({
        products: newProducts,
        cartSum: prev.cartSum - productDelete.count * productDelete.price,
      }));
    }
  };

  handleSearchChange = (event) => {
    event.target.value || ""
      ? this.setState({ searchString: event.target.value })
      : this.setState({
          searchString: "",
        });
  };

  render() {
    return (
      <>
        <Search
          searchString={this.state.searchString}
          onHandleSearchChange={this.handleSearchChange}
          cartSum={this.state.cartSum}
        />
        <Products
          onHandleDeleteWindow={this.handleDeleteWindow}
          products={this.state.products}
          onHandleQuantity={this.handleQuantity}
          onHandleAddProduct={this.handleAddProduct}
          onHandleDeleteProduct={this.handleDeleteProduct}
          searchString={this.state.searchString}
        />
        <Footer />
        <DeletionNotification
          isConfirmationDelete={this.state.isConfirmationDelete}
          productDelete={this.state.productDelete}
          onHandleDeleteWindow={this.handleDeleteWindow}
          onHandleDeleteProduct={this.handleDeleteProduct}
        />

        <ToastContainer />
      </>
    );
  }
}

export default App;
