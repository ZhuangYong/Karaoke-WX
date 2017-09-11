/**
 * Created by Zed on 2017/8/23.
 */
import React from "react";
import {linkTo, toRem} from "../../utils/comUtils";
import {GridList, GridTile} from "material-ui";
import MoreHorizIcon from 'material-ui/svg-icons/navigation/more-horiz';

import defaultImg from "../../../img/common/tile_default.jpg";

class RecordingGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const recordsList = this.props.data;
        return (<GridList
            cellHeight={"auto"}
            style={{margin: `0 ${toRem(20)}`, clear: "both"}}
            cols={3}
        >
            {recordsList.map((tile) => (
                <GridTile
                    key={tile.uid}
                    style={{
                        position: "relative",
                        width: toRem(230),
                        height: toRem(230)
                    }}
                >
                    <img
                        src={tile.defaultImg}
                        onError={function (e) {
                            e.target.src = defaultImg;
                        }}
                        style={{
                            display: "block",
                            margin: "0 auto",
                            width: toRem(230),
                            height: toRem(230)
                        }}
                        onTouchTap={() => {
                            linkTo(`user/recordings/play/${tile.uid}`, false, null);
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            margin: "0 auto",
                            padding: `0 ${toRem(10)}`,
                            width: toRem(230),
                            height: toRem(60),
                            backgroundColor: "rgba(0, 0, 0, .5)",
                            boxSizing: "border-box"
                        }}
                        onClick={() => {
                            this.props.operateClick(tile.uid);
                        }}>
                        <div style={{
                            display: "inline-block",
                            width: toRem(160),
                            lineHeight: toRem(65),
                            color: "#fff",
                            fontSize: toRem(20),
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}>{tile.nameNorm}</div>
                        <MoreHorizIcon
                            style={{
                                float: "right",
                                width: toRem(34),
                                height: toRem(60),
                                color: "#fff"
                            }}/>
                    </div>
                </GridTile>
            ))}
        </GridList>);
    }
}

export default RecordingGrid;
