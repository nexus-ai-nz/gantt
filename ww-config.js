const label = en => ({ en });
const color = (en, defaultValue) => ({ label: label(en), type: 'Color', section: 'style', bindable: true, defaultValue });
const text = (en, defaultValue, section = 'settings') => ({ label: label(en), type: 'Text', section, bindable: true, defaultValue });
const num = (en, defaultValue, options = {}, section = 'style') => ({
  label: label(en),
  type: 'Number',
  section,
  bindable: true,
  defaultValue,
  options: { min: 0, ...options },
});
const toggle = (en, defaultValue, section = 'settings') => ({ label: label(en), type: 'OnOff', section, bindable: true, defaultValue });

export default {
  editor: {
    label: label('Gantt chart'),
    icon: 'chart',
  },
  triggerEvents: [
    { name: 'task-click', label: label('On task bar click'), event: { value: {} } },
    { name: 'client-filter-change', label: label('On client filter change'), event: { value: '' } },
    { name: 'subtask-click', label: label('On subtask bar click'), event: { value: {} } },
  ],
  properties: {
    // ---------- Data ----------
    tasks: {
      label: label('Tasks'),
      type: 'Array',
      section: 'settings',
      bindable: true,
      defaultValue: [
        { id: 1, client_id: 1, name: 'Client onboarding flow', status: 'in progress', start_date: '2026-10-05', due_date: '2026-10-17', progress: 80, priority: 1 },
        { id: 2, client_id: 1, name: 'Order management ERP', status: 'in progress', start_date: '2026-10-11', due_date: '2026-11-01', progress: 35, priority: 2 },
        { id: 3, client_id: 2, name: 'Monthly invoicing run', status: 'done', start_date: '2026-10-07', due_date: '2026-10-11', progress: 100, priority: 3 },
      ],
    },
    subtasks: {
      label: label('Subtasks'),
      type: 'Array',
      section: 'settings',
      bindable: true,
      defaultValue: [
        { id: 1, task_id: 1, name: 'Collect requirements', status: 'done', start_date: '2026-10-05', due_date: '2026-10-09', progress: 100, sort_order: 1 },
        { id: 2, task_id: 1, name: 'Build intake form', status: 'in progress', start_date: '2026-10-09', due_date: '2026-10-14', progress: 75, sort_order: 2 },
        { id: 3, task_id: 2, name: 'Supabase schema', status: 'in progress', start_date: '2026-10-11', due_date: '2026-10-17', progress: 90, sort_order: 1 },
        { id: 4, task_id: 2, name: 'WeWeb order screens', status: 'in progress', start_date: '2026-10-16', due_date: '2026-10-26', progress: 30, sort_order: 2 },
      ],
    },

    clients: {
      label: label('Clients'),
      type: 'Array',
      section: 'settings',
      bindable: true,
      defaultValue: [
        { id: 1, name: 'Roofing Hub' },
        { id: 2, name: 'L&A Apparel' },
      ],
    },

    // ---------- Field mapping ----------
    clientField: text('Tasks: client id field', 'client_id'),
    clientNameField: text('Tasks: client name field (auto-detected: clients.name, client.name, client_name)', ''),
    clientsIdField: text('Clients: id field', 'id'),
    clientsNameField: text('Clients: name field', 'name'),
    idField: text('Field: id', 'id'),
    nameField: text('Field: name', 'name'),
    statusField: text('Field: status', 'status'),
    startField: text('Field: start date', 'start_date'),
    endField: text('Field: end date', 'due_date'),
    createdField: text('Field: created at (fallback start)', 'created_at'),
    progressField: text('Field: progress (0-100)', 'progress'),
    priorityField: text('Field: priority (1-3)', 'priority'),
    parentField: text('Subtasks: parent task id field', 'task_id'),
    sortField: text('Subtasks: sort field', 'sort_order'),
    doneStatuses: text('Statuses counted as done (comma separated)', 'done,completed,complete'),
    todoStatuses: text('Statuses counted as to do (comma separated)', 'todo,to do,not started,open,backlog'),

    // ---------- Behaviour ----------
    viewMode: {
      label: label('Zoom'),
      type: 'TextSelect',
      section: 'settings',
      bindable: true,
      defaultValue: 'day',
      options: {
        options: [
          { value: 'day', label: label('Day') },
          { value: 'week', label: label('Week') },
          { value: 'month', label: label('Month') },
        ],
      },
    },
    startDate: text('Force chart start (YYYY-MM-DD, optional)', ''),
    endDate: text('Force chart end (YYYY-MM-DD, optional)', ''),
    groupByClient: toggle('Group tasks under their client', true),
    showClientFilter: toggle('Show client filter dropdown', true),
    filterClientId: text('Filter by client id (bind to your own dropdown, optional)', ''),
    allClientsLabel: text('Filter: "all clients" label', 'All clients'),
    noClientLabel: text('Label for tasks without a client', 'No client'),
    includeToday: toggle('Always include today in range', true),
    defaultExpanded: toggle('Expand tasks by default', true),
    autoParentProgress: toggle('Parent progress = average of subtasks', false),
    showToday: toggle('Show today line', true),
    showWeekends: toggle('Shade weekends', true),
    showPriority: toggle('Show priority dot', true),
    showProgressLabel: toggle('Show % on task bars', true),
    headerLabel: text('Left column title', 'Task'),
    emptyText: text('Empty text', 'No tasks to display'),
    locale: text('Date locale', 'en-NZ'),

    // ---------- Layout ----------
    leftColumnWidth: num('Left column width (px)', 240),
    rowHeight: num('Row height (px)', 40),
    headerHeight: num('Header row height (px)', 28),
    barRatio: num('Task bar height (0-1)', 0.55, { max: 1, step: 0.05 }),
    clientBarRatio: num('Client bar height (0-1)', 0.3, { max: 1, step: 0.05 }),
    subBarRatio: num('Subtask bar height (0-1)', 0.35, { max: 1, step: 0.05 }),
    barRadius: num('Bar corner radius (px)', 4),
    trackOpacity: num('Bar background strength (%)', 20, { max: 100 }),
    dayWidthDay: num('Pixels per day (Day zoom)', 32),
    dayWidthWeek: num('Pixels per day (Week zoom)', 14),
    dayWidthMonth: num('Pixels per day (Month zoom)', 5),
    maxHeight: text('Max height (e.g. 600px, optional)', '', 'style'),
    borderRadius: num('Container corner radius (px)', 12),

    // ---------- Typography ----------
    fontFamily: text('Font family', 'inherit', 'style'),
    fontSize: num('Font size (px)', 13),

    // ---------- Colours ----------
    backgroundColor: color('Background', '#ffffff'),
    headerBackground: color('Header background', '#f6f7f9'),
    textColor: color('Text', '#1f2430'),
    secondaryTextColor: color('Secondary text', '#6b7280'),
    borderColor: color('Border', '#e3e6ea'),
    gridLineColor: color('Grid lines', '#eef0f3'),
    weekendColor: color('Weekend shading', '#f7f8fa'),
    todayLineColor: color('Today line', '#d64545'),
    clientRowBackground: color('Client row background', '#f1f2f7'),
    colorClient: color('Client bar', '#5b4fd6'),
    colorInProgress: color('Bar: in progress', '#2f6fed'),
    colorDone: color('Bar: done', '#2e9e5b'),
    colorOverdue: color('Bar: overdue', '#d64545'),
    colorTodo: color('Bar: to do', '#8a8f98'),
    colorPriorityHigh: color('Priority 1 (high)', '#d64545'),
    colorPriorityMedium: color('Priority 2 (medium)', '#e0a526'),
    colorPriorityLow: color('Priority 3 (low)', '#8a8f98'),
  },
};
