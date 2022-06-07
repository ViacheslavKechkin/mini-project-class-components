import React, { Component } from "react";

import "./style.scss";

class FindProducts extends Component {
  render() {
    const { sum, findProduct, titleForFind, handleChangeInput } = this.props;

    return (
      <header>
        <form onSubmit={findProduct} className="find-wrapper">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Название товара"
            className="search-product"
            value={titleForFind}
            onChange={handleChangeInput}
          />
          <button className="btn-search">Поиск</button>
          <p className="sum-product">
            Общая стоимость выбранных блюд: {sum} р.
          </p>
        </form>
      </header>
    );
  }
}

export default FindProducts;
