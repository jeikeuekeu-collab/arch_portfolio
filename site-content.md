# 사이트 전체 교체표 (템플릿 예시 → 유시윤 실제 내용)

> ✏ = PPT·내가 직접 한 말에 없던 것을 Claude가 쓴 문장/숫자. 확인 후 고치세요. 웹에는 ✏ 기호를 넣지 마세요.
> 【채워주세요】 = 내가 직접 채워야 하는 칸. 비어 있으면 Antigravity가 그 항목을 숨기도록 지시해 뒀습니다.
> ORBIT 관련 문장은 `projects/orbit/project.md`(PPT 원문)에서 그대로 가져왔습니다.

---

## A. 메인 상단 (Hero, index.html)

| 위치 | 지금(템플릿 예시) | 바꿀 내용 |
|---|---|---|
| 소개 문단 | 빛과 공허(Void), 그리고 도시의 물리적 연속성을 탐구하는… 장소성을 설계합니다. | ✏ "공존하기 때문에 발생하는 문제를 공간으로 해결할 수 있는가?" — 서로 다른 사람들이 부딪히지 않고 함께 사는 방법을 공간으로 고민하는 신구대학교 건축학과 유시윤의 포트폴리오입니다. |
| 숫자 카드 1 | 06 / Studio Projects | ✏ 01 / Studio Project (작품 추가하면 숫자도 같이 바꾸기) |
| 숫자 카드 2 | 02 / Competition Awards (수상 없음) | ✏ 2025– / Shingu Univ. Architecture |
| 숫자 카드 3 | 3D / Parametric & BIM | ✏ 3D / Rhino · Rendering |
| 버튼 | ✦ 관점별 30초 핵심 브리핑 | 그대로 둠 (내용만 ORBIT으로 교체, D 참고) |

## B. Selected Works (작품 카드 + 상세 모달)

- 부제: "2023 - 2026 학부 설계 스튜디오 및 공모전 작품" → ✏ "2025 학부 설계 스튜디오 작품"
- 필터 버튼: ✏ 작품이 하나뿐이라 지금은 숨김 (코드는 남겨두고 화면에서만 안 보이게. 작품 추가할 때 다시 켜기)
- 가짜 카드 3개(The Void Gallery, Vertical Nexus, Courtyard In-between)와 `script.js`의 `projectsData` 3개 → **삭제**

**카드 1 — ORBIT** (내용은 project.md "0. 카드 정보")
- 모달 데이터(`projectsData`):
  - year: 2025.Fall (1학년 2학기)
  - location: 경기도 성남시 수정구 창곡동 591번지
  - area: 대지면적 286.30 ㎡ / ✏ 연면적 225.28 ㎡ / 지상 2층
  - structure: ✏ 재료 — Red Brick, 영롱쌓기(Honeycomb Screen) 이중 외피  (PPT에 구조 방식은 없어서 '재료'로 바꿈)
  - concept: project.md "Main Concept"의 The Definition + The Solution 문단 그대로
  - images: 00_cover_render.jpg, 30_render_sunken_living.jpg
  - 모달 안에 "전체 프로젝트 보기 →" 버튼 → `projects/orbit/index.html`

**다른 작품** — 이번에는 넣지 않음 (「공존의 풍경화」는 렌더·3D 모델 완성 후 추가 예정)

## C. 3D 매스 섹션 (#viewer-section)

| 위치 | 지금 | 바꿀 내용 |
|---|---|---|
| 3D 모델 | 코드로 만든 가짜 매스(기단+타워+유리박스+지붕) | ✏ ORBIT 매스로 교체: 가운데 원통(CORE) + 둘레 원형 링(LOOP) + 네 방향 상자 4개(Room 1–4). Mass Process 다이어그램과 같은 구성. 실제 .glb 모델은 나중에 넣을 예정 — 지금은 이 간단한 매스로 대신함. `models/building.glb`를 넣으면 그게 우선 로드되는 기존 기능은 유지 |
| 요소 버튼 4개 | 기단부 / 캔틸레버 / 유리 아트리움 / 플로팅 캐노피 | CORE (Sunken Living) / LOOP (1.4m Circulation Loop) / NEXUS (Void & Atrium) / Brick Screen (영롱쌓기) |
| 버튼 설명 | 가짜 설명 | 각각 project.md "3 ORBIT LOGICS"의 Description, Brick Screen은 "Material"의 Block In / View Out 문장 |
| 기본 설명(전체 매스) | 포디움과 타워… | project.md Main Concept의 "The Strategy" 문장 |
| SITE AREA | 3,420 ㎡ | 286.30 ㎡ |
| G.F.A | 7,810 ㎡ | ✏ 225.28 ㎡ (1F 135.84 + 2F 89.44, 직접 더해서 확인함) |
| STRUCTURE | SRC + Steel Truss | 라벨을 MATERIAL로 바꾸고 → Red Brick |

## D. 관점별 30초 브리핑 (#design-rationale, script.js `briefingData`)

탭 4개를 ORBIT 내용으로 교체. 문장은 project.md에서 그대로 가져옴. ("냉난방 부하 18% 절감", "Ladybug", "Corten Steel" 같은 가짜 내용 전부 삭제)

| 탭 | 제목 | 내용(bullets) |
|---|---|---|
| 📐 조형 & 공간 개념 | 건축적 중력 : 타인을 묶는 보이지 않는 힘 | Main Concept의 Definition / Solution / Strategy |
| 🏙️ 도시 & 보행 동선 → ✏ 대지 & 사용자 | 대지와 사용자 | Urban Context 3줄 + The Conflict (12시간의 마찰) + Orbit Circulation |
| 🏗️ 구조 & 지속가능 재료 → ✏ 재료 & 디테일 | IDENTITY : Red Brick | Red Brick 문장 + Block In + View Out |
| ⚡ 테크 & 설계 프로세스 → ✏ 매스 프로세스 | 05. Mass Process | Core Generation → Function Attachment → Orbit Connection → Mass Unification → Visual Filtering (순서만, 설명 문장 추가 금지) |

## E. 디지털 툴체인 (3칸)

지금: Rhino+Grasshopper / Ladybug / Blender+3D Printing (안 쓴 툴)
→ ✏ 아래는 내가 실제로 쓰는 걸로 추정한 것. 【채워주세요】 실제로 쓴 것만 남기기
- 01. Modeling — Rhino (도면 선 추출)
- 02. Rendering — D5 Render / Lumion
- 03. Presentation — Illustrator · Photoshop · PowerPoint

## F. 연락처 (footer)

| 지금 | 바꿀 내용 |
|---|---|
| Email: arch.siyoon@example.ac.kr (가짜 주소) | 【채워주세요】 실제 이메일 — 없으면 줄 삭제 |
| Instagram @arch_jinwoo (다른 사람 이름) | 【채워주세요】 내 계정 — 없으면 삭제 |
| GitHub Repository (링크 없음) | https://github.com/jeikeuekeu-collab/archAI |
| LinkedIn (링크 없음) | 【채워주세요】 없으면 삭제 |
| B.Arch Candidate, Dept of Architecture | ✏ Architecture Student, Shingu University |

## G. 기타

- `script.js`의 챗봇 답변(`scenarioResponses` 5개)도 가짜 프로젝트 이야기 → ORBIT 내용(project.md 문장)으로 바꾸거나, 챗봇이 화면에 안 나오면 삭제
- 상단 메뉴 "📖 수업로드맵"(curriculum.html)은 수업 자료 페이지 → ✏ 포트폴리오에는 안 맞아서 메뉴에서 빼는 걸 추천 (파일은 지우지 않음)
