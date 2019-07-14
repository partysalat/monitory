// test file
import { shallow } from 'enzyme';
import React from 'react';
import { random } from 'faker';
import withAlert from './withAlert';


describe('withAlert', () => {
  function DummyComponent() {
    return (
      <div>Fooo</div>
    );
  }

  const DummyComponentWithHoc = withAlert(DummyComponent);

  it('renders child component without properties', () => {
    const wrapper = shallow(<DummyComponentWithHoc />);

    expect(wrapper.find(DummyComponent)).toHaveLength(1);
  });

  it('hands over all props to child component', () => {
    const randomProps = createRandomProps();
    const wrapper = shallow(<DummyComponentWithHoc {...randomProps} />);

    expect(wrapper.find(DummyComponent).props()).toEqual(expect.objectContaining(randomProps));
  });

  it('calls property method with props current and viewValue', () => {
    const currentValue = random.alphaNumeric(10);
    const viewValue = random.alphaNumeric(10);
    const alertSpy = jest.fn();

    shallow(<DummyComponentWithHoc current={currentValue} viewValue={viewValue} alert={alertSpy} />);

    expect(alertSpy).toHaveBeenCalledWith(currentValue, viewValue);
  });

  const testCases = [true, false, undefined];
  testCases.forEach((isAlertFlag) => {
    describe(`sets alert flag to ${isAlertFlag} when`, () => {
      it(`property alert is function and method returns ${isAlertFlag}`, () => {
        const wrapper = shallow(<DummyComponentWithHoc alert={() => isAlertFlag} />);

        expect(wrapper.find(DummyComponent).props().isAlert).toBe(isAlertFlag);
      });

      it(`property alert is value and value is ${isAlertFlag}`, () => {
        const wrapper = shallow(<DummyComponentWithHoc alert={isAlertFlag} />);

        expect(wrapper.find(DummyComponent).props().isAlert).toBe(isAlertFlag);
      });
    });
  });
});
