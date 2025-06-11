const Department = require("../models/department");
const { find } = require("../models/user");

exports.addDepartment = async (req, res) => {
    try {
        const { dep_name, desciption } = req.body;
        const newdep = new Department({
            dep_name,
            desciption
        })
        await newdep.save()
        return res.status(200).json({ msg: "department add" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "server error" })

    }
}
exports.getAllDepartment = async (req, res) => {
    try {
        const department = await Department.find()
        return res.status(200).json({ department, msg: "get all department" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "server error" })
    }
}
exports.getDepById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id)
        if (!department) {
            return res.status(404).json({ msg: "user not found" })

        }
        return res.status(200).json({ department, msg: "getdepby id" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "server error" })
    }

}
exports.updateDep = async (req, res) => {
    try {
        const { dep_name, desciption } = req.body;
        const department = await Department.findByIdAndUpdate(req.params.id, { dep_name, desciption }, { new: true })
        if (!department) {
            return res.status(404).json({ msg: "department are not found" })
        }
        return res.status(200).json({ department, msg: "department are updated" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "server error" })
    }
}
exports.deleteDep = async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id)
        if (!department) {
            return res.status(404).json({ msg: "department are deleted" })
        }
        return res.status(200).json({ msg: "deleteted" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "server error" })
    }
}