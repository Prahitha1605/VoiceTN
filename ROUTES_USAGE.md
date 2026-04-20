# Application Routes & Usage Guide

## All Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Landing | Home page with role selection |
| `/citizen-welcome` | CitizenWelcome | Intro page with AI/direct filing options |
| `/chatbot` | Chatbot | AI legal assistant (Groq powered) |
| `/complaint-form` | ComplaintForm | Main complaint filing form |
| `/success` | Success | Confirmation with case ID |
| `/authority` | AuthorityDashboard | Admin dashboard with charts |

## How to Use

### For Citizens

**Flow 1: Get AI Guidance First**
1. Land on `/` (home)
2. Click "🧑‍🌾 I am a Citizen"
3. On `/citizen-welcome`, click "💬 Chat with AI Assistant"
4. On `/chatbot`, describe your issue
5. AI categorizes and suggests laws/departments
6. Click "📝 File My Complaint" when ready
7. On `/complaint-form`, fill and submit
8. Get Case ID on `/success`

**Flow 2: File Directly**
1. Land on `/` (home)
2. Click "🧑‍🌾 I am a Citizen"
3. On `/citizen-welcome`, click "📝 Skip & File Directly"
4. Fill complaint form on `/complaint-form`
5. Submit and get Case ID on `/success`

### For Authorities

**Process:**
1. Land on `/` (home)
2. Click "🏛️ I am an Authority"
3. Access `/authority` dashboard
4. Tab 1: View, filter, and update complaints
5. Tab 2: View analytics and charts

## Complaint Form Fields

Required:
- ✅ District (dropdown, 38 options)
- ✅ Category (dropdown, 8 options)
- ✅ Date of Incident (date picker)
- ✅ Location (text)
- ✅ Description (50+ characters)

Optional (shown only if NOT anonymous):
- Name
- Mobile
- Evidence upload

## Categories & Urgency Mapping

| Category | Urgency | Emoji |
|----------|---------|-------|
| Bribery / Corruption | HIGH | 🔴 |
| Large Scale Accident / Safety Risk | HIGH | 🔴 |
| Official Misconduct | MEDIUM | 🟡 |
| Land / Revenue Dispute | MEDIUM | 🟡 |
| Theft / Criminal Activity | MEDIUM | 🟡 |
| Public Service Delay | LOW | 🟢 |
| Civic Infrastructure | LOW | 🟢 |
| Other | LOW | 🟢 |

## Department Auto-Suggestions

- Bribery → DVAC
- Large Accident → District Collector + Police
- Official Misconduct → District Collector Office
- Land Dispute → Revenue Department
- Theft → Police
- Service Delay → Relevant Department
- Infrastructure → PWD / Municipal Corporation / EB
- Other → District Collector Office

## Tamil Nadu Districts (38)

Ariyalur, Chengalpattu, Chennai, Coimbatore, Cuddalore, Dharmapuri, Dindigul, Erode, Kallakurichi, Kancheepuram, Kanyakumari, Karur, Krishnagiri, Madurai, Mayiladuthurai, Nagapattinam, Namakkal, Perambalur, Pudukkottai, Ramanathapuram, Ranipet, Salem, Sivaganga, Tenkasi, The Nilgiris, Theni, Thanjavur, Tirupattur, Tiruppur, Tiruchirappalli, Tirunelveli, Tiruvannamalai, Thoothukudi, Tiruvarur, Vellore, Villupuram, Virudhunagar

## Case ID Format

`TN-[YEAR]-[5 Random Digits]`

Example: `TN-2025-48392`

## Dashboard Features

### Complaints Tab
- **Stats Cards**: Total, High Urgency, Pending, Resolved
- **Filters**: By Urgency (All/High/Medium/Low), Category, District
- **Actions**: Update status per complaint
- **View**: Case ID, Category, District, Date, Urgency, Department, Name

### Overview Tab
- **Bar Chart**: Complaints by Category
- **Pie Chart**: Complaints by Urgency Level
- **Summary**: Total, In Progress, Resolved counts

## Mock Complaints

8 pre-loaded for testing:

1. TN-2025-10234 | Bribery | Chennai | DVAC | HIGH | Anonymous
2. TN-2025-10235 | Large Accident | Madurai | Police | HIGH | Anonymous
3. TN-2025-10236 | Official Misconduct | Coimbatore | Collector | MEDIUM | Priya R.
4. TN-2025-10237 | Theft | Salem | Police | MEDIUM | Anonymous
5. TN-2025-10238 | Land Dispute | Villupuram | Revenue | MEDIUM | Murugan K.
6. TN-2025-10239 | Service Delay | Thanjavur | Health | LOW | Anonymous
7. TN-2025-10240 | Infrastructure | Tirunelveli | PWD | LOW | Kavitha S. (Resolved)
8. TN-2025-10241 | Bribery | Vellore | DVAC | HIGH | Anonymous

## API Integration

### Groq API
- **Endpoint**: https://api.groq.com/openai/v1/chat/completions
- **Model**: llama-3.1-8b-instant
- **Key Source**: `.env.local` (VITE_GROQ_API_KEY)
- **Tokens**: 1024 max per request
- **Temperature**: 0.7

### System Prompt
Instructs AI to:
- Acknowledge with empathy
- Suggest complaint category
- Suggest relevant law
- Suggest department
- Advise if platform suitable
- Always bilingual (English/Tamil)
- Use gentle language (may/could/might)

## Colors

| Element | Color | Hex |
|---------|-------|-----|
| Primary Button | Navy Blue | #1a2e4a |
| CTA Button | Saffron Gold | #f4a300 |
| High Urgency | Red | #dc2626 |
| Medium Urgency | Amber | #d97706 |
| Low Urgency | Green | #16a34a |
| Background | White | #ffffff |
| Text | Dark | #1a2e4a |

## Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Lint code
npm lint
```

## Key Features

✅ **Anonymity**: File complaints without revealing identity
✅ **Bilingual**: English and Tamil language support
✅ **AI Guidance**: Legal assistance before filing
✅ **Case Tracking**: Unique case IDs for every complaint
✅ **Real-time Updates**: Authority dashboard updates immediately
✅ **Mobile First**: Fully responsive design
✅ **No Backend**: All state in React Context
✅ **Charts**: Visual analytics for authorities
✅ **Accessibility**: Large fonts, icons, simple language
✅ **Fast**: Vite build tool for quick dev experience

## Important Notes

1. **No Backend Required**: All data stored in React state
2. **Data Persistence**: Lasts only for browser session
3. **No Authentication**: Anyone can access authority dashboard
4. **Mock Data**: 8 complaints pre-loaded
5. **Groq API Required**: Chatbot needs valid API key
6. **Environment File**: `.env.local` needed with API key

## Accessibility

- Font size: Minimum 16px
- Language: English + Tamil
- Icons: On every button
- Colors: High contrast
- Mobile: Touch-optimized
- Tone: Warm, supportive

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Page won't load?
- Check all routes match in App.jsx
- Verify component paths
- Check console for errors

### Chatbot not responding?
- Verify `.env.local` has Groq API key
- Check API key is valid
- Ensure internet connection

### Styling broken?
- Hard refresh (Ctrl+Shift+R)
- Clear browser cache
- Reinstall npm packages

### Dashboard not showing new complaints?
- Check ComplaintContext is wrapping app
- Verify new complaints added to context
- Check browser console for errors

## Next Steps

1. ✅ Set up `.env.local`
2. ✅ Run `npm run dev`
3. ✅ Test all routes
4. ✅ Deploy to production

All set! 🚀
