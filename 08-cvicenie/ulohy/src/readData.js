const XLSX = require("xlsx");
const xlsx = XLSX.readFile(`./../test/data/Students.xlsx`)
const studentsSheet = xlsx.Sheets['Sheet1'];
const students = XLSX.utils.sheet_to_json(studentsSheet);

console.log(students)