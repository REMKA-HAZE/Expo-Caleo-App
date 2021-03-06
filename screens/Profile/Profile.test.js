import React from "react";
import renderer from "react-test-renderer";
import { Profile } from "./Profile.screen";

describe("<Profile />", () => {
    it("has user prop", () => {
        const tree = renderer.create(<Profile />).toJSON();
        expect(tree.props).toContain("user");
    });
});