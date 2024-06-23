// jest.config.js
module.exports = {
  moduleFileExtensions: ['js', 'jsx'], // Incluye .jsx como extensión de archivo
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest', // Transforma archivos .js y .jsx utilizando babel-jest
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js', // Ruta al archivo mock para CSS
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Archivo de configuración de tests
};