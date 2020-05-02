const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true,
    //     minlength: 3
    // },
    name: {type: String, required: true, trim: true, minlength: 2},
    creator: {type: Schema.Types.ObjectId, ref: "User", required: true},
    meetings: [{
        type: Schema.Types.ObjectId, ref: "Meeting"
    }]
}, {
    timestamps: true
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;