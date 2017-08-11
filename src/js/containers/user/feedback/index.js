/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../../components/common/BaseComponent";
import {AppBar} from "material-ui/AppBar";

class Feedback extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AppBar/>
            </div>
        );
    }
}

export default Feedback;
