// simple-copy.cjs
const fs = require('fs');
const path = require('path');

const sourceFile = path.join(process.cwd(), 'src', 'data', 'updatedExtendedProjects.ts');
const targetFile = path.join(process.cwd(), 'src', 'data', 'extendedProjects.ts');

console.log('Copying from:', sourceFile);
console.log('To:', targetFile);

try {
  const content = fs.readFileSync(sourceFile, 'utf8');
  
  // Replace the export name to match what your app expects
  const updatedContent = content.replace(
    'export const updatedExtendedProjects: Project[] = [',
    'export const extendedProjects: Project[] = ['
  );
  
  fs.writeFileSync(targetFile, updatedContent, 'utf8');
  console.log('✅ Successfully copied updatedExtendedProjects.ts to extendedProjects.ts');
  console.log('Your app will now use the updated project data!');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}