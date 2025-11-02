# Nachiket Portfolio

A modern, responsive portfolio website built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion. Features include dark mode support, an interactive chatbot, resume PDF generation, and smooth animations.

## Features

- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Dark Mode**: Toggle between light and dark themes with persistent storage
- **Interactive Chatbot**: Local Q&A chatbot powered by pattern matching (no external APIs)
- **Resume Generator**: Export your portfolio as a PDF using html2canvas and jsPDF
- **Smooth Animations**: Beautiful scroll animations powered by Framer Motion
- **Scroll Progress**: Visual indicator showing page scroll progress
- **Modern UI**: Clean, professional design with gradient accents
- **TypeScript**: Full type safety for better development experience
- **Performance**: Lazy loading for images and optimized animations

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **html2canvas** - Screenshot generation
- **jsPDF** - PDF generation
- **Lucide React** - Icon library

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/nachiket-portfolio.git
cd nachiket-portfolio
```

2. **Install dependencies**

```bash
npm install
```

## Configuration

### Customize Your Portfolio

All content is stored in JSON files in `src/data/`:

1. **About Information** (`src/data/about.json`)
   - Update your name, title, bio, contact info, and social links
   - Replace the image URL with your profile photo

2. **Skills** (`src/data/skills.json`)
   - Add/remove skill categories
   - Update skill names and proficiency levels (0-100)

3. **Projects** (`src/data/projects.json`)
   - Add your projects with title, description, image, technologies
   - Include GitHub and demo links
   - Mark featured projects

4. **Achievements** (`src/data/achievements.json`)
   - Add certifications, awards, and accomplishments
   - Include issuer, date, and credential URLs

5. **Chatbot Responses** (`src/data/botData.json`)
   - Customize greetings and question triggers
   - Add your own Q&A patterns
   - Update the fallback message

### Theme Customization

To customize colors, edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    }
  }
}
```

## Development

### Run the development server

```bash
npm run dev
```

This will start the Vite dev server at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Building for Production

### Build the project

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview the production build locally

```bash
npm run preview
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (optional)

```bash
npm install -g vercel
```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite and configure settings
   - Click "Deploy"

3. **Or deploy via CLI**

```bash
vercel
```

### Deploy to Netlify

1. **Build the project**

```bash
npm run build
```

2. **Deploy via Netlify Dashboard**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist/` folder
   - Or connect your GitHub repository for automatic deployments

3. **Or deploy via CLI**

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

1. **Install gh-pages**

```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**

```json
{
  "homepage": "https://yourusername.github.io/nachiket-portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.ts**

```typescript
export default defineConfig({
  base: '/nachiket-portfolio/',
  // ... rest of config
});
```

4. **Deploy**

```bash
npm run deploy
```

### Environment Variables

If you need environment variables, create a `.env` file:

```env
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your-analytics-id
```

Access them in your code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Project Structure

```
nachiket-portfolio/
├── src/
│   ├── components/        # React components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Achievements.tsx
│   │   ├── Contact.tsx
│   │   ├── Chatbot.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── ResumeButton.tsx
│   │   └── NotFound.tsx
│   ├── data/             # JSON data files
│   │   ├── about.json
│   │   ├── skills.json
│   │   ├── projects.json
│   │   ├── achievements.json
│   │   └── botData.json
│   ├── hooks/            # Custom React hooks
│   │   ├── useTheme.ts
│   │   └── useScrollProgress.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── dist/                 # Production build (generated)
├── index.html           # HTML template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md            # This file
```

## Features Explained

### Dark Mode

The theme toggle uses localStorage to persist user preference and respects system preferences on first visit.

### Chatbot

The chatbot uses simple pattern matching against triggers defined in `botData.json`. It's completely local and doesn't require any external APIs.

### Resume Generator

Clicking "Download Resume" captures the entire page, converts it to a canvas using html2canvas, then generates a multi-page PDF with jsPDF.

### Animations

Framer Motion powers all animations:
- Scroll-triggered animations (elements fade in as you scroll)
- Hover effects on buttons and cards
- Smooth page transitions
- Animated 404 page

## Customization Tips

1. **Images**: Use high-quality images from [Pexels](https://pexels.com) or [Unsplash](https://unsplash.com)
2. **Colors**: Update the gradient colors throughout the components to match your brand
3. **Fonts**: Add Google Fonts in `index.html` and update Tailwind config
4. **Sections**: Add or remove sections by modifying `App.tsx`
5. **Chatbot**: Add more Q&A patterns in `botData.json` for better responses

## Firebase Integration (Optional)

The codebase is ready for Firebase integration. To add Firebase:

1. **Install Firebase**

```bash
npm install firebase
```

2. **Create Firebase config** (`src/firebase.ts`)

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
```

3. **Use Firebase in your components**

```typescript
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

// Example: Save contact form to Firestore
const saveContact = async (formData) => {
  await addDoc(collection(db, 'contacts'), formData);
};
```

## Troubleshooting

### Port already in use

```bash
# Kill the process using port 5173
npx kill-port 5173
# Or run on a different port
npm run dev -- --port 3000
```

### Build errors

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
# Run type checking
npm run typecheck
```

## Performance Tips

- Images are lazy-loaded by default
- Use optimized images (WebP format recommended)
- Keep JSON data files small
- Minimize the number of animations on mobile
- Use production build for deployment

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

Feel free to fork this project and customize it for your own portfolio!

## License

MIT License - feel free to use this project for your portfolio.

## Support

For issues or questions:
- Check existing GitHub issues
- Create a new issue with detailed description
- Include browser console errors if applicable

## Acknowledgments

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Pexels](https://pexels.com/) for demo images

---

Made with ❤️ by Nachiket
