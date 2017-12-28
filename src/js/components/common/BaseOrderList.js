/**
 * Created by Zed on 2017/8/10.
 */

import React from "react";
import BaseComponent from "../../components/common/BaseComponent";

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import {reqHeader, toRem} from "../../utils/comUtils";
import Const from "../../utils/const";
import NoWifi from "../../components/common/NoWifi";
import {SvgIcon} from "material-ui";
import NoOrdering from "../../components/common/NoOrdering";
import intl from 'react-intl-universal';


const style = {
    orderings: {
        position: "absolute",
        paddingTop: toRem(20),
        height: "100%",
        overflowY: "auto",
        width: "100%"
    },
    loading: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        height: toRem(100),
        fontSize: toRem(28),
        alignItems: "center",
        clear: "both",
        backgroundColor: "#fff"
    },
    loadingBar: {
        boxShadow: "none",
        top: "none",
        left: "none",
        transform: "none",
        marginLeft: -50,
    }
};
const RightCircleIcon = (props) => (<SvgIcon
    style={props.style}
    viewBox='0 0 32 32'>
    <path style={{fillRule: "evenodd", clipRule: "evenodd"}} d="M20.536,15.121l-7.657-7.657c-0.391-0.391-1.024-0.391-1.414,0c-0.391,0.391-0.391,1.024,0,1.414L18.586,16l-7.121,7.121c-0.391,0.391-0.391,1.024,0,1.414c0.391,0.391,1.024,0.391,1.414,0l7.657-7.657c0.24-0.24,0.314-0.568,0.26-0.879C20.85,15.69,20.775,15.361,20.536,15.121z M16,0C7.163,0,0,7.164,0,16c0,8.837,7.163,16,16,16c8.837,0,16-7.163,16-16C32,7.164,24.837,0,16,0z M16,30C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2c7.732,0,14,6.268,14,14C30,23.732,23.732,30,16,30z"/>
</SvgIcon>);
const RightIcon = (props) => (<SvgIcon
    style={props.style}>
    <path style={{fillRule: "evenodd", clipRule: "evenodd"}} d="M13.729,11.236L1.722,0.294c-0.394-0.392-1.033-0.392-1.427,0c-0.394,0.392-0.394,1.028,0,1.42l11.283,10.283L0.296,22.28c-0.394,0.392-0.394,1.028,0,1.42c0.394,0.392,1.033,0.392,1.427,0l12.007-10.942c0.21-0.209,0.3-0.486,0.286-0.76C14.029,11.723,13.939,11.446,13.729,11.236z"/>
</SvgIcon>);

class BaseOrderList extends BaseComponent {
    constructor(props) {
        super(props);
        this.defaultState = {
            orderList: [],
            offLine: false,
            currentPage: 0,
            pageSize: 999,
            openDialog: false
        };

        this.handleAction = this.handleAction.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.actions = this.actions.bind(this);
    }

    componentDidUpdate(preProps) {

        if (preProps.orderList[this.state.dataKey + 'Stamp'] !== this.props.orderList[this.state.dataKey + 'Stamp']) {

            const {data} = this.props.orderList[this.state.dataKey + 'Data'];
            const {result} = data || [];

            this.setState({
                orderList: result
            });
        }
    }

    componentDidMount() {
        if (this.state.currentPage === 0)
            this.loadMoreAction();
    }

