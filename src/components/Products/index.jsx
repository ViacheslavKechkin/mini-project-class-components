import React, { PureComponent } from "react";

import Product from "../Product";

import "./style.scss";

class Products extends PureComponent {
  render() {
    const {
      products,
      searchString,
      onChangeNotification,
      onAddProduct,
      onChangeQuantity,
    } = this.props;

    const listProducts = products.filter((el) =>
      el.title.toLowerCase().includes(searchString.toLowerCase())
    );

    return (
      <main>
        <div className="product-wrapper">
          {listProducts.map(({ id, ...product }) => (
            <Product
              key={`product-${id}`}
              product={{ id, ...product }}
              onChangeNotification={onChangeNotification}
              onAddProduct={onAddProduct}
              onChangeQuantity={onChangeQuantity}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default Products;
