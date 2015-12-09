import React from "react";
import ListEntry from "./../ListEntry";
import connectToStores from "alt/utils/connectToStores";

import ListStore from "./../../stores/ListStore";
import ListActions from "./../../actions/ListActions2";
import styles from "./ListContainer.css";

function getListComponents(entries, comp) {
    if (entries) {
        return entries.map(function(entry){
            return (
                <ListEntry editing={entry.id === comp.props.editing} key={entry.id} id={entry.id} name={entry.name} hover={comp.props.hover === entry.id} score={entry.score} color={"#FFF"}/>
            );
        });
    } else {
        return null;
    }

}

class ListContainer extends React.Component {

    componentDidMount() {
        console.log("fetching list");
        ListActions.fetchList();
    }

    static getStores() {
        return [ListStore]
    }

    static getPropsFromStores() {
        return ListStore.getState();
    }

    addPerson(element) {
        if (element.name !== "" && element.score !== ""){
            ListActions.addPerson(element);
        }
    }

    setEdit(id) {
        ListActions.setEdit(id);
    }


    render() {
        let list = getListComponents(this.props.entries, this);
        return(
            <div className={styles.border}>
                {list}
                <form onSubmit= {(event) => {
                    event.preventDefault();
                    let name = React.findDOMNode(this.refs.name);
                    let score = React.findDOMNode(this.refs.score);
                    this.addPerson({
                        name: name.value.trim(),
                        score: score.value.trim()
                    });
                    name.value = "";
                    score.value = "";
                }}>
                    Name: <input type="text" name="fname" ref="name"/>
                    Score: <input type="number" name="lname" ref="score"/>
                    <input type="submit" value="Submit"/>
                </form>
                <h3 onClick={this.addPerson.bind({}, {name: "Person", score: 4})}>{"Add person"}</h3>
            </div>
        );
    }
}

export default connectToStores(ListContainer);