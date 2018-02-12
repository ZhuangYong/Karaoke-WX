/**
 * Created by walljack@163.com on 2017/8/7.
 */
import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import BaseComponent from "./BaseComponent";
import PropTypes from "prop-types";
import {BottomNavigation, BottomNavigationItem, Card, CardTitle, GridList, GridTile} from "material-ui";
import {linkTo} from "../../utils/comUtils";
import {btoa as encoding} from "Base64";

class GradeList extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;
        const labelKey = this.props.labelKey;
        const imgKey = this.props.imgKey;
        const idKey = this.props.idKey;
        const linkHead = this.props.linHeadKey;
        const title = this.props.title;
        const {w, h} = this.props.common;
        let cellHeight = 3.467 * w / 10 - 4;
        let cellPadding = 0.267 * w / 10;
        let rowNumber = 2;
        if (w >= 568 && h < w) {
            rowNumber = 3;
            cellPadding = 0.16 * w / 10;
            cellHeight = 2.28 * w / 10 - 4;
        }

        return (
            <div>
                {
                    title && (<CardTitle title={title}/>)
                }
                <GridList
                    cellHeight={cellHeight}
                    padding={cellPadding}
                    style={{margin: '0.133rem'}}
                    cols={rowNumber}
                >

                    {data.map((item) => (
                        <GridTile
                            className="grade-tile"
                            key={item[idKey]}
                            title={item[labelKey]}
                            titleStyle={{
                                display: "flex",
                                marginRight: "16px",
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: "black",
                                fontSize: ".293rem"
                            }}
                            titleBackground="transparent"
                            onClick={() => {
                                if (item[labelKey]) linkTo(`${linkHead}${item[idKey]}/${item[labelKey].replace(/\s+/g, " ")}/${encodeURIComponent(encoding(item[imgKey]))}`, false, null);
                            }}
                        >
                            <div style={{height: '83%'}} className="img-not-loaded">
                                <img src={item[imgKey]} style={{width: "100%", display: "table-cell", margin: "auto"}}/>
                            </div>
                        </GridTile>
                    ))}
                </GridList>
            </div>

        );
    }
}

GradeList.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    labelKey: PropTypes.string,
    imgKey: PropTypes.string,
    idKey: PropTypes.string,
    linHeadKey: PropTypes.string
};
GradeList.defaultProps = {
    data: []
};

export default withRouter(connect(
    (state) => {
        return {common: state.app.common};
    },
    () => {
        return {};
    }
)(GradeList));
