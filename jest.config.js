module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^prisma/db1/prisma-db1.service$': '<rootDir>/prisma/db1/prisma-db1.service.ts',
      '^@/(.*)$': '<rootDir>/src/$1'
    },
  };