# CLAUDE.md

이 파일은 Claude Code가 이 프로젝트를 빠르게 이해할 수 있도록 작성된 작업 매뉴얼입니다.

## 프로젝트 개요

개인 블로그 사이트. [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) v2.4.0 템플릿 기반이며, "Minimal Onion Green" 스타일로 커스터마이징된 상태입니다.

- 배포 URL: `https://lazybutdoing.github.io/`
- 사이트 제목, 저자 정보 등은 `data/siteMetadata.js`에서 관리

## 기술 스택

| 분류          | 기술                             |
| ------------- | -------------------------------- |
| 프레임워크    | Next.js 15 (App Router)          |
| 언어          | TypeScript                       |
| 스타일링      | Tailwind CSS v4                  |
| 콘텐츠        | Contentlayer2 + MDX              |
| 폰트          | NanumSquareNeo (로컬 @font-face) |
| 검색          | kbar (로컬 검색)                 |
| 댓글          | Giscus (미설정)                  |
| 뉴스레터      | Buttondown (미설정)              |
| 애널리틱스    | Google Analytics 4               |
| 패키지 매니저 | Yarn 3 (Berry)                   |
| 린터/포매터   | ESLint + Prettier                |
| Git 훅        | Husky + lint-staged              |

## 주요 npm 스크립트

```bash
yarn dev      # 개발 서버 시작 (localhost:3000)
yarn build    # 프로덕션 빌드 + postbuild (RSS, sitemap 생성)
yarn serve    # 빌드된 결과물 서빙
yarn lint     # ESLint 자동 수정
yarn analyze  # 번들 분석
```

## 프로젝트 구조

```
.
├── app/                        # Next.js App Router 페이지
│   ├── layout.tsx              # 루트 레이아웃 (메타데이터, 테마)
│   ├── page.tsx                # 홈 (최근 포스트 목록)
│   ├── Main.tsx                # 홈 UI 컴포넌트
│   ├── about/page.tsx          # About 페이지
│   ├── blog/
│   │   ├── page.tsx            # 블로그 목록
│   │   └── [...slug]/page.tsx  # 개별 포스트 (동적 라우트)
│   ├── tags/
│   │   ├── page.tsx            # 태그 목록
│   │   └── [tag]/page.tsx      # 태그별 포스트 목록
│   ├── projects/page.tsx       # 프로젝트 목록
│   ├── api/newsletter/route.ts # 뉴스레터 구독 API (미사용)
│   ├── tag-data.json           # 태그별 포스트 수 (빌드 시 자동 생성)
│   ├── robots.ts               # robots.txt
│   ├── sitemap.ts              # 사이트맵
│   ├── seo.tsx                 # SEO 유틸
│   ├── not-found.tsx           # 404 페이지
│   └── theme-providers.tsx     # 다크모드 테마 Provider
│
├── components/                 # 공용 UI 컴포넌트
│   ├── Header.tsx              # 사이트 헤더 + 네비게이션
│   ├── Footer.tsx              # 푸터
│   ├── MobileNav.tsx           # 모바일 메뉴
│   ├── ThemeSwitch.tsx         # 다크/라이트 모드 토글
│   ├── SearchButton.tsx        # 검색 버튼 (kbar 트리거)
│   ├── Tag.tsx                 # 태그 배지 (size prop: 'sm'(기본) | 'base')
│   ├── TagNotice.tsx           # 태그별 공지 컴포넌트
│   ├── Card.tsx                # 프로젝트 카드
│   ├── Comments.tsx            # Giscus 댓글
│   ├── MDXComponents.tsx       # MDX 커스텀 컴포넌트 등록
│   ├── Link.tsx                # Next.js Link 래퍼
│   ├── Image.tsx               # Next.js Image 래퍼
│   ├── PageTitle.tsx           # 페이지 제목
│   ├── ScrollTopAndComment.tsx # 스크롤 상단 이동 버튼
│   ├── SectionContainer.tsx    # 페이지 너비 제한 컨테이너
│   ├── TableWrapper.tsx        # 반응형 테이블 래퍼
│   └── social-icons/           # 소셜 미디어 아이콘
│
├── layouts/                    # 포스트 레이아웃 템플릿
│   ├── PostLayout.tsx          # 기본 포스트 레이아웃
│   ├── PostBanner.tsx          # 배너 이미지 포스트 레이아웃
│   ├── ListLayout.tsx          # 블로그 목록 레이아웃 (태그 사이드바 포함)
│   └── AuthorLayout.tsx        # About 페이지 레이아웃
│
├── data/                       # 콘텐츠 및 설정 데이터
│   ├── siteMetadata.js         # 사이트 전역 설정 (제목, 저자, SNS, 기능 설정)
│   ├── headerNavLinks.ts       # 네비게이션 링크 목록
│   ├── projectsData.ts         # 프로젝트 카드 데이터
│   ├── tagNotices.ts           # 태그별 공지 텍스트 (Record<string, string>)
│   ├── references-data.bib     # 참고문헌 BibTeX 파일
│   ├── logo.svg                # 헤더 로고
│   ├── blog/                   # 블로그 포스트 (.mdx)
│   └── authors/                # 저자 프로필 (.mdx)
│       └── default.mdx         # 기본 저자
│
├── public/                     # 정적 에셋
│   ├── static/favicons/        # 파비콘
│   ├── static/fonts/           # 로컬 폰트 파일
│   ├── static/images/          # 이미지
│   └── search.json             # 로컬 검색 인덱스 (빌드 시 자동 생성)
│
├── css/
│   ├── tailwind.css            # Tailwind 전역 스타일 + 폰트 정의 + 색상 테마
│   └── prism.css               # 코드 블록 syntax highlighting
│
├── scripts/
│   ├── postbuild.mjs           # 빌드 후 RSS 피드 생성
│   └── rss.mjs                 # RSS 생성 유틸
│
├── contentlayer.config.ts      # Contentlayer MDX 설정
└── tsconfig.json               # TypeScript 설정
```

