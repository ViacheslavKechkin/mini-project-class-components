import React, { Component } from "react";

import Footer from "./components/Footer";
import Products from "./components/Products";
import FindProducts from "./components/FindProducts";

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          title: "Товар 1",
          price: 10,
          quantity: 10,
          count: 0,
        },
        {
          id: 2,
          title: "Товар 2",
          price: 20,
          quantity: 20,
          count: 0,
        },
        {
          id: 3,
          title: "Товар 3",
          price: 30,
          quantity: 30,
          count: 0,
        },
        {
          id: 4,
          title: "Товар 4",
          price: 40,
          quantity: 40,
          count: 0,
        },
        {
          id: 5,
          title: "Товар 5",
          price: 50,
          quantity: 50,
          count: 0,
        },
        {
          id: 6,
          title: "Товар 6",
          price: 60,
          quantity: 60,
          count: 0,
        },
        {
          id: 7,
          title: "Товар 7",
          price: 70,
          quantity: 70,
          count: 0,
        },
        {
          id: 8,
          title: "Товар 8",
          price: 80,
          quantity: 80,
          count: 0,
        },
      ],
      sum: 0,
      titleForFind: "",
      productsOnScreen: [],
    };

    this.productCopy = [...this.state.products];
    this.sumCopy = this.state.sumSum;
  }

  componentDidMount() {
    this.setState({ productsOnScreen: this.state.products });
  }

  handleIncrement = (el) => {
    if (el.quantity && el.count) {
      const indexProduct = this.state.productsOnScreen.findIndex(
        (item) => item.id === el.id
      );

      const newProducts = [...this.state.productsOnScreen];

      newProducts[indexProduct] = {
        id: el.id,
        title: el.title,
        price: el.price,
        quantity: el.quantity - 1,
        count: el.count + 1,
      };

      this.setState({ productsOnScreen: newProducts });

      this.setState((prevState) => ({
        sum: prevState.sum + el.price,
      }));
    }
  };

  handleDecrease = (el) => {
    if (el.count) {
      const indexProduct = this.state.productsOnScreen.findIndex(
        (item) => item.id === el.id
      );

      const newProducts = [...this.state.productsOnScreen];

      newProducts[indexProduct] = {
        id: el.id,
        title: el.title,
        price: el.price,
        quantity: el.quantity + 1,
        count: el.count - 1,
      };

      this.setState({ productsOnScreen: newProducts });

      this.setState((prevState) => ({
        sum: prevState.sum - el.price,
      }));
    }
  };

  addToCart = (el) => {
    const indexProduct = this.state.productsOnScreen.findIndex(
      (item) => item.id === el.id
    );

    const newProducts = [...this.state.productsOnScreen];

    newProducts[indexProduct] = {
      id: el.id,
      title: el.title,
      price: el.price,
      quantity: el.quantity - 1,
      count: el.count + 1,
    };

    this.setState({ productsOnScreen: newProducts });

    this.setState((prevState) => ({
      sum: prevState.sum + el.price,
    }));
  };

  deleteFromCart = (el) => {
    if (el.count >= 1) {
      const indexProduct = this.state.productsOnScreen.findIndex(
        (item) => item.id === el.id
      );

      const newProducts = [...this.state.productsOnScreen];

      const filterState = this.productCopy.find((item) => item.id === el.id);

      this.setState({
        sum:
          this.state.sum -
          newProducts[indexProduct].count * newProducts[indexProduct].price,
      });

      newProducts[indexProduct] = {
        id: filterState.id,
        title: filterState.title,
        price: filterState.price,
        quantity: filterState.quantity,
        count: filterState.count,
      };

      this.setState({ productsOnScreen: newProducts });
    }
  };

  findProduct = (e) => {
    e.preventDefault();

    const newProducts = this.state.products.filter(
      (el) => el.title === this.state.titleForFind
    );

    this.setState({
      productsOnScreen: newProducts,
    });
  };

  handleChangeInput = (event) => {
    if (event.target.value.length !== 0) {
      this.setState({ titleForFind: event.target.value });
    } else {
      this.setState({
        productsOnScreen: this.state.products,
        titleForFind: "",
      });
    }
  };

  render() {
    return (
      <>
        <FindProducts
          titleForFind={this.state.titleForFind}
          handleChangeInput={this.handleChangeInput}
          findProduct={this.findProduct}
          sum={this.state.sum}
          products={this.state.products}
        />
        <Products
          productsOnScreen={this.state.productsOnScreen}
          handleIncrement={this.handleIncrement}
          handleDecrease={this.handleDecrease}
          addToCart={this.addToCart}
          deleteFromCart={this.deleteFromCart}
        />
        <Footer />
      </>
    );
  }
}

export default App;
