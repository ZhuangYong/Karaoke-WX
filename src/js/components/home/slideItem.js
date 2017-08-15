import React from 'react';

class SlideItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClk = this.handleClk.bind(this);
    }

    handleClk() {
        let item = this.props.item;
        this.props.skip(item.responseAddr, item.responseType, item.title, item.img, item);
    }

    render() {
        let item = this.props.item;

        return (
            <div
                className="slider-item"
                onClick={this.handleClk}
                style={{backgroundImage: 'url(' + item.img + ')'}}>
            </div>
        );
    }
}

export default SlideItem;
