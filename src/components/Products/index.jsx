import React, { PureComponent } from "react";

import Product from "../Product";

import "./style.scss";

class Products extends PureComponent {
  render() {
    const {
      products,
      searchString,
      onDeletedWindow,
      onAddProduct,
      onChangeQuantity,
    } = this.props;

    const listProducts = products.filter((el) =>
      el.title.toLowerCase().includes(searchString.toLowerCase())
    );

    return (
      <main>
        <div className="product-wrapper">
          {listProducts.map((el) => {
            const { id } = el;
            return (
              <Product
                key={`product-${id}`}
                el={el}
                onDeletedWindow={onDeletedWindow}
                onAddProduct={onAddProduct}
                onChangeQuantity={onChangeQuantity}
              />
            );
          })}
        </div>
      </main>
    );
  }
}

export default Products;
