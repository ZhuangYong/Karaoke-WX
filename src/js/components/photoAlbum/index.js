/**
 * Created by Zed on 2017/8/15.
 */
import React from 'react';
import {findDOMNode} from "react-dom";
import {GridList} from "material-ui/GridList";
import Badge from 'material-ui/Badge';
import PropTypes from "prop-types";

import SvgIcon from 'material-ui/SvgIcon';
import { toRem } from '../../utils/comUtils';

const blankImg = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
const styles = {
    tile: {
        display: "block",
        margin: `${toRem(25)} auto 0`,
        padding: 0,
        width: toRem(220),
        height: toRem(220),
        boxSizing: "border-box"
    },
    tileImg: {
        display: "block",
        margin: "auto",
        width: '100%',
        height: '100%'
    }
};

const AddIcon = (props) => {
    return (<SvgIcon
        style={props.style}
        viewBox="0 0 612 792">
        <polygon points="612,376.893 325.116,376.893 325.116,90.296 286.903,90.296 286.903,376.893 0,376.893 0,415.107 286.903,415.107 286.903,701.704 325.116,701.704 325.116,415.107 612,415.107"/>
    </SvgIcon>);
};

class InputBox extends React.Component {
    constructor(props) {
        super(props);

        this.addBtnTouchTap = this.addBtnTouchTap.bind(this);
        this.listenInputChange = this.listenInputChange.bind(this);
    }

    get addImgInp() {
        if (!this.refs)
            return {};

        return findDOMNode(this.refs.addImgInp);
    }

    /**
     * props
     * cols: 宫格列数
     * stopInput: 是否阻止input事件
     * data: { 数据
     *  id: 图片id
     *  isShowBadge: 是否显示右上角角标
     *  imgUrl: 图片地址
     * }
     * badgeBackgroundColor: 角标背景色
     * badgeContent: 角标内容
     * imgTouchTap: 图片点击事件
     * inputChange: input onChange事件
     * addBtnTouchTap: 添加按钮点击事件
     * style: GridList样式
     * itemStyle: item样式
     * badgeStyle: Badge样式
     * isShowSelectBorder: 是否显示选中时图片边框
     * @returns {XML}
     */

    render () {
        const {isShowSelectBorder, cols, style, itemStyle, badgeBackgroundColor, badgeStyle, badgeContent, imgStyle, imgTouchTap, isShowAddBtn} = this.props;
        const {data} = this.props || [];
        const dataList = (isShowAddBtn) ? [{addBtn: true}].concat(data) : data;

        return (
            <div>

                <GridList
                    cellHeight={'auto'}
                    cols={cols || 2}
                    padding={0}
                    style={{
                        margin: 0,
                        padding: `0 ${toRem(20)}`,
                        boxSizing: "border-box",
                        ...style
                    }}>

                    {dataList.map((item) => (
                        item.addBtn ? <div key={99999999}
                           style={{
                               ...styles.tile,
                               backgroundColor: "#fff",
                               border: "1px solid #ccc",
                               ...itemStyle
                           }}
                           onClick={() => {
                               this.addBtnTouchTap();
                           }}>

                            <AddIcon style={{
                                position: "relative",
                                top: "20%",
                                left: "20%",
                                width: "60%",
                                height: "60%",
                                color: "#ccc"
                            }}/>

                            <input
                                ref="addImgInp"
                                type="file"
                                accept="image/*"
                                style={{display: "none"}}
                                onChange={this.listenInputChange}/>

                        </div> : <Badge
                            key={item.id}
                            style={{...styles.tile, ...itemStyle}}
                            badgeStyle={{
                                display: item.isShowBadge ? "block" : "none",
                                position: "absolute",
                                backgroundColor: badgeBackgroundColor,
                                ...badgeStyle
                            }}
                            badgeContent={<div onClick={() => this.badgeContentClick(item.id)}>{badgeContent}</div>}
                            onClick={() => {
                                imgTouchTap && imgTouchTap(item);
                            }}>

                            <img
                                className="img-not-loaded"
                                src={item.imgUrl}
                                style={{
                                    ...styles.tileImg,
                                    border: (isShowSelectBorder && item.isShowBadge) ? `${toRem(8)} solid #ff6832` : 'none',
                                    ...imgStyle
                                }}
                                onError={function (e) {
                                    e.target.src = blankImg;
                                }}/>

                        </Badge>
                    ))}

                </GridList>

            </div>
        );
    }

    /**
     * 添加按钮点击事件
     */
    addBtnTouchTap() {
        this.props.addBtnTouchTap && this.props.addBtnTouchTap();

        !this.props.stopInput && this.addImgInp.click();
    }

    /**
     * 监听input[file] onChange事件
     */
    listenInputChange() {

        const file = this.addImgInp.files[0];
        if (file && this.props.inputChange)
            this.props.inputChange(file);
    }

    /**
     * 角标点击事件
     */
    badgeContentClick(id) {

        this.props.badgeContentClick && this.props.badgeContentClick(id);
    }
}

InputBox.propTypes = {
    cols: PropTypes.number,
    stopInput: PropTypes.bool,
    data: PropTypes.array,
    isShowAddBtn: PropTypes.bool,
    style: PropTypes.object,
    itemStyle: PropTypes.object,
    badgeStyle: PropTypes.object,
    badgeBackgroundColor: PropTypes.string,
    badgeContent: PropTypes.object,
    imgTouchTap: PropTypes.func,
    inputChange: PropTypes.func,
    addBtnTouchTap: PropTypes.func,
    badgeContentClick: PropTypes.func,
    isShowSelectBorder: PropTypes.bool
};

InputBox.defaultProps = {
    cols: 3,
    stopInput: false,
    data: [],
    isShowAddBtn: true,
    style: {},
    itemStyle: {},
    badgeStyle: {},
    badgeBackgroundColor: "#a4c639",
    badgeContent: {},
    imgTouchTap: null,
    inputChange: null,
    addBtnTouchTap: null,
    badgeContentClick: null,
    isShowSelectBorder: false
};

export default InputBox;
