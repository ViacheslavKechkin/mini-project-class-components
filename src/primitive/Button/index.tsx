import React, { Component } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode,
}

class Button extends Component<IProps> {
  private rootRef = React.createRef<HTMLButtonElement>();

  render() {
    const { onClick, ...restProps } = this.props;

    return (
      <button
        className="product__button"
        type="button"
        onClick={onClick}
        ref={this.rootRef}
        {...restProps}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
