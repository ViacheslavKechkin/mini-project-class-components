import React, { PureComponent } from "react";

import Product from "../Product";

import "./style.scss";

class Products extends PureComponent {
  render() {
    const { products, titleFind } = this.props;

    return (
      <main>
        <div className="product-wrapper">
          {titleFind
            ? products.map((el, index) => {
                const { id, title, price, quantity, count } = el;

                if (
                  title
                    .toLowerCase()
                    .includes(this.props.titleFind.toLowerCase())
                ) {
                  return (
                    <div key={`id-${id}`}>
                      <Product
                        el={el}
                        index={index}
                        id={id}
                        title={title}
                        price={price}
                        count={count}
                        quantity={quantity}
                        openDeleteWindow={this.props.openDeleteWindow}
                        addProduct={this.props.addProduct}
                        changeQuantity={this.props.changeQuantity}
                      />
                    </div>
                  );
                }
              })
            : products.map((el, index) => {
                const { id, title, price, quantity, count } = el;

                return (
                  <div key={`id-${id}`}>
                    <Product
                      el={el}
                      index={index}
                      id={id}
                      title={title}
                      price={price}
                      count={count}
                      quantity={quantity}
                      openDeleteWindow={this.props.openDeleteWindow}
                      addProduct={this.props.addProduct}
                      changeQuantity={this.props.changeQuantity}
                    />
                  </div>
                );
              })}
        </div>
      </main>
    );
  }
}

export default Products;
