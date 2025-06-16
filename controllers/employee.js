const User = require("../models/user")
const Employee = require("../models/empolyee")
const Department = require("../models/department")
const bcrypt = require("bcrypt")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, File, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + Path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

const addEmp = async (req, res) => {
    try {
        const {
            employeeId, dob, gender, maritalStatus,
            designation, department, salary, password,
            role, email, name
        } = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists with this email" });
        }


        const hashPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImg: req.file ? req.file.filename : ""
        });
        const savedUser = await newUser.save();


        const newEmp = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });
        await newEmp.save();

        return res.status(200).json({ msg: "Successfully added" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server side error" });
    }
};
const getAllEmp = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate("userId")
            .populate("department");

        return res.status(200).json({ employees, msg: "All employees fetched successfully" });
    } catch (error) {
        console.error("Error fetching employees:", error);
        return res.status(500).json({ msg: "Server error" });
    }
};
const getEmpById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById({ _id: id }).populate("userId").populate("department")
        return res.status(200).json({ employee, msg: "employees fetched successfully" });
    }
    catch (err) {
        console.error("Error fetching employees:", error);
        return res.status(500).json({ msg: "Server error" });
    }
}
const updateEmp = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, maritalStatus, designation, department, salary } = req.body;


        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ msg: "Employee not found" });
        }


        const updateUser = await User.findByIdAndUpdate(
            employee.userId,
            { name },
            { new: true }
        );

        if (!updateUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        const updateEmployee = await Employee.findByIdAndUpdate(
            id,
            {
                maritalStatus,
                designation,
                department,
                salary,
                updatedAt: Date.now()
            },
            { new: true }
        );

        return res.status(200).json({ msg: "Update successful", updateUser, updateEmployee });

    } catch (err) {
        console.error("Error updating employee:", err);
        return res.status(500).json({ msg: "Server error" });
    }
};
const deleteEmp = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ msg: "Employee not found" });
        }
        const deletedUser = await User.findByIdAndDelete(employee.userId);


        const deletedEmployee = await Employee.findByIdAndDelete(id);

        return res.status(200).json({ msg: "Employee and associated user deleted successfully" });

    } catch (err) {
        console.error("Error deleting employee:", err);
        return res.status(500).json({ msg: "Server error" });
    }
};
module.exports = {
    addEmp,
    upload,
    getAllEmp,
    getEmpById,
    updateEmp,
    deleteEmp
}