## 라우트 구조

| 경로              | 설명                                  |
| ----------------- | ------------------------------------- |
| `/`               | 홈 — 최근 포스트 목록                 |
| `/blog`           | 전체 블로그 목록 (태그 사이드바 포함) |
| `/blog/[slug]`    | 개별 포스트                           |
| `/tags`           | 전체 태그 목록                        |
| `/tags/[tag]`     | 태그별 포스트 목록                    |
| `/projects`       | 프로젝트 목록                         |
| `/about`          | About 페이지                          |
| `/api/newsletter` | 뉴스레터 구독 API (미사용)            |

## 블로그 포스트 작성

### 파일 위치 및 네이밍

`data/blog/` 디렉토리에 `.mdx` 파일로 작성. 파일명은 `YYYY-MM-NNN.mdx` 형식을 따름.

- `YYYY` — 작성 연도
- `MM` — 작성 월
- `NNN` — 전체 글 생성 순서 (3자리, 예: `001`, `002`)

예: `2025-05-004.mdx` → URL: `/blog/2025-05-004`

### Frontmatter 필드

```yaml
---
title: '포스트 제목' # 필수
date: 2024-01-01 # 필수 (ISO 형식)
tags: ['tag1', 'tag2'] # 선택
lastmod: '2024-02-01' # 마지막 수정일 (선택)
draft: false # true면 프로덕션에서 숨김
summary: '포스트 요약' # 선택 (목록에 표시)
images:
  ['/static/images/image.jpg'] # 커버 이미지 (선택)
  # PostLayout: 헤더 아래 본문 위에 표시
  # PostBanner: 헤더 배경으로 사용 (없으면 picsum 랜덤 이미지)
authors: ['default'] # 저자 (선택, data/authors/의 파일명)
layout:
  PostLayout # 레이아웃 선택 (선택, 기본값: PostLayout)
  # 가능한 값: PostLayout, PostBanner
bibliography: references-data.bib # BibTeX 파일 (선택)
canonicalUrl: '' # 정규 URL (선택)
---
```

### 사용 가능한 레이아웃

- `PostLayout` (기본값) — 태그·제목·저자·날짜 헤더, `images` 필드 있으면 커버 이미지(헤더 아래), 본문, 태그 공지(해당 시), 더 읽어보기(contextPosts 윈도우), 글 목록으로 링크
- `PostBanner` — `images[0]`(없으면 picsum 랜덤)을 헤더 전체 배경으로 사용. 이미지 위에 단일 투명도 오버레이(라이트 `bg-white/75`, 다크 `bg-black/60`) + 텍스트 하단 정렬. 나머지 구조(본문·태그 공지·더 읽어보기)는 PostLayout과 동일

### contextPosts 윈도우 (더 읽어보기)

현재 글 기준 앞뒤 최대 5개 글을 보여줌. 글 목록 상의 위치에 따라 자동 조정:

- 중간: 이전 2개 + 현재 + 이후 2개
- 시작/끝: 현재 포함 5개

### 태그 공지 시스템

`data/tagNotices.ts`에 `Record<string, string>` 형태로 태그별 공지 텍스트 정의. 포스트 태그에 해당 태그가 포함되면 본문 하단에 `TagNotice` 컴포넌트가 자동 삽입됨. 복수 태그 공지는 수직 나열.

### MDX에서 사용 가능한 커스텀 컴포넌트

