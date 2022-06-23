import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus component', () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="basic status"/>)
        const instance = component.getInstance();
        expect(instance.state.status).toBe("basic status");
    });

    test("after creation span should be display", () => {
        const component = create(<ProfileStatus status="basic status"/>)
        const root = component.root;
        expect( () => {
            let input = root.findByType("input");
        }).toThrow();
    })

    test("after creation span should contains correct status", () => {
        const component = create(<ProfileStatus status="basic status"/>)
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("basic status");
    })

    test("инпут должен отображаться в режиме редактирования", () => {
        const component = create(<ProfileStatus status="basic status"/>)
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("basic status");
    })
})

