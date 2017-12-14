import React from 'react';
import intl from "react-intl-universal";

// 通用弹框提示组件, 可以传入的属性有：
// show 是否显示
// text 显示的文本
// ok 点击确定的回调
// cancel 点击取消的回调
// pureTip 是否是纯提示框，纯提示框时即使props中传入了cancel也不显示取消按钮
// 注： ok和cancel至少要有一个，通过在点击时设置外层传入的show为false，来隐藏Tips
class Tips extends React.Component {
	constructor (props) {
		super(props);
	}
	render () {
		let tipsBtns = [];
		const okText = this.props.okText || intl.get("button.sure");
		const cancelText = this.props.cancelText || intl.get("button.cancel");

		if (this.props.ok) {
			tipsBtns.push(
				<div className="btn btn-ok ft50" key={0} onClick={this.props.ok}>{okText}</div>
			);
		}
		if (!this.props.pureTip && this.props.cancel) {
			tipsBtns.push(
				<div className="btn btn-cancel ft50" key={1} onClick={this.props.cancel}>{cancelText}</div>
			);
		}

		return (
			<div className="tips-cover" style={{display: this.props.show ? 'block' : 'none'}}>
				<div className="tips-container">
					<div className="tips-text ft46">{this.props.text}</div>
					{tipsBtns}
				</div>
			</div>
		);
	}
}

export default Tips;
