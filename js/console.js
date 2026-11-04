// console.js
// PF keys and the command line, shared by every page.
//
// Any link carrying data-key="N" answers to FN. Any link carrying
// data-cmd="WORD" answers to that word typed at COMMAND ===>.
// A page without a command form still gets its PF keys.

(function ()
    {
    const keys = {};
    const cmds = {};

    document.querySelectorAll('a[data-key]').forEach(a =>
        {
        keys[a.dataset.key] = a;
        });

    document.querySelectorAll('a[data-cmd]').forEach(a =>
        {
        a.dataset.cmd.split(' ').forEach(c => { cmds[c.toUpperCase()] = a; });
        });

    const follow = a =>
        {
        if (a.target === '_blank')
            window.open(a.href, '_blank', 'noopener');
        else
            window.location.href = a.href;
        };

    const form = document.querySelector('form.command');
    const input = form ? form.querySelector('input') : null;
    const msg = document.querySelector('.message');
    const idle = msg ? msg.textContent : '';

    if (form)
        {
        form.addEventListener('submit', e =>
            {
            e.preventDefault();
            const v = input.value.trim().toUpperCase();
            input.value = '';
            if (!v)
                return;
            if (v === 'HELP' || v === '?')
                {
                msg.textContent = 'COMMANDS: ' + Object.keys(cmds).join(' ') + ' · PF1–PF' + Object.keys(keys).length + ' · ESC CLEARS';
                }
            else if (cmds[v])
                {
                msg.textContent = 'JOB ' + v + ' SUBMITTED';
                follow(cmds[v]);
                }
            else
                {
                msg.textContent = 'IKJ56500I COMMAND ' + v + ' NOT FOUND';
                }
            });
        }

    document.addEventListener('keydown', e =>
        {
        const m = /^F([0-9]{1,2})$/.exec(e.key);
        if (m && keys[m[1]])
            {
            e.preventDefault();
            follow(keys[m[1]]);
            }
        else if (e.key === 'Escape' && input)
            {
            input.value = '';
            msg.textContent = idle;
            }
        });
    })();
