import React, { Component } from "react";

interface PropsButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode,
  onClick: () => void,
}


class Button extends Component<PropsButton> {
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
