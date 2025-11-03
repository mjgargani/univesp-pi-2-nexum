// https://www.prisma.io/docs/orm/reference/error-reference#error-codes

export enum PrismaErrorCodes {
  RECORD_NOT_FOUND = 'P2025',
  UNIQUE_CONSTRAINT_FAILED = 'P2002',
  FOREIGN_KEY_CONSTRAINT_FAILED = 'P2003',
  NOT_NULL_VIOLATION = 'P2004',
}
