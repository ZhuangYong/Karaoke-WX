/**
 * Created by Zed on 2017/9/11.
 */
import React from "react";
import {toRem} from "../../utils/comUtils";
import {GridList, GridTile} from "material-ui/GridList";

class BottomDrawer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const actions = this.props.actions;
        let btns = [];
        actions.forEach((item, ind) => {
            btns.push(<GridTile key={ind}>
                <div style={{width: "100%", height: toRem(170), display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {item}
                </div>
            </GridTile>);
        });
        return (<div>
            {this.props.open && (<section style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                height: toRem(170),
                borderTop: "1px solid #ddd",
                backgroundColor: "#fff",
                zIndex: 3
            }}>
                <GridList
                    cellHeight={"auto"}
                    style={{margin: 0, clear: "both"}}
                    cols={actions.length}>

                    {btns}
                </GridList>
                <div
                    onClick={this.props.onRequestChange}
                    style={{
                        position: "fixed",
                        top: 0,
                        right: 0,
                        bottom: toRem(170),
                        left: 0,
                        backgroundColor: "rgba(0, 0, 0, .3)",
                        zIndex: 3
                    }}>
                </div>
            </section>)}
        </div>);
    }
}

export default BottomDrawer;
