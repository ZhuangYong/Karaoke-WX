import React from 'react';
import intl from "react-intl-universal";

//
class NotFound extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div style={{textAlign: 'center'}}>
                <p style={{color: 'gray', fontSize: '4rem', fontWeight: 'bold'}}>404</p>
				<font color="gray">{intl.get("page.not.fund")}</font>
			</div>
		);
	}
}

export default NotFound;
