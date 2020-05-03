const router = require("express").Router();
let Group = require("../models/group.model");
let User = require("../models/user.model");
let Meeting = require("../models/meeting.model");

router.route("/:id").get((req, res) => {
    Group.findOne({_id: req.params.id})
        .populate("creator")
        .populate({path: "meetings", populate: {path: "host", model: "User"}})
        .then(group => res.render("pages/group_view", group))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const creator = User.findOne({username: "erik"})
        .then((creator) => {
            const newGroup = new Group({name, creator})
            newGroup.save()
                .then(() => res.json('Group added!'))
                .catch(err => res.status(400).json("Error: " + err));
        });
});

router.route("/:id/meeting").post((req, res) => {
    const name = req.body.name;
    const link = req.body.link;
    const userPromise = User.findOne({username: "erik"});
    Promise.all([userPromise])
        .then((values) => {
            const newMeeting = new Meeting({name, link, host: values[0]})
            const saveGroupPromise = Group.findByIdAndUpdate(
                req.params.id,
                {$push: {meetings: newMeeting._id}},
                {new: true, useFindAndModify: false}
            );
            const saveMeetingPromise = newMeeting.save();
            Promise.all([saveMeetingPromise, saveGroupPromise])
                .then(() => res.json('Meeting added!'))
                .catch(err => res.status(400).json("Error: " + err));})
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;