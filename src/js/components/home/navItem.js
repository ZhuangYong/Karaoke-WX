import React from 'react';
import {GridTile} from "material-ui/GridList";

const style = {
    tile: {
        width: "90%",
        height: "80%",
        margin: "auto",
        overflow: "hidden"
    },
    tileImg: {
        height: "100%",
        margin: "auto",
        display: "inherit"
    }
};

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

            <GridTile
                title={item.title}
                titleStyle={{textAlign: "center", marginRight: "16px", marginTop: "20%", color: "black"}}
                titleBackground="transparent"
                onClick={this.linkTo}
            >
                <div style={style.tile}>
                    <img src={item.icon} style={style.tileImg}/>
                </div>
            </GridTile>
        );
    }
}

export default NavItem;
