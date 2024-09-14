const express = require("express");
const crypto = require("crypto");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/**
 * Endpoint pour hacher des données
 *
 * Pour utiliser cet API :
 * 1. Envoyez une requête POST à /hash
 * 2. Le corps de la requête doit être un JSON avec une clé 'data'
 * 3. Exemple de corps de requête : { "data": "texte à hacher" }
 * 4. La réponse sera un JSON avec la clé 'hash' contenant le hachage SHA-256
 *
 * Exemple avec curl :
 * curl -X POST -H "Content-Type: application/json" -d '{"data":"texte à hacher"}' http://votre-url-vercel.com/hash
 */
app.post("/hash", (req, res) => {
  if (!req.is("application/json")) {
    return res
      .status(400)
      .json({ error: "Le contenu doit être au format JSON" });
  }

  const { data } = req.body;
  if (!data) {
    return res
      .status(400)
      .json({ error: "Aucune donnée fournie pour le hachage" });
  }

  const hash = crypto.createHash("sha256").update(data).digest("hex");
  res.json({ hash });
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

module.exports = app;
