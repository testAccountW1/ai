# Project: Modern Loan Website (Vite + JS)

You are my senior front-end engineer. We are building a **state-of-the-art loan website** using my existing **Vite JavaScript** project.

## Goals
- Build a modern, polished UI that looks like a real fintech product
- Include a full set of pages: landing, loan calculator, products, dashboard, profile, login, register, etc.
- Use clean architecture, reusable components, and consistent styling
- Keep it simple for a test/demo: auth can be mocked locally (no real backend required)

## Tech constraints
- Project is **Vite + JavaScript** (not TypeScript for now)
- Use **React** (assume Vite React template)
- Use **React Router** for routing
- Styling: choose ONE approach and stick to it:
  - Option A: Tailwind CSS
  - Option B: CSS Modules
  - Option C: Styled Components
Pick the approach that results in the cleanest, fastest build and modern look.

## Design requirements
- Modern fintech style (clean, whitespace, strong typography)
- Responsive (mobile-first)
- Consistent layout with:
  - Top navigation
  - Footer
  - CTA buttons
- Use subtle animations/transitions
- Use accessible components (labels, focus states)

## Pages to build (MVP)
### Public pages
1. **Home / Landing**
   - Hero section with CTA (“Apply now”)
   - Benefits section (cards)
   - Testimonials
   - FAQ accordion
   - Big CTA section before footer
   - Include a **slider/carousel** for testimonials or featured products

2. **Loan Calculator**
   - Amount slider (e.g., 1,000 – 250,000)
   - Term slider (e.g., 3 – 60 months)
   - Rate selector (or fixed rate)
   - Output:
     - Estimated monthly repayment
     - Total repayable
     - Simple breakdown
   - CTA: “Continue application”

3. **Loan Products**
   - Product cards (Personal, Business, Consolidation)
   - Each has “Learn more” and “Apply”

4. **About**
5. **Contact**
   - Basic form (mock submit)
   - Company info section

### Auth pages
6. **Login**
7. **Register**
8. **Forgot Password** (mock)

### Protected app pages (requires “logged in” state)
9. **Dashboard**
   - Summary tiles (active loan, next payment, credit limit)
   - Recent activity list
   - CTA: “Start new application”

10. **My Loans**
    - Table/list of loans
    - Status pills (Active/Pending/Closed)
    - Detail view route: `/loans/:id`

11. **Payments**
    - Payment schedule
    - “Pay now” (mock)

12. **Profile / Settings**
    - Personal info form
    - Security section (change password - mock)

## Auth behavior (demo)
- Use a simple auth store:
  - Save a fake token/user object to `localStorage`
  - Provide `login()`, `logout()`, `register()` functions (mock)
- Protect routes using a `ProtectedRoute` wrapper
- Include a “logout” button in the header when logged in

## Routing
Implement React Router routes:
- `/` Home
- `/calculator`
- `/products`
- `/about`
- `/contact`
- `/login`
- `/register`
- `/forgot-password`
Protected:
- `/app` Dashboard
- `/app/loans`
- `/app/loans/:id`
- `/app/payments`
- `/app/profile`

## Components to create (reusable)
- `Layout` (public)
- `AppLayout` (protected)
- `Navbar`, `Footer`
- `Button`, `Card`, `Input`, `Select`
- `Slider` (amount/term)
- `Carousel` (testimonials/products)
- `Modal` (optional)
- `Toast/Alert` (optional)
- `ProtectedRoute`

## Data (mock)
Create mock data files:
- testimonials
- loan products
- loans list (with IDs and statuses)
- recent activity

## Deliverables
1. Propose a folder structure
2. Implement the full routing
3. Build the UI for each page with modern styling
4. Ensure sliders and carousel work smoothly
5. Make the app usable end-to-end with mocked auth + localStorage

## Working style
- Start by explaining the plan briefly
- Then generate code step-by-step (file by file)
- Prefer simple, reliable libraries (avoid overly heavy dependencies)
- If a dependency is needed (carousel/slider), suggest one and show install command

## Important
- Keep all text and UI labels professional (fintech tone)
- Make everything responsive
- Don’t leave placeholder “lorem ipsum” — use realistic copy
