'use strict';

exports.load = function (swagger) {

    var list, createToDo, deleteToDo;

    list = {
        'spec': {
            description: 'Get All ToDos',
            path: '/todos/',
            method: 'GET',
            summary: 'Get all ToDos',
            notes: '',
            type: 'ToDo',
            nickname: 'getToDos',
            produces: ['application/json']
        }
    };


    createToDo = {
        'spec': {
            description: 'Create a new ToDo Task.',
            path: '/todos',
            method: 'POST',
            summary: 'Create ToDo',
            notes: '',
            nickname: 'createToDO',
            produces: ['application/json'],
            parameters: [{
                name: 'body',
                description: 'Create a new ToDo Task.',
                required: true,
                type: 'createToDO',
                paramType: 'body',
                allowMultiple: false
            }]
        }
    };


    deleteToDo = {
        'spec': {
            description: 'Delete a ToDo Task.',
            path: '/todos/{todo_id}',
            method: 'DELETE',
            summary: 'Delete ToDo',
            notes: '',
            nickname: 'deleteToDO',
            produces: ['application/json'],
            parameters: [{
                name: 'todo_id',
                description: 'Delete a  ToDo Task.',
                required: true,
                type: 'deleteToDO',
                paramType: 'path',
                allowMultiple: false
            }]
        }
    };
    swagger.addGet(list);
    swagger.addPost(createToDo);
    swagger.addDelete(deleteToDo);

};
