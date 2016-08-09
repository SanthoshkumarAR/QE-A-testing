exports.models = {

    ToDo: {
        id: 'ToDo'
    },

    createToDO: {
        id: 'createToDO',
        required: ['task_name'],
        properties: {
            text: {
                type: 'string',
                description: 'Task Name'
            }
        }
    },

    deleteToDO: {
        id: 'deleteToDO',
        required: ['todo_id'],
        properties: {
            todo_id: {
                type: 'string',
                description: 'Task ID'
            }
        }
    }
};
