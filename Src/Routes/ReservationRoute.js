const express = require("express");
const { validateParams, validateBody } = require("../Middleware/Validation");
const {
  findIdReservationSchema,
  createReservationSchema,
  updateActionSchema,
} = require("../Validations/ReservationValidation");
const {
  getReservation,
  addReservation,
  getReservationById,
  updateReservation,
  deleteReservation,
  updateReservationAction,
  getReservationByCin, // Make sure to add this
} = require("../Controllers/ReservationController");

const router = express.Router();

// Define routes
router.get("/cin/:cin_client", getReservationByCin);
router.get("/", getReservation);
router.post("/", validateBody(createReservationSchema), addReservation);
router.get(
  "/:id_reservation",
  validateParams(findIdReservationSchema),
  getReservationById
);
router.put(
  "/:id_reservation",
  validateParams(findIdReservationSchema),
  validateBody(createReservationSchema),
  updateReservation
);
router.patch(
    "/:id_reservation/action",
    validateParams(findIdReservationSchema),
    validateBody(updateActionSchema),
    updateReservationAction
  );
router.delete(
  "/:id_reservation",
  validateParams(findIdReservationSchema),
  deleteReservation
);

module.exports = router;
