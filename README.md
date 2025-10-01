# DEE.FLICKZ Admin Dashboard

A responsive admin dashboard for DEE.FLICKZ, built with React, TypeScript, and Material UI v5.

---

### 🛠 Tech Stack

- React (TypeScript)  
- Material UI v5  
- React Router DOM v6+  
- Supabase (Authentication)  
- Convex (Backend & Authorization)  
- Vercel (Deployment)


---

## 📈 Progress

- **September 17, 2025** – Initial layout completed:
  - Responsive navbar with logo, menu, search, and action buttons
  - Sidebar for navigation with mobile/desktop variants
  - Mobile-friendly search bar with expand/collapse behavior
  - Buttons adapt between full label/icon (desktop) and icon-only (mobile)

- **September 18, 2025** – Authentication & Backend Integration:  
  - Integrated Supabase for user authentication (Google OAuth)  
  - Implemented backend authorization with Convex to restrict access based on email
  - Created protected routes to restrict unauthorized access  
  - Set up logout and multi-account switching support  
  - Connected project to Vercel for seamless deployment

- **September 18, 2025** – Pending Bookinglist and Book Cards with buttons:  
  - Added a card that holds a list of pending bookings.  
  - Created a reusable booking card that has buttons to confirm, update, remove(will make confirmed bookings work with this).
  - Created Convex functions for pending bookings filtered no search query yet though.
  - Created a Convex update booking function. 
  - Also added pagination where there is only 5 booking card for each page.