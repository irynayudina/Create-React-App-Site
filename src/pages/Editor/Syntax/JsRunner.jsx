import React, {useEffect} from 'react'

const JsRunner = ({code, setResult, result, jsRun}) => {
    function runJs(jsString) {
      const logs = [];
      const originalConsoleLog = console.log;
      console.log = function() {
        logs.push(Array.from(arguments).join(' ') + '<br />');
        originalConsoleLog.apply(console, arguments);
      };  
      try {
        const parsedCode = eval(jsString);
        setResult(parsedCode);
      } catch (error) {
        console.log(error.name, ': ', error.message);
      }
      console.log = originalConsoleLog;
      setResult(logs.join(''));
    }
    useEffect(() => {
      if (jsRun) {
        runJs(code)
      }
    }, [jsRun]);
  return (
    <div></div>
  )
}

export default JsRunner