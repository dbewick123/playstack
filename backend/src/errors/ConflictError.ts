export class ConflictError extends Error {
  fields: { field: string; message: string }[];

  constructor(fields: { field: string; message: string }[]) {
    super("Conflict");
    this.fields = fields;
  }
}