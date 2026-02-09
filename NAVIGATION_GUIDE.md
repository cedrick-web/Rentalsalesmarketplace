# Navigation Guide - Rental & Sales Marketplace

## 🎯 Quick Start Guide

### Current Implementation Status
- ✅ 12 Fully Functional Pages
- ✅ Complete Buyer Journey
- ✅ Essential Seller Features
- ✅ Multi-language Support (Kinyarwanda, English, French, Swahili)
- ✅ Deep Dark Green Theme

---

## 🏠 BUYER NAVIGATION

### 1. Home Page (`activeTab: 'home'`)
**What You See:**
- Rent/Buy toggle switch
- Product grid
- Platform stats
- Trust badges

**Actions:**
- Switch between Rent/Buy mode
- Click any product → Opens Product View Page
- View all products

### 2. Product View Page (Click on any product)
**What You See:**
- Full image gallery with thumbnails
- Product details & pricing
- Seller information
- Reviews & ratings
- Related products

**Actions:**
- Click "Rent Now" or "Buy Now" → Opens booking modal
- Message seller
- Add to wishlist (heart icon)
- Share product
- View seller profile

### 3. Search Page (`activeTab: 'search'`)
**What You See:**
- Filtered products
- Search results count

**Actions:**
- View products by category
- Click products to view details

### 4. Bookings Page (`activeTab: 'bookings'`)
**What You See:**
- All your bookings
- Stats (Total, Pending, Active, Completed)
- Filter tabs

**Actions:**
- Cancel booking (Pending/Confirmed)
- Complete booking (Active)
- Leave review (Completed)
- Message seller
- View booking details

### 5. Wallet Page (`activeTab: 'wallet'`)
**What You See:**
- Current balance
- Transaction history

**Actions:**
- Top-up wallet (MTN/Airtel Money)
- Withdraw funds
- View transaction history

### 6. Dashboard Page (`activeTab: 'dashboard'`)
**10 Tabs Available:**
1. **Notifications** - View all alerts
2. **Wallet** - Full wallet page embedded
3. **Wishlist** - Saved products
4. **Support** - Help tickets
5. **Analytics** - Your stats
6. **Reviews** - Your reviews
7. **Disputes** - File disputes
8. **Referrals** - Referral program
9. **Promo** - Promo codes
10. **Searches** - Saved searches

### 7. Profile Page (`activeTab: 'profile'`)
**What You See:**
- Your profile information
- Your stats
- Settings

### 8. Inbox Page (`activeTab: 'inbox'`)
**What You See:**
- All conversations
- Message threads

---

## 🏪 SELLER NAVIGATION

### 9. Seller Verification (`activeTab: 'seller-verify'`)
**4-Step Process:**

