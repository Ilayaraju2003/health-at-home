const API_URL =
  "http://192.168.1.5:5000/reminders";

export const getReminders = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch reminders"
    );
  }

  return await response.json();
};

export const createReminder = async (
  reminder: string,
  notes: string
) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reminder,
      notes,
      userId: 5,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to create reminder"
    );
  }

  return data;
};

export const updateReminder = async (
  id: number,
  reminder: string,
  notes: string
) => {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        reminder,
        notes,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to update reminder"
    );
  }

  return data;
};

export const deleteReminder = async (
  id: number
) => {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Failed to delete reminder"
    );
  }

  return data;
};

export const getReminderById =
  async (id: number) => {
    const response = await fetch(
      `${API_URL}/${id}`
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch reminder"
      );
    }

    return await response.json();
  };