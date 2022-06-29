import React, { PureComponent } from "react";

import Product from "../Product/index.tsx";

import IProduct from "../../types/types"

import "./style.scss";

interface PropsProducts {
  products: IProduct[],
  searchString: string,
  onChangeNotification: (isOpen: boolean, product: IProduct) => void,
  onAddProduct: (product: IProduct) => void,
  onChangeQuantity: ({ product, add }: any) => void,
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

    const listProducts: IProduct[] = products.filter((el) =>
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
