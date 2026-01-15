# Website Intake Form

A beautiful, interactive intake form for businesses looking to build a website. Built with React, Tailwind CSS, and featuring a color picker and image upload functionality.

## Features

- **Company Information Collection**: Capture essential business details
- **Color Picker**: Interactive color wheel for selecting brand colors (primary & secondary)
- **Image Upload**: Upload logos, inspiration images, and visual references with preview
- **Feature Selection**: Choose from common website features (e-commerce, blog, contact forms, etc.)
- **Project Details**: Timeline, budget, goals, and target audience
- **Email Integration**: Form submissions sent via EmailJS
- **Responsive Design**: Beautiful gradient background and mobile-friendly layout
- **Modern UI**: Built with Tailwind CSS for a professional look

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure EmailJS (Optional but Recommended)

To receive form submissions via email:

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{company_name}}`
   - `{{contact_name}}`
   - `{{email}}`
   - `{{phone}}`
   - `{{website_goal}}`
   - `{{target_audience}}`
   - `{{features}}`
   - `{{timeline}}`
   - `{{budget}}`
   - `{{existing_website}}`
   - `{{competitors}}`
   - `{{additional_info}}`
   - `{{primary_color}}`
   - `{{secondary_color}}`
   - `{{image_count}}`

4. Copy `.env.example` to `.env` and add your EmailJS credentials:
```bash
cp .env.example .env
```

5. Update the credentials in `.env`

6. Uncomment the EmailJS code in `src/components/IntakeForm.jsx` (lines 101-107)

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## Form Fields

### Company Information
- Company Name (required)
- Contact Name (required)
- Email Address (required)
- Phone Number

### Project Details
- Website Goals (required)
- Target Audience
- Existing Website URL
- Competitor References

### Features
Select from 12+ common website features including:
- E-commerce
- Blog
- Contact Forms
- Newsletter Signup
- Photo Gallery
- And more...

### Brand Colors
- Primary Color Picker
- Secondary Color Picker

### Media
- Upload multiple images with preview
- Support for PNG, JPG, GIF

### Timeline & Budget
- Timeline selection (ASAP to Flexible)
- Budget ranges ($5k to $50k+)

### Additional Information
- Free-form text area for extra details

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **react-color** - Color picker component
- **EmailJS** - Email service integration

## Alternative to EmailJS: Notion Integration

If you prefer to send form data to Notion instead of email:

1. Install the Notion SDK:
```bash
npm install @notionhq/client
```

2. Create a Notion integration and database
3. Replace the EmailJS submission code with Notion API calls

Example Notion integration code:
```javascript
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

await notion.pages.create({
  parent: { database_id: process.env.NOTION_DATABASE_ID },
  properties: {
    'Company': { title: [{ text: { content: formData.companyName } }] },
    'Contact': { rich_text: [{ text: { content: formData.contactName } }] },
    // Add more fields...
  },
});
```

## License

MIT