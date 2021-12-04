// Packages
import React from "react";

type Props = {
  children: any;
  component?: any;
  onEnd?: VoidFunction;
  loop?: boolean;
  [frameProp: string]: any;
};

type State = {
  frameNum: number;
};

export function Frame({
  component,
  ...rest
}: {
  children?: any;
  component?: any;
  duration?: number;
  [prop: string]: any;
}) {
  return React.createElement(component, rest);
}

export class Keyframes extends React.Component<Props, State> {
  timer: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      frameNum: 0
    };
  }

  shouldComponentUpdate(_nextProps: Props, nextState: State) {
    const { frameNum } = nextState;
    if (this.state.frameNum === frameNum) {
      return false;
    }
    return frameNum >= 0 && frameNum < this.props.children.length;
  }

  componentDidMount() {
    this.requestNextFrame();
  }

  componentDidUpdate() {
    this.requestNextFrame();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const frame = this.getFrame();
    if (!frame) {
      return null;
    }

    const { component = "span", children, onEnd, ...rest } = this.props;

    return React.cloneElement(frame, { component, ...rest, ...frame.props });
  }

  requestNextFrame() {
    this.waitForDelay(() => {
      const frameNum = this.state.frameNum + 1;
      if (this.props.children.length <= frameNum) {
        this.props.loop ? this.restart() : this.props.onEnd && this.props.onEnd();
        return;
      }

      this.setState({ frameNum });
    });
  }

  waitForDelay(fn: () => void) {
    const currentFrame = this.getFrame();
    // Defaults duration to 0
    const delay = currentFrame.props.duration || 0;
    clearTimeout(this.timer);
    this.timer = setTimeout(fn, delay);
  }

  getFrame() {
    return this.props.children[this.state.frameNum];
  }

  restart () {
    this.setState({ frameNum: 0 });
  }
}
