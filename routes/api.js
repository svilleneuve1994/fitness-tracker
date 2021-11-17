const router = require("express").Router();
const db = require("../models/workouts");

// get all workouts
router.get("/api/workouts", (req, res) => {
    db.aggregate([
        {$addFields: { totalDuration: { $sum: "$exercises.duration"} }}
    ])
        .then(workoutData => {
            res.json(workoutData);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

// create workout
router.post("/api/workouts", ({ body }, res) => {
    db.create(body)
        .then(workoutData => {
            res.json(workoutData);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// add exercise
router.put("/api/workouts/:id", (req, res) => {
    db.findByIdAndUpdate(
        req.params.id,
        {$push: { exercises: req.body }},
        { new: true })
        .then(workoutData => {
            res.json(workoutData);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// view last 7 workouts
router.get("/api/workouts/range", (req, res) => {
    db.aggregate([
        {$addFields: { totalDuration: { $sum: "$exercises.duration"} }}
    ])
		.then(workoutData => {
			res.json(workoutData);
		})
		.catch(err => {
			res.status(400).json(err);
		});
});

module.exports = router;