## Environment Setup

This project has environment variables set up for you, they can be adjusted if needed. Follow the steps below to set up:

1. Copy the `.env.example` template file to create your own `.env` file:

   `cp .env.example .env`

2. Open the `.env` file and ensure all assigned ports are available.

### Environment Variables Overview

- **`PORT`**: The port your server will run on. This should already be prefilled in `.env.example` but can be updated if necessary.
- **`CORS_ORIGIN`**: The domain of your front-end. This allows the domain to access the server. This should already be prefilled in `.env.example` but can be updated if necessary.
- **`DATA`**: The path to the JSON file storing video data. This should already be prefilled in `.env.example` but can be updated if necessary.
- **`KEYS`**: The path to the JSON file storing registered API keys. This has been prefilled with the path to an empty "guest" version of the file. When you visit the `/register` endpoint of the API, your will recieve an API key, and it will be added to this file.

### Running the Project

After setting up your `.env` file, you can start the server:

`npm run dev`

If you encounter any issues with API requests, double-check that the values in your `.env` file are correct.

## Brainflix API Documentation

### Overview

- The url for the API is `http://localhost:8080/` unless changed on your local environment.
- Every "video" object will contain unique details however the video link will be the same.
- The API comes seeded with a list of default videos. Each default video will contain three default comments.

### Authentication

- To register with the API and get a key, make a GET request to `/register`
  - You can do this with the browser and you only need to do it once.
  - Store the key in a global variable in your front-end environment.
- You must append ?api_key=<your_api_key_here> to each of your API request URLs (except for /register)

### API Errors

- This API may return a 400, 401, or 404 error
- Example error body:

```json
{
  "message": "No video with that id exists"
}
```

### Routes

### GET `/videos`

- Returns an array of video objects
- Contains only enough information to display in side bar
- Response body example:

```json
[
  {
    "id": "84e96018-4022-434e-80bf-000ce4cd12b8",
    "title": "The Future of Artificial Intelligence",
    "channel": "Aiden Thompson",
    "image": "http://localhost:8080/images/image0.jpg"
  },
  {
    "id": "c05b9a93-8682-4ab6-aff2-92ebb4bbfc14",
    "title": "Exploring Cities of Europe",
    "channel": "Maria Aziz",
    "image": "http://localhost:8080/images/image1.jpg"
  }
]
```

### POST /videos

Creates a new video.
Post body example:

```json
  {
    "title": "Day in the Life of a Graphic Designer",
    "description": "Come along with me on a day in my life. See what it's like to work as a graphic designer!"
    "fileData": "files[0]"
  }
```

Example response body:
```json
  {
    "id": "84e96018-4022-434e-80bf-000ce4cd12b8",
    "title": "Day in the Life of a Graphic Designer",
    "channel": "Emily Jane",
    "image": "http://localhost:8080/images/image0.jpg",
    "description": "Come along with me on a day in my life. See what it's like to work as a graphic designer!",
    "views": "980,544",
    "likes": "0",
    "duration": "4:01",
    "video": "http://localhost:8080/stream",
    "timestamp": 1691471862000,
    "comments": []
  }
```

### GET /videos/:id

- :id must be swapped out with the id of a video as found in the list of videos.
- Returns a detailed object of a single video.
- Details include the list of comments for that video.
- Example response body:

```json
{
  "id": "84e96018-4022-434e-80bf-000ce4cd12b8",
  "title": "The Future of Artificial Intelligence",
  "channel": "Aiden Thompson",
  "image": "http://localhost:8080/images/image0.jpg",
  "description": "Explore the cutting-edge developments and predictions for Artificial Intelligence in the coming years. From revolutionary breakthroughs in machine learning to the ethical considerations influencing AI advancements, this exploration transcends the boundaries of mere speculation. Join us on a journey that navigates the intricate interplay between innovation, ethics, and the ever-evolving tech frontier.",
  "views": "980,544",
  "likes": "22,479",
  "duration": "4:01",
  "video": "http://localhost:8080/stream",
  "timestamp": 1691471862000,
  "comments": [
    {
      "name": "Noah Duncan",
      "comment": "Your insights into the future of AI are enlightening! The intersection of technology and ethics is particularly thought-provoking. Keep us updated on the tech front!",
      "id": "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
      "likes": 0,
      "timestamp": 1691731062000
    },
    {
      "name": "Terry Wong",
      "comment": "This video is a fantastic overview of the AI landscape. Your ability to distill complex concepts into digestible content is impressive. Can't wait for more tech insights!",
      "id": "091de676-61af-4ee6-90de-3a7a53af7521",
      "likes": 0,
      "timestamp": 1691644662000
    },
    {
      "name": "Janice Rodriguez",
      "comment": "Your channel is my go-to source for staying updated on tech trends. The exploration of AI's future implications is both informative and exciting. Kudos on another excellent video!",
      "id": "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
      "likes": 1,
      "timestamp": 1691558262000
    }
  ]
}
```

