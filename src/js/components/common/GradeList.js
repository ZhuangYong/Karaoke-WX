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
        const {w} = this.props.common;
        const cellHeight = 3.467 * w / 10 - 4;
        const cellPadding = 0.267 * w / 10;
        const cellMarinTop = 22 + 0.187 * w / 10;

        return (
            <div>
                {
                    title && (<CardTitle title={title}/>)
                }
                <GridList
                    cellHeight={cellHeight}
                    padding={cellPadding}
                    style={{margin: '0.133rem'}}
                    cols={2}
                >

                    {data.map((item) => (
                        <GridTile
                            key={item[idKey]}
                            title={item[labelKey]}
                            titleStyle={{
                                textAlign: "center",
                                marginRight: "16px",
                                marginTop: cellMarinTop,
                                color: "black",
                                fontSize: ".293rem"
                            }}
                            titleBackground="transparent"
                            onClick={() => {
                                linkTo(`${linkHead}${item[idKey]}/${item[labelKey]}/${encoding(item[imgKey])}`, false, null);
                            }}
                        >
                            <div>
                                <img className="img-not-loaded" src={item[imgKey]} style={{height: '2.8rem', width: "4.6rem", display: "table-cell", margin: "auto"}}/>
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
