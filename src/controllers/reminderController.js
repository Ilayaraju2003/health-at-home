import { ReminderService } from "../services/reminderService.js";

export const ReminderController = {
  async getAllReminders(req, res) {
    try {
      const reminders = await ReminderService.getAllReminders();

      res.status(200).json(reminders);
    } catch (error) {
      console.error("Error fetching reminders:", error);

      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  async getReminderById(req, res) {
    try {
      const reminderId = Number(req.params.id);

      if (isNaN(reminderId)) {
        return res.status(400).json({
          message: "Invalid reminder ID",
        });
      }

      const reminder = await ReminderService.getReminderById(reminderId);

      if (!reminder) {
        return res.status(404).json({
          message: "Reminder not found",
        });
      }

      res.status(200).json(reminder);
    } catch (error) {
      console.error("Error fetching reminder:", error);

      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  async createReminder(req, res) {
    try {
      const newReminder = await ReminderService.createReminder(req.body);

      res.status(201).json(newReminder);
    } catch (error) {
  console.error(error);

  res.status(500).json({
    error: error.message,
  });
}
  },

  async updateReminder(req, res) {
    try {
      const reminderId = Number(req.params.id);

      if (isNaN(reminderId)) {
        return res.status(400).json({
          message: "Invalid reminder ID",
        });
      }

      const updatedReminder = await ReminderService.updateReminder(
        reminderId,
        req.body
      );

      if (!updatedReminder) {
        return res.status(404).json({
          message: "Reminder not found",
        });
      }

      res.status(200).json(updatedReminder);
    } catch (error) {
      console.error("Error updating reminder:", error);

      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  async deleteReminder(req, res) {
    try {
      const reminderId = Number(req.params.id);

      if (isNaN(reminderId)) {
        return res.status(400).json({
          message: "Invalid reminder ID",
        });
      }

      const deletedReminder =
        await ReminderService.deleteReminder(reminderId);

      if (!deletedReminder) {
        return res.status(404).json({
          message: "Reminder not found",
        });
      }

      res.status(200).json({
        message: "Reminder deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting reminder:", error);

      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};