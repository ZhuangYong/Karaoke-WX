/**
 * Created by Zed on 2017/8/15.
 */
import React from 'react';
import {findDOMNode} from "react-dom";
import {GridList} from "material-ui/GridList";
import Badge from 'material-ui/Badge';

import defaultImg from "../../../img/common/tile_default.jpg";
import SvgIcon from 'material-ui/SvgIcon';

const style = {
    tile: {
        display: "block",
        margin: "0 auto",
        padding: 0,
        width: "72px",
        height: "70px",
        boxSizing: "border-box"
    },
    tileImg: {
        display: "block",
        margin: "auto",
        width: "100%",
        height: "100%"
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

    componentDidMount () {
    }

    /**
     * props
     * cellHeight: 宫格高度
     * cols: 宫格列数
     * data: { 数据
     *  id: 图片id
     *  isShowBadge: 是否显示右上角角标
     *  imgUrl: 图片地址
     *  isShowAddBtn: 是否显示添加图片按钮
     * }
     * badgeBackgroundColor: 角标背景色
     * badgeContent: 角标内容
     * imgTouchTap: 图片点击事件
     * inputChange: input onChange事件
     * addBtn: { 添加按钮
     *  isLoadImg: 是否允许上传图片
     *  disabledTip: 禁止上传图片提示语
     * }
     * addBtnTouchTap: 添加按钮点击事件
     * style: GridList样式
     * itemStyle: item样式
     * badgeStyle: Badge样式
     * @returns {XML}
     */

    render () {
        return (
            <GridList
                cellHeight={"auto"}
                cols={this.props.cols}
                style={Object.assign({}, {
                    margin: 0,
                    padding: "0 10px",
                    boxSizing: "border-box"
                }, this.props.style)}
            >
                {this.props.data.map((item) => (
                    <Badge
                        key={item.id}
                        data-id={item.id}
                        style={Object.assign({}, style.tile, this.props.itemStyle)}
                        badgeStyle={Object.assign({}, {
                            display: item.isShowBadge ? "block" : "none",
                            position: "absolute",
                            backgroundColor: this.props.badgeBackgroundColor || "#a4c639",
                        }, this.props.badgeStyle)}
                        badgeContent={this.props.badgeContent}
                    >
                        {!item.isShowAddBtn ? (<img
                            src={item.imgUrl}
                            style={style.tileImg}
                            onError={function (e) {
                                e.target.src = defaultImg;
                            }}
                            onTouchTap={() => {
                                if (this.props.imgTouchTap) {
                                    this.props.imgTouchTap(item);
                                }
                            }}
                        />) : (<div
                            style={Object.assign({}, style.tileImg, {
                                backgroundColor: "#fff",
                                border: "1px solid #ccc"
                            })}
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
                                onChange={this.listenInputChange}
                            />
                        </div>)}
                    </Badge>
                ))}
            </GridList>

        );
    }

    // 添加按钮点击事件
    addBtnTouchTap() {
        const addBtnTouchTap = this.props.addBtnTouchTap;
        if (addBtnTouchTap) {
            addBtnTouchTap();
            return;
        }
        const addBtn = this.props.addBtn;
        if (addBtn || addBtn.isLoadImg === true) {
            return this.addImgInp.click();
        }
        return alert(addBtn.disabledTip || '不能再添加图片咯');
    }

    listenInputChange() {

        let _this = this;

        let file = this.addImgInp.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function() {
                //处理 android 4.1 兼容问题
                let base64 = reader.result.split(',')[1];
                let dataUrl = 'data:image/png;base64,' + base64;

                _this.props.inputChange(dataUrl);
            };
            reader.readAsDataURL(file);
        }
    }
}

export default InputBox;
