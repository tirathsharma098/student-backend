import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Student } from "../entities/student";
import { Subject } from "../entities/subject";
import { Status } from "../entities/student";
import { v4 as uuidv4 } from "uuid";

// GET STUDENTS
export const index = async (req: Request, res: Response) => {
  const studentRepo = AppDataSource.getRepository(Student);
  const allStudents = await studentRepo.find({
    relations: {
      subjects: true,
    },
  });
  res.json(allStudents);
};

// VIEW STUDENT
export const viewStudent = () => {};

// ADD STUDENT
export const addStudent = async (req: Request, res: Response) => {
  console.log(">> Request Body recieved: ", req.body);
  const studentRepo = AppDataSource.getRepository(Student);
  const subjectRepo = AppDataSource.getRepository(Subject);
  const {
    first_name,
    last_name,
    dob,
    age,
    standard,
    skills,
    intro,
    enrolment_from,
    enrolment_to,
    status,
    is_active,
    subjects,
  } = req.body;
  let newStudent: Student = new Student();
  newStudent.id = uuidv4();
  newStudent.first_name = first_name;
  newStudent.last_name = last_name;
  newStudent.dob = new Date(dob);
  newStudent.age = age;
  newStudent.standard = standard;
  newStudent.skills = skills;
  newStudent.intro = intro;
  newStudent.enrolment_from = new Date(enrolment_from);
  newStudent.enrolment_to = new Date(enrolment_to);
  newStudent.status = Object.values(Status).includes(status)
    ? Status.LIVE
    : Status.SUSPENDED;
  newStudent.is_active = is_active.toLowerCase() === "true" ? true : false;

  // Validating Subjects and than adding it into new student
  let allSubjects = JSON.parse(subjects);
  const foundSubject: Subject[] = [];
  await Promise.all(
    allSubjects.map(async (subj: string) => {
      const newDbSubject = await subjectRepo.findOne({
        where: { subject: subj },
      });
      if (newDbSubject) foundSubject.push(newDbSubject);
    })
  );
  newStudent.subjects = foundSubject;

  console.log(
    ">> ALL SUBJECTS : ",
    allSubjects,
    ">> New Student : ",
    newStudent
  );
  const studentInserted = await studentRepo.save(newStudent);
  if (studentInserted)
    console.log(">> STUDENT ADDED SUCCESSFULLY", studentInserted);
  res.json(studentInserted);
};

// EDIT STUDENT
export const editStudent = async (req: Request, res: Response) => {
  console.log(">> Request Body recieved: ", req.body);
  const studentRepo = AppDataSource.getRepository(Student);
  const subjectRepo = AppDataSource.getRepository(Subject);
  const {
    id,
    first_name,
    last_name,
    dob,
    age,
    standard,
    skills,
    intro,
    enrolment_from,
    enrolment_to,
    status,
    is_active,
    subjects,
  } = req.body;
  const newDob = new Date(dob);
  const newEnrolmentFrom = new Date(enrolment_from);
  const newEnrolmentTo = new Date(enrolment_to);
  const newStatus = Object.values(Status).includes(status)
    ? Status.LIVE
    : Status.SUSPENDED;
  const newIsActive = is_active.toLowerCase() === "true" ? true : false;

  let allSubjects = JSON.parse(subjects);
  const foundSubject: Subject[] = [];
  await Promise.all(
    allSubjects.map(async (subj: string) => {
      const newDbSubject = await subjectRepo.findOne({
        where: { subject: subj },
      });
      if (newDbSubject) foundSubject.push(newDbSubject);
    })
  );
  console.log("FOUND SUBJECTS: ", foundSubject);
  const subjectsToUpdate =  await studentRepo.save({
    id: id,
    subjects: foundSubject
  });
  console.log('>> SUBJECTS UPDATED: ', subjectsToUpdate);
  const updatedStudent = await studentRepo.update(id, {
    first_name,
    last_name,
    dob: newDob,
    age,
    standard,
    skills,
    intro,
    enrolment_from: newEnrolmentFrom,
    enrolment_to: newEnrolmentTo,
    status: newStatus,
    is_active: newIsActive
  });
  console.log('>> UPDATED STUDENT : ', updatedStudent);
  res.send(updatedStudent);
};

// DELETE STUDENT
export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.body;
  console.log(">> STUDENT ID GOT : ", id);
  const studentRepo = AppDataSource.getRepository(Student);
  const deleteStudent = await studentRepo.delete(id);
  res.send(deleteStudent);
};
