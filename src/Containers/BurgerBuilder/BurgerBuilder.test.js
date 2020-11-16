import React from "react";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Connecting enzyme
configure({ adapter: new Adapter() });

describe("<BugerBuilder />", () => {
  let wrapper;
  // Setting defaults before each test
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });

  it(// The test description
  "should render <BuildControls /> when recieving ingredients", () => {
    // The actual testing
    wrapper.setProps({ ings: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
