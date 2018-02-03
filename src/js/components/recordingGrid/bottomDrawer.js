/**
 * Created by Zed on 2017/9/11.
 */
import React from "react";
import {toRem} from "../../utils/comUtils";
import intl from 'react-intl-universal';
import {GridList, GridTile} from "material-ui/GridList";

const styles = {
    btn: {
        width: "100%",
        height: toRem(100),
        lineHeight: toRem(100),
        fontSize: toRem(36),
        color: 'rgb(34, 34, 34)',
        borderTop: "1px solid #ddd",
        backgroundColor: "#fff",
        textAlign: 'center'
    }
};

class BottomDrawer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {open, onRequestChange, actions} = this.props;

        return (open && (<section style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 6
        }}>
            <header
                onClick={onRequestChange}
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "rgba(0, 0, 0, .3)",
                    zIndex: -1
                }}>
            </header>

            <ul style={{
                listStyle: 'none',
                width: '100%',
                margin: 0,
                padding: 0
            }}>
                {
                    actions && actions.map(item => <li key={item.label} style={styles.btn} onClick={item.fun}>{item.label}</li>)
                }
            </ul>

            <footer style={{...styles.btn,
                borderTop: `${toRem(20)} solid #d7d7d7`
            }} onClick={onRequestChange}>{intl.get('button.cancel')}</footer>
        </section>));
    }
}

export default BottomDrawer;
