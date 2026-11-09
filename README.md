# 🍽️ Does It Taste as Good as It Looks?

<img width="825" height="364" alt="fullstack2 SS" src="https://github.com/user-attachments/assets/0949221e-eac3-496a-aeba-ae970ed166cb" />

<img width="1073" height="615" alt="fullstack2 SS2" src="https://github.com/user-attachments/assets/d3cb8a61-0a25-436e-9d51-18108cb1cec9" />



### Full-Stack Food Sharing & Voting Application

## About the Project

Does It Taste as Good as It Looks? is a full-stack web application I built to practice working with user authentication, databases, and CRUD operations.

The idea behind this project was to create a place where users could share foods they've tried or are interested in, upload a picture through an image URL, and let others vote on whether the food looks good.

I started with an existing authentication boilerplate and customized it into a food-sharing application. I wanted to get more comfortable connecting the front end to the back end and working with information stored in MongoDB.

## Features

- **User Authentication:** Users can sign up, log in, and access the application.
- **Add Food:** Users can submit a food name and image URL.
- **View Food Posts:** Food entries are retrieved from MongoDB and displayed with their pictures.
- **Thumbs Up:** Users can give a food post a positive vote.
- **Thumbs Down:** Users can give a food post a negative vote.
- **Delete Posts:** Food entries can be removed from the database.
- **Database Integration:** MongoDB stores food names, image URLs, and vote counts.

## Tech Stack

**Front End**

- HTML5
- CSS3
- JavaScript
- Bootstrap
- EJS

**Back End**

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js

## How It Works

1. A user visits the website and selects Login or Signup.
2. After authentication, the user is redirected to the profile page.
3. The application displays food posts saved in MongoDB.
4. Users can add a new food by entering its name and an image URL.
5. Users can vote using the thumbs-up and thumbs-down buttons.
6. Each vote updates the corresponding record in MongoDB.
7. A food post can also be deleted using its database ID.

## Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB database connection

### Installation

1. Clone the repository:

   `git clone https://github.com/KevSal227/fullstack2food.git`
2. Navigate into the project:

   `cd fullstack2food`
3. Install dependencies:

   `npm install`
4. Create a `.env` file in the project directory and add your MongoDB connection:

   `MONGODB_URI=your_mongodb_connection_string`
5. Start the application:

   `node server.js`
6. Open `http://localhost:8080` in your browser.

**Note:** This project uses older dependencies and may require compatibility updates to run with modern Node.js versions.

## What I Learned

This project helped me build on what I learned from my first full-stack assignment.

Some of the concepts I practiced include:

- Creating and handling Express routes
- Using POST, PUT, GET, and DELETE requests
- Working with MongoDB collections
- Using MongoDB ObjectIds to identify individual posts
- Using the Fetch API to send requests from the browser
- Displaying dynamic information with EJS
- Working with Passport.js authentication

One of the biggest improvements I made was changing how the application identifies posts. Instead of relying on the food name, I used the MongoDB ObjectId so that votes and deletions target the correct entry, even when two foods have the same name.

I also separated thumbs-up and thumbs-down votes into their own counters rather than subtracting negative votes from the positive total.

## Current Limitations and Future Improvements

This is a learning project, and there are still features I would like to add:

- Let users write actual food reviews and ratings.
- Allow users to upload images directly instead of providing an image URL.
- Connect food posts to the accounts that created them.
- Improve the layout for mobile devices.
- Add form validation and better error handling.
- Update dependencies and improve application security.

## Acknowledgments

The authentication structure was adapted from a Scotch.io authentication tutorial. I customized the project by adding food posts, image display, voting functionality, and database operations.
