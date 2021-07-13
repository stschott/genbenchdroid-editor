export const loadFile = async (filePath) => {
    const fileJson = await fetch(filePath);
    const fileData = await fileJson.json();
    return fileData;
};

export const openFileDownload = async (name = 'created', content) => {
    if (content == null) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${name}.json`;
    link.href = url;
    link.click();
};