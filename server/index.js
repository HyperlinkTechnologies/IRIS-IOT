import express from "express";
import cors from "cors";


const app = express();

app.use(cors());

app.use(express.json());

/* ================= MEMORY DATABASE ================= */

let widgetValues = {};

/* =========================================================
   DEVICE → PLATFORM
========================================================= */

app.post(
  "/api/widget/update",

  (req, res) => {

    const {
      apiKey,
      deviceId,
      widgetId,
      data,
    } = req.body;

    console.log(
      "Incoming Device Data:",
      req.body
    );

    widgetValues[widgetId] =
      data;

    res.json({
      success: true,
    });
  }
);

/* =========================================================
   DASHBOARD → DEVICE
========================================================= */

app.post(
  "/api/widget/write",

  (req, res) => {

    console.log(
      "Toggle Command:",
      req.body
    );

    res.json({
      success: true,
    });
  }
);

/* =========================================================
   FRONTEND GET WIDGET VALUE
========================================================= */

app.get(
  "/api/widget/:widgetId",

  (req, res) => {

    const widgetId =
      req.params.widgetId;

    res.json({

      value:
        widgetValues[
          widgetId
        ] || 0,
    });
  }
);

app.listen(5000, () => {

  console.log(
    "Backend Running on Port 5000"
  );
});