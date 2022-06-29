import React, { PureComponent } from "react";

import showError from "../../utils/index.jsx";

import "./style.scss";

interface PropsSearch {
  searchString: string,
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  cartSum: number,
}

class Search extends PureComponent<PropsSearch> {

  handleFindProduct = (e: React.FormEvent<HTMLFormElement>): void => {
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
            onChange={(e) => onSearchChange(e)}
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
