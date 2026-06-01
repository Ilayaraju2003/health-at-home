export const updateReminderSchema = z.object({
  reminder: z.string().min(1, 'Reminder should be longer').max(255).optional(),
  notes: z.string().nullable().optional(),
  completed: z.boolean().optional(),
});