- `<TOCInline toc={props.toc} />` — 인라인 목차
- `<PhotoPost photos={[...]}>...</PhotoPost>` — 사진+글 2단 레이아웃 ([[photo-post-layout]])
  - 데스크탑: 사진(좌) + 글(우), 본문 폭의 절반인 정사각형 두 칸. 글이 길면 우측에 스크롤
  - 모바일: 사진(상, 가로 폭 정사각형) + 글(하, 스크롤 없이 자연 흐름)
  - `photos`는 `string[]` 또는 `{ src, alt }[]`. 2개 이상이면 hover 시 양 끝에 반투명 화살표, 하단 중앙에 인스타그램 스타일 도트 인디케이터(현재 사진은 흰색, 나머지는 반투명) 표시
  - 사진은 원본 비율 유지(`object-contain`), 정사각형에 맞춰 letterbox 처리
- 표준 Markdown + GFM + 수식(KaTeX) + 코드 하이라이팅(Prism) 지원
- `rehype-slug` 활성화 (모든 제목에 ID 자동 부여, 앵커 링크용)
- `rehype-autolink-headings` 비활성화 (자동 링크 아이콘 미사용)

## 사이트 설정 변경 포인트

| 설정                             | 파일                              |
| -------------------------------- | --------------------------------- |
| 사이트 제목, 저자, URL, SNS 링크 | `data/siteMetadata.js`            |
| 네비게이션 메뉴                  | `data/headerNavLinks.ts`          |
| 프로젝트 카드                    | `data/projectsData.ts`            |
| 태그별 공지                      | `data/tagNotices.ts`              |
| About 페이지 내용                | `data/authors/default.mdx`        |
| 파비콘                           | `public/static/favicons/`         |
| 로고                             | `data/logo.svg`                   |
| 기본 아바타                      | `public/static/images/avatar.png` |
| 전역 스타일 / 색상 / 폰트        | `css/tailwind.css`                |

## 디자인 시스템 — Minimal Onion Green

### 컬러 팔레트

포인트 색상은 oklch 기반 연두색(onion green). `css/tailwind.css`의 `@theme` 블록에 정의.

- 라이트 모드 포인트: `--color-primary-500: oklch(0.74 0.228 131)`
- 다크 모드 포인트: `--color-primary-500: oklch(0.65 0.19 131)` (`:where(.dark, .dark *)` 블록에서 오버라이드)

### 폰트

`css/tailwind.css`에 `@font-face`로 정의된 로컬 폰트 사용.

- **NanumSquareNeo** (`public/static/fonts/NanumSquareNeo-Variable.ttf`) — 본문 기본 폰트 (가변체, 100–900)

### 타이포그래피 (prose)

`css/tailwind.css`의 `.prose` 유틸리티 레이어에서 정의:

| 요소 | font-weight |
| ---- | ----------- |
| 본문 | 350         |
| h1   | 500         |
| h2   | 470         |
| h3   | 410         |
| h4   | 350         |

### 구분선 시스템

두 종류의 구분선을 사용하며 방식과 서식을 구분함:

- **레이아웃 구분선** — 섹션 간 구조적 경계. 각 섹션 요소에 `border-t-[1.2px] border-gray-200 dark:border-gray-700` 직접 적용 (`divide-y` 미사용)
- **본문 구분선** — MDX의 `---`로 생성되는 `<hr>`. `css/tailwind.css`의 `.prose hr`에서 `0.5px solid gray-200`으로 정의

## 코딩 컨벤션

### TypeScript / React

- TypeScript strict 모드는 OFF (`strict: false`), `strictNullChecks`만 ON
- 컴포넌트: PascalCase 함수형 컴포넌트
- 파일명: PascalCase (컴포넌트), camelCase (유틸/데이터)
- Path alias: `@/components/*`, `@/data/*`, `@/layouts/*`, `@/css/*`

### Prettier 설정

- 세미콜론: 없음 (`semi: false`)
- 따옴표: 단일 (`singleQuote: true`)
- 줄 길이: 100자
- 들여쓰기: 스페이스 2칸
- Trailing comma: `es5`
- Tailwind 클래스 자동 정렬: `prettier-plugin-tailwindcss`

### Contentlayer

- 빌드 시 `data/blog/*.mdx` → `.contentlayer/generated/Blog/` 자동 변환
- 태그 카운트 → `app/tag-data.json` 자동 생성
- 검색 인덱스 → `public/search.json` 자동 생성

## 환경 변수

`.env.example` 참고. 필요한 경우 `.env.local`에 설정:

```
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
BASE_PATH=
```

## 주의사항

- `yarn`을 사용 (`npm` 사용 금지) — Yarn Berry(v3) 프로젝트
- 블로그 포스트 추가/수정 후 개발 서버가 자동으로 Contentlayer를 재빌드함
- `draft: true` 포스트는 프로덕션 빌드에서 제외되지만 개발 서버에서는 보임
- 새 저자 추가 시 `data/authors/[name].mdx` 파일 생성 후 포스트 frontmatter에서 참조
- 태그 URL은 한글이 인코딩되므로, 태그 매칭 시 `decodeURIComponent` 사용 필요 (현재 `ListLayout.tsx`에 적용됨)
- 페이지네이션 없음 — 블로그 목록은 "더 보기" 버튼(Load More) 방식 사용
