import { createStore } from "vuex";

export default createStore({
    state: {
        edit: {
            eid: '',
            isUpdate: false,
            editArticle: ''
        }
    },
    mutations: {
        addEditArticle(state, payload) {
            const { id, Markdowncontent } = payload;
            state.edit = { eid: id, isUpdate: true, editArticle: Markdowncontent };
        },
        cleanEditArticle(state, payload) {
            state.edit = { eid: '', isUpdate: false, editArticle: '' }
        }
    },
    actions: {

    }
})