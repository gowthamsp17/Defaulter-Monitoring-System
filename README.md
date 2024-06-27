# Defaulter Monitoring System

A React Native Expo application designed to manage and track student defaulters for late coming and dress code violations. This system includes separate login functionalities for admins and staff, utilizing MongoDB Atlas for database management and Zoho Catalyst for backend hosting.

## Features

### Admin Login
- **Register Staff:** Admins can register new staff members who will be responsible for marking defaulters.
- **Manage Staff:** View and manage registered staff details.

### Staff Login
- **Check Defaulters:** Staff can check the list of defaulters for late coming and dress code violations.
- **Mark Defaulters:** Staff can scan a student’s ID card to mark them as a defaulter. The system tracks:
  - Late comers
  - Dress code violations
- **Database Storage:** All defaulter records are stored in a MongoDB Atlas database.

## Technologies Used
- **Frontend:** React Native with Expo
- **Backend:** Hosted on Zoho Catalyst
- **Database:** MongoDB Atlas

## Setup and Installation

### Prerequisites
- Node.js installed
- Expo CLI installed
- A MongoDB Atlas account and cluster
- A Zoho Catalyst account

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/defaulter-monitoring-system.git
    cd defaulter-monitoring-system
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the Expo development server:
    ```sh
    expo start
    ```

## Backend Setup

1. **Zoho Catalyst**

    - Ensure you have a Zoho Catalyst account and set up your project.
    - Deploy the backend services on Zoho Catalyst to handle the ID card scanning and defaulter marking functionalities.

2. **MongoDB**

    - Set up a MongoDB database to store the defaulter data.
    - Ensure your application has access to the MongoDB database through the backend services deployed on Zoho Catalyst.

## Usage

1. **Scan ID Card**

    - Open the app and use the scan feature to scan a student’s ID card.
    - The app will retrieve the roll number from the ID card.

2. **Mark as Defaulter**

    - The retrieved roll number will be sent to the backend service.
    - The backend service will mark the student as a defaulter in the MongoDB database.

3. Use the Expo Go app on your mobile device to scan the QR code and run the application.

## Screenshots
<div align="center">
  <img src="https://github.com/gowthamsp17/Defaulter-Monitoring-System/blob/main/Output_Images/DMS_1.jpg" alt="Defaulter Monitoring System" width="80%" >
  <img src="https://github.com/gowthamsp17/Defaulter-Monitoring-System/blob/main/Output_Images/DMS_2.jpg" alt="Defaulter Monitoring System" width="80%" >
  <img src="https://github.com/gowthamsp17/Defaulter-Monitoring-System/blob/main/Output_Images/DMS_3.jpg" alt="Defaulter Monitoring System" width="80%" >
  <img src="https://github.com/gowthamsp17/Defaulter-Monitoring-System/blob/main/Output_Images/DMS_4.jpg" alt="Defaulter Monitoring System" width="80%" >
  <img src="https://github.com/gowthamsp17/Defaulter-Monitoring-System/blob/main/Output_Images/DMS_5.jpg" alt="Defaulter Monitoring System" width="80%" >
</div>

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature/YourFeatureName
    ```
3. Make your changes.
4. Commit your changes:
    ```sh
    git commit -m 'Add some feature'
    ```
5. Push to the branch:
    ```sh
    git push origin feature/YourFeatureName
    ```
6. Open a pull request.


## Contact

If you have any questions or suggestions, feel free to contact me:

- Gowtham S P
- GitHub: [gowthamsp17](https://github.com/gowthamsp17)
- Email: gowthamsp.1703@gmail.com
