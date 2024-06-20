const workercode = function()
{
    var t = 0;

    onmessage = (e) =>
    {
        t = e.data;
        const clock = setInterval(() => {
            if (t < 0)
            {
                clearInterval(clock);
            }
            else
            {
                t -= 1;
                postMessage(t);
            }
        }, 1000)
    }
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;