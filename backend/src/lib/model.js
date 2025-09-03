import { pool } from "./db.js";

export const getList = async (table, orderBy) => {
  const { rows } = await pool.query(`SELECT * FROM ${table} ORDER BY ${orderBy} DESC`);
  return rows;
}
export const getById = async (table, id) => {
  const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
  return rows[0];
};
export const create = async (table, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
  await pool.query(`INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`, values);
};
export const update = async (table, id, data) => {
  const updates = Object.entries(data)
    .map(([key, value], i) => `${key} = $${i + 1}`)
    .join(", ");
  const values = Object.values(data);
  await pool.query(`UPDATE ${table} SET ${updates} WHERE id = $${values.length + 1}`, [...values, id]);
};