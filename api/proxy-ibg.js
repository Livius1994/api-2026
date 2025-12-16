module.exports = async (req, res) => {
  const { cpf } = req.query;

  if (!cpf) {
    return res.status(400).json({ error: "CPF não informado" });
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

    if (!apiResponse.ok) {
      return res
        .status(apiResponse.status)
        .json({ error: "Failed to fetch data from API" });
    }

    const data = await apiResponse.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};