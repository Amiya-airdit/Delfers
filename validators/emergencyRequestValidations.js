import { body } from "express-validator";

export const validateEmergencyRequest = [
  body("date", "Date must be in ISO 8601 format").isISO8601().toDate(),
  body("time", "Time must be in ISO 8601 format").isISO8601().toDate(),
  body("seatNo", "SeatNo must be a string with a maximum length of 10")
    .isString()
    .isLength({ max: 10 }),
  body(
    "patientType",
    "PatientType must be a string with a maximum length of 20"
  )
    .isString()
    .isLength({ max: 20 }),
  body("category", "Category must be a string with a maximum length of 50")
    .isString()
    .isLength({ max: 50 }),
  body("departureAirport", "DepartureAirport must be a string").isString(),
  body("arrivalAirport", "ArrivalAirport must be a string").isString(),
  body("timeOfDeparture", "TimeOfDeparture must be in ISO 8601 format")
    .isISO8601()
    .toDate(),
  body("timeOfArrival", "TimeOfArrival must be in ISO 8601 format")
    .isISO8601()
    .toDate(),
  body(
    "flightNumber",
    "FlightNumber must be a string with a maximum length of 10"
  )
    .isString()
    .isLength({ max: 10 }),
  body("aircraftModel", "AircraftModel must be a string").isString(),
  body("airlineName", "AirlineName must be a string").isString(),
  body("timeOfSubmission", "TimeOfSubmission must be in ISO 8601 format")
    .isISO8601()
    .toDate(),
];
