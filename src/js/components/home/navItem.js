import React from 'react';

class NavItem extends React.Component {
    constructor(props) {
        super(props);
        this.linkTo = this.linkTo.bind(this);
    }

    linkTo() {
        var item = this.props.item;
        this.props.linkTo(item.link, item.requireLogin, item.info);
    }

    render() {
        var item = this.props.item;

        return (
            <div
                style={{backgroundImage: 'url(' + HYAPP.ContextPath + '/image/page/' + item.icon + '.png)'}}
                className={"nav-item" + (this.props.middle ? ' middle' : '')}
                onClick={this.linkTo}>{item.info}</div>
        );
    }
}

export default NavItem;
