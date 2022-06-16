import React, { PureComponent } from "react";

import plus from "./assets/icon/plus.svg";
import minus from "./assets/icon/minus.svg";
import productImg from "./assets/product.jpeg";

import "./style.scss";

class Product extends PureComponent {
  render() {
    const { onDeletedWindow, onAddProduct, onChangeQuantity, el } = this.props;

    const { id, title, price, count, quantity } = el;

    return (
      <div
        className={count ? "product product--green" : "product"}
        key={`product-${id}`}
      >
        <div
          className="product-container"
          onClick={() => (count ? onDeletedWindow(true, el) : onAddProduct(el))}
        >
          <div className="product__img-wrapper">
            <img className="product__img" src={productImg} alt="product-img" />
          </div>
          <div className="product__info">
            <div className="product__title">{title}</div>
            <div className="product__price">Цена: {price} р.</div>
            <div className="product__sum">Всего: {quantity}</div>
          </div>
        </div>
        <div className="product__function">
          <button
            className="product__button"
            onClick={() => onChangeQuantity(el, true)}
          >
            <img
              className={
                count
                  ? "product__icon"
                  : "product__icon product__icon--inactive"
              }
              src={minus}
              alt="decrease"
            />
          </button>
          <div className="product__quantity">{count}</div>
          <button
            className="product__button"
            onClick={() => onChangeQuantity(el, false)}
          >
            <img
              className={count ? "product__icon" : "product__icon"}
              src={plus}
              alt="increase"
            />
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
