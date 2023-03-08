"use strict";



define('todomvc/app', ['exports', 'ember', 'todomvc/resolver', 'ember-load-initializers', 'todomvc/config/environment'], function (exports, _ember, _todomvcResolver, _emberLoadInitializers, _todomvcConfigEnvironment) {

    var App = undefined;

    _ember['default'].MODEL_FACTORY_INJECTIONS = true;

    App = _ember['default'].Application.extend({
        modulePrefix: _todomvcConfigEnvironment['default'].modulePrefix,
        podModulePrefix: _todomvcConfigEnvironment['default'].podModulePrefix,
        Resolver: _todomvcResolver['default']
    });

    (0, _emberLoadInitializers['default'])(App, _todomvcConfigEnvironment['default'].modulePrefix);

    exports['default'] = App;
});
define('todomvc/components/todo-item', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        repo: _ember['default'].inject.service(),
        tagName: 'li',
        editing: false,
        classNameBindings: ['todo.completed', 'editing'],

        actions: {
            startEditing: function startEditing() {
                this.get('onStartEdit')();
                this.set('editing', true);
                _ember['default'].run.scheduleOnce('afterRender', this, 'focusInput');
            },

            doneEditing: function doneEditing(todoTitle) {
                if (!this.get('editing')) {
                    return;
                }
                if (_ember['default'].isBlank(todoTitle)) {
                    this.send('removeTodo');
                } else {
                    this.set('todo.title', todoTitle.trim());
                    this.set('editing', false);
                    this.get('onEndEdit')();
                }
            },

            handleKeydown: function handleKeydown(e) {
                if (e.keyCode === 13) {
                    e.target.blur();
                } else if (e.keyCode === 27) {
                    this.set('editing', false);
                }
            },

            toggleCompleted: function toggleCompleted(e) {
                var todo = this.get('todo');
                _ember['default'].set(todo, 'completed', e.target.checked);
                this.get('repo').persist();
            },

            removeTodo: function removeTodo() {
                this.get('repo')['delete'](this.get('todo'));
            }
        },

        focusInput: function focusInput() {
            this.element.querySelector('input.edit').focus();
        }
    });
});
define('todomvc/components/todo-list', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        repo: _ember['default'].inject.service(),
        tagName: 'section',
        elementId: 'main',
        classNames: ['main'],
        canToggle: true,
        allCompleted: _ember['default'].computed('todos.@each.completed', function () {
            return this.get('todos').isEvery('completed');
        }),

        actions: {
            enableToggle: function enableToggle() {
                this.set('canToggle', true);
            },

            disableToggle: function disableToggle() {
                this.set('canToggle', false);
            },

            toggleAll: function toggleAll() {
                var allCompleted = this.get('allCompleted');
                this.get('todos').forEach(function (todo) {
                    return _ember['default'].set(todo, 'completed', !allCompleted);
                });
                this.get('repo').persist();
            }
        }
    });
});
define('todomvc/controllers/active', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        todos: _ember['default'].computed.filterBy('model', 'completed', false)
    });
});
define('todomvc/controllers/application', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        repo: _ember['default'].inject.service(),
        remaining: _ember['default'].computed.filterBy('model', 'completed', false),
        completed: _ember['default'].computed.filterBy('model', 'completed'),
        actions: {
            createTodo: function createTodo(e) {
                if (e.keyCode === 13 && !_ember['default'].isBlank(e.target.value)) {
                    this.get('repo').add({ title: e.target.value.trim(), completed: false });
                    e.target.value = '';
                }
            },

            clearCompleted: function clearCompleted() {
                this.get('model').removeObjects(this.get('completed'));
                this.get('repo').persist();
            }
        }
    });
});
define('todomvc/controllers/completed', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        todos: _ember['default'].computed.filterBy('model', 'completed', true)
    });
});
define('todomvc/helpers/app-version', ['exports', 'ember', 'todomvc/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _todomvcConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _todomvcConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('todomvc/helpers/gt', ['exports', 'ember'], function (exports, _ember) {
    var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

    exports.gt = gt;

    function gt(_ref /*, hash*/) {
        var _ref2 = _slicedToArray(_ref, 2);

        var n1 = _ref2[0];
        var n2 = _ref2[1];

        return n1 > n2;
    }

    exports['default'] = _ember['default'].Helper.helper(gt);
});
define('todomvc/helpers/pluralize', ['exports', 'ember', 'ember-inflector'], function (exports, _ember, _emberInflector) {
    var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

    exports.pluralizeHelper = pluralizeHelper;

    function pluralizeHelper(_ref /*, hash*/) {
        var _ref2 = _slicedToArray(_ref, 2);

        var singular = _ref2[0];
        var count = _ref2[1];

        return count === 1 ? singular : (0, _emberInflector.pluralize)(singular);
    }

    exports['default'] = _ember['default'].Helper.helper(pluralizeHelper);
});
define('todomvc/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('todomvc/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'todomvc/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _todomvcConfigEnvironment) {
  var _config$APP = _todomvcConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('todomvc/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('todomvc/initializers/export-application-global', ['exports', 'ember', 'todomvc/config/environment'], function (exports, _ember, _todomvcConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_todomvcConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _todomvcConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_todomvcConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('todomvc/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('todomvc/router', ['exports', 'ember', 'todomvc/config/environment'], function (exports, _ember, _todomvcConfigEnvironment) {

    var Router = _ember['default'].Router.extend({
        location: _todomvcConfigEnvironment['default'].locationType,
        rootURL: _todomvcConfigEnvironment['default'].rootURL
    });

    Router.map(function () {
        this.route('active');
        this.route('completed');
    });

    exports['default'] = Router;
});
define('todomvc/routes/application', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Route.extend({
        repo: _ember['default'].inject.service(),
        model: function model() {
            return this.get('repo').findAll();
        }
    });
});
define('todomvc/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('todomvc/services/memory', ['exports'], function (exports) {
  (function (root) {
    var localStorageMemory = {};
    var cache = {};

    /**
     * number of stored items.
     */
    localStorageMemory.length = 0;

    /**
     * returns item for passed key, or null
     *
     * @para {String} key
     *       name of item to be returned
     * @returns {String|null}
     */
    localStorageMemory.getItem = function (key) {
      return cache[key] || null;
    };

    /**
     * sets item for key to passed value, as String
     *
     * @para {String} key
     *       name of item to be set
     * @para {String} value
     *       value, will always be turned into a String
     * @returns {undefined}
     */
    localStorageMemory.setItem = function (key, value) {
      if (typeof value === 'undefined') {
        localStorageMemory.removeItem(key);
      } else {
        if (!cache.hasOwnProperty(key)) {
          localStorageMemory.length++;
        }

        cache[key] = '' + value;
      }
    };

    /**
     * removes item for passed key
     *
     * @para {String} key
     *       name of item to be removed
     * @returns {undefined}
     */
    localStorageMemory.removeItem = function (key) {
      if (cache.hasOwnProperty(key)) {
        delete cache[key];
        localStorageMemory.length--;
      }
    };

    /**
     * returns name of key at passed index
     *
     * @para {Number} index
     *       Position for key to be returned (starts at 0)
     * @returns {String|null}
     */
    localStorageMemory.key = function (index) {
      return Object.keys(cache)[index] || null;
    };

    /**
     * removes all stored items and sets length to 0
     *
     * @returns {undefined}
     */
    localStorageMemory.clear = function () {
      cache = {};
      localStorageMemory.length = 0;
    };

    root.localStorageMemory = localStorageMemory;
  })(window);
});
define('todomvc/services/repo', ['exports', 'ember', 'todomvc/services/memory'], function (exports, _ember, _todomvcServicesMemory) {
    exports['default'] = _ember['default'].Service.extend({
        lastId: 0,
        data: null,
        findAll: function findAll() {
            return this.get('data') || this.set('data', JSON.parse(window.localStorageMemory.getItem('todos') || '[]'));
        },

        add: function add(attrs) {
            var todo = Object.assign({ id: this.incrementProperty('lastId') }, attrs);
            this.get('data').pushObject(todo);
            this.persist();
            return todo;
        },

        'delete': function _delete(todo) {
            this.get('data').removeObject(todo);
            this.persist();
        },

        persist: function persist() {
            window.localStorageMemory.setItem('todos', JSON.stringify(this.get('data')));
        }
    });
});
define("todomvc/templates/active", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "aAsc4Lt8", "block": "{\"statements\":[[1,[33,[\"todo-list\"],null,[[\"todos\"],[[28,[\"todos\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "todomvc/templates/active.hbs" } });
});
define("todomvc/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "LO5Br/dD", "block": "{\"statements\":[[11,\"section\",[]],[15,\"id\",\"todoapp\"],[15,\"class\",\"todoapp\"],[13],[0,\"\\n  \"],[11,\"header\",[]],[15,\"id\",\"header\"],[15,\"class\",\"header\"],[13],[0,\"\\n    \"],[11,\"h1\",[]],[13],[0,\"todos\"],[14],[0,\"\\n    \"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"id\",\"new-todo\"],[15,\"class\",\"new-todo\"],[16,\"onkeydown\",[33,[\"action\"],[[28,[null]],\"createTodo\"],null],null],[15,\"placeholder\",\"What needs to be done?\"],[15,\"autofocus\",\"\"],[13],[14],[0,\"\\n  \"],[14],[0,\"\\n    \"],[1,[26,[\"outlet\"]],false],[0,\"\\n\"],[6,[\"if\"],[[33,[\"gt\"],[[28,[\"model\",\"length\"]],0],null]],null,{\"statements\":[[0,\"      \"],[11,\"footer\",[]],[15,\"id\",\"footer\"],[15,\"class\",\"footer\"],[13],[0,\"\\n        \"],[11,\"span\",[]],[15,\"id\",\"todo-count\"],[15,\"class\",\"todo-count\"],[13],[11,\"strong\",[]],[13],[1,[28,[\"remaining\",\"length\"]],false],[14],[0,\" \"],[1,[33,[\"pluralize\"],[\"item\",[28,[\"remaining\",\"length\"]]],null],false],[0,\" left\"],[14],[0,\"\\n        \"],[11,\"ul\",[]],[15,\"id\",\"filters\"],[15,\"class\",\"filters\"],[13],[0,\"\\n          \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"index\"],[[\"activeClass\"],[\"selected\"]],{\"statements\":[[0,\"All\"]],\"locals\":[]},null],[14],[0,\"\\n          \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"active\"],[[\"activeClass\"],[\"selected\"]],{\"statements\":[[0,\"Active\"]],\"locals\":[]},null],[14],[0,\"\\n          \"],[11,\"li\",[]],[13],[6,[\"link-to\"],[\"completed\"],[[\"activeClass\"],[\"selected\"]],{\"statements\":[[0,\"Completed\"]],\"locals\":[]},null],[14],[0,\"\\n        \"],[14],[0,\"\\n\"],[6,[\"if\"],[[28,[\"completed\",\"length\"]]],null,{\"statements\":[[0,\"          \"],[11,\"button\",[]],[15,\"id\",\"clear-completed\"],[15,\"class\",\"clear-completed\"],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"clearCompleted\"],null],null],[13],[0,\"Clear completed\"],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"      \"],[14],[0,\"\\n\"]],\"locals\":[]},null],[14],[0,\"\\n\"],[11,\"footer\",[]],[15,\"id\",\"info\"],[15,\"class\",\"info\"],[13],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"Double-click to edit a todo\"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"\\n    Created by\\n    \"],[11,\"a\",[]],[15,\"href\",\"http://github.com/cibernox\"],[13],[0,\"Miguel Camba\"],[14],[0,\",\\n    \"],[11,\"a\",[]],[15,\"href\",\"http://github.com/addyosmani\"],[13],[0,\"Addy Osmani\"],[14],[0,\"\\n  \"],[14],[0,\"\\n  \"],[11,\"p\",[]],[13],[0,\"Part of \"],[11,\"a\",[]],[15,\"href\",\"http://todomvc.com\"],[13],[0,\"TodoMVC\"],[14],[14],[0,\"\\n\"],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "todomvc/templates/application.hbs" } });
});
define("todomvc/templates/completed", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "F4la9wtb", "block": "{\"statements\":[[1,[33,[\"todo-list\"],null,[[\"todos\"],[[28,[\"todos\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "todomvc/templates/completed.hbs" } });
});
define("todomvc/templates/components/todo-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "dQ3+cK5E", "block": "{\"statements\":[[11,\"div\",[]],[15,\"class\",\"view\"],[13],[0,\"\\n  \"],[11,\"input\",[]],[15,\"type\",\"checkbox\"],[15,\"class\",\"toggle\"],[16,\"checked\",[28,[\"todo\",\"completed\"]],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"toggleCompleted\"],null],null],[13],[14],[0,\"\\n  \"],[11,\"label\",[]],[16,\"ondblclick\",[33,[\"action\"],[[28,[null]],\"startEditing\"],null],null],[13],[1,[28,[\"todo\",\"title\"]],false],[14],[0,\"\\n  \"],[11,\"button\",[]],[16,\"onclick\",[33,[\"action\"],[[28,[null]],\"removeTodo\"],null],null],[15,\"class\",\"destroy\"],[13],[14],[0,\"\\n\"],[14],[0,\"\\n\"],[11,\"input\",[]],[15,\"type\",\"text\"],[15,\"class\",\"edit\"],[16,\"value\",[28,[\"todo\",\"title\"]],null],[16,\"onblur\",[33,[\"action\"],[[28,[null]],\"doneEditing\"],[[\"value\"],[\"target.value\"]]],null],[16,\"onkeydown\",[33,[\"action\"],[[28,[null]],\"handleKeydown\"],null],null],[15,\"autofocus\",\"\"],[13],[14]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "todomvc/templates/components/todo-item.hbs" } });
});
define("todomvc/templates/components/todo-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "UPycDhZO", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"todos\",\"length\"]]],null,{\"statements\":[[6,[\"if\"],[[28,[\"canToggle\"]]],null,{\"statements\":[[0,\"    \"],[11,\"input\",[]],[15,\"type\",\"checkbox\"],[15,\"id\",\"toggle-all\"],[15,\"class\",\"toggle-all\"],[16,\"checked\",[26,[\"allCompleted\"]],null],[16,\"onchange\",[33,[\"action\"],[[28,[null]],\"toggleAll\"],null],null],[13],[14],[0,\"\\n\"]],\"locals\":[]},null],[0,\"  \"],[11,\"ul\",[]],[15,\"id\",\"todo-list\"],[15,\"class\",\"todo-list\"],[13],[0,\"\\n\"],[6,[\"each\"],[[28,[\"todos\"]]],null,{\"statements\":[[0,\"      \"],[1,[33,[\"todo-item\"],null,[[\"todo\",\"onStartEdit\",\"onEndEdit\"],[[28,[\"todo\"]],[33,[\"action\"],[[28,[null]],\"disableToggle\"],null],[33,[\"action\"],[[28,[null]],\"enableToggle\"],null]]]],false],[0,\"\\n\"]],\"locals\":[\"todo\"]},null],[0,\"  \"],[14],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "todomvc/templates/components/todo-list.hbs" } });
});
define("todomvc/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "hBadNIpo", "block": "{\"statements\":[[6,[\"if\"],[[28,[\"model\",\"length\"]]],null,{\"statements\":[[0,\"  \"],[1,[33,[\"todo-list\"],null,[[\"todos\"],[[28,[\"model\"]]]]],false],[0,\"\\n\"]],\"locals\":[]},null]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "todomvc/templates/index.hbs" } });
});


define('todomvc/config/environment', ['ember'], function(Ember) {
  var prefix = 'todomvc';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("todomvc/app")["default"].create({"name":"todomvc","version":"0.0.0+24b094d1"});
}
