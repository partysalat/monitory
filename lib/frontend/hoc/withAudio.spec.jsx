// test file
import { shallow } from 'enzyme';
import React from 'react';
import { random } from 'faker';
import configureStore from 'redux-mock-store';
import withAudio from './withAudio';
import { playAudio } from '../redux/actions';


describe('withAudio', () => {
  function DummyComponent() {
    return (
      <div>Fooo</div>
    );
  }

  const mockStore = configureStore();
  let store;

  const DummyComponentWithHoc = withAudio(DummyComponent);


  beforeEach(() => {
    const initialState = {};
    store = mockStore(initialState);
  });

  it('renders child component without properties', () => {
    const wrapper = renderComponent();

    expect(wrapper.find(DummyComponent)).toHaveLength(1);
  });

  it('hands over all props to child component', () => {
    const randomProps = global.createRandomProps();
    const wrapper = renderComponent(randomProps);

    expect(wrapper.find(DummyComponent).props()).toEqual(expect.objectContaining(randomProps));
  });
  it('calls property method with props current and viewValue', () => {
    // given
    const currentValue = random.alphaNumeric(10);
    const viewValue = random.alphaNumeric(10);
    const spy = jest.fn().mockReturnValue(random.alphaNumeric(10));

    const wrapper = renderComponent({
      current: currentValue,
      viewValue,
      playAudioWhen: spy,
    });

    // when
    wrapper.setProps({ current: currentValue });

    // then
    expect(spy).toHaveBeenCalledWith(currentValue, viewValue);
  });


  describe('does not play a sound when', () => {
    it('is rendered', () => {
      renderComponent();
      expect(store.getActions()).toEqual([]);
    });
    it('props changes but playAudioWhen returns false', () => {
      const wrapper = renderComponent({
        playAudioWhen: () => false,
        current: 'foo',
      });

      wrapper.setProps({ currentValue: 'bar' });

      expect(store.getActions()).toEqual([]);
    });
    it('props changes but playAudioWhen returns not a string', () => {
      const wrapper = renderComponent({
        playAudioWhen: () => 12345,
        current: 'foo',
      });

      wrapper.setProps({ currentValue: 'bar' });

      expect(store.getActions()).toEqual([]);
    });
    it('props changes and playAudioWhen is not defined', () => {
      const wrapper = renderComponent({
        current: 'foo',
      });

      wrapper.setProps({ currentValue: 'bar' });

      expect(store.getActions()).toEqual([]);
    });
  });
  describe('plays a sound when', () => {
    it('props changes and playAudioWhen returns a string', () => {
      const nextSoundFile = random.alphaNumeric(10);
      const wrapper = renderComponent({
        playAudioWhen: () => nextSoundFile,
        current: 'bar',
        store,
      });

      wrapper.setProps({ currentValue: 'fooo' });
      expect(store.getActions()).toEqual([playAudio(nextSoundFile)]);
    });

    it('props changes and playAudioWhen returns a string', () => {
      const soundFile = random.alphaNumeric(10);
      const nextSoundFile = random.alphaNumeric(10);
      const wrapper = renderComponent({
        playAudioWhen: jest.fn()
          .mockReturnValueOnce(soundFile)
          .mockReturnValueOnce(nextSoundFile),
        current: 'bar',
        store,
      });

      wrapper.setProps({ currentValue: 'fooo' });
      wrapper.setProps({ currentValue: 'baz' });
      expect(store.getActions()[1]).toEqual(playAudio(nextSoundFile));
    });
  });


  function renderComponent(props) {
    return shallow(<DummyComponentWithHoc store={store} {...props} />).dive();
  }
});
