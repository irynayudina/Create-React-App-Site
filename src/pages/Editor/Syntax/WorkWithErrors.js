export const moveErrors = (viewUpdateState, cmValuePrevious, errorLines,
    setErrorLines, setCmValuePrevious) => {
    if (viewUpdateState) {
      const newCmValue = viewUpdateState.state.doc;
      if (newCmValue.constructor.name === "TextNode") {
        let resultArray = [];
        for (let i = 0; i < newCmValue.children.length; i++) {
          const currentTextLeaf = newCmValue.children[i];
          for (let j = 0; j < currentTextLeaf.text.length; j++) {
            const currentLine = currentTextLeaf.text[j];
            resultArray.push(currentLine); 
          }
        }
        newCmValue.text = resultArray
      }
      if (errorLines && cmValuePrevious && newCmValue && cmValuePrevious.text && newCmValue.text&& cmValuePrevious !== newCmValue) {
        let previousErrorContent = []
        for (let i = 0; i < errorLines.length; i++){
          previousErrorContent.push(cmValuePrevious.text[errorLines[i] - 1].trim())
        }
        let deltaLength = 0;
        if (cmValuePrevious.text.length < newCmValue.text.length) {
          deltaLength = newCmValue.text.length - cmValuePrevious.text.length;
          const errorLinesVar = errorLines;
          for (let i = 0; i < newCmValue.text.length; i++) {
            if (cmValuePrevious.text[i] !== newCmValue.text[i]) {
              for (let j = 0; j < errorLines.length; j++) {
                if (errorLinesVar[j] >= i + 1) {
                  errorLinesVar[j] += deltaLength;
                }
              }
              break;
            }
          }
          setErrorLines(errorLinesVar);
        } else if (cmValuePrevious.text.length > newCmValue.text.length) {
          deltaLength = cmValuePrevious.text.length - newCmValue.text.length;
          const errorLinesVar = errorLines;
          for (let i = 0; i < cmValuePrevious.text.length; i++) {
            if (cmValuePrevious.text[i] !== newCmValue.text[i]) {
              for (let j = 0; j < errorLines.length; j++) {
                if (errorLinesVar[j] > i + 1) {
                  errorLinesVar[j] -= deltaLength;
                }
              }
              break;
            }
          }
          setErrorLines(errorLinesVar);
        }
        let currentErrorContent = []
        for (let i = 0; i < errorLines.length; i++){
          currentErrorContent.push(newCmValue.text[errorLines[i] - 1].trim())
        }
        for (let i = 0; i < errorLines.length; i++){
          if (currentErrorContent[i] !== previousErrorContent[i]) {
            errorLines.splice(i, 1)
          }
        }
      }
      setCmValuePrevious(viewUpdateState.state.doc);
    }
}
export const parseErrors = (response, setErrorLines, language) => {
  // note : change styles of display result to make it scroll
  // languages that dont return line number of error:
  // r language, scheme, coffe script, intercall, unlambda, clisp
  // factor, falcon, whitespace
  // picolisp
  // from edrlang and below not parsed
  const errorText = response.data.output;
  let errorLineMatches;
  let errorLinesArr;
  if (language === 'cpp' || language === 'cpp14' || language === 'cpp17' || language === 'fortran' ||
    language === 'lua' || language === 'rust' || language === 'ada' || language === 'verilog' ||
    language === 'java' || language === 'c' || language === 'haskell' || language === 'objc' ||
    language === 'spidermonkey' || language === 'pike' || language === 'smalltalk' || language === 'racket' || 
    language === 'kotlin' || 
    language === 'prolog' || language === 'nasm' || language === 'gccasm' || language === 'nemerle' ||
    language === 'swift' || language === 'ruby' || language === 'go' || language === 'scala') {
    errorLineMatches = errorText.match(/([a-z]+\.[a-z0-9]+:)([0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.split([":"])[1]));
  }
  else if (language === 'csharp') {
    errorLineMatches = errorText.match(/([a-z]+\.[a-z0-9]+\()([0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.split(["("])[1]));
  }
  else if (language === 'python2' || language === 'python3' || language === 'ocaml'
    || language === 'rhino' || language === 'mozart') {
    errorLineMatches = errorText.match(/(jdoodle+\.[a-z0-9]+\", line )([0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  else if (language === 'php') {
    errorLineMatches = errorText.match(/(jdoodle.php on line )([0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  else if (language === 'perl') {
    errorLineMatches = errorText.match(/( jdoodle.pl line )([0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  else if (language === 'bash') {
    errorLineMatches = errorText.match(/(jdoodle.sh: line )([0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  else if (language === 'sql') {
    errorLineMatches = errorText.match(/(Error: near line )([0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  else if (language === 'pascal' || language === 'd' || language === 'freebasic'
    || language === 'fsharp' || language === 'fantom' || language === 'nim') {
    errorLineMatches = errorText.match(/(jdoodle.[a-z]+\([0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  else if (language === 'vbn') {
    errorLineMatches = errorText.match(/(jdoodle.vb \([0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  else if (language === 'groovy' || language === 'cobol') {
    errorLineMatches = errorText.match(/([a-z]+\.[a-z0-9]+:)( [0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  else if (language === 'tcl') {
    errorLineMatches = errorText.match(/("jdoodle.tcl" line ([0-9]+))/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  else if (language === 'dart') {
    errorLineMatches = errorText.match(/([a-z]+\.[a-z0-9']+: error: line)( [0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  else if (language === 'clojure' || language === 'elixir') {
    errorLineMatches = errorText.match(/(jdoodle+\.[a-z0-9]+:)([0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  else if (language === 'nodejs') {
    errorLineMatches = errorText.match(/(jdoodle\.[a-z0-9]+:)([0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  else if (language === 'octave') {
    errorLineMatches = errorText.match(/(error near line )([0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  else if (language === 'icon') {
    errorLineMatches = errorText.match(/(File jdoodle.icn; Line )([0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  else if (language === 'bc') {
    errorLineMatches = errorText.match(/(jdoodle+\.[a-z0-9]+ )([0-9]+)/gi) || [];
    errorLinesArr = errorLineMatches.map((match) =>
    parseInt(match.match(/(\d+)/)));
  }
  console.log(errorLineMatches);
  errorLinesArr = errorLinesArr?.filter((c, index) => {
    return errorLinesArr.indexOf(c) === index;
  });
  setErrorLines(errorLinesArr);
}