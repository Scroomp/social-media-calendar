# Social Media Calendar

A social media content planning calendar built with React, TypeScript, and Tailwind CSS. Originally designed in Figma and converted to a fully functional web application.

## Features

- 📅 **Monthly Calendar View** - Navigate between months to plan content
- 📝 **14 Post Types** - Pet of the Week, Digital Services, Financial Services, Podcast, Blog, Video, and more
- ✅ **Post Progress Tracking** - Track creative assets, production steps, and captions for each post
- 🎉 **Special Days & Holidays** - Automatically shows relevant holidays and financial awareness days
- 💾 **Auto-Save** - All changes are automatically saved to your browser's local storage
- 📊 **Monthly Summary** - See how many posts you have scheduled by type

## Running the App

### Prerequisites

You need [Node.js](https://nodejs.org/) installed on your computer (version 18 or higher recommended).

### Installation & Running

1. Open a terminal (Command Prompt or PowerShell on Windows, Terminal on Mac)

2. Navigate to this folder:
   ```bash
   cd "path/to/Social Media Calendar (Copy)"
   ```

3. Install dependencies (only needed once):
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and go to: **http://localhost:5173/**

### Stopping the App

Press `Ctrl+C` in the terminal to stop the server.

## Data Persistence

All your changes are automatically saved to your browser's local storage:
- ✅ Posts you create or delete
- ✅ Post progress (creative assets, steps, captions)
- ✅ Current month selection

**Your data will persist** even after closing the browser or restarting your computer!

To clear all saved data and reset to defaults, click the **"Clear All Data"** button in the top right.

## Troubleshooting

### "npm is not recognized" error
Make sure Node.js is installed. Download it from https://nodejs.org/ and restart your terminal after installing.

### Port already in use
If port 5173 is busy, Vite will use the next available port. Check the terminal output for the actual URL.

### Changes not saving
Make sure your browser allows local storage. Try using Chrome or Edge for best compatibility.

## Original Design

This project was created from a Figma design: https://www.figma.com/design/PHH0mv03QyaPpT7RaiT2br/Social-Media-Calendar--Copy-

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS 4
- Radix UI Components
- Lucide Icons
