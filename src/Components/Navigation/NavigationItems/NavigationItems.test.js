import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import NavigationItems from "./NavigationItems";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Connecting enzyme
configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;
  // Setting defaults before each test
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it(// The test description
  "should render two <NavigationItem /> elements if not authenticated", () => {
    // The actual testing
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it(// The test description
  "should render three <NavigationItem /> elements if authenticated", () => {
    // The actual testing
    // Making user authenticated
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it(// The test description
  "should contains an exact logout button if authenticated", () => {
    // The actual testing
    // Making user authenticated
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
