import React, { PureComponent } from "react";

import Product from "../Product";

import "./style.scss";

class Products extends PureComponent {
  render() {
    const {
      products,
      searchString,
      onHandleDeleteWindow,
      onHandleAddProduct,
      onHandleQuantity,
    } = this.props;

    return (
      <main>
        <div className="product-wrapper">
          {products.map((el, index) => {
            const { id, title } = el;
            return (
              title.toLowerCase().includes(searchString.toLowerCase()) && (
                <div key={`id-${id}`}>
                  <Product
                    el={el}
                    index={index}
                    onHandleDeleteWindow={onHandleDeleteWindow}
                    onHandleAddProduct={onHandleAddProduct}
                    onHandleQuantity={onHandleQuantity}
                  />
                </div>
              )
            );
          })}
        </div>
      </main>
    );
  }
}

export default Products;
