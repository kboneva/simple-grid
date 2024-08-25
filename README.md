# Simple grid dashboard


## Overview
This project provides a web dashboard featuring a 3x3 customizable button grid. Each button can be configured with a title, color, and hyperlink. It is built using Laravel for the backend, MySQL for the database, and React for the frontend. The design is user-friendly and responsive, leveraging Tailwind CSS. 


## Tech Stack
**Frontend:** React, Tailwind CSS, Vite  
**Backend:** Laravel, PHP  
**Database:** MySQL  
**Deployment:** DigitalOcean


## Requirements
- PHP with Composer installed
- Node.js with npm or yarn installed
- MySQL for the database


## Setup
1. Clone this repository
```
git clone https://github.com/kboneva/simple-grid.git
cd simple-grid
```

2. Install the dependencies
```
composer install
npm install
```

3. Setup .env file with your variables
```
cp .env.example .env
php artisan key:generate
```

4. Run migrations to setup database
```
php artisan migrate
```

5. Run the development server
```
php artisan serve
npm run dev
```