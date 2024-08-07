//file imports
import EmergencyRequest from "../models/emergencyRequest.js";

export const registerEmergencyRequest = async (req, res, next) => {
  try {
    const {
      date,
      time,
      seatNumber,
      patientType,
      category,
      age,
      gender,
      vitalsTemp,
      vitalsHeartRate,
      vitalsBP,
      scenarioImagesURLS,
      medicalHistory,
      allergies,
      departureAirport,
      arrivalAirport,
      timeOfDeparture,
      timeOfArrival,
      flightNumber,
      aircraftModel,
      airlineName,
      timeOfSubmission,
    } = req.body;

    const emergencyRequest = await EmergencyRequest.create({
      date,
      time,
      seatNumber,
      patientType,
      category,
      age,
      gender,
      vitalsTemp,
      vitalsHeartRate,
      vitalsBP,
      scenarioImagesURLS,
      medicalHistory,
      allergies,
      departureAirport,
      arrivalAirport,
      timeOfDeparture,
      timeOfArrival,
      flightNumber,
      aircraftModel,
      airlineName,
      timeOfSubmission,
    });

    await res
      .status(200)
      .json({ emergencyRequest, message: "Emergency register" });
  } catch (err) {
    next(err);
  }
};
