import React from 'react';
import RefreshIndicator from "material-ui/RefreshIndicator";
import PropTypes from "prop-types";
import { toRem } from '../../utils/comUtils';

const imgMax = {
    gifSize: 80,
    screenW: document.documentElement.clientWidth || document.body.clientWidth,
    screenH: document.documentElement.clientHeight || document.body.clientHeight
};
//
class SubmitLoading extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
	    const {style, hide, hideGif, gifStyle} = this.props;
		return (
            !hide && <div className="globalMask" style={style}>
                {!hideGif && <RefreshIndicator
                    size={imgMax.gifSize}
                    left={(imgMax.screenW - imgMax.gifSize) / 2}
                    top={(imgMax.screenH - imgMax.gifSize * 3) / 2}
                    loadingColor="#FF9800"
                    status="loading"
                    style={Object.assign({}, {
                        background: 'none',
                        boxShadow: 'none'
                    }, gifStyle)}
                />}
            </div>
		);
	}
}


SubmitLoading.propTypes = {
    style: PropTypes.object,
    gifStyle: PropTypes.object,
    hide: PropTypes.bool,
    hideGif: PropTypes.bool
};

export default SubmitLoading;
