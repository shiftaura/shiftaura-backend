const cloudinary = require("../config/cloudinary");

exports.generateUploadSignature = (type) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  let folder = "team-hub/misc";

  if (type === "avatar") folder = "team-hub/members";
  else if (type === "event") folder = "team-hub/events";
  else if (type === "event-gallery") folder = "team-hub/event-gallery";

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET
  );

  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    timestamp,
    signature,
    folder,
  };
};