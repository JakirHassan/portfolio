import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../../');
const dataPath = path.join(rootDir, 'src/data/compiledContent.json');

function runAudit() {
  console.log('Auditing content schemas...');
  if (!fs.existsSync(dataPath)) {
    console.error('FAIL: compiledContent.json does not exist. Run content-compiler script first.');
    process.exit(1);
  }

  const db = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  let errors = 0;
  let warnings = 0;

  // 1. Profile Audit
  if (!db.profile || !db.profile.name || !db.profile.title) {
    console.error('❌ FAIL: Profile metadata (name, title) is missing.');
    errors++;
  } else {
    console.log('✓ Profile schema details present.');
  }

  // 1.5. Layout Audit
  if (!Array.isArray(db.layout) || db.layout.length === 0) {
    console.error('❌ FAIL: Layout schema configuration is missing or empty.');
    errors++;
  } else {
    const validTypes = ['hero', 'case-studies', 'skills', 'experience', 'articles', 'contact'];
    db.layout.forEach((item, index) => {
      if (!item.id || !item.type || !validTypes.includes(item.type)) {
        console.error(`❌ FAIL: Layout section at index ${index} has invalid type: '${item.type}' or id: '${item.id}'`);
        errors++;
      }
    });
    console.log(`✓ Layout schema audit passed (${db.layout.length} sections verified).`);
  }

  // 2. Resume Timeline Audit
  if (!Array.isArray(db.resume) || db.resume.length === 0) {
    console.warn('⚠️ WARN: Resume items list is empty.');
    warnings++;
  } else {
    db.resume.forEach((item, index) => {
      if (!item.role || !item.company || !item.duration) {
        console.error(`❌ FAIL: Resume item at index ${index} is missing role, company, or duration.`);
        errors++;
      }
    });
    console.log(`✓ Resume list audit passed (${db.resume.length} items verified).`);
  }

  // 3. Case Studies Audit
  if (!Array.isArray(db.caseStudies) || db.caseStudies.length === 0) {
    console.warn('⚠️ WARN: Case studies list is empty.');
    warnings++;
  } else {
    db.caseStudies.forEach((study) => {
      if (!study.title || !study.description || !study.content) {
        console.error(`❌ FAIL: Case study '${study.id}' is missing title, description, or markdown content.`);
        errors++;
      }
    });
    console.log(`✓ Case studies audit passed (${db.caseStudies.length} items verified).`);
  }

  // 4. Articles Audit
  if (Array.isArray(db.articles)) {
    db.articles.forEach((art) => {
      if (!art.title || !art.content) {
        console.error(`❌ FAIL: Article '${art.id}' is missing title or content.`);
        errors++;
      }
    });
    console.log(`✓ Articles audit passed (${db.articles.length} items verified).`);
  }

  console.log(`Audit Summary: ${errors} errors, ${warnings} warnings.`);

  if (errors > 0) {
    console.error('❌ Content schema audit failed. Please fix schema errors listed above.');
    process.exit(1);
  } else {
    console.log('💚 Content schema audit passed successfully!');
    process.exit(0);
  }
}

runAudit();
