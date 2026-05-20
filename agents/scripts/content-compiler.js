import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../../');

const paths = {
  profile: path.join(rootDir, 'content/profile/about.json'),
  layout: path.join(rootDir, 'content/profile/layout.json'),
  resume: path.join(rootDir, 'content/resume/work-history.json'),
  caseStudies: path.join(rootDir, 'content/case-studies'),
  articles: path.join(rootDir, 'content/articles'),
  output: path.join(rootDir, 'src/data/compiledContent.json')
};

// Extremely lightweight YAML frontmatter parser
function parseMarkdown(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const frontmatterRegex = /^---\r?\n([\s\S]+?)\r?\n---/;
  const match = fileContent.match(frontmatterRegex);
  
  let metadata = {};
  let content = fileContent;
  
  if (match) {
    const rawYaml = match[1];
    content = fileContent.replace(frontmatterRegex, '').trim();
    
    // Parse key-value lines
    const lines = rawYaml.split('\n');
    for (const line of lines) {
      if (!line.includes(':')) continue;
      const index = line.indexOf(':');
      const key = line.substring(0, index).trim();
      let value = line.substring(index + 1).trim();
      
      // Clean quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.substring(1, value.length - 1);
      }
      
      // Parse list array e.g., ["a", "b"]
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          // Replace single quotes with double quotes for valid JSON parsing if needed
          const jsonVal = value.replace(/'/g, '"');
          value = JSON.parse(jsonVal);
        } catch (e) {
          // Fallback splits
          value = value.substring(1, value.length - 1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
        }
      }
      
      metadata[key] = value;
    }
  }
  
  return { metadata, content };
}

function compile() {
  console.log('Starting content compilation...');
  
  // 1. Load Profile
  let profile = {};
  if (fs.existsSync(paths.profile)) {
    profile = JSON.parse(fs.readFileSync(paths.profile, 'utf-8'));
    console.log('✓ Profile content parsed.');
  }

  // 2. Load Layout
  let layout = [];
  if (fs.existsSync(paths.layout)) {
    layout = JSON.parse(fs.readFileSync(paths.layout, 'utf-8'));
    console.log('✓ Layout content parsed.');
  }

  // 3. Load Resume
  let resume = [];
  if (fs.existsSync(paths.resume)) {
    resume = JSON.parse(fs.readFileSync(paths.resume, 'utf-8'));
    console.log('✓ Resume content parsed.');
  }

  // 3. Load Case Studies
  const caseStudies = [];
  if (fs.existsSync(paths.caseStudies)) {
    const files = fs.readdirSync(paths.caseStudies).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const fullPath = path.join(paths.caseStudies, file);
      const parsed = parseMarkdown(fullPath);
      caseStudies.push({
        id: file.replace('.md', ''),
        title: parsed.metadata.title || 'Untitled Case Study',
        category: parsed.metadata.category || 'General',
        date: parsed.metadata.date || '',
        description: parsed.metadata.description || '',
        glowColor: parsed.metadata.glowColor || 'rgba(0, 180, 255, 0.3)',
        technologies: parsed.metadata.technologies || [],
        content: parsed.content
      });
    }
    console.log(`✓ Compiled ${caseStudies.length} case studies.`);
  }

  // 4. Load Articles
  const articles = [];
  if (fs.existsSync(paths.articles)) {
    const files = fs.readdirSync(paths.articles).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const fullPath = path.join(paths.articles, file);
      const parsed = parseMarkdown(fullPath);
      articles.push({
        id: file.replace('.md', ''),
        title: parsed.metadata.title || 'Untitled Article',
        date: parsed.metadata.date || '',
        description: parsed.metadata.description || '',
        tags: parsed.metadata.tags || [],
        content: parsed.content
      });
    }
    console.log(`✓ Compiled ${articles.length} articles.`);
  }

  // 6. Output compilation DB
  const compiledData = {
    profile,
    layout,
    resume,
    caseStudies,
    articles,
    compiledAt: new Date().toISOString()
  };

  const outputDir = path.dirname(paths.output);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(paths.output, JSON.stringify(compiledData, null, 2), 'utf-8');
  console.log(`=== Content compilation successful! Saved to ${paths.output} ===`);
}

compile();
