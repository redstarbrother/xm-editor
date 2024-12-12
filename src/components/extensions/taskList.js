import TiptapTaskList from '@tiptap/extension-task-list'
import XmBaseButton from '../XmBaseButton.vue'

const TaskList = TiptapTaskList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: XmBaseButton,
          componentProps: {
            name: 'taskList',
            isActive: () => editor.isActive('taskList'),
            execute: () => editor.commands.toggleTaskList(),
          },
        }
      },
    }
  },
})

export default TaskList
