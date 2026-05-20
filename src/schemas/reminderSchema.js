import { z } from 'zod';

export const reminderSchema = z.object({
  id: z.number(),
  reminder: z.string().min(1, 'Reminder should be longer').max(255),
  notes: z.string().optional(),
  completed: z.boolean().optional().default(false),
  userId: z.number(),
  createdAt: z.string().datetime(),
});