### PUT /videos/:id/likes

- :id must be swapped out with the id of a video as found in the list of videos.
- Likes the given video and returns it in the response body.
- Details include the list of comments for that video.
- Example response body:

```json
{
  "id": "84e96018-4022-434e-80bf-000ce4cd12b8",
  "title": "The Future of Artificial Intelligence",
  "channel": "Aiden Thompson",
  "image": "http://localhost:8080/images/image0.jpg",
  "description": "Explore the cutting-edge developments and predictions for Artificial Intelligence in the coming years. From revolutionary breakthroughs in machine learning to the ethical considerations influencing AI advancements, this exploration transcends the boundaries of mere speculation. Join us on a journey that navigates the intricate interplay between innovation, ethics, and the ever-evolving tech frontier.",
  "views": "980,544",
  "likes": "22,479",
  "duration": "4:01",
  "video": "http://localhost:8080/stream",
  "timestamp": 1691471862000,
  "comments": [
    {
      "name": "Noah Duncan",
      "comment": "Your insights into the future of AI are enlightening! The intersection of technology and ethics is particularly thought-provoking. Keep us updated on the tech front!",
      "id": "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
      "likes": 0,
      "timestamp": 1691731062000
    },
    {
      "name": "Terry Wong",
      "comment": "This video is a fantastic overview of the AI landscape. Your ability to distill complex concepts into digestible content is impressive. Can't wait for more tech insights!",
      "id": "091de676-61af-4ee6-90de-3a7a53af7521",
      "likes": 0,
      "timestamp": 1691644662000
    },
    {
      "name": "Janice Rodriguez",
      "comment": "Your channel is my go-to source for staying updated on tech trends. The exploration of AI's future implications is both informative and exciting. Kudos on another excellent video!",
      "id": "66b7d3c7-4023-47f1-a02c-520c9ca187a6",
      "likes": 1,
      "timestamp": 1691558262000
    }
  ]
}
```

### POST /videos/:id/comments

- :id must be swapped out with the numeric id of a video as found in the list of videos.
- Creates a new comment for a specific video.
- Post body example:

```json
{
  "name": "Trudy Jankowski",
  "comment": "I really enjoyed this video! Thanks for posting"
}
```

- Response body example:

```json
  {
    "id": "ade82e25-6c87-4403-ba35-47bdff93a51c",
    "name": "Maria Aziz",
    "comment": "Your travel diaries are like a passport to wanderlust! Each city comes alive through your lens, making me feel like I'm right there with you. Your storytelling captures the essence of these enchanting places, igniting a desire to explore Europe even more. Can't wait for the next adventure!",
    "timestamp": 1690348662000
    "likes": 0
  }
```

### DELETE /videos/:videoId/comments/:commentId

- Deletes the given comment and returns it in the response body.
- :videoId must be swapped out with the numeric id of a video as found in the list of videos.
- :commentId must be swapped out with the numeric id of a comment as found in the list of comments for the given video.
- Response body example:

```json
{
"id": "ade82e25-6c87-4403-ba35-47bdff93a51c",
"name": "Maria Aziz",
"comment": "Your travel diaries are like a passport to wanderlust! Each city comes alive through your lens, making me feel like I'm right there with you. Your storytelling captures the essence of these enchanting places, igniting a desire to explore Europe even more. Can't wait for the next adventure!",
"timestamp": 1690348662000
"likes": 0
}
```

### PUT /videos/:videoId/comments/:commentId

- Likes the given comment and returns it in the response body.
- :videoId must be swapped out with the numeric id of a video as found in the list of videos.
- :commentId must be swapped out with the numeric id of a comment as found in the list of comments for the given video.
- Response body example:

```json
{
"id": "ade82e25-6c87-4403-ba35-47bdff93a51c",
"name": "Maria Aziz",
"comment": "Your travel diaries are like a passport to wanderlust! Each city comes alive through your lens, making me feel like I'm right there with you. Your storytelling captures the essence of these enchanting places, igniting a desire to explore Europe even more. Can't wait for the next adventure!",
"timestamp": 1690348662000
"likes": 0
}
```
