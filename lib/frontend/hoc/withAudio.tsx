import * as React from 'react';
import {connect} from 'react-redux';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import {playAudio} from '../redux/actions';


interface WithAudioProps<T, U> {
    playAudioWhen: (current: T, viewValue: U) => string
    current:T,
    viewValue:U,
    playSound: (audioPath:string) => string | boolean,
}

interface WithAudioState {
    lastSound: string | boolean
}

export default <T, U>(WrappedComponent: typeof React.Component) => {
    function mapStateToProps() {
        return {};
    }

    function mapDispatchToProps(dispatch) {
        return {
            playSound: audioPath => dispatch(playAudio(audioPath)),
        };
    }

    const WithAudio = class extends React.Component<WithAudioProps<T,U>, WithAudioState> {
        constructor(props:WithAudioProps<T,U>) {
            super(props);
            this.state = {
                lastSound: false,
            };
        }


        componentWillReceiveProps(props:WithAudioProps<T,U>) {
            const {
                playAudioWhen,
                current,
                viewValue,
                playSound,
            } = props;

            const sound = isFunction(playAudioWhen) ? playAudioWhen(current, viewValue) : false;

            if (sound === this.state.lastSound) {
                return;
            }

            if (isString(sound)) {
                playSound(sound);
            }
            this.setState({lastSound: sound});
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };

    return connect(mapStateToProps, mapDispatchToProps)(WithAudio);
}
