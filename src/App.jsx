import React, { PureComponent } from "react";

import { ToastContainer } from "react-toastify";

import Footer from "./components/Footer";
import Search from "./components/Search";
import Products from "./components/Products";
import DeleteProduct from "./components/DeleteProduct";

import productData from "./const/products.json";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      products: productData,
      sum: 0,
      titleFind: "",
      confirmationDelete: false,
      elementDelete: {},
    };
    this.productList = [...this.state.products];
  }

  openDeleteWindow = (value, el, index) => {
    this.setState({ confirmationDelete: value });
    this.setState({ elementDelete: { el, index } });
  };

  changeQuantity = (el, flag, index) => {
    const { id, title, price, quantity, count } = el;

    const newProducts = [...this.state.products];

    if (quantity && count && !flag) {
      newProducts[index] = {
        id,
        title,
        price,
        quantity: quantity - 1,
        count: count + 1,
      };

      this.setState({
        sum: this.state.sum + price,
      });
    }
    if (count && flag) {
      newProducts[index] = {
        ...newProducts[index],
        quantity: quantity + 1,
        count: count - 1,
      };

      this.setState({
        sum: this.state.sum - price,
      });
    }
    this.setState({ products: newProducts });
  };

  addProduct = (el, index) => {
    const { price, quantity, count } = el;

    const newProducts = [...this.state.products];

    newProducts[index] = {
      ...newProducts[index],
      quantity: quantity - 1,
      count: count + 1,
    };

    this.setState({ products: newProducts });

    this.setState({
      sum: this.state.sum + price,
    });
  };

  deleteProduct = (value, elenent) => {
    this.openDeleteWindow(value);

    const { el, index } = elenent;

    const newProducts = [...this.state.products];

    if (el.count >= 1) {
      const { quantity, count } = productData.find((item) => item.id === el.id);

      const product = this.state.products[index];

      const sumProduct = product.count * product.price;

      this.setState({
        sum: this.state.sum - sumProduct,
      });

      newProducts[index] = {
        ...newProducts[index],
        quantity,
        count,
      };

      this.setState({ products: newProducts });
    }
  };

  handleSearchChange = (event) => {
    if (event.target.value.length) {
      this.setState({ titleFind: event.target.value });
    } else {
      this.setState({
        titleFind: "",
      });
    }
  };

  render() {
    return (
      <>
        <Search
          titleFind={this.state.titleFind}
          handleSearchChange={this.handleSearchChange}
          sum={this.state.sum}
        />
        <Products
          openDeleteWindow={this.openDeleteWindow}
          productList={this.productList}
          products={this.state.products}
          changeQuantity={this.changeQuantity}
          addProduct={this.addProduct}
          deleteProduct={this.deleteProduct}
          titleFind={this.state.titleFind}
        />
        <Footer />
        {this.state.confirmationDelete && (
          <DeleteProduct
            confirmationDelete={this.state.confirmationDelete}
            elementDelete={this.state.elementDelete}
            openDeleteWindow={this.openDeleteWindow}
            deleteProduct={this.deleteProduct}
          />
        )}
        <ToastContainer />
      </>
    );
  }
}

export default App;
