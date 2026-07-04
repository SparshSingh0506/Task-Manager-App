export const buildSetClause = (updates: any) => {
  // approach - dynamically extract column names and inject them into sql
  const entries = Object.entries(updates);
  const setClause = entries.map(([key, val], i) => `${key} = $${i + 1}`).join(', '); // eg - "title = $1, description = $2"
  const values = entries.map(([key, val]) => val);
  // this getting injected in query is safe as only trusted columns can ever come up to this point due to zod's validation earlier.

  return { setClause, values };
}