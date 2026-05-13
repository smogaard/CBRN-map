export default async function handler(req, res){

  const { lat, lng, radius = 1000 } = req.query;

  const query = `
  [out:json];
  (
    way["natural"="water"](around:${radius},${lat},${lng});
  );
  out geom;
  `;

  const url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);

  try {
    const r = await fetch(url);
    const data = await r.json();

    res.status(200).json(data);

  } catch (e){
    res.status(500).json({ error: "Overpass failed" });
  }
}
