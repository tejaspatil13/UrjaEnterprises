# Urja Enterprises Website Project Specification

## 1) Project Overview

- **Company Name:** Urja Enterprises  
- **Location:** Nashik, Maharashtra  
- **Business Category:** Products & Services  
- **Website Goal:** Build a modern, user-friendly B2B product website that showcases electrical products, improves trust, and increases quote inquiries.

## 2) Primary Objectives

- Present products in a professional and easy-to-browse format.
- Make quote generation quick from any important page.
- Improve user confidence with company information and rating summary.
- Support desktop and mobile users with responsive layouts.

## 3) Target Audience

- Electrical contractors
- Industrial procurement teams
- Utility and infrastructure project buyers
- Maintenance and operations teams

## 4) Information Architecture (Sitemap)

- **Home**
- **Products**
  - Category listing with subcategories
  - Product detail pages
- **About Us**
- **Contact / Get Quote**

## 5) Homepage Specification

### 5.1 Hero and Product Showcase

- A prominent product showcase section near the top of the homepage.
- **Auto-swipe carousel** to rotate featured products every 3-5 seconds.
- Manual controls:
  - Left/right arrows
  - Swipe on mobile
  - Dot indicators for slide position
- Each slide includes:
  - Product image
  - Product name
  - Short benefit line
  - **"Get Quote"** CTA button

### 5.2 Homepage CTA Rules

- Global **"Get Quote"** button in header (sticky on scroll).
- One **"Get Quote"** button in hero carousel.
- Additional CTA section near page bottom.
- CTA behavior:
  - Opens quote form page/modal
  - Prefills selected product when initiated from product contexts

## 6) Products Section Specification

## 6.1 Category and Subcategory Structure

### 1. Circuit Breaker
- 38kV Vacuum Circuit Breaker  
- 66kV SF6 Gas Circuit Breaker  
- 145kV SF6 Gas Circuit Breaker  
- Porcelain Clad Vacuum Circuit Breaker  
- 33kV Outdoor Vacuum Circuit Breaker  
- CG 12kV Vacuum Circuit Breaker  

### 2. Spring Charging Motor
- Delco Spring Charging Motor  
- Electric Spring Charging Motor  
- Spring Charging Motor  
- Spring Charging Mechanism  

### 3. Switches
- TNC (Trip Neutral Close) Single Pole  

### 4. Vacuum Circuit Breaker
- Crompton Greaves Vacuum Circuit Breaker  

### 5. Tripping Coil
- Shunt Tripping Coil  
- Closing Tripping Coil  
- 110V DC Tripping Coil  
- Circuit Breaker Tripping Coil  

## 6.2 Products Listing Page Layout

- **Left vertical panel (sticky):**
  - Product categories
  - Expand/collapse subcategories
  - Current selection highlight
- **Right content panel:**
  - Product cards grid/list
  - Product image, name, short description
  - Quick **"Get Quote"** button
- Optional controls:
  - Search bar
  - Sort by popularity/latest

## 7) Product Detail Page Template (Mandatory Layout)

Each product must have an individual detail page using this structure:

- **Product Name:** [Dynamic value]
- **Product Information:** [Detailed description]
- **Main Content Layout (2-column on desktop):**
  - **Left:** Product photo/gallery
  - **Right:** Price table
- **Primary CTA:** **"Get Quote"** button next to/under price table
- **Mobile behavior:** Stack sections in this order:
  1. Product name
  2. Product photo
  3. Product information
  4. Price table
  5. Get Quote button

### 7.1 Product Information Content Requirements

Each product detail page should include:

- Product overview
- Technical specifications (voltage class, application area, material/build)
- Use cases / industries
- Key features and advantages
- Optional downloadable datasheet field

### 7.2 Price Table Requirements

Suggested columns:

- Variant / Model
- Specification
- Unit
- Price (or "On Request")
- Availability

Note: If live pricing is not available, show **"Price on Request"** and direct users to quote form.

## 8) About Us Section Specification

### 8.1 About Content Blocks

- Company intro (Urja Enterprises, Nashik)
- Mission and product/service commitment
- Why clients choose Urja Enterprises

### 8.2 User Review Summary (Must appear at end of About section)

- **Overall Rating:** **4.3/5**
- **Total Ratings:** **51**
- **Star Distribution:**
  - 5 Star: 68%
  - 4 Star: 12%
  - 3 Star: 8%
  - 2 Star: 2%
  - 1 Star: 10%
- **User Satisfaction Ratings:**
  - Response: 94%
  - Quality: 90%
  - Delivery: [Value to be confirmed; placeholder until provided]

Display recommendation:

- Horizontal bars for star distribution
- Circular/linear progress indicators for satisfaction metrics

## 9) Quote Flow Specification

- Quote request options from:
  - Header CTA
  - Homepage carousel CTA
  - Product cards
  - Product detail pages
- Quote form fields:
  - Name
  - Company
  - Phone
  - Email
  - Product of interest (auto-filled when available)
  - Quantity
  - Message/requirements
- Form behavior:
  - Required field validation
  - Success message and follow-up expectation
  - Spam protection (CAPTCHA or honeypot)

## 10) Design & UX Guidelines

- Clean industrial/B2B visual language
- High-contrast typography and CTA buttons
- Consistent spacing and card styles
- Responsive design across desktop/tablet/mobile
- Fast-loading optimized product images

## 11) Non-Functional Requirements

- SEO-friendly page titles and meta descriptions
- Accessible components (keyboard navigation, alt text, semantic headings)
- Core performance optimization (compressed images, lazy loading)
- Contact and quote actions trackable via analytics events

## 12) Recommended Tech Considerations

- Frontend: React + Vite (already present in project)
- Reusable component structure for:
  - Carousel
  - Category sidebar
  - Product card
  - Product detail template
  - Rating summary widget
  - Quote form

## 13) Content Checklist Before Launch

- Product images for all listed products
- Technical details per product
- Price table data or "On Request" labels
- Final delivery satisfaction percentage
- Contact details and inquiry email/phone
- Legal and footer content

## 14) Success Metrics

- Increased quote submissions
- Better product page engagement time
- Lower homepage bounce rate
- Higher return visitor rate from target B2B users

## Firebase Database Setup

1. Create `.env` from `.env.example` and add your Firebase Web App keys.
2. Start the app with `npm run dev`.
3. In Firebase Console → Authentication → Sign-in method, enable:
   - Email/Password
   - Google (optional, for “Continue with Google”)
3. Open `Admin` page and login using demo password `urja2015`.
4. Click `Setup Firebase DB`.
   - Creates `users` collection with:
     - 2 admins (`role: admin`)
     - normal users (`role: user`)
   - Upserts `products` collection with:
     - category
     - subCategory
     - productInfo
     - image
5. Deploy `firestore.rules` in Firebase Console (or CLI) for role-based access control.
