const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meetingSchema = new Schema({
    name: {type: String, required: true, trim: true, minlength: 2},
    host: {type: Schema.Types.ObjectId, ref: "User", required: true},
    link: {type: String, required: true, trim: true}
}, {
    timestamps: true
});

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;