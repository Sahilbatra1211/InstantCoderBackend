# Appointment Management System API Documentation

This project provides a backend system for managing appointments, user profiles, and payments. It includes three main modules: Admin, coder, and User, each with its respective endpoints.

---

## Table of Contents

- [Admin APIs](#admin-apis)
- [coder APIs](#coder-apis)
- [User APIs](#user-apis)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)

---

## Admin APIs

### **Authentication**
1. **Login Admin**  
   - **Endpoint**: `POST /admin/login`  
   - **Description**: Authenticate an admin user.

---

### **coders Management**
2. **Add coder**  
   - **Endpoint**: `POST /admin/add-coder`  
   - **Description**: Add a new coder to the system.  
   - **Middleware**: `authAdmin`, `multer`

3. **Get All coders**  
   - **Endpoint**: `GET /admin/all-coders`  
   - **Description**: Retrieve all coders.  
   - **Middleware**: `authAdmin`

4. **Change coder Availability**  
   - **Endpoint**: `POST /admin/change-availability`  
   - **Description**: Update a coder's availability status.  
   - **Middleware**: `authAdmin`

---

### **Appointments Management**
5. **Get Appointments**  
   - **Endpoint**: `GET /admin/appointments`  
   - **Description**: Retrieve all appointments.  
   - **Middleware**: `authAdmin`

6. **Cancel Appointment**  
   - **Endpoint**: `POST /admin/cancel-appointment`  
   - **Description**: Cancel an appointment.  
   - **Middleware**: `authAdmin`

7. **Dashboard**  
   - **Endpoint**: `GET /admin/dashboard`  
   - **Description**: Retrieve admin dashboard data.  
   - **Middleware**: `authAdmin`

---

## coder APIs

### **Authentication**
1. **Login coder**  
   - **Endpoint**: `POST /coder/login`  
   - **Description**: Authenticate a coder user.

---

### **Profile Management**
2. **coder Profile**  
   - **Endpoint**: `GET /coder/profile`  
   - **Description**: Retrieve coder's profile information.  
   - **Middleware**: `authCoder`

3. **Update coder Profile**  
   - **Endpoint**: `POST /coder/update-profile`  
   - **Description**: Update the coder's profile.  
   - **Middleware**: `authCoder`

---

### **Appointments Management**
4. **Get Appointments**  
   - **Endpoint**: `GET /coder/appointments`  
   - **Description**: Retrieve coder's appointments.  
   - **Middleware**: `authCoder`

5. **Cancel Appointment**  
   - **Endpoint**: `POST /coder/cancel-appointment`  
   - **Description**: Cancel an appointment.  
   - **Middleware**: `authCoder`

6. **Complete Appointment**  
   - **Endpoint**: `POST /coder/complete-appointment`  
   - **Description**: Mark an appointment as completed.  
   - **Middleware**: `authCoder`

7. **Dashboard**  
   - **Endpoint**: `GET /coder/dashboard`  
   - **Description**: Retrieve coder dashboard data.  
   - **Middleware**: `authCoder`

8. **Change Availability**  
   - **Endpoint**: `POST /coder/change-availability`  
   - **Description**: Update coder's availability status.  
   - **Middleware**: `authCoder`

9. **coder List**  
   - **Endpoint**: `GET /coder/list`  
   - **Description**: Retrieve a list of all coders.

---

## User APIs

### **Authentication**
1. **Register User**  
   - **Endpoint**: `POST /user/register`  
   - **Description**: Register a new user.

2. **Login User**  
   - **Endpoint**: `POST /user/login`  
   - **Description**: Authenticate a user.

---

### **Profile Management**
3. **Get Profile**  
   - **Endpoint**: `GET /user/get-profile`  
   - **Description**: Retrieve user profile information.  
   - **Middleware**: `authUser`

4. **Update Profile**  
   - **Endpoint**: `POST /user/update-profile`  
   - **Description**: Update user profile information.  
   - **Middleware**: `authUser`, `multer`

---

### **Appointments Management**
5. **Book Appointment**  
   - **Endpoint**: `POST /user/book-appointment`  
   - **Description**: Book a new appointment.  
   - **Middleware**: `authUser`

6. **Get Appointments**  
   - **Endpoint**: `GET /user/appointments`  
   - **Description**: Retrieve user's appointments.  
   - **Middleware**: `authUser`

7. **Cancel Appointment**  
   - **Endpoint**: `POST /user/cancel-appointment`  
   - **Description**: Cancel an appointment.  
   - **Middleware**: `authUser`

---

### **Payments**
8. **Payment with Razorpay**  
   - **Endpoint**: `POST /user/payment-razorpay`  
   - **Description**: Process payment using Razorpay.  
   - **Middleware**: `authUser`

9. **Verify Razorpay Payment**  
   - **Endpoint**: `POST /user/verifyRazorpay`  
   - **Description**: Verify Razorpay payment.  
   - **Middleware**: `authUser`

10. **Payment with Stripe**  
    - **Endpoint**: `POST /user/payment-stripe`  
    - **Description**: Process payment using Stripe.  
    - **Middleware**: `authUser`

11. **Verify Stripe Payment**  
    - **Endpoint**: `POST /user/verifyStripe`  
    - **Description**: Verify Stripe payment.  
    - **Middleware**: `authUser`

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Authentication**: JWT
- **File Upload**: Multer
- **Database**: MongoDB (assumed)

---

## Setup Instructions

1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure environment variables for database, JWT, and payment gateways.
4. Run the development server: `npm start`
