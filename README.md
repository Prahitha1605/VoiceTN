# Tamil Nadu District Grievance Redressal System

A production-quality web application for filing and managing government complaints in Tamil Nadu, with AI-powered guidance and complete anonymity protection.

## Features

- 🧑‍🌾 **Citizen Portal** - File complaints safely and anonymously
- 🤖 **AI Legal Assistant** - Bilingual chatbot (English/Tamil) powered by Groq's LLaMA model
- 🏛️ **Authority Dashboard** - Manage, triage, and track complaints
- 📊 **Analytics & Reporting** - Visual charts and complaint statistics
- 🔒 **Complete Anonymity** - File complaints without revealing identity
- 📱 **Fully Responsive** - Works on all devices (mobile, tablet, desktop)
- ♿ **Accessible Design** - Built for rural and semi-literate users
- 🎨 **Beautiful UI** - Tamil Nadu government theme colors

## Technology Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Charts**: Recharts
- **AI/Chatbot**: Groq API (LLaMA 3 8B model)
- **Icons**: Lucide React
- **State Management**: React Context API

## Prerequisites

- Node.js 16+ and npm/yarn
- Groq API key (get it from https://console.groq.com/keys)

## Installation

1. Navigate to the project directory:
```bash
cd complaint-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your Groq API key:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your Groq API key:
```
VITE_GROQ_API_KEY=your_actual_groq_api_key_here
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

## Application Pages

### 1. Landing Page (`/`)
- Main entry point with two user roles
- Citizens: File complaints
- Authorities: View dashboard

### 2. Citizen Welcome (`/citizen-welcome`)
- Explains the complaint process
- Option to chat with AI or file directly

### 3. AI Chatbot (`/chatbot`)
- Bilingual legal guidance (English/Tamil)
- Powered by Groq's LLaMA 3 8B model
- Suggests complaint categories, relevant laws, and departments

### 4. Complaint Form (`/complaint-form`)
- Comprehensive form to file complaints
- Anonymous filing option
- Auto-categorization and department assignment

### 5. Success Page (`/success`)
- Confirmation with unique case ID
- Case ID format: TN-[YEAR]-[5 random digits]

### 6. Authority Dashboard (`/authority`)
- Complaints list with filtering and status updates
- Analytics charts and statistics

## Mock Data

Pre-loaded with 8 sample complaints for testing across various categories and urgency levels.

## Color Theme

- Primary: #1a2e4a (Navy Blue)
- Accent: #f4a300 (Saffron Gold)
- High Urgency: #dc2626 (Red)
- Medium Urgency: #d97706 (Amber)
- Low Urgency: #16a34a (Green)

## Environment Setup

Create a `.env` file:
```
VITE_GROQ_API_KEY=your_groq_api_key_here
```

Get your API key from: https://console.groq.com/keys

## Key Features

### Complete Anonymity
- Citizens can file complaints without providing identity
- Anonymous toggle on complaint form
- All anonymous complaints protected

### AI-Powered Guidance
- Bilingual chatbot guides citizens through the process
- Explains relevant laws in simple terms
- Suggests appropriate complaint categories
- Recommends relevant government departments

### Authority Management
- Filter complaints by urgency, category, district
- Update complaint status in real-time
- View analytics and trends
- Track complaint distribution

### Mobile Responsive
- Works seamlessly on all screen sizes
- Touch-friendly interface
- Optimized for slow internet connections

## Accessibility

- Minimum 16px font sizes
- Icons on every button
- Simple, clear language
- Bilingual (English/Tamil)
- High contrast colors
- Mobile-first design

## Development

### Project Structure
```
src/
├── pages/
│   ├── Landing.jsx
│   ├── CitizenWelcome.jsx
│   ├── Chatbot.jsx
│   ├── ComplaintForm.jsx
│   ├── Success.jsx
│   └── AuthorityDashboard.jsx
├── context/
│   └── ComplaintContext.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

### State Management
- All complaint data stored in React Context
- No backend required
- Data persists during browser session

## Troubleshooting

### Chatbot not responding?
1. Verify Groq API key in `.env`
2. Check API key permissions at console.groq.com
3. Clear browser cache

### Styling issues?
1. Hard refresh: Ctrl+Shift+R
2. Reinstall dependencies: `npm install`

### Build errors?
1. Delete node_modules: `rm -rf node_modules`
2. Reinstall: `npm install`
3. Try build again: `npm run build`

## Legal Compliance

Complies with:
- Whistleblowers Protection Act 2011
- Prevention of Corruption Act 1988
- RTI Act 2005
- IPC Section 166
- Lokpal & Lokayuktas Act 2013

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

Built with ❤️ for Tamil Nadu Citizens
