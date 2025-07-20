import { readdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directory to search
const srcDir = join(__dirname, 'src');

// Function to process files recursively
async function processDirectory(directory) {
  const files = readdirSync(directory);
  
  for (const file of files) {
    const fullPath = join(directory, file);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other non-source directories
      if (!['node_modules', '.git', '.next', 'build', 'dist', 'coverage', 'cypress'].includes(file)) {
        await processDirectory(fullPath);
      }
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      // Only process JavaScript and TypeScript files
      await updateImports(fullPath);
    }
  }
}

// Function to update imports in a single file
async function updateImports(filePath) {
  try {
    let content = readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Replace "src/" with "@/" in import/require statements
    const updatedContent = content.replace(
      /(from\s+[\"'])(src\/[^\"']+)([\"'])/g, 
      (match, p1, p2, p3) => {
        updated = true;
        return `${p1}@/${p2.slice(4)}${p3}`; // Remove 'src/' and add '@/'
      }
    );
    
    if (updated) {
      writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`Updated imports in: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Start processing from the src directory
async function main() {
  console.log('Starting to update import paths...');
  await processDirectory(srcDir);
  console.log('Import path update complete!');
}

main().catch(console.error);
