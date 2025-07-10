const express = require("express");
const studentRoute = express.Router();

let StudentModel = require("../models/Student");

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Get all students
 *     responses:
 *       200:
 *         description: Returns list of all students
 */
studentRoute.route("/").get((req, res, next) => {
  StudentModel.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

/**
 * @swagger
 * /api/create-student:
 *   post:
 *     summary: Create a new student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student created successfully
 */

studentRoute.route("/create-student").post((req, res, next) => {
  StudentModel.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

/**
 * @swagger
 * /api/edit-student/{id}:
 *   get:
 *     summary: Get student by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the student
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns student data
 */

studentRoute.route("/edit-student/:id").get((req, res, next) => {
  StudentModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

/**
 * @swagger
 * /api/update-student/{id}:
 *   put:
 *     summary: Update student by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the student
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 */

studentRoute.route("/update-student/:id").put((req, res, next) => {
  StudentModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        // console.log('Student successfully updated');
      }
    }
  );
});

/**
 * @swagger
 * /api/delete-student/{id}:
 *   delete:
 *     summary: Delete student by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the student
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 */

studentRoute.route("/delete-student/:id").delete((req, res, next) => {
  StudentModel.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = studentRoute;
