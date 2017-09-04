import React from 'react';

//
class NotFound extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div style={{textAlign: 'center'}}>
                <p style={{color: 'gray', fontSize: '4rem', fontWeight: 'bold'}}>404</p>
				<font color="gray">你要的页面可能在路上！</font>
			</div>
		);
	}
}

export default NotFound;
