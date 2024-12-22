# Appointment Management System

A robust backend system to manage user profiles, appointments, and payments for an appointment management application. The system integrates with Razorpay and Stripe for secure payment handling.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Endpoints](#endpoints)
  - [User Management](#user-management)
  - [Appointment Management](#appointment-management)
  - [Payment Handling](#payment-handling)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)

---

## Introduction

This backend system is designed to:
- Handle user registration and profile updates.
- Manage appointment booking and cancellation.
- Integrate with popular payment gateways like Razorpay and Stripe for seamless transaction processing.

---

## Features

- **User Management**: Register, login, and manage user profiles.
- **Appointment Management**: Book, list, and cancel appointments.
- **Payments**: Secure payments using Razorpay and Stripe.

---

## Endpoints

### User Management

1. **Register User**  
   - **Endpoint**: `POST /register`  
   - **Description**: Register a new user.  
   - **Request Body**:
     ```json
     {
       "name": "John Doe",
       "email": "john.doe@example.com",
       "password": "SecurePassword123"
     }
     ```
   - **Response**:
     - **Success**:
       ```json
       {
         "success": true,
         "token": "JWT_TOKEN"
       }
       ```
     - **Failure**: Error messages based on validation.

2. **Login User**  
   - **Endpoint**: `POST /login`  
   - **Description**: Log in an existing user.  
   - **Request Body**:
     ```json
     {
       "email": "john.doe@example.com",
       "password": "SecurePassword123"
     }
     ```
   - **Response**:
     - **Success**:
       ```json
       {
         "success": true,
         "token": "JWT_TOKEN"
       }
       ```
     - **Failure**: 
       ```json
       {
         "success": false,
         "message": "Invalid credentials"
       }
       ```

3. **Get User Profile**  
   - **Endpoint**: `POST /get-profile`  
   - **Request Body**:
     ```json
     {
       "userId": "USER_ID"
     }
     ```
   - **Response**:
     - **Success**:
       ```json
       {
         "success": true,
         "userData": { ... }
       }
       ```

4. **Update User Profile**  
   - **Endpoint**: `PUT /update-profile`  
   - **Request Body**:
     ```json
     {
       "userId": "USER_ID",
       "name": "John Updated",
       "phone": "1234567890",
       "dob": "YYYY-MM-DD",
       "gender": "Male"
     }
     ```
   - **Response**: Success or failure messages.

---

### Appointment Management

1. **Book Appointment**  
   - **Endpoint**: `POST /book-appointment`  
   - **Request Body**:
     ```json
     {
       "userId": "USER_ID",
       "docId": "DOCTOR_ID",
       "slotDate": "YYYY-MM-DD",
       "slotTime": "HH:MM"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Appointment Booked"
     }
     ```

2. **Cancel Appointment**  
   - **Endpoint**: `POST /cancel-appointment`  
   - **Request Body**:
     ```json
     {
       "userId": "USER_ID",
       "appointmentId": "APPOINTMENT_ID"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "message": "Appointment Cancelled"
     }
     ```

3. **List Appointments**  
   - **Endpoint**: `POST /list-appointments`  
   - **Request Body**:
     ```json
     {
       "userId": "USER_ID"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "appointments": [...]
     }
     ```

---

### Payment Handling

1. **Payment with Razorpay**  
   - **Endpoint**: `POST /payment-razorpay`  
   - **Request Body**:
     ```json
     {
       "appointmentId": "APPOINTMENT_ID"
     }
     ```

2. **Verify Razorpay Payment**  
   - **Endpoint**: `POST /verify-razorpay`  
   - **Request Body**:
     ```json
     {
       "razorpay_order_id": "ORDER_ID"
     }
     ```

3. **Payment with Stripe**  
   - **Endpoint**: `POST /payment-stripe`  
   - **Request Body**:
     ```json
     {
       "appointmentId": "APPOINTMENT_ID"
     }
     ```

4. **Verify Stripe Payment**  
   - **Endpoint**: `POST /verify-stripe`  
   - **Request Body**:
     ```json
     {
       "appointmentId": "APPOINTMENT_ID",
       "success": "true/false"
     }
     ```

---

## Environment Variables

Set up the following environment variables in a `.env` file:

```plaintext
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
CURRENCY=USD
