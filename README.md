🏡 Wanderlust – Airbnb-like Hotel Listing Website

Wanderlust is a full-stack web application inspired by Airbnb. Users can explore listings, search/filter destinations, add their own listings, and leave reviews. Built with Node.js, Express, MongoDB, EJS, and Bootstrap, it follows MVC architecture and is deployed on Render.

🚀 Features

🔐 Authentication & Authorization (Passport.js, sessions, flash messages)

🏠 Hotel/Property Listings with images, price, and description

➕ CRUD Operations (Create, Read, Update, Delete listings)

📝 User Reviews & Ratings

🔎 Search & Filters (Trending, Rooms, Cities, Mountains, etc.)

📱 Responsive UI with Bootstrap (hamburger menu, horizontal scroll filters)

🍪 Sessions stored in MongoDB using connect-mongo

⚡ Flash Messages for user feedback (login, signup, errors, success)

🌍 Deployed Live on Render

🛠️ Tech Stack

Frontend: EJS, Bootstrap, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: Passport.js (Local Strategy)

Session Store: connect-mongo

Deployment: Render

📸 Screenshots
Homepage
<img width="1837" height="1005" alt="image" src="https://github.com/user-attachments/assets/1f032623-d260-4e5a-a00c-bacba7af1f97" />


Signup Page
<img width="1837" height="1005" alt="image" src="https://github.com/user-attachments/assets/fce25f56-79f7-4ac7-82b2-a7dabc653b61" />

Add Listing Page
<img width="1837" height="1005" alt="image" src="https://github.com/user-attachments/assets/d213dbf9-f77b-4e18-ba46-74464badee44" />

Map View of Listing
<img width="1837" height="1005" alt="image" src="https://github.com/user-attachments/assets/8b6335ba-cdb7-4698-b711-b78670fba459" />

Reviews Section
<img width="1837" height="1005" alt="image" src="https://github.com/user-attachments/assets/cef70bf2-c405-440b-a641-726d3e0ef255" />

Edit Listing Page
<img width="1837" height="1005" alt="image" src="https://github.com/user-attachments/assets/ee2f8797-58af-4bd8-80b2-0fd6d0d4e89e" />






⚙️ Installation & Setup

Clone the repository and install dependencies:

git clone https://github.com/Rishabh5401/Airbnb.git
cd wanderlust
npm install

Create .env file
ATLASDB_URL=your_mongodb_atlas_url
SECRET=your_session_secret
NODE_ENV=development

Run Locally
npm start


The app will run on:
👉 http://localhost:8080/

🌐 Live Demo

🔗 [Wanderlust on Render](https://airbnb-uzwz.onrender.com/listings)

📂 Project Structure
wanderlust/
│

├── models/           # Mongoose models (User, Listing, Review)

├── routes/           # Express routes (listings, users, reviews)

├── controllers/      # Route logic (separated controllers)

├── views/            # EJS templates

│   ├── layouts/      # Boilerplate and layout files

│   ├── users/        # Signup/Login pages

│   └── listings/     # Listing-related pages

├── public/           # Static assets (CSS, JS, images)

├── utils/            # Utility functions (wrapAsync, ExpressError)

├── app.js            # Main Express application

├── package.json

└── README.md


✨ Future Improvements

📍 Integrate Google Maps / Leaflet for geolocation of listings

📸 Image upload with Cloudinary

⭐ Rating system for listings

📧 Email verification and password reset

👨‍💻 Author

Rishabh Sharma – [GitHub](https://github.com/Rishabh5401)
 | [LinkedIn](https://www.linkedin.com/in/rishabhsharma-javafullstack/)

⚡ Feel free to fork and contribute to this project!
