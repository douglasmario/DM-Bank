# **Banking App Demo**

Welcome to the **DM Banking App Demo**! This project is a demonstration of a fictional banking application built with **Angular**. It showcases my skills as a frontend developer, particularly in creating modular, scalable, and user-friendly applications.

---

## **Project Overview**

### **Objective**
The goal of this project is to demonstrate my ability to:
- Build a modular Angular application.
- Implement features commonly found in banking apps (e.g., login, credit limit simulation, loan simulation).
- Use best practices such as lazy loading, reactive forms, and standalone components.
- Work with mock data to simulate real-world scenarios.

### **Features**
1. **Login Page**:
  - Authenticates users using mock data.
  - Redirects to the dashboard upon successful login.
  - Protected by an `AuthGuard` to ensure only authenticated users can access the dashboard.

2. **Dashboard**:
  - Displays a welcome message.
  - Acts as the main hub for other banking features (to be expanded in the future).

3. **Credit Limit Simulator (upcoming)**:
  - Calculates the available credit limit based on salary, expenses, and credit score.
  - Displays the result using charts.

4. **Loan Simulator (upcoming)**:
  - Calculates loan installments based on the loan amount, interest rate, and duration.
  - Supports both simple and compound interest.

5. **Savings Simulator (upcoming)**:
  - Simulates the growth of savings over time based on a fixed interest rate.

6. **Transaction Panel (upcoming)**:
  - Displays recent credit card transactions.
  - Allows filtering by date and amount.

---

## **Technologies Used**
- **Angular**: Frontend framework for building the application.
- **Reactive Forms**: For form validation and handling.
- **Angular Material**: For UI components and responsive design.
- **Chart.js**: For displaying data visualizations (e.g., charts).
- **RxJS**: For handling asynchronous operations.
- **Standalone Components**: Modern Angular feature for building modular and independent components.
- **Lazy Loading**: For optimizing performance by loading features on demand.

---

## **Project Structure**

```
/src
  /app
    /core
      /guards
        auth.guard.ts          # Protects routes from unauthorized access
      /services
        auth.service.ts        # Handles authentication logic
        api.service.ts         # Simulates API calls with mock data
    /features
      /auth
        /login
          login.component.ts   # Login page (standalone component)
      /dashboard
        dashboard.component.ts # Dashboard page (standalone component)
      /credit-limit            # Credit limit simulator (to be implemented)
      /loan-simulator          # Loan simulator (to be implemented)
      /savings-simulator       # Savings simulator (to be implemented)
      /transaction-panel       # Transaction panel (to be implemented)
    /mocks
      api.mock.ts              # Mock data for API responses
      auth.mock.ts             # Mock data for authentication
    app-routing.module.ts      # Handles routing and lazy loading
  /assets                     # Static assets (images, fonts, etc.)
  /environments               # Environment configurations
```

---

## **How to Run the Project**

Follow these steps to set up and run the project locally:

### **Prerequisites**
- Node.js (v16 or higher)
- Angular CLI (v15 or higher)

### **Steps**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/douglasmario/DM-Bank.git
   cd DM-Bank
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   ng serve
   ```

4. **Open the Application**:
  - Go to `http://localhost:4200` in your browser.
  - Use the following credentials to log in:
    - **Email**: `user@example.com`
    - **Password**: `password`

---

## **Key Highlights for Recruiters**

### **1. Modular Architecture**
- The project is organized into **feature modules** (e.g., `auth`, `dashboard`), making it easy to scale and maintain.
- Each feature is implemented as a **standalone component**, reducing dependencies and improving reusability.

### **2. Lazy Loading**
- Features like the dashboard and login are lazy-loaded, ensuring optimal performance.

### **3. Authentication**
- The `AuthGuard` protects routes like `/dashboard`, ensuring only authenticated users can access them.
- Mock authentication is implemented using `localStorage` to simulate a real-world login flow.

### **4. Mock Data**
- The project uses mock data to simulate API responses, demonstrating my ability to work with asynchronous data.

### **5. Responsive Design**
- The UI is built with **Angular Material** and is fully responsive, ensuring a great user experience on all devices.

---

## **Future Improvements**
- Integrate with a real backend API in Python.
- Add more banking features (e.g., account management, fund transfers).
- Implement unit and end-to-end tests for better code coverage.
- Enhance the UI/UX with animations and transitions.

---

## **Contact Information**

If you have any questions or would like to discuss this project further, feel free to reach out:

- **Name**: Doug Ribeiro
- **Email**: [DouglasMario@hotmail.com](mailto:douglasmario@hotmail.com)
- **LinkedIn**: [linkedin.com/in/douglasmario](https://www.linkedin.com/in/douglasmario)
- **Portfolio**: [DmWebDeveloper.com](https://dmwebdeveloper.com)
---

Thank you for checking out my project! I hope it demonstrates my skills and passion for building high-quality Angular applications. 🚀
