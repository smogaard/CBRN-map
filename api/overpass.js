export default async function handler(req, res){

  const { lat, lng, radius = 1000 } = req.query;

  const query = `
  [out:json];
  (
    way["natural"="water"](around:${radius},${lat},${lng});
    way["waterway"](around:${radius},${lat},${lng});
  );
  out geom;
  `;

  const url =
    "https://overpass-api.de/api/interpreter?data=" +
    encodeURIComponent(query);

  try {
    const r = await fetch(url);

    if (!r.ok) {
      const text = await r.text();
      throw new Error(text);
    }

    const data = await r.json();

    res.status(200).json(data);

  } catch (e){

    console.error("Overpass error:", e);

    res.status(200).json({ elements: [] }); // ✅ viktig fallback
  }
}
