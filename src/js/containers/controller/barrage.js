/**
 * Created by walljack@163.com on 2017/8/10.
 */

import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {List, ListItem, Tab, Tabs, TextField} from "material-ui";
import SwipeableViews from 'react-swipeable-views';
import defaultImg from "../../../img/common/tile_default.jpg";
import Scroller from "silk-scroller";

const fastWords = [
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"},
    {value: "快速文字"}
];
const emotionIcons = [
    {id: 1, name: "表情名字", url: defaultImg},
    {id: 2, name: "表情名字", url: defaultImg},
    {id: 3, name: "表情名字", url: defaultImg},
    {id: 4, name: "表情名字", url: defaultImg},
    {id: 5, name: "表情名字", url: defaultImg},
    {id: 6, name: "表情名字", url: defaultImg},
    {id: 7, name: "表情名字", url: defaultImg},
    {id: 8, name: "表情名字", url: defaultImg},
    {id: 9, name: "表情名字", url: defaultImg},
    {id: 10, name: "表情名字", url: defaultImg},
    {id: 11, name: "表情名字", url: defaultImg},
    {id: 12, name: "表情名字", url: defaultImg},
    {id: 13, name: "表情名字", url: defaultImg}
];
class Barrage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <TextField
                        hintText="说点儿什么..."
                        hintStyle={{top: 0, padding: 12}}
                        textareaStyle={{paddingLeft: 12}}
                        multiLine={true}
                        rows={6}
                        rowsMax={10}
                        fullWidth={true}
                    />
                </div>
                <Tabs
                    contentContainerStyle={{
                        position: "absolute",
                        bottom: 0,
                        height: "70%",
                        overflow: "auto",
                        paddingTop: 30,
                        zIndex: -1
                    }}>
                    <Tab
                        label="文字"
                    >
                        {
                            this.getFastWord()
                        }
                    </Tab>
                    <Tab label="表情">
                        <SwipeableViews style={{paddingTop: 22}}>
                            {
                                this.getEmotion()
                            }
                        </SwipeableViews>
                    </Tab>
                </Tabs>
            </div>
        );
    }

    getEmotion() {
        const ROW_NUMBER = 8;
        let html = [];
        const swipeLength = (emotionIcons.length - (emotionIcons.length % ROW_NUMBER)) / ROW_NUMBER + 1;
        for (let i = 0; i < swipeLength; i++) {
            html.push(
                <div key={"emotion_group_" + i} style={{display: "flex", flexWrap: "wrap", padding: "8px 4px"}}>
                    {
                        emotionIcons.map((emotion, index) => {
                            const {id, name, url} = emotion;
                            if (index >= i * ROW_NUMBER && index < (i + 1) * ROW_NUMBER) {
                                return <span key={index}
                                             style={{width: "25%", padding: 6, fontSize: 12, textAlign: "center"}}>
                                    <img src={url} alt='' style={{maxWidth: "100%"}}/>
                                    {name}
                                </span>;
                            }
                        })
                    }
                </div>
            );
        }
        return html;
    }

    getFastWord() {
        return <List>
            {
                fastWords.map((word, i) => (
                    <ListItem key={i} primaryText={word.value}/>
                ))
            }
        </List>;

    }
}

// 映射state到props
const mapStateToProps = (state, ownProps) => {
    return {};
};
// 映射dispatch到props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Barrage));
