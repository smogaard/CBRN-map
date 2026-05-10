export default async function handler(req, res) {

  const clientId = process.env.FROST_CLIENT_ID;
  const clientSecret = process.env.FROST_CLIENT_SECRET;

  const { time } = req.query;

  const url = "https://frost.met.no/observations/v0.jsonld"
    + "?sources=SN50540"
    + "&elements=air_temperature,wind_speed,wind_from_direction"
    + "&referencetime=" + time;

  try {
    const frostRes = await fetch(url, {
      headers: {
        "Authorization": "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64")
      }
    });

    const data = await frostRes.json();

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: "Frost proxy error" });
  }
}
