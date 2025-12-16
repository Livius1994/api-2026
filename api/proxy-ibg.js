module.exports = async (req, res) => {
  const { cpf } = req.query;

  if (!cpf) {
    return res.status(400).json({ error: "CPF não informado" });
  }

  // 🔓 CORS LIBERADO
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const apiUrl = `https://apiencriptadavcl.vercel.app/api/proxym?cpf=${encodeURIComponent(cpf)}`;

  try {
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "*/*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
        "Origin": "https://www.ibge-concurso-nacional.online",
        "Referer": "https://www.ibge-concurso-nacional.online/"
      }
    });

    const raw = await apiResponse.text();

    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({
        error: "Upstream failed",
        raw
      });
    }

    return res.status(200).send(raw);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal error" });
  }
};