#!/usr/bin/env node

// Temporary redirector to Next.js
import { spawn } from 'child_process';

console.log('Starting Next.js development server...');

// Run Next.js dev server
const nextProcess = spawn('npx', ['next', 'dev', '--port', '8000', '--hostname', '0.0.0.0'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true
});

nextProcess.on('error', (err) => {
  console.error('Failed to start Next.js:', err);
  process.exit(1);
});

nextProcess.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
  process.exit(code || 0);
});

// Handle termination signals
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  nextProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\nShutting down...');
  nextProcess.kill('SIGTERM');
});