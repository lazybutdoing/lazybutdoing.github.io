# lazybutdoing.github.io

개인 기술 블로그. [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) v2.4.0 기반으로 "Minimal Onion Green" 테마(자체 제작)로 커스터마이징했습니다.

**배포 URL:** https://lazybutdoing.github.io/

## 기술 스택

| 분류          | 기술                             |
| ------------- | -------------------------------- |
| 프레임워크    | Next.js 15 (App Router)          |
| 언어          | TypeScript                       |
| 스타일링      | Tailwind CSS v4                  |
| 콘텐츠        | Contentlayer2 + MDX              |
| 폰트          | NanumSquareNeo (로컬 @font-face) |
| 검색          | kbar (로컬 검색)                 |
| 애널리틱스    | Google Analytics 4               |
| 패키지 매니저 | Yarn 3 (Berry)                   |

## 시작하기

```bash
# 의존성 설치
yarn

# 개발 서버 실행
yarn dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 주요 명령어

```bash
yarn dev      # 개발 서버 (localhost:3000)
yarn build    # 프로덕션 빌드 + RSS/sitemap 생성
yarn serve    # 빌드 결과물 로컬 서빙
yarn lint     # ESLint 자동 수정
yarn analyze  # 번들 크기 분석
```

## 블로그 포스트 작성

`data/blog/` 디렉토리에 `.mdx` 파일로 작성합니다.

**파일명 형식:** `YYYY-MM-NNN.mdx`

- `YYYY` — 연도, `MM` — 월, `NNN` — 전체 글 순서 (3자리)
- 예: `2025-05-004.mdx` → URL: `/blog/2025-05-004`

**Frontmatter:**

```yaml
---
title: '포스트 제목'
date: 2025-01-01
tags: ['tag1', 'tag2']
summary: '포스트 요약'
draft: false
layout: PostLayout # PostLayout | PostBanner
---
```

## 주요 기능

### 글 작성

`data/blog/` 디렉토리에 `.mdx` 파일로 작성합니다. `draft: true`로 설정하면 프로덕션 빌드에서 숨겨지고 개발 서버에서만 보입니다.

### 태그 등록

frontmatter의 `tags` 배열에 태그를 추가하면 됩니다. 빌드 시 태그별 페이지(`/tags/[tag]`)와 태그 카운트(`app/tag-data.json`)가 자동으로 생성됩니다.

```yaml
tags: ['Next.js', '회고', '알고리즘']
```

**태그 공지:** `data/tagNotices.ts`에 태그명과 공지 텍스트를 등록하면, 해당 태그가 포함된 글 하단에 공지가 자동으로 표시됩니다.

```ts
// data/tagNotices.ts
const tagNotices: Record<string, string> = {
  알고리즘: '이 글은 알고리즘 시리즈입니다.',
}
```

### 프로젝트 등록

`data/projectsData.ts`에 항목을 추가합니다.

```ts
{
  title: '프로젝트 이름',
  description: '프로젝트 설명',
  imgSrc: '/static/images/project.png',  // 선택
  href: 'https://github.com/...',
}
```

### 본문 마크다운 서식

MDX 파일 내에서 아래 서식을 사용할 수 있습니다.

| 기능                | 사용법                                                             |
| ------------------- | ------------------------------------------------------------------ |
| GFM (표, 취소선 등) | 표준 Markdown 확장 문법                                            |
| 수식                | `$인라인$`, `$$블록$$` (KaTeX 렌더링)                              |
| 코드 블록           | ` ```언어명 ``` ` (Prism 하이라이팅, 줄 번호 지원)                 |
| 코드 블록 제목      | ` ```js:파일명.js ``` `                                            |
| GitHub Alerts       | `> [!NOTE]`, `> [!WARNING]` 등                                     |
| 이미지              | `![alt](경로)` — next/image로 자동 최적화                          |
| 인용                | `> 텍스트`                                                         |
| 수평선              | `---`                                                              |
| 인라인 목차         | `<TOCInline toc={props.toc} />`                                    |
| 참고문헌            | frontmatter에 `bibliography: references-data.bib` 지정 후 `[@key]` |

### 앵커 등록

`rehype-slug`가 활성화되어 있어 모든 제목(`h1`~`h6`)에 ID가 자동으로 부여됩니다. 별도 설정 없이 URL 해시(`#제목`)로 해당 위치에 바로 링크할 수 있습니다.

```md
## 소개 → id="소개" → /blog/slug#소개

### 세부 내용 → id="세부-내용"
```

### 레이아웃 선택

frontmatter의 `layout` 필드로 포스트 레이아웃을 선택합니다.

- `PostLayout` (기본) — 태그·제목·저자·날짜 헤더, `images` 지정 시 커버 이미지 표시
- `PostBanner` — `images[0]`을 헤더 전체 배경으로 사용 (미지정 시 랜덤 이미지)

### 더 읽어보기

각 포스트 하단에 현재 글 기준 앞뒤 최대 5개 글이 자동으로 표시됩니다.

### 기타

- **다크/라이트 모드** — 헤더의 토글 버튼으로 전환
- **로컬 검색** — 헤더의 검색 버튼 또는 `Ctrl+K`로 kbar 팔레트 실행
- **RSS 피드 / 사이트맵** — `yarn build` 후 자동 생성
- **Google Analytics 4** — `NEXT_PUBLIC_GA_ID` 환경 변수 설정으로 활성화
- **Giscus 댓글** — 환경 변수 설정으로 활성화 (현재 미설정)

## 주요 설정 파일

| 설정                        | 파일                       |
| --------------------------- | -------------------------- |
| 사이트 제목, 저자, URL, SNS | `data/siteMetadata.js`     |
| 네비게이션 메뉴             | `data/headerNavLinks.ts`   |
| 프로젝트 목록               | `data/projectsData.ts`     |
| 태그별 공지                 | `data/tagNotices.ts`       |
| About 페이지                | `data/authors/default.mdx` |
| 전역 스타일 / 색상 / 폰트   | `css/tailwind.css`         |

## 환경 변수

`.env.local` 파일을 생성해 아래 값을 설정합니다.

```
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```
