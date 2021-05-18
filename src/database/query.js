// example query
export const createFormsTable = `CREATE TABLE IF NOT EXISTS forms (
    id TEXT PRIMARY KEY NOT NULL,
    createdAt TEXT,
    updatedAt TEXT,
    value TEXT
  )
`;

export const createOutboxTable = `CREATE TABLE IF NOT EXISTS outbox (
  id TEXT PRIMARY KEY NOT NULL,
  createdAt TEXT,
  updatedAt TEXT,
  value TEXT,
  status TEXT
)
`;

export const createLinkedItemsTable = `CREATE TABLE IF NOT EXISTS linkedItems (
  id TEXT PRIMARY KEY NOT NULL,
  createdAt TEXT,
  updatedAt TEXT,
  value TEXT
)
`;

export const createSelectOptionsTable = `CREATE TABLE IF NOT EXISTS selectOptions (
  formId TEXT NOT NULL,
  seloptions TEXT NOT NULL,
  projectId TEXT,
  type TEXT,
  options TEXT
)
`;

//Insert data
export const insertSelectOptionsQuery = `INSERT INTO selectOptions (
  formId,
  seloptions,
  projectId,
  type,
  options
  ) VALUES ( ?, ?, ?, ?, ?)
`;

export const insertFormQuery = `INSERT INTO forms (
    id,
    createdAt,
    updatedAt,
    value
    ) VALUES ( ?, ?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET
  updatedAt=excluded.updatedAt,
  value=excluded.value
`;

export const insertToOutboxQuery = `INSERT INTO outbox (
  id,
  createdAt,
  updatedAt,
  value,
  status
  ) VALUES ( ?, ?, ?, ?, ?)
ON CONFLICT(id) DO UPDATE SET
updatedAt=excluded.updatedAt,
value=excluded.value,
status=excluded.status
`;

export const insertLinkedItemsQuery = `INSERT INTO linkedItems (
  id,
  createdAt,
  updatedAt,
  value
  ) VALUES ( ?, ?, ?, ?)
ON CONFLICT(id) DO UPDATE SET
updatedAt=excluded.updatedAt,
value=excluded.value
`;

// get data
export const getLinkedItemsByIdQuery =
  'SELECT value FROM linkedItems where id = ?';

export const getOfflineFormsQuery = 'SELECT value FROM forms';

export const getFieldsOptionsQuery =
  'SELECT options from selectOptions where formId = ? AND seloptions = ? AND type = ? AND projectId = ?';

export const deleteAllFormsQuery = 'DELETE from forms';

export const getAllFromOutboxQuery = 'SELECT * from outbox';

export const getAllPendingFromOutboxQuery =
  'SELECT * from outbox WHERE status = draft';
