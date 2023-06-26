export const handleDownloadClick = (code, extention) => {
    const fileContents = code;
    const file = new Blob([fileContents], { type: 'text/plain' });
    const fileURL = URL.createObjectURL(file);
    const downloadLink = document.createElement('a');
    downloadLink.href = fileURL;
    downloadLink.download = `myFile.${extention}`;
    downloadLink.click();
    URL.revokeObjectURL(fileURL);
  };
export const handleFileUpload = (event, setCode, setLangauge,
  languageExtensions) => {
    const file = event.target.files[0];
    const fileExtension = file?.name.split(".").pop();
  const languageFromFile = Object.keys(languageExtensions).find(
    key => languageExtensions[key] === fileExtension);
    setLangauge(languageFromFile)
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setCode(fileContent);
    };
    reader.readAsText(file);
};