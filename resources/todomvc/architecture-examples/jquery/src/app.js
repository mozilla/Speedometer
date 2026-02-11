/*global jQuery, Router */
jQuery(function ($) {
    'use strict';

    var util = {
        uuid: function () {
            /*jshint bitwise:false */
            var i, random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
            }

            return uuid;
        },
        pluralize: function (count, word) {
            return count === 1 ? word : word + 's';
        },
        store: function (namespace, data) {
            return [];
        },
        computeTaskPriority: function (index) {
            return 4 - (index % 5);
        }
    };

    var App = {
        ENTER_KEY: 13,
        ESCAPE_KEY: 27,
        init: function () {
            this.todos = util.store('todos-jquery');
            this.bindEvents();

            new Router({
                '/:filter': function (filter) {
                    this.filter = filter;
                    this.render();
                }.bind(this)
            }).init('/all');

            var dummyNodeToNotifyAppIsReady = document.createElement('div');
            dummyNodeToNotifyAppIsReady.id = 'appIsReady';
            document.body.appendChild(dummyNodeToNotifyAppIsReady);
        },
        bindEvents: function () {
            $('#new-todo').on('keyup', this.create.bind(this));
            $('#toggle-all').on('change', this.toggleAll.bind(this));
            $('#footer').on('click', '.clear-completed', this.destroyCompleted.bind(this));
            $('#todo-list')
                .on('change', '.toggle', this.toggle.bind(this))
                .on('dblclick', 'label', this.edit.bind(this))
                .on('keyup', '.edit', this.editKeyup.bind(this))
                .on('focusout', '.edit', this.update.bind(this))
                .on('click', '.destroy', this.destroy.bind(this));
        },
        render: function () {
            var todos = this.getFilteredTodos();
            $('#todo-list').html(this.renderTodos(todos));
            $('#main').toggle(todos.length > 0);
            $('#toggle-all').prop('checked', this.getActiveTodos().length === 0);
            this.renderFooter();
            $('#new-todo').focus();
            util.store('todos-jquery', this.todos);
        },
        renderTodos: function (todos) {
            var $list = $('<ul>');

            todos.forEach(function (item, index) {
                $list.append(this.createTodoElement(item, index));
            }.bind(this));

            return $list.html();
        },
        createTodoElement: function (item, index) {
            var $li = $('<li>')
                .attr('data-id', item.id)
                .attr('data-priority', util.computeTaskPriority(index));

            if (item.completed) {
                $li.addClass('completed');
            }

            var $view = $('<div>').addClass('view');
            var $checkbox = $('<input>')
                .addClass('toggle')
                .attr('type', 'checkbox')
                .prop('checked', item.completed);
            var $label = $('<label>').text(item.title);
            var $destroyBtn = $('<button>').addClass('destroy');

            $view.append($checkbox, $label, $destroyBtn);

            var $editInput = $('<input>')
                .addClass('edit')
                .val(item.title);

            $li.append($view, $editInput);
            return $li;
        },
        updateFooterCount: function () {
            var activeTodoCount = this.getActiveTodos().length;
            var activeTodoWord = util.pluralize(activeTodoCount, 'item');

            $('#todo-count')
                .html($('<strong>').text(activeTodoCount))
                .append(' ' + activeTodoWord + ' left');

            var completedTodos = this.todos.length - activeTodoCount;
            var $clearBtn = $('#footer .clear-completed');

            if (completedTodos > 0) {
                if ($clearBtn.length === 0) {
                    $('#footer').append($('<button>')
                        .addClass('clear-completed')
                        .text('Clear completed'));
                }
            } else {
                $clearBtn.remove();
            }
        },
        renderFooter: function () {
            var todoCount = this.todos.length;
            var activeTodoCount = this.getActiveTodos().length;
            var activeTodoWord = util.pluralize(activeTodoCount, 'item');
            var completedTodos = todoCount - activeTodoCount;

            var $footer = $('<div>');

            var $todoCount = $('<span>')
                .attr('id', 'todo-count')
                .addClass('todo-count')
                .append($('<strong>').text(activeTodoCount))
                .append(' ' + activeTodoWord + ' left');

            var $filters = $('<ul>')
                .attr('id', 'filters')
                .addClass('filters');

            var filters = [
                { name: 'all', label: 'All' },
                { name: 'active', label: 'Active' },
                { name: 'completed', label: 'Completed' }
            ];

            filters.forEach(function (filterItem) {
                var $link = $('<a>')
                    .attr('href', '#/' + filterItem.name)
                    .text(filterItem.label);

                if (this.filter === filterItem.name) {
                    $link.addClass('selected');
                }

                $filters.append($('<li>').append($link));
            }.bind(this));

            $footer.append($todoCount, $filters);

            if (completedTodos > 0) {
                var $clearBtn = $('<button>')
                    .addClass('clear-completed')
                    .text('Clear completed');
                $footer.append($clearBtn);
            }

            $('#footer').toggle(todoCount > 0).html($footer.html());
        },
        toggleAll: function (e) {
            var isChecked = $(e.target).prop('checked');

            this.todos.forEach(function (todo) {
                todo.completed = isChecked;
            });

            $('#todo-list li').each(function () {
                var $li = $(this);
                $li.toggleClass('completed', isChecked);
                $li.find('.toggle').prop('checked', isChecked);
            });

            this.updateFooterCount();
            util.store('todos-jquery', this.todos);
        },
        getActiveTodos: function () {
            return this.todos.filter(function (todo) {
                return !todo.completed;
            });
        },
        getCompletedTodos: function () {
            return this.todos.filter(function (todo) {
                return todo.completed;
            });
        },
        getFilteredTodos: function () {
            if (this.filter === 'active') {
                return this.getActiveTodos();
            }

            if (this.filter === 'completed') {
                return this.getCompletedTodos();
            }

            return this.todos;
        },
        destroyCompleted: function () {
            this.todos = this.getActiveTodos();
            this.filter = 'all';
            this.render();
        },
        // accepts an element from inside the `.item` div and
        // returns the corresponding index in the `todos` array
        indexFromEl: function (el) {
            var id = $(el).closest('li').data('id');
            var todos = this.todos;
            var i = todos.length;

            while (i--) {
                if (todos[i].id === id) {
                    return i;
                }
            }
        },
        create: function (e) {
            var $input = $(e.target);
            var val = $.trim($input.val());

            if (e.which !== this.ENTER_KEY || !val) {
                return;
            }

            var newTodo = {
                id: util.uuid(),
                title: val,
                completed: false
            };

            this.todos.push(newTodo);
            $input.val('');

            // Only add to DOM if it matches the current filter
            if (this.filter === 'all' || this.filter === 'active') {
                var index = this.todos.length - 1;
                $('#todo-list').append(this.createTodoElement(newTodo, index));
            }

            $('#main').show();
            $('#toggle-all').prop('checked', false);
            this.updateFooterCount();
            $('#footer').show();
            util.store('todos-jquery', this.todos);
        },
        toggle: function (e) {
            var i = this.indexFromEl(e.target);
            this.todos[i].completed = !this.todos[i].completed;

            var $li = $(e.target).closest('li');
            $li.toggleClass('completed');

            var allCompleted = this.getActiveTodos().length === 0;
            $('#toggle-all').prop('checked', allCompleted);

            this.updateFooterCount();
            util.store('todos-jquery', this.todos);
        },
        edit: function (e) {
            var $input = $(e.target).closest('li').addClass('editing').find('.edit');
            $input.val($input.val()).focus();
        },
        editKeyup: function (e) {
            if (e.which === this.ENTER_KEY) {
                e.target.blur();
            }

            if (e.which === this.ESCAPE_KEY) {
                $(e.target).data('abort', true).blur();
            }
        },
        update: function (e) {
            var el = e.target;
            var $el = $(el);
            var val = $el.val().trim();

            if (!val) {
                this.destroy(e);
                return;
            }

            var $li = $el.closest('li');

            if ($el.data('abort')) {
                $el.data('abort', false);
                var i = this.indexFromEl(el);
                $el.val(this.todos[i].title);
            } else {
                var i = this.indexFromEl(el);
                this.todos[i].title = val;
                $li.find('label').text(val);
                util.store('todos-jquery', this.todos);
            }

            $li.removeClass('editing');
        },
        destroy: function (e) {
            var $li = $(e.target).closest('li');
            this.todos.splice(this.indexFromEl(e.target), 1);
            $li.remove();

            $('#main').toggle(this.todos.length > 0);
            $('#footer').toggle(this.todos.length > 0);

            var allCompleted = this.getActiveTodos().length === 0;
            $('#toggle-all').prop('checked', allCompleted);

            this.updateFooterCount();
            util.store('todos-jquery', this.todos);
        }
    };

    window.app = App;
    window.app.init();
});