**Step 1 - Identity Document:**
- Select document type (National ID/Passport/Driver's License)
- Enter document number
- Upload document photo
- Security notice displayed

**Step 2 - Selfie:**
- Take/upload selfie with ID
- Instructions shown
- Preview photo
- Retake option

**Step 3 - Business Info:**
- Phone number *
- Email *
- Business name (optional)
- Business address (optional)
- GPS location (optional)

**Step 4 - Review & Submit:**
- Review all information
- Deposit requirement: 50,000 RWF
- Submit button

**Status Display:**
- Pending: "Under review for 24-48 hours"
- Approved: "Start selling" button
- Rejected: Reason displayed

### 10. Seller Orders (`activeTab: 'seller-orders'`)
**What You See:**
- Auto-refresh toggle
- Stats (Pending, Active, Completed, Revenue)
- Order cards with full details

**Actions per Status:**

**Pending Orders:**
- ✅ Approve → Confirm booking
- ❌ Reject → Cancel with reason

**Active Orders:**
- 📦 Confirm Delivery → Release escrow payment

**All Orders:**
- 💬 Message customer
- 👁️ View full details

**Order Details Shown:**
- Product image & title
- Customer info with avatar
- Booking dates
- Delivery address
- Customer notes
- Price breakdown:
  - Total amount
  - Commission (-10%)
  - Your payout
- Escrow status
- Payment status

### 11. My Products (`activeTab: 'my-products'`)
**What You See:**
- Stats (Total, Active, Pending, Inactive)
- Product grid
- Filter tabs

**Actions per Product:**
- ✏️ Edit product
- 📊 View stats (Views, Favorites, Bookings)
- 👁️ Toggle availability (Show/Hide)
- 🗑️ Delete (with confirmation)

### 12. Add Listing (`activeTab: 'add'`)
**What You See:**
- Multi-step upload form
- Image upload
- Product details
- Pricing

---

## 🎨 THEME COLORS

### Primary Green Theme
- **Main Green**: `#1a4d2e` (Very deep forest green)
- **Accent Green**: `#0d5940` (Deep green)
- **Light Background**: `#f7fdf9` (Mint cream)
- **Dark Background**: `#041810` (Deep forest)

### Where It's Applied:
- ✅ All buttons with primary color
- ✅ Navbar logo
- ✅ Cards & badges
- ✅ Wallet balance card (gradient)
- ✅ Success states
- ✅ Active states
- ✅ Links & accents

---

## 🌐 LANGUAGE SWITCHING

**Available Languages:**
1. 🇷🇼 Kinyarwanda (Default)
2. 🇬🇧 English
3. 🇫🇷 Français
4. 🇹🇿 Kiswahili

**How to Switch:**
- Click globe icon (🌐) in navbar
- Select language from dropdown
- App immediately updates

---

## 📱 MOBILE NAVIGATION

### Bottom Navigation Bar
Visible on mobile screens:

- 🏠 **Home** → Home page
- 🔍 **Search** → Search page
- ➕ **Add** → Add listing (sellers)
- 💬 **Inbox** → Messages (with unread count badge)
- 👤 **Profile** → Profile page

---

## 🔔 NOTIFICATIONS

### Notification Bell (in Navbar)
- Shows count badge
- Click to view notifications
- Types:
  - Booking updates
  - Payment alerts
  - Messages
  - Reviews
  - Disputes

---

## 👤 USER MENU (Dropdown)

**Click on avatar/name in navbar:**
- Profile
- My Rentals
- My Listings
- Wallet
- Settings
- Logout

---

## 🎯 QUICK ACTIONS

### From Any Product Card:
- ❤️ Add to wishlist
- 👁️ View details
- 📅 Book now / 🛒 Buy now

### From Product View:
- 💬 Message seller
- 📤 Share product
- ❤️ Save to wishlist
- 📅 Book now / 🛒 Buy now

### From Bookings:
- ❌ Cancel (if pending/confirmed)
- ✅ Complete (if active)
- ⭐ Review (if completed)
- 💬 Message seller

### From Wallet:
- ➕ Top-up
- ➖ Withdraw
- 📊 View history

---

## 🎨 UI COMPONENTS AVAILABLE

### Cards & Containers
- Card (with Header, Content, Footer)
- Tabs
- Accordion
- Sheet
- Dialog

### Forms
- Input
- Textarea
- Select
- Checkbox
- Radio Group
- Switch
- Slider
- Calendar
- Form (with validation)

### Feedback
- Alert
- Toast (Sonner)
- Badge
- Progress
- Skeleton

### Navigation
- Tabs
- Breadcrumb
- Pagination
- Dropdown Menu
- Context Menu

### Data Display
- Table
- Avatar
- Tooltip
- Hover Card

---

## 📊 STATS & METRICS

### Platform Stats (Home Page):
- 2,450+ Products available
- 850+ Active users
- 12 Districts covered
- 4.8 Average rating

### Your Stats (Dashboard):
- Total viewed products
- Total bookings
- Total spent
- Average rating

### Seller Stats (Orders Page):
- Pending orders count
- Active orders count
- Completed orders count
- Total revenue

### Product Stats (My Products):
- Views count
- Favorites count
- Bookings count

---

## 💰 PAYMENT FLOW

### Buyer:
1. Select product → Book Now
2. Choose dates (for rent)
3. Choose delivery option
4. Select payment method (MTN/Airtel/Wallet)
5. Enter phone number
6. Confirm payment
7. ✅ Booking confirmed
8. 🔒 Payment held in escrow

### Seller:
1. Receive booking → Approve/Reject
2. If approved → Prepare product
3. Deliver to customer
4. Confirm delivery in app
5. ✅ Escrow released
6. 💰 Receive 90% (after 10% commission)

---

## 🔐 VERIFICATION STATUS

### Buyer:
- No verification required
- Can book immediately

### Seller:
- ❌ Unverified → Cannot sell
- ⏳ Pending → Under review (24-48h)
- ✅ Verified → Can sell
- Need:
  - ID document
  - Selfie with ID
  - Contact info
  - 50,000 RWF security deposit (refundable)

---

## 🎁 SPECIAL FEATURES

### Escrow System:
- Payment held until delivery confirmed
- Protects both buyer and seller
- Automatic refund if cancelled
- Commission deducted before payout

### Wishlist:
- Save products for later
- Quick access from dashboard
- Availability alerts (planned)

### Reviews:
- Leave after completed bookings
- 5-star rating system
- Comment text
- Photo upload (planned)

### Referral Program:
- Unique referral code
- Share with friends
- Earn rewards
- Track referrals

---

## 🆘 SUPPORT

### Get Help:
- Dashboard → Support tab
- Create support ticket
- View ticket history

---

## 📱 RESPONSIVE BREAKPOINTS

- **Mobile**: < 640px (Bottom nav visible)
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px (Bottom nav hidden)

---

## ⚡ PERFORMANCE TIPS

### Fast Navigation:
- Use bottom nav on mobile
- Use navbar dropdowns on desktop
- Click product cards directly
- Use tabs to filter content

### Quick Actions:
- Dashboard has all shortcuts
- Wallet embedded in dashboard
- Quick amount buttons
- Auto-refresh for orders

---

## 🎯 CURRENT LIMITATIONS

### Not Yet Implemented:
- ❌ Real backend API
- ❌ Real payment processing
- ❌ Admin panel
- ❌ Auction system
- ❌ Real-time WebSocket chat
- ❌ Advanced analytics
- ❌ Dispute resolution (full system)

### Using Mock Data:
- ✅ All products
- ✅ All bookings
- ✅ All users
- ✅ All transactions
- ✅ All messages

---

## 🚀 READY FOR TESTING

All implemented features are fully functional with mock data:
- Complete buyer experience
- Essential seller features
- Multi-language support
- Responsive design
- Theme switching
- Navigation flows

---

**Last Updated**: February 9, 2026  
**Version**: 1.0  
**Status**: Production-ready frontend, awaiting backend integration
