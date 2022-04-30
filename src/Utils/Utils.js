


export const utils = {
    importFile: (path) => {
        return (await import(filePath))?.default;
    }
}