import db from "../config/db.js";

export const ReminderModel = {
  // Get all reminders
  async getAll() {
    const result = await db.query(
      "SELECT * FROM reminders ORDER BY created_at DESC"
    );

    return result.rows;
  },

  // Get reminder by ID
  async findById(id) {
    const result = await db.query(
      "SELECT * FROM reminders WHERE id = $1",
      [id]
    );

    return result.rows[0];
  },

  // Create reminder
  async create({ reminder, notes, userId }) {
    const result = await db.query(
      `
      INSERT INTO reminders (reminder, notes, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [reminder, notes, userId]
    );

    return result.rows[0];
  },

  // Update reminder
  async update(id, { reminder, notes }) {
    const result = await db.query(
      `
      UPDATE reminders
      SET
        reminder = $1,
        notes = $2
      WHERE id = $3
      RETURNING *
      `,
      [reminder, notes, id]
    );

    return result.rows[0];
  },

  // Delete reminder
  async delete(id) {
    const result = await db.query(
      `
      DELETE FROM reminders
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    return result.rows[0];
  },
};