import TiptapTaskList from '@tiptap/extension-task-list'
import UniversalButton from '@/components/core/menu/button/UniversalButton.vue'
import { iconMap } from '@/config/iconMap'

const TaskList = TiptapTaskList.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor }) {
        return {
          component: UniversalButton,
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
