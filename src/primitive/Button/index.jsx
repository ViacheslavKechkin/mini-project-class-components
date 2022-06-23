import React, { Component } from "react";

class Button extends Component {
  render() {
    const { onClick, ...restProps } = this.props;

    return (
      <button
        className="product__button"
        type="button"
        onClick={onClick}
        {...restProps}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
