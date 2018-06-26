function indexrTemplate(modulePaths) {
  const importLines = [];
  const exportLines = [];

  modulePaths.forEach(modulePath => {
    const localModuleName = modulePath.split('/')[0];
    importLines.push(`import ${localModuleName} from "./${modulePath}";`);
    exportLines.push(localModuleName);
  });

  const importSection = importLines.join('\n');
  const exportSection = `export default {
  ${exportLines.join(',\n  ')}
};`;

  const lines = [importSection, '', exportSection, ''];

  return lines.join('\n');
}

module.exports = indexrTemplate;
