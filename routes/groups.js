const router = require("express").Router();
let Group = require("../models/group.model");
let User = require("../models/user.model");
let Meeting = require("../models/meeting.model");
const { checkSignIn } = require("./users");

router.route("/:id").get((req, res) => {
    console.log(req.session)
    Group.findOne({_id: req.params.id})
        .populate("creator")
        .populate({path: "meetings", populate: {path: "host", model: "User"}})
        .then(group => res.render("pages/group_view", { group, user: req.session.user }))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/").post(checkSignIn, (req, res) => {
    const name = req.body.name;
    const newGroup = new Group({name, creator: req.session.user._id})
    newGroup.save()
        .then(() => res.json('Group added!'))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id/meeting").post(checkSignIn, (req, res) => {
    const name = req.body.name;
    const link = req.body.link;
    const newMeeting = new Meeting({name, link, host: req.session.user._id})
    const saveGroupPromise = Group.findByIdAndUpdate(
        req.params.id,
        {$push: {meetings: newMeeting._id}},
        {new: true, useFindAndModify: false}
    );
    const saveMeetingPromise = newMeeting.save();
    Promise.all([saveMeetingPromise, saveGroupPromise])
        .then(() => res.redirect(`/groups/${req.params.id}`))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/").get(checkSignIn, (req, res) => {
    Group.find({creator: req.session.user._id})
        .then(groups => {
            res.json(groups);
        })
})

router.route("/:gid/delete/:mid").get(checkSignIn, (req, res) => {
    Meeting.findOne({_id: req.params.mid}).then(meeting => {
        console.log(meeting);
        Group.findOne({_id: req.params.gid}).then(group => {
            console.log(group);
            if (req.session.user._id == meeting.host || req.session.user._id == group.creator) {
                Meeting.deleteOne({_id: req.params.mid}, function (err) {
                    if (err) return res.send(err);
                    res.redirect(`/groups/${req.params.gid}`)
                });
            }
            res.redirect(`/groups/${req.params.gid}`)
        });
    });
});

module.exports = router;