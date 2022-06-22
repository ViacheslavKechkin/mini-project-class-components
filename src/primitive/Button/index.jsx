import React, { Component } from "react";

class Button extends Component {
  render() {
    const {
      product,
      count,
      action,
      onChangeQuantity,
      buttonStyle,
      add,
      description,
    } = this.props;

    return (
      <button
        className="product__button"
        onClick={() => onChangeQuantity({ product, add })}
      >
        <img
          className={count ? "product__icon" : { buttonStyle }}
          src={action}
          alt={description}
        />
      </button>
    );
  }
}

export default Button;
