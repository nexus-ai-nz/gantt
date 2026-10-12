# Gantt chart – WeWeb component

Files: `ww-config.js` (editor properties) and `src/wwElement.vue` (component).

## Data
- `Tasks`: bind your Supabase `tasks` collection. Needs `start_date` (new column) and `due_date`.
- `Subtasks`: bind your `subtasks` collection. Linked to tasks through `task_id`.
- Column names are configurable under "Field: ..." properties.

## Events
- `task-click` / `subtask-click`: value = the clicked row.
- Component variable `selectedItem` holds the last clicked row.

## Styling
Every colour, font, size, row height, bar height and zoom level is a property in the editor.
