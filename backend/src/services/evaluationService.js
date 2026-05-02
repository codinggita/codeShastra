/**
 * Local Code Execution Engine
 * Uses Node.js child_process to run code in a sandboxed subprocess.
 * No external API needed — runs entirely on your own server.
 *
 * Supported: JavaScript (Node.js), Python
 * Coming soon: C++, Java (require compilers to be installed)
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const TIMEOUT_MS = 8000; // Kill process if it runs longer than 8 seconds

// File extensions for each language
const LANG_CONFIG = {
  javascript: { ext: 'js',  cmd: (file) => `node "${file}"` },
  python:     { ext: 'py',  cmd: (file) => `python "${file}"` },
  cpp:        { ext: 'cpp', cmd: null }, // Needs g++ compiler
  java:       { ext: 'java',cmd: null }, // Needs JDK
};

/**
 * Execute code safely in a subprocess with a timeout.
 * @param {string} sourceCode - The raw code to execute
 * @param {string} langId     - Language identifier (javascript, python, cpp, java)
 * @returns {Promise<{success: boolean, output: string}>}
 */
exports.executeCode = async (sourceCode, langId) => {
  const config = LANG_CONFIG[langId];

  if (!config) {
    return { success: false, output: `Unsupported language: ${langId}` };
  }

  // If language requires a compiler we may not have, return graceful message
  if (!config.cmd) {
    return {
      success: false,
      output: `${langId.toUpperCase()} execution requires a local compiler (g++ / JDK) to be installed on the server.\n\nThis environment supports JavaScript and Python. Switch to JavaScript or Python to test live execution.`,
    };
  }

  // Write source code to a temporary file
  const tmpDir = os.tmpdir();
  const tmpFile = path.join(tmpDir, `codeshastra_${Date.now()}.${config.ext}`);

  try {
    fs.writeFileSync(tmpFile, sourceCode, 'utf8');

    return await new Promise((resolve) => {
      const proc = exec(
        config.cmd(tmpFile),
        { timeout: TIMEOUT_MS, maxBuffer: 1024 * 512 }, // 512KB output limit
        (error, stdout, stderr) => {
          // Clean up temp file
          try { fs.unlinkSync(tmpFile); } catch (_) {}

          if (error) {
            if (error.killed || error.signal === 'SIGTERM') {
              return resolve({
                success: false,
                output: `Execution Timeout: Your code took longer than ${TIMEOUT_MS / 1000} seconds and was terminated.\nCheck for infinite loops or excessive computation.`,
              });
            }
            // Runtime / syntax error
            return resolve({
              success: false,
              output: stderr || error.message || 'Runtime error occurred.',
            });
          }

          // Successful execution
          resolve({
            success: true,
            output: stdout || '(no output)',
          });
        }
      );
    });
  } catch (err) {
    // Clean up on unexpected error
    try { fs.unlinkSync(tmpFile); } catch (_) {}
    throw new Error(`Execution engine error: ${err.message}`);
  }
};