    render() {
        const {orderList, itemRules, itemStyle} = this.state;

        return (
            <section style={{
                backgroundColor: "#d7d7d7",
                minHeight: document.documentElement.clientHeight || document.body.clientHeight
            }}>
                {this.headerHtml()}

                {orderList && orderList.length > 0 ? (<div>
                    {orderList.map((item) => (<section
                        style={{
                            position: "relative",
                            backgroundColor: "#fff",
                            marginBottom: toRem(20)
                        }}
                        onClick={() => {
                            this.itemClick(item);
                        }}
                        key={item.id}>

                        {this.itemHeaderHtml(item)}

                        <ul style={Object.assign({}, {
                            listStyle: "none",
                            padding: "0 15px",
                            margin: 0,
                            fontSize: toRem(28),
                            color: "#999",
                            lineHeight: toRem(60)
                        }, itemStyle || {})}>
                            {itemRules && itemRules.map(rule => <li key={rule.name}>
                                {rule.name}<span style={{color: "#212121"}}>{item[rule.key] || rule.label || (rule.content && rule.content(item))}</span>
                                {rule.rightBtn && <span style={{
                                    color: parseInt(item.status, 10) === 3 ? "#fd6934" : "#999",
                                    float: "right"
                                }}>
                                    <span>{parseInt(item.status, 10) === 3 ? intl.get("invoice.done") : intl.get("invoice.waiting")}</span>
                                    <RightIcon style={{
                                        marginLeft: toRem(10),
                                        width: toRem(16.5),
                                        height: toRem(24),
                                        color: parseInt(item.status, 10) === 3 ? "#fd6934" : "#999"
                                    }}/>
                                </span>}
                            </li>)}
                        </ul>

                        {this.itemFooterHtml(item)}

                    </section>))}

                    <div style={style.loading}>
                        <span>亲爱滴，已经到底了</span>
                    </div>

                    <Dialog
                        className="dialog-panel"
                        actionsContainerStyle={{borderTop: ".01rem solid #e0e0e0", textAlign: 'center'}}
                        contentStyle={{textAlign: 'center'}}
                        actions={this.actions()}
                        modal={false}
                        open={this.state.openDialog}
                        onRequestClose={this.handleClose}>
                        确认删除订单吗？
                    </Dialog>

                </div>) : (<div>
                    {this.state.offLine ? (<NoWifi style={{paddingTop: toRem(350)}} />) : (<NoOrdering style={{paddingTop: toRem(350)}} />)}
                </div>)}

                {this.footerHtml()}
            </section>
        );
    }

    itemClick(item) {}

    rightClick() {}

    /**
     * 页面头部
     * @returns {XML}
     */
    headerHtml() {
        const {title, rightTitle} = this.state;
        return <header style={{
            width: "100%",
            height: toRem(110),
            backgroundColor: "#fff",
            borderBottom: "2px solid #d7d7d7"}}>
            <div style={{
                float: "left",
                marginLeft: toRem(20),
                lineHeight: toRem(110),
                color: "#212121",
                fontSize: toRem(36)
            }}>{title}</div>
            <div style={{
                float: "right",
                marginRight: toRem(20)
            }}
                 onClick={this.rightClick}>
                            <span style={{
                                lineHeight: toRem(110),
                                color: "#fd6a31",
                                fontSize: toRem(24)
                            }}>{rightTitle}</span>

                <RightCircleIcon style={{
                    position: "relative",
                    top: toRem(5),
                    marginLeft: toRem(20),
                    color: "#ff7d4f",
                    width: toRem(30),
                    height: toRem(30)
                }}/>
            </div>
        </header>;
    }

    /**
     * 页面底部
     * @returns {XML}
     */
    footerHtml() {
        return '';
    }

    /**
     * 列表单元项头部
     * @returns {XML}
     */
    itemHeaderHtml(item) {
        return (item.nickName && item.headerImg) && (<header>
            <ListItem
                disabled={true}
                leftAvatar={
                    <Avatar src={item.headerImg}/>
                }
                primaryText={item.nickName}
            />
        </header>);
    }

    /**
     * 列表单元项底部
     * @returns {XML}
     */
    itemFooterHtml(item) {
        return '';
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction() {
        const {getListAction} = this.props;
        const {pageSize, currentPage} = this.state;
        let param = {page: currentPage + 1, pageSize: pageSize};
        // 请求数据
        getListAction && getListAction(param, reqHeader(param), null, (msg, err) => {
            if (err.code === Const.CODE_OFF_LINE) {
                this.setState({
                    offLine: true,
                    loading: false
                });
            }
        });
    }

    /**
     * 对话框按钮组
     * @returns {[XML,XML]}
     */
    actions() {
        return [
            <FlatButton
                className="cancel-button"
                label="取消"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                className="sure-button"
                label="确认"
                primary={true}
                onClick={this.handleAction}
            />,
        ];
    }

    /**
     * 对话框确认时调用
     */
    handleAction() {
        this.setState({openDialog: false});
    }

    /**
     * 关闭对话框时调用
     */
    handleClose() {
        this.setState({openDialog: false});
    }
}

export default BaseOrderList;
