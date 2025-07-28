import TiptapTaskList from '@tiptap/extension-task-list'
import BaseButtonComponent from '@/components/menu/BaseButtonComponent.vue'
import { iconMap } from '@/config/iconMap'

const TaskList = TiptapTaskList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: BaseButtonComponent,
          componentProps: {
            icon: iconMap['taskList'],
            isActive: () => editor.isActive('taskList'),
            execute: () => editor.commands.toggleTaskList(),
          },
        }
      },
    }
  },
})

export default TaskList
