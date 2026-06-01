
export async function getReminders() {
  const response = await fetch(
    "http://192.168.1.10:3000/reminders"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch reminders");
  }

  return response.json();
}