export default {
  input: './dist/nzx-data-table.js',
  output: {
    file: './dist/bundles/nzx-data-table.umd.js',
    format: 'umd',
    name: 'nzx-data-table'
  },
  external: [
    '@angular/core',
    'rxjs'
  ],
  globals: {
    '@angular/core': 'ng.core',
    'rxjs': 'Rx',
    'rxjs/Observable': 'Rx'
  }
}
