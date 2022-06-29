import React, { PureComponent } from "react";

import Button from "../../primitive/Button/index.tsx";

import plus from "./assets/icon/plus.svg";
import minus from "./assets/icon/minus.svg";
import productImg from "./assets/product.jpeg";

import IProduct from "../../types/types"

import "./style.scss";

interface PropsProduct {
  onChangeNotification: (isOpen: boolean, product: IProduct) => void,
  onAddProduct: (product: IProduct) => void,
  onChangeQuantity: ({ product, add }: any) => void,
  product: IProduct,
}

class Product extends PureComponent<PropsProduct> {
  render() {
    const { onChangeNotification, onAddProduct, onChangeQuantity, product } =
      this.props;

    const { id, title, price, count, quantity } = product;

    return (
      <section
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
            <div className="product__title"><h3>{title}</h3></div>
            <div className="product__price"><p>Цена: {price} р.</p></div>
            <div className="product__sum"><p>Всего: {quantity}</p></div>
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
              alt="decrease"
            />
          </Button>
          <div className="product__quantity">{count}</div>
          <Button onClick={() => onChangeQuantity({ product, add: false })}>
            <img className={"product__icon"} src={plus} alt="increase" />
          </Button>
        </div>
      </section>
    );
  }
}

export default Product;