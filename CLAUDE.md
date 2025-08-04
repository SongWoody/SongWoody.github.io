# TypeScript React 컴포넌트 코딩 룰

이 프로젝트에서 TypeScript React 컴포넌트를 작성할 때 따라야 할 규칙입니다.

## 0. 파일 네이밍 규칙

### 컴포넌트 파일명
- **PascalCase** 사용: `Header.tsx`, `CategoryTree.tsx`, `MenuButton.tsx`
- 파일명과 컴포넌트명이 일치해야 함

### CSS 파일명 (현재 상태)
- ~~CSS Modules 사용 예정~~ → **글로벌 CSS로 임시 사용 중**
- 파일명: `Component.module.css` (향후 CSS Modules 복원용)
- 클래스명: camelCase 사용 (`.menuButton`, `.categoryTree`, `.closeButton`)
- 현재는 글로벌 CSS로 작동하지만 CSS Modules 구조 유지

### 파일 이동 시 주의사항
```bash
# Git을 사용하여 파일명 변경 (히스토리 보존)
git mv src/components/header.tsx src/components/Header.tsx
```

## 1. 컴포넌트 타입 정의

### ✅ 권장 방식 (함수형 컴포넌트)
```typescript
interface ComponentProps {
  name: string;
  age?: number;
}

const MyComponent = ({ name, age = 18 }: ComponentProps) => {
  return <div>{name} is {age} years old</div>;
};
```

### ❌ 지양할 방식 (React.FC 사용)
```typescript
const MyComponent: React.FC<ComponentProps> = ({ name, age = 18 }) => {
  return <div>{name} is {age} years old</div>;
};
```

## 2. 인터페이스 네이밍 규칙

- 컴포넌트 Props: `{ComponentName}Props`
- 일반 데이터 타입: PascalCase 사용

```typescript
interface CategoryTreeProps {
  data: GraphQLData;
}

interface Post {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    categories?: string[];
  };
}
```

## 3. 타입 안전성

### 객체 타입 정의
```typescript
// Record 타입 사용으로 타입 안전성 확보
const categoryTree: Record<string, Category> = {};
```

### 배열 메서드 타입 지정
```typescript
// 배열 map, forEach 등에서 타입 명시
posts.map((post: Post) => (
  <div key={post.fields.slug}>{post.frontmatter.title}</div>
));

Object.values(category.children).map((child: Category) => (
  <CategoryNode key={child.name} category={child} posts={child.posts} />
));
```

### 이벤트 핸들러 타입
```typescript
// 이벤트 핸들러에 정확한 타입 지정
onKeyDown={(e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    setIsOpen(!isOpen);
  }
}}
```

## 4. PropTypes 대신 TypeScript 인터페이스 사용

### ❌ PropTypes 사용 금지
```javascript
MyComponent.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
};
```

### ✅ TypeScript 인터페이스 사용
```typescript
interface MyComponentProps {
  name: string;
  age?: number;
}
```

## 5. CSS 스타일링 (현재 상태)

### 현재 사용 중인 방식 (글로벌 CSS)
```typescript
// CSS 파일 import (글로벌로 적용됨)
import "./MenuButton.module.css"

const MenuButton = ({ isOpen }: MenuButtonProps) => (
  <button className={`menu-button ${isOpen ? "open" : ""}`}>
    <div className="bar top" />
    <div className="bar middle" />
    <div className="bar bottom" />
  </button>
);
```

### 향후 CSS Modules로 복원 예정
```typescript
// 향후 복원될 방식
import styles from './MenuButton.module.css'

const MenuButton = ({ isOpen }: MenuButtonProps) => (
  <button className={`${styles.menuButton} ${isOpen ? styles.open : ''}`}>
    <div className={`${styles.bar} ${styles.top}`} />
  </button>
);
```

## 6. 점진적 마이그레이션 규칙

- 기존 JavaScript 파일을 TypeScript로 변환할 때는 `.tsx` 확장자 사용
- PropTypes를 완전히 제거하고 TypeScript 인터페이스로 교체
- `strict: false` 설정으로 점진적 변환 진행
- 모든 컴포넌트 변환 완료 후 `strict: true`로 변경 예정

## 7. Gatsby 특화 설정

### TypeScript 설정
```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "preserve", // Gatsby에서 JSX 처리
    "strict": false,   // 점진적 마이그레이션
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  }
}
```

### 전역 변수 타입 선언
```typescript
// src/types/gatsby-global.d.ts
declare const __PATH_PREFIX__: string;
declare const __BASE_PATH__: string;
declare const __ASSET_PREFIX__: string;
```

### CSS Modules 타입 선언 (향후 복원용)
```typescript
// src/types/css-modules.d.ts
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```

## 8. 완료된 변환 작업

### ✅ TypeScript로 변환 완료된 컴포넌트
- `Header.tsx` - 헤더 컴포넌트
- `Layout.tsx` - 레이아웃 컴포넌트  
- `MenuButton.tsx` - 메뉴 버튼 컴포넌트
- `Sidebar.tsx` - 사이드바 컴포넌트
- `CategoryTree.tsx` - 카테고리 트리 컴포넌트

### 🔄 아직 변환되지 않은 컴포넌트
- `bio.tsx` - 이미 TypeScript
- `seo.js` - JavaScript (변환 대기)
- `TagList.js` - JavaScript (변환 대기)
- `sidebarContext.js` - JavaScript (변환 대기)

## 9. 주의사항

### CSS Modules 이슈
- 현재 Gatsby에서 CSS Modules 로딩 문제로 인해 글로벌 CSS 사용 중
- 파일명은 `.module.css`로 유지하여 향후 쉬운 복원 가능
- 클래스명은 camelCase 유지 (CSS Modules 준비)

### 개발 환경
- 파일 변경 시 Gatsby 개발 서버 재시작 권장
- TypeScript 오류 발생 시 캐시 클리어: `gatsby clean`

이 규칙들을 따라 일관성 있는 TypeScript React 코드를 작성해주세요.