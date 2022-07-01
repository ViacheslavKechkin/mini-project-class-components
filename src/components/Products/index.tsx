import React, { PureComponent } from "react";

import Product from "../Product";

import { TProduct, TQuantityArg } from "../../types"

import "./style.scss";

interface PropsProducts {
  products: TProduct[],
  searchString: string,
  onChangeNotification: (isOpen: boolean, product: TProduct) => void,
  onAddProduct: (product: TProduct) => void,
  onChangeQuantity: ({ product, add }: TQuantityArg) => void,
}

class Products extends PureComponent<PropsProducts> {
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
