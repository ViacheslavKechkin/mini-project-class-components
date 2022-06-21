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
    selectedProduct: {},
  };

  handleDelete = (isOpen, product) => {
    this.setState({
      isOpenDeleteWindow: isOpen,
      selectedProduct: product,
    });
  };

  handleChangeQuantity = (product, flag) => {
    const { id, title, price, quantity, count } = product;

    if (!count) {
      this.handleAddProduct(product);
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

        this.setState((prev) => {
          const { cartSum } = prev;

          return {
            cartSum: cartSum + price,
          };
        });
      }
      if (count && flag) {
        newProducts.splice(productIndex, 1, {
          id,
          title,
          price,
          quantity: quantity + 1,
          count: count - 1,
        });

        this.setState((prev) => {
          const { cartSum } = prev;

          return { cartSum: cartSum - price };
        });
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

    this.setState((prev) => {
      const { cartSum } = prev;

      return {
        cartSum: cartSum + price,
        products: newProducts,
      };
    });
  };

  handleDeleteProduct = (selectedProduct) => {
    this.handleDelete(!this.state.isOpenDeleteWindow);

    const newProducts = [...this.state.products];

    if (selectedProduct.count >= 1) {
      const product = productData.find(
        (item) => item.id === selectedProduct.id
      );

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

        this.setState((prev) => {
          const { cartSum } = prev;

          return {
            products: newProducts,
            cartSum: cartSum - selectedProduct.count * selectedProduct.price,
          };
        });
      } else {
        toast.error("Продукт не найден !", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    }
  };

  handleSearchChange = (event) => {
    this.setState({ searchString: event.target.value });
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
          onDelete={this.handleDelete}
          products={this.state.products}
          onChangeQuantity={this.handleChangeQuantity}
          onAddProduct={this.handleAddProduct}
          searchString={this.state.searchString}
        />
        <Footer />
        <DeletionNotification
          isOpenDeleteWindow={this.state.isOpenDeleteWindow}
          selectedProduct={this.state.selectedProduct}
          onDelete={this.handleDelete}
          onDeleteProduct={this.handleDeleteProduct}
        />

        <ToastContainer />
      </>
    );
  }
}

export default App;
