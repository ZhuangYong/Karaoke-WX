import React from "react";
import commentList from "./commentList";

class commentReplyList extends commentList {
    constructor(props) {
        super(props);
        this.state = {
            type: 2
        };
    }
}
