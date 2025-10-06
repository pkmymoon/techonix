👨‍💼 Employee API 👨‍💼
🔗 Base URL: https://employee-react.onrender.com/emp

📌 Endpoints:

📝 Register
➤ Route: /register
➤ Method: POST
➤ Fields: name, email, password

🔑 Login
➤ Route: /login
➤ Method: POST
➤ Fields: email, password

🏢 Add Department
➤ Route: /add-department
➤ Method: POST
➤ Fields: dept_name, description
➤ Authorization: Pass token in Authorization header

📋 List Departments
➤ Route: /departments
➤ Method: GET
➤ Authorization: Pass token in Authorization header

🔍 Get One Department
➤ Route: /department/{deptId}
➤ Method: GET
➤ Params: deptId (req.params)
➤ Authorization: Pass token in Authorization header

❌ Delete Department
➤ Route: /delete-department/{deptId}
➤ Method: DELETE
➤ Params: deptId (req.params)
➤ Authorization: Pass token in Authorization header
