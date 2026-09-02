const BASE_URL = "https://router.huggingface.co/v1";

export async function fetchAPI(endpoint: string, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_HUG_FACE_API_KEY}`,
    },
  });

  return response;
}
