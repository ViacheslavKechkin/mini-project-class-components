import React, { PureComponent } from "react";

import Button from "../../primitive/Button";

import plus from "./assets/icon/plus.svg";
import minus from "./assets/icon/minus.svg";
import productImg from "./assets/product.jpeg";

import "./style.scss";

class Product extends PureComponent {
  render() {
    const { onChangeNotification, onAddProduct, onChangeQuantity, product } =
      this.props;

    const { id, title, price, count, quantity } = product;

    return (
      <div
        className={count ? "product product--green" : "product"}
        key={`product-${id}`}
      >
        <div
          className="product-container"
          onClick={() =>
            count ? onChangeNotification(true, product) : onAddProduct(product)
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
          <Button onClick={() => onChangeQuantity({ product, add: true })}>
            <img
              className={
                count
                  ? "product__icon"
                  : "product__icon product__icon--inactive"
              }
              src={minus}
              alt={"decrease"}
            />
          </Button>
          <div className="product__quantity">{count}</div>
          <Button onClick={() => onChangeQuantity({ product, add: false })}>
            <img className={"product__icon"} src={plus} alt={"increase"} />
          </Button>
        </div>
      </div>
    );
  }
}

export default Product;
