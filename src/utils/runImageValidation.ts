// Script to run image validation on all projects
import { extendedProjects } from '../data/extendedProjects';
import type { Project } from '../types';
import ImageValidator from './imageValidator';

// Run the validation process
async function runImageValidation() {
  const validator = new ImageValidator();
  
  try {
    // Validate all projects
    const results = await validator.validateAllProjects(extendedProjects);
    
    // Generate updated projects
    const updatedProjects = validator.generateUpdatedProjects(extendedProjects, results);
    
    return updatedProjects;
    
  } catch (error) {
    throw error;
  }
}

// Generate updated project file content
function generateUpdatedProjectFile(projects: Project[]): string {
  return `import { Project } from '../types';

// Updated with validated official posters and alternative sources
// Last updated: ${new Date().toISOString()}
// Validation completed with 10 attempts per image

export const extendedProjects: Project[] = ${JSON.stringify(projects, null, 2)};
`;
}

// Export for use in other files
export { runImageValidation, generateUpdatedProjectFile };

// If running directly, execute the validation
if (typeof window === 'undefined') {
  runImageValidation().catch(console.error);
}