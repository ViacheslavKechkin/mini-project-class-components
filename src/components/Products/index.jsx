import React, { Component } from "react";

import { v4 } from "uuid";

import plus from "../../assets/icon/plus.svg";
import minus from "../../assets/icon/minus.svg";
import productImg from "../../assets/product.jpeg";

import "./style.scss";

class Products extends Component {
  render() {
    const {
      productsOnScreen,
      addToCart,
      deleteFromCart,
      handleDecrease,
      handleIncrement,
    } = this.props;

    return (
      <main>
        <div className="product-wrapper">
          {productsOnScreen.map((el) => (
            <div
              className={el.count > 0 ? "product-on-cart" : "product"}
              key={`id-${v4()}`}
            >
              <div
                className="container"
                onClick={
                  el.count === 0
                    ? () => addToCart(el)
                    : () => deleteFromCart(el)
                }
              >
                <div className="product__img-wrapper">
                  <img
                    className="product__img"
                    src={productImg}
                    alt="product-img"
                  />
                </div>
                <div className="product__info">
                  <div className="product__title">{el.title}</div>
                  <div className="product__price">Цена: {el.price} р.</div>
                  <div className="product__sum">Всего: {el.quantity}</div>
                </div>
              </div>
              <div className="product__function">
                <img
                  className="product__icon"
                  onClick={() => handleDecrease(el)}
                  src={minus}
                  alt="decrease"
                />
                <div className="product__quantity">{el.count}</div>
                <img
                  className="product__icon"
                  onClick={() => handleIncrement(el)}
                  src={plus}
                  alt="increase"
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

export default Products;
