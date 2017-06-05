import React, { Component } from 'react';
import styles from './style.less';

class Drag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      text: '拖动滑块验证',
    };
  }
  componentDidMount() {
    const that = this;
    let posX = 0;
    function mousedown() {
      const e = event || window.event;
      posX = e.clientX - that.btn.offsetLeft;
      that.btn.addEventListener('mousemove', mousemove);
      that.btn.addEventListener('mouseup', mouseup);
    }
    function mousemove() {
      const e = event || window.event;
      const x = e.clientX - posX;
      that.btn.style.left = `${x}px`;
      that.bg.style.width = `${that.btn.offsetLeft}px`;
      if (x >= that.box.offsetWidth - that.btn.offsetWidth) {
        that.setState({
          done: true,
          text: '通过验证',
        });
        that.btn.removeEventListener('mousedown', mousedown);
        that.btn.removeEventListener('mousemove', mousemove);
        that.btn.removeEventListener('mouseup', mouseup);
      }
    }
    function mouseup() {
      that.btn.removeEventListener('mousemove', mousemove);
      that.btn.removeEventListener('mouseup', mouseup);
      if (that.state.done) return;
      that.btn.style.left = '0px';
      that.bg.style.width = '0px';
    }
    this.btn.addEventListener('mousedown', mousedown);
  }
  render() {
    const { text } = this.state;
    return (
      <div className={styles.box} ref={(c) => { this.box = c; }}>
        <div className={styles.drag} ref={(c) => { this.drag = c; }}>
          <div className={styles.bg} ref={(c) => { this.bg = c; }} />
          <p className={styles.text} ref={(c) => { this.text = c; }}>{text}</p>
          <div className={styles.btn} ref={(c) => { this.btn = c; }} />
        </div>
      </div>
    );
  }
}

export default Drag;
