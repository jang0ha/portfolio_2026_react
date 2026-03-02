module.exports = {
    // TypeScript 코드를 분석할 수 있도록 파서를 설정
    parser: '@typescript-eslint/parser',
  
    parserOptions: {
      ecmaVersion: 2020, // 최신 ECMAScript 문법 사용 허용
      sourceType: 'module', // import/export 문법 사용 허용
      ecmaFeatures: {
        jsx: true, // JSX 문법 사용 허용 (React)
      },
    },
  
    // React 버전 자동 감지
    settings: {
      react: {
        version: 'detect',
      },
    },
  
    // 코드가 실행될 환경 설정
    env: {
      browser: true, // 브라우저 환경 (window, document 등 사용 가능)
      es2021: true, // ES2021 문법 사용 가능
    },
  
    // 사용할 기본 규칙 세트 확장
    extends: [
      'eslint:recommended', // ESLint 기본 추천 규칙
      'plugin:react/recommended', // React 관련 규칙
      'plugin:@typescript-eslint/recommended', // TypeScript 관련 추천 규칙
      'plugin:prettier/recommended', // Prettier와 충돌되는 ESLint 규칙 제거 + Prettier 플러그인 활성화
    ],
  
    // 사용할 플러그인 (추가 규칙 제공)
    plugins: ['react', '@typescript-eslint'],
  
    // 개별 규칙을 커스터마이징
    rules: {
      // React 17+ 부터는 import React 생략 가능하므로 해당 규칙 끔
      'react/react-in-jsx-scope': 'off',
  
      // 필요에 따라 추가 규칙 설정 가능 예:
      // '@typescript-eslint/explicit-function-return-type': 'warn',
    },
  }