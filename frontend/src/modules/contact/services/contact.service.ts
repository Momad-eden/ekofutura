import API_URL from "@/services/api";

export async function createContact(
  data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }
) {
  const response = await fetch(
    `${API_URL}/contact/`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Impossible d'envoyer le message"
    );
  }

  return response.json();
}