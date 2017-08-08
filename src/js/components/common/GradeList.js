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
        return (
            <Card>
                {
                    title && (<CardTitle title={title}/>)
                }
                <GridList
                    cellHeight={100}
                    style={{margin: "6px"}}
                    cols={3}
                >

                    {data.map((item) => (
                        <GridTile
                            key={item[idKey]}
                            title={item[labelKey]}
                            titleStyle={{
                                textAlign: "center",
                                marginRight: "16px",
                                marginTop: "20%",
                                color: "black"
                            }}
                            titleBackground="transparent"
                            onClick={() => {
                                linkTo(linkHead + item[idKey], false, null);
                            }}
                        >
                            <div style={{height: "60%", overflow: "hidden"}}>
                                <img src={item[imgKey]} style={{width: "60%", display: "table-cell", margin: "auto"}}/>
                            </div>
                        </GridTile>
                    ))}
                </GridList>
            </Card>

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
    () => {
        return {};
    },
    () => {
        return {};
    }
)(GradeList));
