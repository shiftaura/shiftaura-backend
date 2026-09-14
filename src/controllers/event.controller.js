const Event = require("../models/Event");
const { successResponse, errorResponse } = require("../utils/response");

exports.getPublicPastEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ status: "PAST" })
      .select("id title description eventType startDate endDate location mode officialLink coverImage result gallery");
    return successResponse(res, 200, "Past events retrieved", events);
  } catch (error) { next(error); }
};

exports.getUpcomingEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ status: "UPCOMING" })
      .populate("participants", "name avatar role");
    return successResponse(res, 200, "Upcoming events retrieved", events);
  } catch (error) { next(error); }
};

exports.getUpcomingEventById = async (req, res, next) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, status: "UPCOMING" })
      .populate("participants", "name avatar role");
    if (!event) return errorResponse(res, 404, "Upcoming event not found");
    return successResponse(res, 200, "Event retrieved", event);
  } catch (error) { next(error); }
};