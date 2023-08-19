import app from "./server.js";

const PORT = Process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
