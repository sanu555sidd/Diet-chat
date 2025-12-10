const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendQuery = async (question) => {
  const res = await fetch(`${API_BASE_URL}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    throw new Error("Failed to get answer");
  }

  return res.json();
};

export const fetchFaqs = async () => {
  const res = await fetch(`${API_BASE_URL}/faqs`);
  if (!res.ok) {
    throw new Error("Failed to fetch FAQs");
  }
  return res.json();
};
