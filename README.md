# Chatter

Chatter is a modern AI-powered chat application built with React 19+ and Vite. It integrates with the Hugging Face API to generate AI responses and provides a simple, responsive interface for interacting with the model.

## Features
   AI-powered conversations using the Hugging Face API
   Responsive chat interface and real-time display of user and AI messages
   Streaming and displaying messages as it loads
   Persistent message storage in localstorage
   Clear chat  clears the localstorage and state
   Built with React 19+ and Vite

## Tech stack
  React 19+
  Vite
  JavaScript
  Hugging Face API
  Tailwind css
  Typescript
## Clone the repository
    https://github.com/sindumathi/chatter_ai.git
##  Navigate to the project
    cd chatter
## Install dependencies
    npm install
## Configure the Hugging Face API
    Create a .env file in the root of the project:
     
      VITE_HUG_FACE_API_KEY=your_api_key_here

      **Replace your_api_key_here with your Hugging Face API token.**

## Start the development server
    npm run dev

    The application will be available at the local URL displayed by Vite, typically:   http://localhost: 3000
## Production Build
    To create an optimized production build:
      npm run build
    To preview the production build locally:
      npm run preview

## How It Works
User enter he prompt in the text area  and upon form submit --->  it interacts with the Hugging face APi through fetch---> receives response and checks response.ok----> streams data if response is ok and updates the UI as it stream through the MessageHistory state---> After the stream is complete  updates the local storage for data persistance. Clear chat empty's the MessageHistory state and localstorage.
 

      
