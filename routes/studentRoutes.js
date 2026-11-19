const express = require('express');
const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent
} = require('../data/students');

const router = express.Router();

const parseStudentId = (value) => {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
};

const validateStudent = (body) => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Request body must be a JSON object';
  }
  if (typeof body.name !== 'string' || !body.name.trim()) {
    return 'Name is required and must be a non-empty string';
  }
  if (typeof body.course !== 'string' || !body.course.trim()) {
    return 'Course is required and must be a non-empty string';
  }
  return null;
};

router.get('/', async (req, res, next) => {
  try {
    const students = await getAllStudents();
    return res.status(200).json({ success: true, count: students.length, data: students });
  } catch (error) { return next(error); }
});

router.get('/:id', async (req, res, next) => {
  const id = parseStudentId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: 'Student ID must be a positive integer' });
  }
  try {
    const student = await getStudentById(id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    return res.status(200).json({ success: true, data: student });
  } catch (error) { return next(error); }
});

router.post('/', async (req, res, next) => {
  const validationError = validateStudent(req.body);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }
  try {
    const student = await addStudent({ name: req.body.name.trim(), course: req.body.course.trim() });
    return res.status(201).json({ success: true, message: 'Student created successfully', data: student });
  } catch (error) { return next(error); }
});

router.put('/:id', async (req, res, next) => {
  const id = parseStudentId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: 'Student ID must be a positive integer' });
  }
  const validationError = validateStudent(req.body);
  if (validationError) {
    return res.status(400).json({ success: false, message: validationError });
  }
  try {
    const student = await updateStudent(id, { name: req.body.name.trim(), course: req.body.course.trim() });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    return res.status(200).json({ success: true, message: 'Student updated successfully', data: student });
  } catch (error) { return next(error); }
});

router.delete('/:id', async (req, res, next) => {
  const id = parseStudentId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: 'Student ID must be a positive integer' });
  }
  try {
    const student = await deleteStudent(id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    return res.status(200).json({ success: true, message: 'Student deleted successfully', data: student });
  } catch (error) { return next(error); }
});

module.exports = router;
