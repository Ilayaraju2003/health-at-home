import { ReminderModel } from "../models/reminderModel.js";

export const ReminderService = {
  async getAllReminders() {
    return await ReminderModel.getAll();
  },

  async getReminderById(id) {
    return await ReminderModel.findById(id);
  },

  async createReminder(reminderData) {
    return await ReminderModel.create(reminderData);
  },

  async updateReminder(id, reminderData) {
    return await ReminderModel.update(id, reminderData);
  },

  async deleteReminder(id) {
    return await ReminderModel.delete(id);
  },
};