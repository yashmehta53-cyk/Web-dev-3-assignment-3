const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true }
  },
  { timestamps: true, versionKey: false }
);

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 }
}, { versionKey: false });

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

const initializeStudents = async () => {
  const existingCount = await Student.countDocuments();
  if (existingCount === 0) {
    await Student.insertMany([
      { id: 1, name: 'Rahul', course: 'BCA' },
      { id: 2, name: 'Priya', course: 'BTech' },
      { id: 3, name: 'Amit', course: 'BCA' }
    ]);
  }
  const highestStudent = await Student.findOne().sort({ id: -1 }).select('id');
  if (highestStudent) {
    await Counter.findByIdAndUpdate(
      'studentId',
      { $max: { sequenceValue: highestStudent.id } },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }
};

const getNextId = async () => {
  const counter = await Counter.findByIdAndUpdate(
    'studentId',
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return counter.sequenceValue;
};

const getAllStudents = async () => Student.find().sort({ id: 1 });

const getStudentById = async (id) => Student.findOne({ id });

const addStudent = async ({ name, course }) => {
  const id = await getNextId();
  return Student.create({ id, name, course });
};

const updateStudent = async (id, { name, course }) =>
  Student.findOneAndUpdate(
    { id },
    { name, course },
    { new: true, runValidators: true }
  );

const deleteStudent = async (id) => Student.findOneAndDelete({ id });

module.exports = {
  initializeStudents,
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
};
