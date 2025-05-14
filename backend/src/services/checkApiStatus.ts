import dotenv from "dotenv";
dotenv.config();

async function checkApiStatus() {
  const url = `${process.env.THIRD_PARTY_GAME_API_URL}/platforms/4?key=${process.env.THIRD_PARTY_GAME_API_KEY}`;

  const requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
    headers: {
      Accept: "application/json",
      "User-Agent": "node-fetch",
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    return response.status;
  } catch (error) {
    console.error(error);
  }
}

export default checkApiStatus;
