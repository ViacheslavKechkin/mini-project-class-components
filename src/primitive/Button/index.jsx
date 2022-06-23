import React, { Component } from "react";

class Button extends Component {
  render() {
    const { product, onChangeQuantity, add, ...restProps } = this.props;

    return (
      <button
        {...restProps}
        className="product__button"
        type="button"
        onClick={() => onChangeQuantity({ product, add })}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
