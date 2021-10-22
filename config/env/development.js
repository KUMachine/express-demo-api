const PORT = process.env.PORT || "3000";
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/demodb";

module.exports = { PORT, DB_URL };
