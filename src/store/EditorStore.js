import { defineStore } from 'pinia';
import { Editor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit'

export const useEditorStore = defineStore('editor', {
    state: () => ({
        editor: null,
        inited: false,
    }),
    getters: {
        getEditor: () => this.editor,
    },
    actions: {
        isInit() {
            return this.inited;
        },
        initializeEditor(extensions, placeholder) {
            console.log("init editor");
            this.editor = new Editor({
                content: placeholder,
                extensions: extensions,
            });
            this.inited = true;
        },
        destroyEditor() {
            this.editor.destroy();
        }
    },
});