// A small module registry. The build wraps every chunk in SML.dm(id, deps,
// factory) and concatenates the chunks into a few script files; modules are
// evaluated on demand, as async factories, when a bundle is imported.
(function () {
    "use strict";

    const definitions = new Map();
    const evaluations = new Map();
    const exportsById = new Map();
    let bundles = Object.create(null);
    let resolveReady;

    function require(id) {
        if (!exportsById.has(id))
            throw new Error(`SML: module ${id} required before it was evaluated`);
        return exportsById.get(id);
    }

    function evaluate(id) {
        let evaluation = evaluations.get(id);
        if (evaluation)
            return evaluation;
        const definition = definitions.get(id);
        if (!definition)
            return Promise.reject(new Error(`SML: unknown module ${id}`));
        evaluation = (async () => {
            for (const dependency of definition.deps)
                await evaluate(dependency);
            const module = { exports: {} };
            await definition.factory(require, module.exports, module);
            exportsById.set(id, module.exports);
            return module.exports;
        })();
        evaluations.set(id, evaluation);
        return evaluation;
    }

    const SML = {
        ready: new Promise((resolve) => (resolveReady = resolve)),

        // Defines a module.
        dm(id, deps, factory) {
            definitions.set(id, { deps, factory });
        },

        // Imports a module, given by bundle name or by id.
        di(nameOrId) {
            return evaluate(bundles[nameOrId] ?? nameOrId);
        },

        manifest(map) {
            bundles = Object.assign(Object.create(null), map);
        },

        isLoaded(name) {
            const id = bundles[name];
            return id !== undefined && exportsById.has(id);
        },

        load(name) {
            return SML.di(name);
        },

        async boot(names) {
            const loaded = {};
            for (const name of names)
                loaded[name] = await SML.di(name);
            resolveReady(loaded);
            return loaded;
        },
    };

    window.SML = SML;
})();
