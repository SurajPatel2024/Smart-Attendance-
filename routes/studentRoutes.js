const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

/* HOME */
router.get("/", async (req, res) => {

    const filterClass = req.query.class || "All";

    let students;

    if (filterClass === "All") {
        students = await Student.find().sort({
            cls: 1,
            roll: 1
        });
    } else {
        students = await Student.find({
            cls: filterClass
        }).sort({
            roll: 1
        });
    }

    res.render("index", {
        students,
        filterClass,
        message: req.query.message || "",
        type: req.query.type || ""
    });
});

/* ADD STUDENT */
router.post("/add", async (req, res) => {

    try {

        const { cls, roll, name, phone } = req.body;

        if (!cls || !roll || !name || !phone) {
            return res.redirect("/?message=Fill all fields&type=error");
        }

        const existing = await Student.findOne({
            cls,
            roll
        });

        if (existing) {
            return res.redirect("/?message=Roll Number Already Exists&type=error");
        }

        await Student.create({
            cls,
            roll,
            name,
            phone: "91" + phone
        });

        res.redirect("/?message=Student Added Successfully&type=success");

    } catch (error) {

        console.log(error);

        res.redirect("/?message=Something Went Wrong&type=error");
    }
});

 

/* DELETE */
router.post("/delete/:id", async (req, res) => {

    try {

        await Student.findByIdAndDelete(req.params.id);

        res.redirect("/?message=Student Deleted&type=success");

    } catch (error) {

        console.log(error);

        res.redirect("/?message=Delete Failed&type=error");
    }
});

/* CLEAR */
router.post("/clear", async (req, res) => {

    try {

        await Student.deleteMany({});

        res.redirect("/?message=All Records Deleted&type=success");

    } catch (error) {

        console.log(error);

        res.redirect("/?message=Reset Failed&type=error");
    }
});


/* EDIT STUDENT */

router.post("/edit/:id", async (req, res) => {

    try {

        const {
            cls,
            roll,
            name,
            phone
        } = req.body;

        await Student.findByIdAndUpdate(
            req.params.id,
            {
                cls,
                roll,
                name,
                phone
            }
        );

        res.redirect("/?message=Student Updated Successfully&type=success");

    } catch (error) {

        console.log(error);

        res.redirect("/?message=Update Failed&type=error");
    }
});

router.post("/attendance-submit", async (req, res) => {

    try {

        const formData = req.body;

        for (let key in formData) {

            if (key.startsWith("status_")) {

                const studentId = key.replace("status_", "");

                const status = formData[key];

                await Student.findByIdAndUpdate(studentId, {
                    status: status
                });

            }

        }

        res.redirect("/");

    } catch (err) {

        console.log(err);

        res.send("Attendance Submit Error");

    }

});
module.exports = router;