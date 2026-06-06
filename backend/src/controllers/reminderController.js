import { ReminderService } from "../services/reminderService.js";
import redisClient from "../config/redis.js";

export const ReminderController = {

  async getAllReminders(req, res, next) {
    try {
      const { listType } = req.query;

      const cacheKey = `reminders:${listType || "all"}`;

      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log("✅ Redis Cache Hit");

        return res.status(200).json(
          JSON.parse(cachedData)
        );
      }

      console.log("❌ Redis Cache Miss");

      const reminders =
        await ReminderService.getAllReminders(listType);

      await redisClient.setEx(
        cacheKey,
        60,
        JSON.stringify(reminders)
      );

      res.status(200).json(reminders);

    } catch (error) {
      next(error);
    }
  },

  async getReminderById(req, res, next) {
    try {
      const reminderId = parseInt(req.params.id, 10);

      const reminder =
        await ReminderService.getReminderById(reminderId);

      res.status(200).json(reminder);

    } catch (error) {
      next(error);
    }
  },

  async createReminder(req, res, next) {
    try {

      const newReminder =
        await ReminderService.createReminder(req.body);

      await redisClient.del("reminders:all");

      console.log("🗑 Cache Cleared");

      res.status(200).json(newReminder);

    } catch (error) {
      next(error);
    }
  },

  async updateReminder(req, res, next) {
    try {

      const reminderId =
        parseInt(req.params.id, 10);

      const updatedReminder =
        await ReminderService.updateReminder(
          reminderId,
          req.body
        );

      await redisClient.del("reminders:all");

      console.log("🗑 Cache Cleared");

      res.status(200).json(updatedReminder);

    } catch (error) {
      next(error);
    }
  },

  async deleteReminder(req, res, next) {
    try {

      const reminderId =
        parseInt(req.params.id, 10);

      const reminder =
        await ReminderService.deleteReminder(reminderId);

      await redisClient.del("reminders:all");

      console.log("🗑 Cache Cleared");

      res.status(200).json(reminder);

    } catch (error) {
      next(error);
    }
  },
};