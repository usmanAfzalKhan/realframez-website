# RealFrames

**Live Site:** [https://realframes.netlify.app/](https://realframes.netlify.app/)

RealFrames is a modern, professional real estate photography portfolio and client engagement platform. It’s designed to showcase high-quality real estate images, collect and display client reviews, and streamline inquiries—all with fast performance and mobile-first responsiveness.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Deployment](#deployment)
- [Contact](#contact)

---

## Demo

Check out the live website here:  
👉 [https://realframes.netlify.app/](https://realframes.netlify.app/)

---

## Features

- **Image Gallery:**  
  Responsive photo galleries for property exteriors, interiors, and portfolio pieces.  
  Images optimized for fast load times and high-quality display.

- **Animated UI & Professional Design:**  
  Clean, modern look with animated transitions and SCSS-based custom styling.  
  Navigation and content sections are fully responsive for mobile and desktop.

- **Client Reviews:**  
  Integrated review system built on Firebase.  
  Reviews are moderated and profanity-filtered before public display.

- **Contact Form:**  
  Custom contact form using EmailJS—lets clients reach out directly from the site.  
  Includes validation, feedback messages, and spam protection.

- **Performance Optimization:**  
  Lazy loading for images, code-splitting, and minified assets for fast performance.

- **SEO & Accessibility:**  
  Meta tags, semantic HTML, and accessible components for better reach and usability.

---

## Tech Stack

- **Frontend:**  
  - [Next.js](https://nextjs.org/) (React framework for SSR and fast SPA experience)
  - [SCSS Modules](https://sass-lang.com/) (modular & maintainable styling)
  - [Framer Motion](https://www.framer.com/motion/) (UI animations and transitions)
  - [EmailJS](https://www.emailjs.com/) (contact form email service)
  - Responsive, mobile-first CSS

- **Backend & Services:**  
  - [Firebase Firestore](https://firebase.google.com/docs/firestore) (review data storage, real-time sync)
  - [Firebase Authentication](https://firebase.google.com/docs/auth) (for admin/review moderation—if used)
  - Profanity filtering logic for review moderation

- **Deployment:**  
  - [Netlify](https://netlify.com/) (continuous deployment, CDN, HTTPS, free hosting)

---

## Project Structure

```

/public             # Static images, icons, assets
/styles             # SCSS modules for each component/page
/components         # React/Next.js components (Navbar, Gallery, Reviews, Contact, etc.)
/pages              # Next.js pages (index.js, about.js, etc.)
/utils              # Utility functions (Firebase config, review filters, helpers)
/firebase           # Firebase config and integration files

````

---

## Setup & Installation

> **Requirements:** Node.js, npm/yarn

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/realframes.git
   cd realframes
````

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Configure Firebase**

   * Create a Firebase project (if you don’t have one)
   * Enable Firestore Database and Authentication (if needed)
   * Copy your Firebase config into `/firebase/firebaseConfig.js`

4. **Set up EmailJS**

   * Register at [EmailJS](https://www.emailjs.com/)
   * Get your user ID, service ID, and template ID
   * Add these to your environment variables or the appropriate config

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   * App will be available at `http://localhost:3000`

---

## Deployment

* Deploy easily via Netlify:

  * Connect your GitHub repo to Netlify.
  * Set build command to `npm run build` and publish directory to `.next`.
  * Add your environment variables for Firebase/EmailJS to Netlify’s dashboard.
* Live version: [https://realframes.netlify.app/](https://realframes.netlify.app/)

---

## Contact

For questions, collaborations, or business inquiries, please visit the website:

* [https://realframes.netlify.app/](https://realframes.netlify.app/)

---

> **Credits:**
> Made with ❤️ using Next.js, SCSS, Firebase, and Netlify.

