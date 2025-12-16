GetGo - Comprehensive Travel Planning Application
GetGo is a full-featured travel planning web application that aggregates destination information from multiple APIs into a single, elegant interface. No more juggling dozens of browser tabs for weather, attractions, currency, and airport info—GetGo has everything you need in one place.

 Live Demo / Video Presentation


 **Table of Contents**
Features

Tech Stack

Project Structure

API Integration

Installation

Configuration

Usage

Key Technical Implementation

Troubleshooting

Future Enhancements

License

 **Features**
 Smart Destination Search
Google Places API autocomplete with real-time suggestions

Seamless transition from search to comprehensive results view

**Weather Intelligence**
Current temperature and conditions with animated icons

5-day forecast summary

Automatic unit conversion (Fahrenheit for US, Celsius elsewhere)

**Points of Interest**
Top attractions with photos and descriptions using OpenTripMap API

Responsive card layout with mobile-friendly pagination

"Load More" functionality for endless exploration

**Currency & Financial Tools**
Real-time exchange rates via ExchangeRate-API

Interactive currency converter with live calculations

Destination currency information from REST Countries API

**Language Information**
Primary and secondary languages spoken at destination

Clean, organized display of linguistic data

**Airport Information**
Closest airport to destination via API Ninjas

Airport name, IATA code, and distance display

**Tours & Activities**
Curated tour options with booking links

Image previews and pricing information

**Tech Stack**
Frontend
React 18 - UI component library

Vite - Next-generation build tool

Tailwind CSS - Utility-first CSS framework

React Router DOM - Client-side routing

**API Integration Architecture**
GetGo implements a sophisticated single-search, multiple-API coordination system:

**How It Works**
User searches for a destination (e.g., "Paris, France")

Google Places API returns location name and precise coordinates

Coordinates become the universal key that triggers parallel API requests:

lat/lng → OpenWeatherMap API (weather)

lat/lng → OpenTripMap API (attractions)

lat/lng → API Ninjas (nearest airport)

address → REST Countries API (country info → currency/language)

currency code → ExchangeRate-API (exchange rates)

All data aggregates into a unified travel dashboard

**Installation**
Node.js 16+ and npm.

API keys for required services (see Configuration)

Steps
Clone the repository

bash
run "git clone https://github.com/pennjay237/Get-Go-travel-app.git"
cd getgo
Install dependencies

bash
npm install
Set up environment variables

bash
cp .env.example .env
# Edit .env with your API keys
Start development server

bash
npm run dev
The application will be available at http://localhost:3000