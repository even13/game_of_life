import React from 'react';
import Classes from './Logo.module.css';

class Logo extends React.Component {
  state = {
    images: ['./frames/frame-0.png', './frames/frame-1.png', './frames/frame-2.png', 'frames/frame-3.png', 'frames/frame-4.png', 'frames/frame-5.png', 'frames/frame-6.png', 'frames/frame-7.png'],
    currentFrame: 0,
  }

  componentDidMount() {
    setInterval(() => {
      this.setState((prevState) => ({ currentFrame: (prevState.currentFrame + 1) % prevState.images.length }));
    }, 200);
  }

  render() {
    const imageSource = this.state.images[this.state.currentFrame];
    return (
      <img
        height={this.props.height}
        className={Classes.Logo}
        data-test="component-logo"
        src={imageSource}
        alt="N.E.O.N. Logo"
      />
    );
  }
}

export default Logo;
