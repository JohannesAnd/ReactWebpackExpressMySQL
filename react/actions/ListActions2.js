import alt from "./../alt";
import {json} from "../utils/fetch";

class ListActions {
    fetchList() {
        json("GET", "/getPersons", (result) => {
            this.actions.setList(result.data);
        },()=>{},null);
    }
    addPerson(personObj) {
        json("POST", "/addPerson", () => {
            this.actions.fetchList();
        }, () => {}, personObj);
    }
    removePerson(id) {
        json("DELETE", "/removePerson", () => {
            this.actions.fetchList();
        }, () => {}, {id});
    }
    increase(id) {
        json("POST", "/increase/"+id, () => {
            this.actions.fetchList();
        }, () => {}, {});
    }
    decrease(id) {
        json("POST", "/decrease/"+id, () => {
            this.actions.fetchList();
        }, () => {}, {});
    }

    setList(list) {
        this.dispatch(list);
    }

    setHover(id) {
        this.dispatch(id);
    }
};

export default alt.createActions(ListActions);