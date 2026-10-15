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

## Clients
- Bind your `clients` collection to `Clients` (fields: `id`, `name`) and set `Tasks: client id field` (default `client_id`).
- Tasks are grouped under a client row (client > tasks > subtasks). Turn off with `Group tasks under their client`.
- A client dropdown sits in the top-left header. To drive it from your own dropdown instead, bind `Filter by client id`.
- Event `client-filter-change` fires when the built-in dropdown changes.

## Saving progress
Drag the handle on a bar. Two events fire (use one workflow for each):
- `task-progress-change`: `event.value.id`, `event.value.progress`
- `subtask-progress-change`: `event.value.id`, `event.value.parentId`, `event.value.progress`
Each workflow: Supabase update row, filter `id` = `event.value.id`, set `progress` = `event.value.progress`.

## Automatic save
By default the component saves dragged progress itself through WeWeb's Supabase connection (no workflow needed).
Settings: `Save progress to Supabase automatically`, table names, `Column set to now on save`.
On failure a red message appears and the bar reverts; event `progress-save-error` fires.
