#!/usr/bin/env node

/**
 * Template Setup Script
 * 
 * This script customizes the Electron template by replacing template variables
 * with user-provided values throughout the project files.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Template variables to replace
const TEMPLATE_VARS = {
  '{{APP_NAME}}': 'appName',
  '{{APP_DESCRIPTION}}': 'appDescription', 
  '{{AUTHOR_NAME}}': 'authorName',
  '{{APP_ID}}': 'appId'
};

// Files to process (excluding node_modules, .git, dist, etc.)
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'dist-electron', 'release', 'scripts'];
const INCLUDE_EXTENSIONS = ['.js', '.ts', '.tsx', '.json', '.json5', '.md', '.html'];

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function question(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

function validateAppId(appId) {
  const appIdRegex = /^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)*$/;
  return appIdRegex.test(appId);
}

function kebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function getAllFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(entry.name)) {
        getAllFiles(fullPath, files);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (INCLUDE_EXTENSIONS.includes(ext) || entry.name.startsWith('.')) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

function replaceInFile(filePath, replacements) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    for (const [template, replacement] of Object.entries(replacements)) {
      if (content.includes(template)) {
        content = content.replace(new RegExp(template.replace(/[{}]/g, '\\$&'), 'g'), replacement);
        hasChanges = true;
      }
    }
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${path.relative(projectRoot, filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Electron Template Setup');
  console.log('============================\n');
  
  const rl = createInterface();
  
  try {
    // Collect user input
    const appName = await question(rl, '📱 App name (e.g., "My Awesome App"): ');
    if (!appName) {
      console.log('❌ App name is required');
      process.exit(1);
    }
    
    const appDescription = await question(rl, '📝 App description: ');
    const authorName = await question(rl, '👤 Author name: ');
    
    // Generate suggested app ID
    const suggestedAppId = `com.${authorName.toLowerCase().replace(/\s+/g, '')}.${kebabCase(appName)}`;
    const appId = await question(rl, `🆔 App ID [${suggestedAppId}]: `) || suggestedAppId;
    
    if (!validateAppId(appId)) {
      console.log('❌ Invalid app ID format. Use reverse domain notation (e.g., com.company.appname)');
      process.exit(1);
    }
    
    console.log('\n🔄 Processing files...\n');
    
    // Create replacement map
    const replacements = {
      '{{APP_NAME}}': appName,
      '{{APP_DESCRIPTION}}': appDescription,
      '{{AUTHOR_NAME}}': authorName,
      '{{APP_ID}}': appId
    };
    
    // Get all files to process
    const files = getAllFiles(projectRoot);
    
    // Process each file
    for (const file of files) {
      replaceInFile(file, replacements);
    }
    
    console.log('\n✅ Template setup complete!');
    console.log('\n📋 Summary:');
    console.log(`   • App Name: ${appName}`);
    console.log(`   • Description: ${appDescription}`);
    console.log(`   • Author: ${authorName}`);
    console.log(`   • App ID: ${appId}`);
    
    console.log('\n🎯 Next steps:');
    console.log('   1. npm install');
    console.log('   2. npm run rebuild');
    console.log('   3. npm run dev');
    console.log('\n🎉 Happy coding!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the setup
main().catch(console.error);