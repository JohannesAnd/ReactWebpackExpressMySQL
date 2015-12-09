import alt from "../alt";
import ListActions from "./../actions/ListActions2";

class ListStore {
    constructor() {
        this.entries = [];
        this.hover = null;
        this.editing = null;
        this.bindListeners({
            handleSetList: ListActions.SET_LIST,
            handleSetHover: ListActions.SET_HOVER
        });
    }

    handleSetList(list) {
        this.entries = list;
    }
    handleSetHover(id) {
        this.hover = id;
    }

}

export default alt.createStore(ListStore, "ListStore");