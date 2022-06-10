import React, { PureComponent } from "react";

import plus from "../../assets/icon/plus.svg";
import minus from "../../assets/icon/minus.svg";
import productImg from "../../assets/product.jpeg";

import "./style.scss";

class Product extends PureComponent {
  render() {
    const {
      openDeleteWindow,
      addProduct,
      changeQuantity,
      el,
      index,
      id,
      title,
      price,
      count,
      quantity,
    } = this.props;

    return (
      <div
        className={count ? "product product--green" : "product"}
        key={`id-${id}`}
      >
        <div
          className="container"
          onClick={() =>
            count ? openDeleteWindow(true, el, index) : addProduct(el, index)
          }
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
          <img
            className="product__icon"
            onClick={() => changeQuantity(el, true, index)}
            src={minus}
            alt="decrease"
          />
          <div className="product__quantity">{count}</div>
          <img
            className="product__icon"
            onClick={() => changeQuantity(el, false, index)}
            src={plus}
            alt="increase"
          />
        </div>
      </div>
    );
  }
}

export default Product;
