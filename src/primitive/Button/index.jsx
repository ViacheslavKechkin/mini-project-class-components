import React, { Component } from "react";

class Button extends Component {
  render() {
    const { onChangeQuantity, ...restProps } = this.props;

    return (
      <button
        {...restProps}
        className="product__button"
        type="button"
        onClick={onChangeQuantity}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
