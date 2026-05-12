# CLAUDE.md

이 파일은 Claude Code가 이 프로젝트를 빠르게 이해할 수 있도록 작성된 작업 매뉴얼입니다.

## 프로젝트 개요

개인 블로그 사이트. [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) v2.4.0 템플릿 기반이며, 커스터마이징 중인 상태입니다.

- 현재 배포 URL: `https://tailwind-nextjs-starter-blog.vercel.app` (수정 필요)
- 사이트 제목, 저자 정보 등은 `data/siteMetadata.js`에서 관리

## 기술 스택

| 분류          | 기술                         |
| ------------- | ---------------------------- |
| 프레임워크    | Next.js 15 (App Router)      |
| 언어          | TypeScript                   |
| 스타일링      | Tailwind CSS v4              |
| 콘텐츠        | Contentlayer2 + MDX          |
| 폰트          | Space Grotesk (Google Fonts) |
| 검색          | kbar (로컬 검색)             |
| 댓글          | Giscus                       |
| 뉴스레터      | Buttondown                   |
| 애널리틱스    | Umami (선택적)               |
| 패키지 매니저 | Yarn 3 (Berry)               |
| 린터/포매터   | ESLint + Prettier            |
| Git 훅        | Husky + lint-staged          |

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
│   ├── layout.tsx              # 루트 레이아웃 (폰트, 메타데이터, 테마)
│   ├── page.tsx                # 홈 (최근 포스트 목록)
│   ├── Main.tsx                # 홈 UI 컴포넌트
│   ├── about/page.tsx          # About 페이지
│   ├── blog/
│   │   ├── page.tsx            # 블로그 목록
│   │   ├── page/[page]/page.tsx # 블로그 페이지네이션
│   │   └── [...slug]/page.tsx  # 개별 포스트 (동적 라우트)
│   ├── tags/
│   │   ├── page.tsx            # 태그 목록
│   │   ├── [tag]/page.tsx      # 태그별 포스트 목록
│   │   └── [tag]/page/[page]/page.tsx
│   ├── projects/page.tsx       # 프로젝트 목록
│   ├── api/newsletter/route.ts # 뉴스레터 API
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
│   ├── Tag.tsx                 # 태그 배지
│   ├── Card.tsx                # 프로젝트 카드
│   ├── Comments.tsx            # Giscus 댓글
│   ├── MDXComponents.tsx       # MDX 커스텀 컴포넌트 등록
│   ├── Link.tsx                # Next.js Link 래퍼
│   ├── Image.tsx               # Next.js Image 래퍼
│   ├── PageTitle.tsx           # 페이지 제목
│   ├── ScrollTopAndComment.tsx # 스크롤 상단 이동 버튼
│   ├── SectionContainer.tsx    # 페이지 너비 제한 컨테이너
│   ├── LayoutWrapper.tsx       # 레이아웃 래퍼
│   ├── TableWrapper.tsx        # 반응형 테이블 래퍼
│   └── social-icons/           # 소셜 미디어 아이콘
│
├── layouts/                    # 포스트 레이아웃 템플릿
│   ├── PostLayout.tsx          # 기본 포스트 레이아웃 (사이드바 포함)
│   ├── PostSimple.tsx          # 심플 포스트 레이아웃
│   ├── PostBanner.tsx          # 배너 이미지 포스트 레이아웃
│   ├── ListLayout.tsx          # 블로그 목록 레이아웃
│   ├── ListLayoutWithTags.tsx  # 태그 사이드바 포함 목록 레이아웃
│   └── AuthorLayout.tsx        # About 페이지 레이아웃
│
├── data/                       # 콘텐츠 및 설정 데이터
│   ├── siteMetadata.js         # 사이트 전역 설정 (제목, 저자, SNS, 기능 설정)
│   ├── headerNavLinks.ts       # 네비게이션 링크 목록
│   ├── projectsData.ts         # 프로젝트 카드 데이터
│   ├── references-data.bib     # 참고문헌 BibTeX 파일
│   ├── logo.svg                # 헤더 로고
│   ├── blog/                   # 블로그 포스트 (.mdx)
│   └── authors/                # 저자 프로필 (.mdx)
│       └── default.mdx         # 기본 저자
│
├── public/                     # 정적 에셋
│   ├── static/favicons/        # 파비콘
│   ├── static/images/          # 이미지
│   └── search.json             # 로컬 검색 인덱스 (빌드 시 자동 생성)
│
├── css/
│   ├── tailwind.css            # Tailwind 전역 스타일
│   └── prism.css               # 코드 블록 syntax highlighting
│
├── scripts/
│   ├── postbuild.mjs           # 빌드 후 RSS 피드 생성
│   └── rss.mjs                 # RSS 생성 유틸
│
├── contentlayer.config.ts      # Contentlayer MDX 설정
├── data/siteMetadata.js        # 사이트 메타데이터
└── tsconfig.json               # TypeScript 설정
```

## 라우트 구조

| 경로                      | 설명                                                   |
| ------------------------- | ------------------------------------------------------ |
| `/`                       | 홈 — 최근 포스트 5개 목록                              |
| `/blog`                   | 전체 블로그 목록                                       |
| `/blog/[slug]`            | 개별 포스트 (중첩 slug 지원: `nested-route/post-name`) |
| `/blog/page/[page]`       | 블로그 페이지네이션                                    |
| `/tags`                   | 전체 태그 목록                                         |
| `/tags/[tag]`             | 태그별 포스트 목록                                     |
| `/tags/[tag]/page/[page]` | 태그별 페이지네이션                                    |
| `/projects`               | 프로젝트 목록                                          |
| `/about`                  | About 페이지                                           |
| `/api/newsletter`         | 뉴스레터 구독 API                                      |

## 블로그 포스트 작성

### 파일 위치

`data/blog/` 디렉토리에 `.mdx` 파일로 작성. 중첩 경로 지원: `data/blog/nested-route/post.mdx` → `/blog/nested-route/post`

### Frontmatter 필드

```yaml
---
title: '포스트 제목' # 필수
date: 2024-01-01 # 필수 (ISO 형식)
tags: ['tag1', 'tag2'] # 선택
lastmod: '2024-02-01' # 마지막 수정일 (선택)
draft: false # true면 프로덕션에서 숨김
summary: '포스트 요약' # 선택 (목록에 표시)
images: ['/static/images/image.jpg'] # OG 이미지 (선택)
authors: ['default'] # 저자 (선택, data/authors/의 파일명)
layout: PostLayout # 레이아웃 선택 (선택)
bibliography: references-data.bib # BibTeX 파일 (선택)
canonicalUrl: '' # 정규 URL (선택)
---
```

### 사용 가능한 레이아웃

- `PostLayout` (기본값) — 왼쪽 사이드바에 저자/태그/이전-다음 글
- `PostSimple` — 심플 레이아웃
- `PostBanner` — 상단 배너 이미지 포함

### MDX에서 사용 가능한 커스텀 컴포넌트

- `<TOCInline toc={props.toc} />` — 인라인 목차
- `<Callout>` — 콜아웃 박스
- 표준 Markdown + GFM + 수식(KaTeX) + 코드 하이라이팅(Prism) 지원

## 사이트 설정 변경 포인트

| 설정                             | 파일                              |
| -------------------------------- | --------------------------------- |
| 사이트 제목, 저자, URL, SNS 링크 | `data/siteMetadata.js`            |
| 네비게이션 메뉴                  | `data/headerNavLinks.ts`          |
| 프로젝트 카드                    | `data/projectsData.ts`            |
| About 페이지 내용                | `data/authors/default.mdx`        |
| 파비콘                           | `public/static/favicons/`         |
| 로고                             | `data/logo.svg`                   |
| 기본 아바타                      | `public/static/images/avatar.png` |

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
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
NEXT_UMAMI_ID=
BASE_PATH=
```

## 주의사항

- `yarn`을 사용 (`npm` 사용 금지) — Yarn Berry(v3) 프로젝트
- 블로그 포스트 추가/수정 후 개발 서버가 자동으로 Contentlayer를 재빌드함
- `draft: true` 포스트는 프로덕션 빌드에서 제외되지만 개발 서버에서는 보임
- 새 저자 추가 시 `data/authors/[name].mdx` 파일 생성 후 포스트 frontmatter에서 참조
