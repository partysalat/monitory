// test file
import { shallow } from 'enzyme';
import React from 'react';

describe('withAlert', () => {
  function DummyComponent() {
    return (
      <div>Fooo</div>
    );
  }

  it('works', () => {
    const wrapper = shallow(<DummyComponent />);

    expect(wrapper.find('div')).toHaveLength(1);
  });
});
