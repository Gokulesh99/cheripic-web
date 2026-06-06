// src/services/apiService.js

const API_BASE_URL = "https://your-api-url.com/api";

export const submitPartnerApplication = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/partner-application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to submit application");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};