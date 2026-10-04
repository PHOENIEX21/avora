import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  {
    rules:{
      '@typescript-eslint/no-explicit-any':'off',
      'react/no-unescaped-entities':'off',
      'react-hooks/set-state-in-effect':'off',
      'react-hooks/error-boundaries':'off',
      'react-hooks/purity':'off',
      'react-hooks/immutability':'off',
    }
  },
  globalIgnores(['.next/**','out/**','build/**','next-env.d.ts','node_modules/**']),
]);
