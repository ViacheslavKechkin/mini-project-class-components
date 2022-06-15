import React, { PureComponent } from "react";

import { toast } from "react-toastify";

import "./style.scss";

class Search extends PureComponent {
  handleFindProduct = (e) => {
    e.preventDefault();

    if (!this.props.searchString) {
      toast.error("Напишите название товара", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  render() {
    const { cartSum, searchString, onHandleSearchChange } = this.props;

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
            onChange={onHandleSearchChange}
          />
          <button type="submit" className="btn-search">
            Поиск
          </button>
          <p className="sum-product">
            Общая стоимость выбранных блюд: {cartSum} р.
          </p>
        </form>
      </header>
    );
  }
}

export default Search;
