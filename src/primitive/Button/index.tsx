import React, { Component } from "react";

interface PropsButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode,
  onClick: () => void,
}

class Button extends Component<PropsButton> {
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
