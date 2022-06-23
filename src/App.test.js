import React from "react";
import ReactDOM from "react-dom";
import SamuraiJSApp from "./App";


it('should renders without crashing',  () => {
    const div = document.createElement('div');
    ReactDOM.render(<SamuraiJSApp/>, div);
    ReactDOM.unmountComponentAtNode(div);

});