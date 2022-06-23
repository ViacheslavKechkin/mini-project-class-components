import React, { PureComponent } from "react";

import showError from "../../utils/index";

import "./style.scss";

class Search extends PureComponent {
  handleFindProduct = (e) => {
    e.preventDefault();

    !this.props.searchString && showError("Напишите название товара");
  };

  render() {
    const { cartSum, searchString, onSearchChange } = this.props;

    return (
      <header>
        <form onSubmit={this.handleFindProduct} className="find-wrapper">
          <input
            id="title"
            name="search"
            type="text"
            placeholder="Название товара"
            className="search-product"
            value={searchString}
            onChange={onSearchChange}
          />
          <button type="submit" className="btn-search">
            Поиск
          </button>
          <p className="sum-product">
            Общая стоимость выбранных продуктов: {cartSum} р.
          </p>
        </form>
      </header>
    );
  }
}

export default Search;
