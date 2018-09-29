import * as React from 'react';

interface WithReloadableSrcProps {
    src:string,
    interval: number
}
interface WithReloadableSrcState {
    newSrc:string,
    lastUpdated: Date
}
export default WrappedComponent => class extends React.Component<WithReloadableSrcProps,WithReloadableSrcState> {
    private interval: number;

    constructor(props) {
      super(props);
      this.state = {
        newSrc: props.src,
        lastUpdated: new Date(),
      };
    }

    componentWillMount() {
      if (!this.props.interval) {
        return;
      }
      this.interval = window.setInterval(() => {
        this.setState({
          newSrc: `${this.props.src}?r=${new Date().getTime()}`,
          lastUpdated: new Date(),
        });
      }, this.props.interval);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }


    render() {
      return (<WrappedComponent
        {...this.props}
        src={this.state.newSrc}
        lastUpdated={this.state.lastUpdated}
      />);
    }
};
