const path = require('path');
const glob = require('glob');

// Define the entry points
const entryPoints = ['app/javascript/application.js'];

// Generate a more comprehensive build
require('esbuild').build({
  entryPoints,
  bundle: true,
  outdir: 'app/assets/builds',
  absWorkingDir: path.join(process.cwd()),
  sourcemap: true,
  format: 'esm',
  loader: { 
    '.js': 'jsx', 
    '.jsx': 'jsx',
    '.png': 'file',
    '.svg': 'file',
    '.jpg': 'file',
    '.gif': 'file'
  },
  publicPath: '/assets',
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  external: ['*.css', '*.scss', '*.sass'],
  plugins: [
    {
      name: 'resolve-frontend-path',
      setup(build) {
        // Intercept import paths starting with '../frontend' and map to the correct path
        build.onResolve({ filter: /^\.\.\/frontend/ }, args => {
          const fixedPath = args.path.replace('../frontend', 'app/frontend');
          return { path: path.resolve(args.resolveDir, fixedPath) };
        });
      }
    }
  ]
}).catch(() => process.exit(1)); 