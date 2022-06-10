import React, { PureComponent } from "react";

import { toast } from "react-toastify";

import "./style.scss";

class Search extends PureComponent {
  findProduct = (e) => {
    e.preventDefault();
    if (!this.props.titleFind) {
      toast.error("Напишите название товара", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  render() {
    const { sum, titleFind, handleSearchChange } = this.props;

    return (
      <header>
        <form onSubmit={this.findProduct} className="find-wrapper">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Название товара"
            className="search-product"
            value={titleFind}
            onChange={handleSearchChange}
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

export default Search;
