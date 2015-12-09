import React from "react"
import styles from "./CircleButton.css";

import ListActions from "./../../actions/ListActions2";

class CircleButton extends React.Component {
    setHover() {
        ListActions.setHover(this.props.id);
    }
    setHoverNull() {
        ListActions.setHover(null);
    }
    remove(id) {
        ListActions.removePerson(id);
    }
    render(){
        return(
            <div className={styles.border} onMouseOver={() => this.setHover()} onMouseOut={() => this.setHoverNull()} onClick={() => this.remove(this.props.id)}>
                <h2 className={styles.text} >{this.props.children}</h2>
            </div>
        );
    }
}

CircleButton.displayName = "DeleteButton";

export default CircleButton;

