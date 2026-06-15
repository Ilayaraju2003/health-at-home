import { Router } from "express";

import { ReminderController } from "../controllers/reminderController.js";

import {
  createReminderSchema,
  updateReminderSchema,
} from "../schemas/reminderSchema.js";

import { validateData } from "../middlewares/validationMiddleware.js";

const router = Router();

// Get all reminders
router.get(
  "/",
  ReminderController.getAllReminders
);

// Get reminder by ID
router.get(
  "/:id",
  ReminderController.getReminderById
);

// Create reminder
router.post(
  "/",
  validateData(createReminderSchema),
  ReminderController.createReminder
);

// Update reminder
router.patch(
  "/:id",
  validateData(updateReminderSchema),
  ReminderController.updateReminder
);

// Delete reminder
router.delete(
  "/:id",
  ReminderController.deleteReminder
);

export default router;