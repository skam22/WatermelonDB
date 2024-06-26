import type { $RE, $Exact } from '../../types'
import type {
  ColumnName,
  ColumnSchema,
  TableName,
  TableSchema,
  TableSchemaSpec,
  SchemaVersion,
} from '../index'

export type CreateTableMigrationStep = $RE<{
  type: 'create_table'
  schema: TableSchema
}>

export type AddColumnsMigrationStep = $RE<{
  type: 'add_columns'
  table: TableName<any>
  columns: ColumnSchema[]
  unsafeSql?: (_: string) => string
}>

export type DestroyColumnMigrationStep = $RE<{
  type: 'destroy_column'
  table: TableName<any>
  column: ColumnName
}>

export type RenameColumnMigrationStep = $RE<{
  type: 'rename_column'
  table: TableName<any>
  from: ColumnName
  to: ColumnName
}>

export type DestroyTableMigrationStep = $RE<{
  type: 'destroy_table'
  table: TableName<any>
}>

export type SqlMigrationStep = $RE<{
  type: 'sql'
  sql: string
}>

export type MigrationStep =
  | CreateTableMigrationStep
  | AddColumnsMigrationStep
  | SqlMigrationStep
  | DestroyColumnMigrationStep
  | RenameColumnMigrationStep
  | DestroyTableMigrationStep

type Migration = $RE<{
  toVersion: SchemaVersion
  steps: MigrationStep[]
}>

type SchemaMigrationsSpec = $RE<{
  migrations: Migration[]
}>

export type SchemaMigrations = $RE<{
  validated: true
  minVersion: SchemaVersion
  maxVersion: SchemaVersion
  sortedMigrations: Migration[]
}>

export function schemaMigrations(migrationSpec: SchemaMigrationsSpec): SchemaMigrations

export function createTable(tableSchemaSpec: TableSchemaSpec): CreateTableMigrationStep

export function addColumns({
  table,
  columns,
  unsafeSql,
}: $Exact<{
  table: TableName<any>
  columns: ColumnSchema[]
  unsafeSql?: (_: string) => string
}>): AddColumnsMigrationStep

export function destroyColumn({
  table,
  column,
}: $Exact<{
  table: TableName<any>
  column: ColumnName
}>): DestroyColumnMigrationStep

export function renameColumn({
  table,
  from,
  to,
}: $Exact<{
  table: TableName<any>
  from: string
  to: string
}>): RenameColumnMigrationStep

export function destroyTable({
  table,
}: $Exact<{
  table: TableName<any>
}>): DestroyTableMigrationStep

export function unsafeExecuteSql(sql: string): SqlMigrationStep
