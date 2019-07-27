import React from "react";

import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it("it should render 2 <NavigationItem> if user isn't authenticated", () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it("it should render 2 <NavigationItem> if user isn't authenticated", () => {
        wrapper.setProps({ isAuth: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it("it should render 2 <NavigationItem> if user isn't authenticated", () => {
        wrapper.setProps({ isAuth: true });
        expect(
            wrapper.contains(
                <NavigationItem link="/logout">Logout</NavigationItem>
            )
        ).toEqual(true);
    });
});
