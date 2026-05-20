import { Router} from 'express'; // Imports the Router class from Express.js.

import {ReminderController} from '../controllers/reminderController.js' // Imports the reminderController from the specified path.

const router = Router(); // Creates a new router instance for handling reminder-related routes.


router.get('/', ReminderController.getAllReminders);
router.get('/:id', ReminderController.getReminderById);
router.post('/', ReminderController.createReminder);
router.patch('/:id', ReminderController.updateReminder);
router.delete('/:id', ReminderController.deleteReminder);


export default router; // Exports the router instance for use in other parts of the application.    