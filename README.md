# Mei Chai Portfolio Website

A personal portfolio website for Mei Chai, UX Designer specializing in human-centered design research and strategic problem-solving.

## Features

- **Interactive Portfolio**: Showcasing key UX design projects including Clarity, CrackInterview, Floratune, Anastasia, and Milano Partecipa
- **AI-Powered Chatbot**: Integrated chatbot that can answer questions about Mei's background, experience, and projects
- **Responsive Design**: Optimized for desktop and mobile viewing
- **Modern UI**: Clean, professional design with smooth animations

## Tech Stack

- HTML5, CSS3, JavaScript
- AI Chatbot integration
- Static site deployment

## Project Structure

```
├── index.html              # Main landing page
├── about.html              # About page
├── projects/               # Individual project pages
│   ├── clarity.html
│   ├── crackinterview.html
│   ├── floratune.html
│   ├── anastasia.html
│   └── milano-partecipa.html
├── chatbot-iframe.html     # Chatbot interface
├── chatbot-config.js       # Chatbot configuration
├── knowledge-base.txt      # Chatbot knowledge base
├── Asset/                  # Images and assets
└── vercel.json            # Vercel deployment configuration
```

## Deployment to Vercel

### Prerequisites
- Git repository
- Vercel account

### Steps

1. **Push to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub/GitLab/Bitbucket account
   - Click "New Project"
   - Import your repository
   - Configure project settings:
     - Framework Preset: Other
     - Root Directory: ./
     - Build Command: (leave empty for static site)
     - Output Directory: ./
   - Click "Deploy"

3. **Custom Domain (Optional)**
   - Go to your project dashboard
   - Navigate to "Settings" > "Domains"
   - Add your custom domain (e.g., meichai.net)
   - Configure DNS settings as instructed

### Vercel Configuration

The `vercel.json` file includes:
- URL rewrites for proper routing
- Cache headers for optimal performance
- Static asset optimization

## Local Development

```bash
# Start local server
python3 -m http.server 8000

# Visit http://localhost:8000
```

## Chatbot Features

- Responds as "Mei Chai" in first person
- Knowledge base covers:
  - Professional experience
  - Project details
  - Skills and tools
  - Contact information
  - Educational background
- Supports multiple languages (Chinese, English, Italian)

## Contact

- **Email**: flyskytoo@outlook.com
- **Portfolio**: meichai.net
- **LinkedIn**: [linkedin.com/in/meichai](https://www.linkedin.com/in/meichai)
- **Location**: Milan, Italy

---

© 2024 Mei Chai. All rights reserved.