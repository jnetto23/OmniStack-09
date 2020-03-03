const User = require("../models/User");
const Spot = require("../models/Spot");
const Booking = require("../models/Booking");

module.exports = {
  async store(req, res) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const user = await User.findById(user_id);
    if (!user) return res.status(400).json({ error: "User does not exists" });

    const spot = await Spot.findById(spot_id);
    if (!spot) return res.status(400).json({ error: "Spot does not exists" });

    const booking = await Booking.create({
      date,
      user: user_id,
      spot: spot_id
    });

    await booking
      .populate("user")
      .populate("spot")
      .execPopulate();

    const ownerSocket = req.connectedUsers[booking.spot.user];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit("booking_request", booking);
    }

    return res.json(booking);
  }
};
