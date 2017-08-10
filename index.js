'use babel';

const esprima = require('esprima');
const fs = require('fs');

module.exports = {
    getList(dir) {
        if (!fs.existsSync(dir)) return {err: 'Error! File does not exist!'};

        let ast,
            content = fs.readFileSync(dir, 'utf8');
        try {
            ast = esprima.parseScript(content, { tolerant: true });
        }
        catch (err) { console.log(err); }

        const tasks = {};
        ast.body.forEach(i => {
            if ('ExpressionStatement' !== i.type) return;

            let callee = i.expression.callee;
            if (!callee || !callee.object || !callee.property || 'gulp' !== callee.object.name || 'task' !== callee.property.name) return;

            let deps = [],
                args = i.expression.arguments;
            if ('ArrayExpression' === args[1].type) {
                args[1].elements.forEach(arg => {
                    let dep = arg.raw.replace(/\'/g, '');
                    if (dep) deps.push(dep);
                });
            }

            let key = args[0].raw.replace(/\'/g, '');
            tasks[key] = {
              deps: deps
            };
        });

        return {data: tasks};
    }
};
