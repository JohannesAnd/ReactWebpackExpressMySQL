import React from "react";
import ListActions from "./../../actions/ListActions2";

import CircleButton from "./../CircleButton";

import styles from "./ListEntry.css";

class ListEntry extends React.Component {

    setEdit(id) {
        ListActions.setEdit(id);
    }
    increase(id) {
        ListActions.increase(id);
    }
    decrease(id) {
        ListActions.decrease(id);
    }
    render() {
        let text = this.props.hover ? "X" : this.props.score
        return (
            <div className={styles.border}>
                    <CircleButton id={this.props.id}>
                        <p>{text}</p>
                    </CircleButton>
                <h2 className={styles.title}>{this.props.name}</h2>
                <h2 className={styles.increase} onClick={() => this.increase(this.props.id)}>{"+1"}</h2>
                <h2 className={styles.decrease} onClick={() => this.decrease(this.props.id)}>{"-1"}</h2>
            </div>
        );
    }
}

ListEntry.displayName = "List Entry";

export default ListEntry;